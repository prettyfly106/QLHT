
<%@page import="java.net.InetAddress"%>
<%@page import="org.apache.log4j.Logger"%>
<%@page language="java" session="true"%>
<%@page contentType="text/html; charset=utf-8"%>

<%
boolean under_construction = Boolean.valueOf(session.getServletContext().getInitParameter("under_construction"));
if (under_construction) {
	 String url = request.getContextPath() + "/under_construction.jsp";
	 response.sendRedirect(url);
	 return;
}
session.invalidate();
Logger logger = Logger.getLogger("login.jsp");
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
  String context_root = request.getContextPath();
  String lang="";
  String user_name="";
  String message = "";
try {
    request.setCharacterEncoding("UTF-8");
    //request.setAttribute("useFilter", new Boolean(false));
	request.setAttribute("editRight", new Boolean(true));
    
    String param =null;
    
    String pass_word=""; 
    
    try{
	 	param = request.getParameter("invalid");
	 	lang=(String)session.getAttribute("lang");
	    if (lang == null || !lang.equalsIgnoreCase("en")) {
	    	lang = "";
	    }
    } catch(Exception e){
    	
    }
    
	
	
	if (param!=null) {
		if (param.equals("1")) {
			message = lang.equalsIgnoreCase("en") ? "Username or Pasword is incorrect!" :  "Người sử dụng hoặc mật khẩu không đúng!";
		}
		else if(param.equals("2")){
			pass_word=session.getAttribute("USER_PASSWORD").toString();
			if(pass_word==null)
				 pass_word="";
			user_name=session.getAttribute("USER_NAME").toString();
			if(user_name==null)
				 user_name="";
		}
	}	 
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
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Metadata Registry</title>
<link href="<%=context_root%>/common/css/font-awesome.min.css" rel="stylesheet" type="text/css" media="all">
<link href="<%=context_root%>/common/css/css_style.css" rel="stylesheet">
<link rel="stylesheet" href="<%=context_root%>/common/script/jquery.captcha/jquery.realperson.css">
<script type="text/javascript" src="<%=context_root%>/common/script/jquery/jquery-3.0.0.min.js"></script>
<script src="<%=context_root%>/common/script/jquery.captcha/jquery.plugin.js"></script>
<script src="<%=context_root%>/common/script/jquery.captcha/jquery.realperson.js"></script>
<link rel="stylesheet" href="<%=context_root%>/common/script/bootstrap/css/bootstrap.min.css">
<script type="text/javascript" src="<%=context_root%>/common/script/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="https://secure.skypeassets.com/i/scom/js/skype-uri.js"></script>
<iframe style="display:none;" id="_detectSkypeClient"></iframe> 
</head>


<body onkeypress="CheckKeyCode()" onload="document.FormName.txtName.focus();" style="background-image:url(common/image/background_4.jpg);background-repeat: no-repeat; background-size:cover;">

<section class="sec-all blue-color"">
	<nav class="navbar navbar-inner">
	  <div class="container banner <%=lang%>">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">	    
	      <a class="navbar-brand" href="#"></a>	      
	    </div>	    
  	</div><!-- /.container-fluid -->
	</nav>	
</section>
<div class="bgr page-wrap">

  
<form method="POST" action="<%=context_root%>/servlet/login.ValidateUser" name="FormName">
<input type="hidden" name="srcwidth" value="1024">
 <div class="box-signin">
<div class="box-top <%=lang%>">                           
                </div>                
           <div class="pd10">
          	<div class="row">
          		<label class="mb10 user-name <%=lang%>" for="login-username" style="margin-top:3px;margin-left:15px;">		            
				</label>
          		<div class="col-md-12">
		            <div class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
						<input id="login-username" type="text" class="form-control" name="txtName" value="<%=user_name%>">                                        
					</div>
				</div>
			</div>
			<div class="row" style="margin-bottom:0 !important;">
          		<label class="mb10 password <%=lang%>" for="login-password" style="margin-top:6px;margin-left:15px;">		        
				</label>
          		<div class="col-md-12">
					<div class="input-group" >
						<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
						<input id="login-password" type="password" class="form-control" name="txtPass" >
					</div>
				</div>
			</div>
			<div class="row form-group" style="margin-bottom:0 !important;">
          		<label class="mb10 security-check <%=lang%>" for="login-password" style="margin-top:6px;margin-left:15px;">		            
				</label>
          		<div class="col-md-12">
					<input id="defaultReal" name="defaultReal" type="text" class="form-control" name="txtPass">
				</div>
			</div>
 		</div>
      <div class="box-footer">
                    <div class="clearfix">
                            <div class="pull-left" style="width:50%;">
                                <div class="ckbox ckbox-primary">
                                    <input type="checkbox" id="rememberMe" value="1">
                                    <label for="rememberMe" class="remember-me <%=lang%>"></label>
                                </div>
                            </div>
                            <div class="pull-right"  style="width:50%; text-align: right;">
                            	<button type="submit" class="btn btn-success login <%=lang%>" id="btn-login">
  									<span class="glyphicon glyphicon-ok"></span>
								</button>			  					
                            </div>
                            <span class="pull-right"><%=message%></span>
                        </div> 
                </div>
                   
   </div>
   </form>
   
</div>
<footer class="sec-all footer site-footer">
 <div class="container"> 
	<div class="footer-left <%=lang%>">              
     </div>
     <%-- <div class="footer-right <%=lang%>">                        
     </div> --%>
    </div>
</footer>
<script language="javascript">
$(function() {
	lang = '<%=lang%>';
	$('#defaultReal').realperson({regenerate: lang == "en" ? "Change code" : "Đổi mã khác"});
});
function CheckKeyCode()
{
	
	if( event.keyCode == 13 ) {
		document.FormName.srcwidth.value=screen.width;
		document.FormName.submit();
		    return true; 
	}
  else {
    return false;
  }
	
}
function dologin()
{
	__studentCode=document.FormName.txtName.value;
	document.FormName.srcwidth.value=screen.width;
	document.FormName.submit();
}
</script>
</body>
</html>
