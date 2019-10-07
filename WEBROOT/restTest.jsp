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
//System.out.print(jb.toString());
out.write(jb.toString());
String sss=jb.toString();
System.out.println("received=["+sss+"]");
//Base64Encoder base64e=new Base64Encoder(sss);
Base64Decoder base64d=new Base64Decoder(sss);
String s64=base64d.processString();
System.out.println("received decode=["+s64+"]");
%>
