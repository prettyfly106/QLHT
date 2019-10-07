<%@page import="org.w3c.tools.codec.Base64Encoder"%>
<%@page import="org.w3c.tools.codec.Base64Decoder"%>
<%@page import="java.io.BufferedReader"%>
<%
String qs=request.getQueryString();
//request.getHeader(arg0)
String contentType=request.getContentType();
System.out.println("contentType=\n["+contentType+"]");
System.out.println("qs=\n["+qs+"]");
StringBuffer jb = new StringBuffer();
String line = null;
try {
	  BufferedReader reader = request.getReader();
  while ((line = reader.readLine()) != null)
  	jb.append(line);
} catch (Exception e) { /*report an error*/ }

String sss=jb.toString();
System.out.println("received=\n["+sss+"]");
//Base64Encoder base64e=new Base64Encoder(sss);
/*
Base64Decoder base64d=new Base64Decoder(sss);
String s64=base64d.processString();
System.out.println("received decode=\n["+s64+"]");
*/
String rt="";
rt="{maKetQua:\"1234567\",moTaKetQua:\"Giao dich thanh cong\",maGDich:\"123\"}";
out.write(rt);
%>
