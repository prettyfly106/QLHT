  
	function changePassword(){		
 		var ja = jsonrpc.AjaxJson;
		//alert(userid);
 		var sqlSelect = "select user_pwd from adm_user where user_id = " + userid;
		var userPassword = ja.getOneValue(sqlSelect,[]);
		var oldPassword = document.getElementById("txtOLD_PASSWORD").value;
		if(userPassword!=oldPassword)
		{
			document.getElementById("ERROR").innerHTML = "Mật khẩu cũ không đúng";
			resetForm();
			document.getElementById("txtOLD_PASSWORD").focus();
			return false;
		}
		if(!checkForm())
			return false;
		var newPassword = document.getElementById("txtNEW_PASSWORD").value;
		var sqlUpdate = "update adm_user set user_pwd = '" +newPassword+ "' where user_id =" + userid;
		ja.execute(sqlUpdate,[]);
		resetForm();
		document.getElementById("ERROR").innerHTML = null;
		document.getElementById("pNOTIFICATION").innerHTML = "Đổi mật khẩu thành công";		
		return true;
	}
 	
 	function finish()
 	{
 		OpenParent('/css/main/index.jsp'); 		
 	}
 	
 	function checkForm()
 	{
 		var newPassword = document.getElementById("txtNEW_PASSWORD").value;
 		var retypeNewPassword = document.getElementById("txtNEW_PASSWORD_RETYPE").value;
 		if(newPassword != retypeNewPassword)
 			{
 				document.getElementById("ERROR").innerHTML = "Mật khẩu mới và mật khẩu mới nhập lại không giống nhau";
 				document.getElementById("txtNEW_PASSWORD").value = null;
 				document.getElementById("txtNEW_PASSWORD_RETYPE").value = null;
 				document.getElementById("txtNEW_PASSWORD").focus();
 				return false; 			
 			}
 		return true; 		
 	}
 	
 	function resetForm()
 	{
 		document.getElementById("txtOLD_PASSWORD").value = null;
 		document.getElementById("txtNEW_PASSWORD").value = null;
 		document.getElementById("txtNEW_PASSWORD_RETYPE").value = null;
 		
 	}
