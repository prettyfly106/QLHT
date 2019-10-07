<html>

<head>
<meta name="GENERATOR" content="Microsoft FrontPage 5.0">
<meta name="ProgId" content="FrontPage.Editor.Document">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Không đủ quyền truy cập</title>

	<link REL="stylesheet" HREF="../common/external/giscom.css">

<link href="../common/css/style_main.css" rel="stylesheet" type="text/css">
<script language="javascript">
	function OpenNewWindow(link) {
		window.open(link);
	}
</script>
</head>

<BODY BGCOLOR="#FFFFFF" LEFTMARGIN="0" TOPMARGIN="0" MARGINWIDTH="0" MARGINHEIGHT="0" >
<%
	String forbiddenLink = (String)session.getAttribute("forbiddenLink");
	if (forbiddenLink == null) {
		forbiddenLink = "<không xác định được>";
	}
%>
<h2>Thông báo:</h2>
<p><b><font face="Verdana">Bạn không đủ quyền để truy nhập chức năng này. </font></b> </p>

<p><b><font face="Verdana" size="2">&nbsp;&nbsp;&nbsp; Liên kết bị chặn : <%=forbiddenLink%></font>
</b> </p>

<p><b><font face="Verdana">Bạn có thể:</font></b></p>

<ul>
  <li><b><font face="Verdana"><a href="javascript:OpenNewWindow('/cabman/userman/Admin/Main');"><font size="2">Liên hệ</font></a></font><font size="2"> với người quản trị để cấp quyền cho bạn.</font></b></li>
  <li><b><font face="Verdana"> <a href="login.jsp">
  <font size="2">Đăng nhập</font></a></font><font size="2"> với account khác.</font></b></li>
  <li><b><font face="Verdana"> <a href="javascript: history.back(-1)">
  <font size="2">Quay lại</font></a></font><font size="2">. </font></b></li>
  <li><b><font size="3"><a href="javascript:window.close();"><font size="2">Đóng 
  cửa sổ</font></a></font><font size="2">.</font></b></li>
</ul>

</body>

</html>
<%@page language="java" session="true"%>
<%@page contentType="text/html; charset=utf-8"%>
<%
    request.setCharacterEncoding("UTF-8");
%>