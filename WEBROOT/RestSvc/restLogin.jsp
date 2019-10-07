<%@page import="org.w3c.tools.codec.Base64Encoder"%>
<%@page import="org.w3c.tools.codec.Base64Decoder"%>
<%@page import="java.io.BufferedReader"%>
<%
StringBuffer jb = new StringBuffer();
String line = null;
try {
	  BufferedReader reader = request.getReader();
  while ((line = reader.readLine()) != null)
  	jb.append(line);
} catch (Exception e) { /*report an error*/ }
String sss=jb.toString();
String rt="";
rt="{\"access_token\":\"dHJXOFNaQ0YzYUY4YnAwS2pVWTZqcy9iay9rNkhRUWR4azV1eStKRUFhQT06MjVfNDZfU2VydmljZTE6MTMxMDM4NjY1NDgwNjkyNTUy\",\"id_token\":\"39f43a9f-6091-4a6a-9fdb-a5b322776f1b\",\"token_type\":\"Bearer\",\"username\":\"25_46_Service1\",\"expires_in\":\"2016-03-31T03:05:48.0692552Z\"}";
out.write(rt);
%>
