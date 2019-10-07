
<%@page import="xls.xlsUpload"%>
<%@page import="jxl.*"%>
<%@page import="java.sql.*"%>
<%@ page import="upload.MonitoredDiskFileItemFactory" %>
<%@ page import="upload.UploadListener" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload" %>
<%@page import="java.util.*"%>
<%@page import="java.io.*"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%  
try
{
	
		String cPath = request.getContextPath();
		String appPath = pageContext.getServletContext().getRealPath(request.getRequestURI()).replace('\\','/');
		if ( cPath.length() > 1 ){
		   int f1 = appPath.lastIndexOf(cPath);
		   appPath = appPath.substring(0,f1) + appPath.substring(f1 + cPath.length());
		}
		appPath = appPath.substring(0,appPath.lastIndexOf('/')+1);
		//String db_name = "jdbc:oracle:thin:@123.30.171.4:1521:qlbv";
		//String db_name="jdbc:oracle:thin:qlbv/123@123.30.171.4:1521:qlbv";//pageContext.getServletContext().getInitParameter("db_name");
		//String db_name=pageContext.getServletContext().getInitParameter("db_name");
		String db_name="jdbc:oracle:thin:his_esb/123@123.31.27.51:1521:db01";
		//String db_name="jdbc:oracle:thin:his_esb/123@127.0.0.1:1521:etest";
		xlsUpload.doUpload(db_name, request, response);
    }
    catch (Exception e)
    {
    	e.printStackTrace();
        System.out.println(e.getMessage());  //To change body of catch statement use File | Settings | File Templates.
        //response.sendRedirect("index.html");
    }
%>
