package login;

import java.io.IOException;
import java.net.InetAddress;
import java.net.URLDecoder;
import java.util.Enumeration;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.vsc.util.CryptoUtil;

import AjaxUtil.AjaxJson;
import CommonLib.common.UserInfo;
import intellsoft.db.*;


public class ValidateUser extends HttpServlet {

	Logger logger = Logger.getLogger(ValidateUser.class);

	private static final long serialVersionUID = 7277133933361004940L;
	// private PrintWriter out;
	private UserInfo userInfo;
	String db_name; 
	String db_schema;
	String start_page;
	boolean under_construction;
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		Enumeration p = config.getInitParameterNames();
		while (p.hasMoreElements()) {
			logger.info((String) p.nextElement());
		}
		db_name =getServletContext().getInitParameter("db_name");
		db_schema =getServletContext().getInitParameter("db_schema");
		start_page =getServletContext().getInitParameter("start_page");
		under_construction = Boolean.valueOf(getServletContext().getInitParameter("under_construction"));
	}

	public final void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	} 
	private String rpHash(String value) {
		int hash = 5381;
		value = value.toUpperCase();
		for(int i = 0; i < value.length(); i++) {
			hash = ((hash << 5) + hash) + value.charAt(i);
		}
		return String.valueOf(hash);
	}
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		long startTime = System.currentTimeMillis();
		String server_ip="";
		String client_ip = request.getRemoteAddr();  
		  try {
			  InetAddress ip = InetAddress.getLocalHost();
			  server_ip= ip.getHostAddress();
		  } catch (Exception e) {
			e.printStackTrace();

		  }
		  logger.info(",START,"+client_ip+","+server_ip +",ValidateUser,"+startTime);
		 if (under_construction) {
			 String url = request.getContextPath() + "/under_construction.jsp";
			 response.sendRedirect(url);
			 return;
		 }
		  
		HttpSession session = request.getSession(true);
		
		String userName;
		String password;
		String start_url="";
		String url = "";
		String defaultReal=request.getParameter("defaultReal");
		String defaultRealHash=request.getParameter("defaultRealHash");
		try {
			if (rpHash(defaultReal).equals(defaultRealHash)) {
				// Accepted
			}
			else {
				// Rejected
				//url = request.getContextPath() + "/login/login.jsp?invalid=1";
				//response.sendRedirect(url);
				//return;
			}
			userInfo = new UserInfo();
			userInfo.clientIP=request.getRemoteHost();
			userName = request.getParameter("txtName").toUpperCase();
			password = request.getParameter("txtPass");
			session.setAttribute("USER_NAME",userName);
			session.setAttribute("USER_PASSWORD",password);
	
			start_url= request.getParameter("url");
			if(start_url==null) {
				start_url="";
			}
			else {
				start_url=URLDecoder.decode(start_url,"UTF-8");
			}
			AjaxJson ajaxJson =new AjaxJson(session);
			boolean check=false;
			String login_data="";
			try {
				login_data=ajaxJson.doLogin(db_name,new String[]{"{?=call PRC_LOGIN(?2L,?3L)}",userName, password});
				JSONObject user =new JSONObject(login_data);				
				System.out.println("----------- user: "+ user.toString());
				if(user!=null && user.getInt("STATUS")==1) {
					userInfo.LOGINED = true;
					userInfo.db_name = db_name;
					//userInfo.setUser(userInfo.db_name,user);
					userInfo.user_id =user.getLong("USER_ID");
					userInfo.user_name = user.getString("USER_NAME");
					//userInfo.user_password = user.getString("user_pwd");
					userInfo.full_name = user.getString("FULL_NAME");
					//userInfo.encrypt_check = user.getInt("encrypt_check");
					userInfo.user_group_id = user.getLong("USER_GROUP_ID");					
					userInfo.user_level=user.getLong("USER_LEVEL");					
					userInfo.province_code = !user.isNull("CITY_CODE") ? user.getLong("CITY_CODE") : 0;
					userInfo.center_id = !user.isNull("CENTER_ID")  ? user.getLong("CENTER_ID") : 0;
					userInfo.station_id = !user.isNull("STATION_ID") ? user.getLong("STATION_ID") : 0;
					userInfo.zoom_level = user.getLong("ZOOM_LEVEL");
					userInfo.lat = user.getString("LATITUDE");
					userInfo.lng = user.getString("LONGITUDE");
					userInfo.db_name=db_name;
					userInfo.db_schema=db_schema;
					userInfo.uuid=user.getString("UUID");
					check=true;
				}
				else {
					check=false;
				}
			}
			catch(Exception e) {
				e.printStackTrace();
				check=false;
			}
		
			//boolean check = IsUserValid(db_name,userName, password);
			if (check) {
				//url = request.getContextPath() + "/main/manager.jsp?func=../MiniHIS/dashboard";
				url = request.getContextPath() + start_page;
				String UrlRequest = (String) session.getAttribute("UrlRequest");
				session.removeAttribute("UrlRequest");
				if (UrlRequest != null) {
					if (!UrlRequest.equalsIgnoreCase("")) {
						url = UrlRequest;
					}
				}
				if(!start_url.equalsIgnoreCase(""))
					url=start_url;
				session.setAttribute("userInfo", userInfo);
				session.setAttribute("db_name", userInfo.db_name);
				session.setAttribute("db_schema", userInfo.db_schema);
	    		session.setAttribute("user_group_id",userInfo.user_group_id);
				session.setAttribute("department_id",userInfo.department_id);
	    		session.setAttribute("province_code",userInfo.province_code);				
				session.setAttribute("center_id",userInfo.center_id);
				session.setAttribute("station_id",userInfo.station_id);
				session.setAttribute("zoom_level",userInfo.zoom_level);
				session.setAttribute("lat",userInfo.lat);
				session.setAttribute("lng",userInfo.lng);
	
			} else {
	
				url = request.getContextPath() + "/login/login.jsp?invalid=1";
			}
			response.sendRedirect(url);
			logger.info(",FINISH,"+client_ip+","+server_ip +",ValidateUser,"+(System.currentTimeMillis() - startTime));
			return;
		}
		catch(Exception e) {
			e.printStackTrace();
			logger.info(",ERROR,"+client_ip+","+server_ip +",ValidateUser,"+(System.currentTimeMillis() - startTime)+","+e.getMessage());
		}
	}

}