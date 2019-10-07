package common.filters;

import intellsoft.db.DBUtil;
import intellsoft.db.RecordSet;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.GenericServlet;

import org.apache.log4j.Logger;


import CommonLib.common.UserInfo;



/**
 * File : common.filters.AuthenticationFilter
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 * Operation description:
 *           Thực hiện kiểm tra quyền của User đăng nhập
 *              có được phép truy cập URL này hay không -
 *              nếu không -> redirect tới trang thông báo lỗi
 * Output:
 * Date of creation: Oct 13, 2003 - 11:05:59 AM
 * Date of last changes:
 */
public class AuthenticationFilter extends common.filters.MyGenericFilter{
    private static final String myDebugName = "AuthenticationFilter ";
    Logger logger = Logger.getLogger(AuthenticationFilter.class);
	private boolean checkUser = true;
	private boolean IsCommon(String db_name,ServletRequest request, String strFullUrlRequest)
	{
		RecordSet testRecord=DBUtil.executeQuery(db_name, "SELECT 1 FROM adm_common_link where '"+strFullUrlRequest+"' like common_link escape escape_char");
		boolean rt = testRecord.next();
		testRecord.close();
		testRecord=null;
		return rt;
	}
    public void doFilter(final ServletRequest request, final ServletResponse response,
    FilterChain chain) throws IOException, ServletException
    {
    	try {    		
	        HttpSession session = ((HttpServletRequest)request).getSession();
	        
	        UserInfo userInfo = (UserInfo)session.getAttribute("userInfo");
	        
			if (userInfo == null|| userInfo.db_name==null) {
				//logger.info(myDebugName + "WARNING : userInfo IS NULL!");
				chain.doFilter(request,response);
				return ;
			}
	        String strPartUrlRequest = ((HttpServletRequest)request).getRequestURI();
	        String strFullUrlRequest;
	        String queryString;
	        if ((queryString = ((HttpServletRequest)request).getQueryString())!=null)
	        {
	            strFullUrlRequest=strPartUrlRequest + "?" + queryString;
	        } else
	        {
	            strFullUrlRequest = strPartUrlRequest ;
	        }
			if (IsCommon(userInfo.db_name,request,strFullUrlRequest))
			{
				chain.doFilter(request,response);
				return;
			}
			session.setAttribute("currentURL", strPartUrlRequest);
	
	        String contentType = request.getContentType();
	        boolean _canFollowLink = false;
	
			if (checkUser) {
				//user_Home.findByPrimaryKey(userInfo.getId());
				Long usr_id=DBUtil.getOneValueLong(userInfo.db_name,"select user_id from adm_user where user_id="+userInfo.user_id);
				if(usr_id==null) {
					logger.info("User killed!");
					session.invalidate();
					((HttpServletResponse) response).sendRedirect(((HttpServletRequest) request).getContextPath()
						+ "/login/login.jsp");
					return;
				}
			}
			if (canFollowLink(userInfo.db_name, userInfo.user_group_id,strFullUrlRequest)) {
				_canFollowLink = true;
			} 
	        if (_canFollowLink)
	        {
				chain.doFilter(request, response);
	        } else
	        {
				((HttpServletResponse) response).sendRedirect("/css/login/NotAuthorized.jsp");
				session.setAttribute("forbiddenLink", strFullUrlRequest);
	            logger.info(myDebugName + ": can't follow link " + strFullUrlRequest + " because contentType = " + contentType);
	            return;
	        }
    	}catch(Exception e) {
    		e.printStackTrace();
    		((HttpServletResponse)response).sendRedirect(((HttpServletRequest)request).getContextPath());
    		return;
    	}
    }
    public boolean canFollowLink(String db_name,Long user_group_id, String link)
	{
		if ((user_group_id == null)||(link==null))
		{
			return false;
		}
		if(link.indexOf("/omc/")>0) return true;
		boolean rt= false;
		String sql;
		sql = "SELECT a.user_group_id FROM adm_usergroup_function a, adm_function b where a.function_id = b.function_id and a.user_group_id = "+user_group_id+" and '" + link + "' like c.function_link escape c.escape";
		RecordSet testRecord=DBUtil.executeQuery(db_name, sql);
		rt = testRecord.next();
		testRecord.close();
		testRecord=null;
		return rt;
	}
    public void init(final FilterConfig filterConfig)
    {
		String strCheckUser = filterConfig.getInitParameter("checkUser");
		if (strCheckUser!=null) {
			if (strCheckUser.trim().equals("0")) {
				checkUser = false;
			}
		}
        super.init(filterConfig);
    }
}
