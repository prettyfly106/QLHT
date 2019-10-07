<%
  String context_root = request.getContextPath(); 
%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Cổng tiếp nhận hồ sơ KCB & BHYT Bộ y tế</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="<%=context_root%>/common/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="<%=context_root%>/common/css/bootstrap.min.css">
<link href="<%=context_root%>/common/css/css_style.css" rel="stylesheet">
<body>
<section class="sec-all blue-color"">
	<nav class="navbar navbar-inner">
	  <div class="container banner">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">	    
	      <a class="navbar-brand" href="/hPortal"></a>	      
	    </div>	    
  	</div><!-- /.container-fluid -->
	</nav>	
</section>
<div class="page-wrap">
	<div class="container"> 
		<div class="box-category" style="margin-top:20vh">
		  <h3 align="center">THÔNG BÁO HỆ THỐNG</h3>
		    <p align="center"> Hệ thống đang tiến hành bảo trì.<br>
		    Thời gian bảo trì:<i style="color:orange">Từ 19h ngày 24/09/2016 đến 5h00 ngày 25/09/2016</i><br>
		    Trong thời gian này các dịch vụ của hệ thống sẽ tạm dừng.<br>
		    Mong các bạn vui lòng quay lại sau.</p>
		  <p align="center"><img border="0" src="common/img/under-construction.gif" width="339" height="258"></p>		  
		</div>  
    </div>
</div> 
<footer class="sec-all footer site-footer">
 <div class="container"> 
	<div class="footer-left">              
     </div>
     <div class="footer-right">                        
     </div>
    </div>
</footer>
<script language="javascript">
window.history.replaceState("", "", "<%=context_root%>");
</script>
</body>
</html>
