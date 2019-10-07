<%@page import="CommonLib.common.UserInfo"%>
<%@page language="java" session="true"%>
<%@page contentType="text/html; charset=utf-8"%>

<%
	  request.setCharacterEncoding("UTF-8");
	 String message="";
	 UserInfo userInfo=(UserInfo)session.getAttribute("userInfo");
	 String clientIP=request.getRemoteHost();
	 if(!clientIP.equalsIgnoreCase(userInfo.clientIP)) {
	 	session.invalidate();
	 	response.sendRedirect(request.getContextPath() + "/login/login.jsp");
	 }
	 String uuid=userInfo.uuid;
	  String param_1 = request.getParameter("param_1");
	  session.setAttribute("param_1",param_1);
	  
%>
<html>
<head>
<meta name="GENERATOR" content="Microsoft FrontPage 5.0">
<meta name="ProgId" content="FrontPage.Editor.Document">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Don</title>
<script type="text/javascript" src="../common/script/jquery/jquery-3.0.0.min.js"></script>
<script type="text/javascript" src="../common/script/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="../common/script/RestService.js" ></script>
<script type="text/javascript" src="../common/script/CommonUtil.js" ></script>
<link rel="stylesheet" href="../common/script/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="../common/css/font-awesome.min.css">
<link rel="stylesheet" href="../common/css/css_style.css">
<link rel="stylesheet" href="../common/css/banner.css">
</head>

<BODY BGCOLOR="#FFFFFF" LEFTMARGIN="0" TOPMARGIN="0" MARGINWIDTH="0" MARGINHEIGHT="0" >
<section class="sec-all blue-color">  
	<div class="container banner">         
     <div class="blue-menu">  
   </div>
    </div>
</section> 

<div class="clear"></div>
<form action="uploadExcel.jsp" method="post" enctype="multipart/form-data" name="FormName">
	
<div id="content" class="container">		
<div class="panel panel-primary">
  <div class="panel-heading">Tải file tài liệu</div>
  <div class="panel-body">
  	<div class="row">
        <div class="col-md-3">Loại file</div>
        <div class="col-md-9"><select class="form-control input-sm" name="cboMAP_ID" id="cboMAP_ID"></select></div>
    </div>
    <div class="row">
        <div class="col-md-3">Mô tả</div>
        <div class="col-md-9"><input class="form-control input-sm" type="text" style="width:100%" name="txtDESCRIPTION" id="txtDESCRIPTION" ></input></div>
    </div>
    <div class="row">
        <div class="col-md-3">Chọn file tài liệu</div>
        <div class="col-md-3">
        
        <div class="input-group">
  			<input size="50" type="file" name="spreadsheet" />
  		<div class="input-group-btn">Thực hiện
    	<!-- Button and dropdown menu -->
  		</div>
</div>
        </div>
    </div>
    <div class="row">
    	<div class="col-md-3"></div>
        <div class="col-md-3">
	        <button type="submit" class="btn btn-default btn-md" id="btnSubmit">
	  		<span class="glyphicon glyphicon-save"></span> Thực hiện
			</button>
        </div>
        <div class="col-md-3"></div>
        <div class="col-md-3">
	        <button type="button" class="btn btn-default btn-md" onclick="window.close();" id="btnClose">
	  			<span class="glyphicon glyphicon-close"></span> Đóng
			</button>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12"><%=message%></div>
    </div>
   </div>
</div>
</div>
</form> 
<div class="clear"></div>
<footer class="sec-all footer">
 <div class="container"> 
	<div class="footer-left"> 
        </div>
        <div class="footer-right">
            <div><img src="img/logo_vnpt.png" alt="logo" class="img"/> </div>
            
        </div>
    </div>
</footer>
</body>
<script language="javascript">
var uuid='<%=uuid%>';
initRest(uuid);
getComboTag("cboMAP_ID","SELECT MAP_ID,MAP_NAME FROM EXCEL_MAP WHERE MAP_STATUS=1",[], "","");

</script>
</html>
