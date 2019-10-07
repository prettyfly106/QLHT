package common.filters;

import CommonLib.common.UserInfo;
import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * File : common.filters.ValidationFilter
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 * Operation description:
 *          Filter nay duoc Thuc hien goi truoc bat ky servlet hay JSP nao de
 *              thuc hien kiem tra user
 * Output:
 * Date of creation: Jun 25, 2003 - 9:43:56 AM
 * Date of last changes:
 */

public class ValidationFilter extends MyGenericFilter{

    private String loginValidPage;
    private String loginInvalidPage;
    private String proxyPage;
    private String loginPage;
    private String expirePage;
    private boolean under_construction;
    public void doFilter(final ServletRequest request, final ServletResponse response,
    FilterChain chain) throws IOException, ServletException
    {    	
    	try {
	        HttpSession session = ((HttpServletRequest)request).getSession(true);	        
	        if (under_construction) {
				 String url = ((HttpServletRequest)request).getContextPath() + "/under_construction.jsp";
				 ((HttpServletResponse) response).sendRedirect(url);
				 return;
			 }
	        if (session!=null)
	        {
	
	            UserInfo userInfo = (UserInfo)session.getAttribute("userInfo");
	            if (userInfo!=null)
	            {
	                if (userInfo.LOGINED)
	                {
	                    /*
	                	if(!CommonFunctions.ShowObject(CommonFunctions.getSysParam(userInfo.db_name,Sys_param_Constants.proxyName)).equalsIgnoreCase("")){
	                        if(CommonFunctions.getSysParam(userInfo.db_name,Sys_param_Constants.proxyName).equalsIgnoreCase(CommonFunctions.ShowObject(request.getRemoteHost()))){
	                            ((HttpServletResponse) response).sendRedirect(((HttpServletRequest) request).getContextPath()
	                                    + proxyPage);
	                            return;
	                        }
	                    }
	                    */
	                    chain.doFilter(request,response);
	                    return;
	                }
	            }
	
	            else
	            {
	                StringBuffer UrlRequest=((HttpServletRequest)request).getRequestURL();
	                String queryString;
	                if ((queryString=((HttpServletRequest)request).getQueryString())!=null)
	                {
	                    UrlRequest.append("?").append(queryString);
	                }
	                 session.setAttribute("UrlRequest",UrlRequest.toString());
	
	               ((HttpServletResponse)response).sendRedirect(((HttpServletRequest)request).getContextPath()+ loginPage);
	                return;
	
	            }
	
	
	        }
	        else
	        {
	            ((HttpServletResponse)response).sendRedirect(((HttpServletRequest) request).getContextPath()+ expirePage);
	            return;
	        }
    	}catch(Exception e) {
    		e.printStackTrace();
    		((HttpServletResponse)response).sendRedirect(((HttpServletRequest)request).getContextPath()+ loginPage);
            return;
    	}

    }
    public void init(final FilterConfig filterConfig)
    {
        super.init(filterConfig);
        loginInvalidPage = filterConfig.getInitParameter("loginInvalidPage");
        loginValidPage = filterConfig.getInitParameter("loginValidPage");
        loginPage = filterConfig.getInitParameter("loginPage");
        expirePage = filterConfig.getInitParameter("expirePage");
        proxyPage = filterConfig.getInitParameter("proxyPage");
        under_construction = Boolean.valueOf(filterConfig.getServletContext().getInitParameter("under_construction"));
        
     }
}
