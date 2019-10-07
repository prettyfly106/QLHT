package CommonLib.common;

import intellsoft.db.DBUtil;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;

import org.apache.log4j.Logger;

import com.metaparadigm.jsonrpc.JSONRPCBridge;

import CommonLib.common.UserInfo;
import AjaxUtil.AjaxJson;

import java.io.IOException;
import java.util.Locale;

/**
 * File : CommonLib.common.GenericServlet
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 * Operation description: 
 * Output:
 * Date of creation: Jul 22, 2003 - 11:09:33 AM
 * Date of last changes:
 */

public abstract class GenericServlet extends HttpServlet { 
	private static final Logger logger = Logger.getLogger(GenericServlet.class);
    protected static final String CONTENT_TYPE = "text/html; charset=UTF-8";
    private static final String defaultEncoding = "UTF-8";
    protected ServletContext servletContext;
    protected HttpSession session;
    
    protected Locale currentLocale;
    protected UserInfo userInfo;
    protected String db_schema;
    protected String db_name;
    protected Long district_id;
    protected String hospital_id;
    protected Boolean useFilter;
    protected String appPath;
    protected int editRight=1;
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        servletContext = config.getServletContext();
    }

    public final void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    public final void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        session = request.getSession();
        userInfo=(UserInfo)session.getAttribute("userInfo");
        String clientIP=request.getRemoteHost();
        /*
        if(!clientIP.equalsIgnoreCase(userInfo.clientIP)) {
        	logger.info("***********************Client IP changed "+clientIP+" # "+ userInfo.clientIP);
        	session.invalidate();
        	response.sendRedirect(request.getContextPath() + "/login/login.jsp");
        }
        */
        currentLocale = request.getLocale();
        request.setCharacterEncoding(defaultEncoding);
        response.setContentType(CONTENT_TYPE);
    	db_schema=userInfo.db_schema;
        db_name=userInfo.db_name;
        
    	district_id=userInfo.department_id;    	
    	useFilter = (Boolean)(request.getAttribute("useFilter"));
        if (useFilter ==null)
        {
            String strUseFilter = request.getParameter("useFilter");
            if (strUseFilter!=null)
            {
                useFilter = new Boolean(strUseFilter);
            }
            else
            {
                useFilter = new Boolean(true);
            }
        }
        appPath = this.getServletContext().getRealPath("/").replace('\\', '/');
        //editRight=DBUtil.CALL_SP_I(db_name,"{?=call GUS_CHECK_EDITRIGHT(?2S,?3L)}",new Object[]{request.getRequestURI(),new Long(userInfo.editRight)});
        session.setAttribute("editRight",new Long(editRight));
        try {
	        JSONRPCBridge json_bridge = null;
			   json_bridge = (JSONRPCBridge) session.getAttribute("JSONRPCBridge");
			   if(json_bridge == null) {
			       json_bridge = new JSONRPCBridge();
			       session.setAttribute("JSONRPCBridge", json_bridge);
			   }      
			AjaxJson ajaxJson = new AjaxJson(session);	
			json_bridge.registerObject("AjaxJson",ajaxJson);
        }
        catch(Exception e) {
        	e.printStackTrace();
        }
        doService(request,response);
    }

    public abstract void doService(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;
}
