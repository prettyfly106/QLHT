package login;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import CommonLib.common.UserInfo;

import java.io.IOException;

/**
 * File : login.Logout
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 * Operation description: 
 * Output:
 * Date of creation: Jul 18, 2003 - 1:45:11 PM
 * Date of last changes:
 */

public class Logout extends HttpServlet {
    /**
	 *http://hz.codecheck.ch/UnwrapIt/Unwrap.jsp 
	 */
	
	private static final long serialVersionUID = -4282310013366497851L;
	public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        if(userInfo!=null && userInfo.db_name!=null) {
        	//Gad_LogAction.SaveAction(userInfo.db_name,request,Gad_LogAction.log_action_delete, CommonConstants.app_CabmanWeb,userInfo.getUser_name() ,userInfo.getOfficer_name(), userInfo.getTeam_name() ,"Đăng xuất","Logout","","");
        }
        session.invalidate();
        
        response.sendRedirect(request.getContextPath()+"/login/login.jsp");
        return;
    }
}
