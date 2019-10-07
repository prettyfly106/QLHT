
<%@page import="org.apache.log4j.Logger"%>
<%@page import="java.net.InetAddress"%>
<%@page import="java.util.Enumeration"%>
<%@page import="AjaxUtil.AjaxJson"%>
<%@page import="CommonLib.common.UserInfo"%>
<%@page contentType="text/html; charset=utf-8"%>
<%@page import="CommonLib.common.TextTemplate"%>                 

 
<%

Logger logger = Logger.getLogger("manager.jsp");
long startTime = System.currentTimeMillis();
String server_ip="";
String client_ip = request.getRemoteAddr();  
  try {
	  InetAddress ip = InetAddress.getLocalHost();
	  server_ip= ip.getHostAddress();
  } catch (Exception e) {
	e.printStackTrace();

  }
  String urlQS=request.getQueryString();
  logger.info(",START,"+client_ip+","+server_ip +",manager.jsp?"+urlQS+","+session.getId());
try {
	String db_report=pageContext.getServletContext().getInitParameter("db_report");
	String rpt_schema=pageContext.getServletContext().getInitParameter("rpt_schema");
	//db_report="jdbc:oracle:thin:dynamicreport/dr@127.0.0.1:1521:cabman";
	//System.out.println("**************************\n\n\n\n manager.jsp.db_report="+db_report+" rpt_schema="+rpt_schema);
UserInfo userInfo=(UserInfo)session.getAttribute("userInfo");
String clientIP=request.getRemoteHost();
/*
if(!clientIP.equalsIgnoreCase(userInfo.clientIP)) {
	session.invalidate();
	response.sendRedirect(request.getContextPath() + "/login/login.jsp");
}
*/
String db_schema=userInfo.db_schema;
String db_name=userInfo.db_name;
Long department_id=userInfo.department_id;
if(department_id==null) department_id=new Long(0);
Boolean useFilter = (Boolean)(request.getAttribute("useFilter"));
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
String lang=request.getParameter("lang");
String _lang="";
if(lang==null||lang.equalsIgnoreCase("")) {
	lang=(String)session.getAttribute("lang");
	//System.out.println("--------------------------------------\n\n\n--**********---_lang:"+ _lang);
	if(lang==null||lang.equalsIgnoreCase("")) {
		lang="";
		session.setAttribute("lang",lang);
	}
	else {
		_lang="_"+lang;
	}
}
else if (lang.equalsIgnoreCase("vn")){
	lang = "";
	session.setAttribute("lang",lang);
	_lang= "";
}
else {
	session.setAttribute("lang",lang);
	_lang="_"+lang;
}
String cPath = request.getContextPath();
String appPath = pageContext.getServletContext().getRealPath(request.getRequestURI()).replace('\\','/');
if ( cPath.length() > 1 )
{
   int f1 = appPath.lastIndexOf(cPath);
   appPath = appPath.substring(0,f1) + appPath.substring(f1 + cPath.length());
 }
appPath = appPath.substring(0,appPath.lastIndexOf('/')+1);


	AjaxJson ajaxJson = new AjaxJson(session);	
 	//json_bridge.registerObject("AjaxJson",ajaxJson);
     String func = request.getParameter("func");   
     String sTemplateFileName = func+_lang+".htm"; 
     TextTemplate oTpl = new TextTemplate();
     oTpl.loadTemplate(appPath + sTemplateFileName,"main");
     Enumeration enumeration = request.getParameterNames();
     while (enumeration.hasMoreElements()) {
     	String parName = (String) enumeration.nextElement();
     	if(!parName.equalsIgnoreCase("useFilter")) {
     		String parValue=request.getParameter(parName);
     		oTpl.setVar(parName, parValue);
     	}
     }
     if(useFilter == true){
    	 //oTpl.setVar("menuFile","../common/script/newmenu/"+userInfo.hospital_id+"_"+userInfo.user_group_id+"_2_vn.js.xml");
     	 //oTpl.setVar("menuJS","../common/script/newmenu/"+userInfo.hospital_id+"_processMenu.js");
     	 if(lang.equalsIgnoreCase("")) {
     		oTpl.setVar("menuFile","../common/script/newmenu/"+userInfo.user_group_id+"_2_vn.js.xml");
     	 }
     	 else {
     		oTpl.setVar("menuFile","../common/script/newmenu/"+userInfo.user_group_id+"_2"+_lang+".js.xml"); 
     	 }
     	 oTpl.setVar("menuJS","../common/script/newmenu/processMenu.js");
     } 
     else {
    	 oTpl.setVar("menuJS","../common/script/jquery/jquery-1.8.2.min.js");    	     	 
     }
     oTpl.setVar("officer_id", ""+userInfo.officer_id);
     oTpl.setVar("department_id", ""+department_id);
     //oTpl.setVar("hospital_id","");
     oTpl.setVar("zoom_level",""+ userInfo.zoom_level);
     oTpl.setVar("lat",""+ userInfo.lat);
     oTpl.setVar("lng",""+ userInfo.lng);     
     oTpl.setVar("province_id",""+ userInfo.province_code);
     oTpl.setVar("center_id",""+ userInfo.center_id);
     oTpl.setVar("station_id",""+ userInfo.station_id);
     oTpl.setVar("db_name",""+ userInfo.db_name);
     oTpl.setVar("db_schema",""+ userInfo.db_schema);
     oTpl.setVar("user_id", ""+userInfo.user_id);
     oTpl.setVar("user_type", ""+userInfo.user_group_id);
     oTpl.setVar("uuid",userInfo.uuid);
     oTpl.setVar("url", request.getQueryString());
     oTpl.setVar("lang",lang);
     oTpl.parse("main",true);
     out.println(oTpl.printVar("main"));
}catch(Exception e) {
	e.printStackTrace();
	logger.info(",ERROR,"+client_ip+","+server_ip +","+urlQS+","+(System.currentTimeMillis() - startTime)+","+session.getId()+","+e.getMessage());
	response.sendRedirect(((HttpServletRequest)request).getContextPath());
}
finally {
	logger.info(",FINISH,"+client_ip+","+server_ip +","+urlQS+","+(System.currentTimeMillis() - startTime)+","+session.getId());
	//System.out.println("\n**************************LEAVE url="+url);
}
 %>