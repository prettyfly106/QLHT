var CTL_DATA_TYPE = 0;
var CTL_CONTROL_TYPE = 1;
var CTL_COLUMN_NAME = 2;
var CTL_COLUMN_ATR = 3;
var CTL_COLUMN_DEFAULT = 4;

var FormUtil={
	clearForm: function (_containerId,_prefix) {
	    var _container=null;
	    if ((_containerId == null) || (_containerId.length <= 0)) {
	    	_container =  $(document);
	    }
	    else {
	    	_container =  $('#' + _containerId);
	    }
	    if ((_container == null) || (_container.length <= 0)) return;
	    var ctl_type=["txt","cbo","hid","chk"];
	    for(var j=0;j<ctl_type.length;j++) {
	    	_type=ctl_type[j];
		    var ctl_ar=_container.find("input[id^='"+_prefix+_type+"'],textarea[id^='"+_prefix+_type+"'],select[id^='"+_prefix+_type+"']");
		    
		    for(var i=0;i<ctl_ar.length;i++) {
		    	var ctl=ctl_ar[i];
		    	var fldName=ctl.id.substring(3);
		    	//console.log('fldName='+fldName);
		    	if(_type=='chk') {
		    		ctl.checked=false;
		    	}
		    	else {
		    		//ctl.val("");
		    		ctl.value="";
		    	}
		    	 
		    }
	    }
		
		return true;
	},
	setObjectToForm: function(_containerId,_prefix,objData) {
		if (objData == null) objData = new Object();
	    var _container=null;
	    if ((_containerId == null) || (_containerId.length <= 0)) {
	    	console.log('setObjectToForm._container=document');
	    	_container =  $(document);
	    }
	    else {
	    	console.log('setObjectToForm._container='+_containerId);
	    	_container =  $('#' + _containerId);
	    }
	    if ((_container == null) || (_container.length <= 0)) return;
	    var ctl_type=["txt","cbo","hid","chk","lbl"];
	    for(var j=0;j<ctl_type.length;j++) {
	    	_type=ctl_type[j];
	    	var ctl_ar=[];
	    	
		    ctl_ar=_container.find("input[id^='"+_prefix+_type+"'],textarea[id^='"+_prefix+_type+"'],select[id^='"+_prefix+_type+"'],label[id^='"+_prefix+_type+"']");
		    //console.log("setObjectToForm="+_prefix+_type+' ctl_ar.length='+ctl_ar.length);
		    for(var i=0;i<ctl_ar.length;i++) {
		    	var ctl=ctl_ar[i];
		    	var fldName=ctl.id.substring((_prefix+_type).length);
		    	//console.log('fldName='+fldName);
		    	if(objData[fldName.toUpperCase()] != null)
		    	{
			    	if(_type=='chk') {
			    		if(objData[fldName.toUpperCase()]==1) {
			    			ctl.checked=true;
			    		}
			    		else {
			    			ctl.checked=false;
			    		}
			    	} else if(_type=='lbl'){
			    		ctl.textContent = objData[fldName.toUpperCase()];
			    	} else
			    	{
		    			ctl.value = objData[fldName.toUpperCase()];
			    	}
			    	//console.log($(ctl).attr("id")+".exttype="+$(ctl).attr("exttype"));
			    	if($(ctl).attr("exttype")=='cbg') {
			    		console.log($(ctl).attr("id")+".exttype="+$(ctl).attr("exttype"));
			    		$(ctl).combogrid("setValue",objData[fldName.toUpperCase()]);
		    		}
		    	} 
		    }
	    }
		
		return true;
	},
	
	setFormToObject: function(_containerId,_prefix, objData) {
	    if (objData == null) objData = new Object();
	    var _container=null;
	    if ((_containerId == null) || (_containerId.length <= 0)) {
	    	_container =  $(document);
	    }
	    else {
	    	_container =  $('#' + _containerId);
	    }
	    
	   
	    if ((_container == null) || (_container.length <= 0)) return;
	    var ctl_type=["txt","cbo","hid","chk", "rad"];
	    for(var j=0;j<ctl_type.length;j++) {
	    	_type=ctl_type[j];
		    var ctl_ar=[];
		    ctl_ar=_container.find("input[id^='"+_prefix+_type+"'],textarea[id^='"+_prefix+_type+"'],select[id^='"+_prefix+_type+"'],label[id^='"+_prefix+_type+"']");
		    
		    for(var i=0;i<ctl_ar.length;i++) {
		    	var ctl=ctl_ar[i];
		    	var fldName=ctl.id.substring((_prefix+_type).length);
		    	//console.log('fldName='+fldName);
		    	if(_type=='chk') {
		    		objData[fldName.toUpperCase()] = ($(ctl).is(":checked") ? 1 : 0);
		    	}
		    	else if(_type=='rad') {
		    		objData[fldName.toUpperCase()] = $.find("[name='" + ctl.name + "']:checked")[0].value; 		    		
		    	}
		    	else if(_type=='cbo') {
		    		objData[fldName.toUpperCase()] = $(ctl).val();
		    		if($(ctl).attr("reffld")) {
		    			var reffld=$(ctl).attr("reffld");
		    			objData[reffld.toUpperCase()] = $(ctl).find("option:selected").text().trim();
		    		}
		    	}
		    	else {
		    		objData[fldName.toUpperCase()] = $(ctl).val().trim();
		    		if($(ctl).attr("reffld") && $(ctl).attr("val")) {
		    			var reffld=$(ctl).attr("reffld");
		    			objData[reffld.toUpperCase()] = $(ctl).attr("val").trim();
		    		}
		    	}
		    	 
		    }
	    }
	},
	excecuteInsertOrUpdate: function(actionMode,tableName,columnDef,keyField,objData,_par) {
		if(_par==undefined) _par=[];
		var r_sql='';
		var arr_sql=[];
		console.log('FormUtil.excecuteInsertOrUpdate='+actionMode);
		var sql_p1 = [];
		var sql_p2 = [];
	    if (actionMode == 'I' ||actionMode=='NEW') {
	    	
	    	if(keyField!='') {
		        sql_p1.push(keyField);
		        sql_p2.push(tableName + '_SEQ.nextval');
	    	}
	        for (var i = 0; i < columnDef.length; i++) {
	            fieldName = columnDef[i][CTL_COLUMN_NAME];
	            dataType = columnDef[i][CTL_DATA_TYPE];
	            fieldEditMode= columnDef[i][CTL_COLUMN_ATR];
	            if (fieldName != keyField && fieldEditMode != 'R') {
	            	if(objData[fieldName]==null|| typeof objData[fieldName]=='undefined') {
	            		sql_p1.push(fieldName);
	            		if (dataType.startsWith('[S')||dataType.startsWith("'[S")) {
	                    	sql_p2.push(dataType);
	                    }
	            		else {
	            			sql_p2.push('NULL');
	            		}
	            	}
	            	else {
	            		sql_p1.push(fieldName);
	            		var fieldValue=objData[fieldName].toString().trim();
	            		if (dataType == 'N') {
	            			if(fieldValue=='') fieldValue=0;
	            			sql_p2.push(fieldValue);
	            		} else {
	            			fieldValue = fieldValue.replace(/\'/g, "''");
		                    if (dataType == 'S') sql_p2.push("'" + fieldValue + "'");
		                    else if (dataType == 'D') sql_p2.push("TO_DATE('" + fieldValue + "','dd/mm/yyyy')");
		                    else if (dataType == 'DT') sql_p2.push("TO_DATE('" + fieldValue + "','dd/mm/yyyy hh24:mi:ss')");
		                    else if (dataType == 'T') sql_p2.push("TO_DATE('" + fieldValue + "','hh24:mi:ss')");
		                    else if (dataType == 'SD') sql_p2.push('sysdate');
		                    else if (dataType.startsWith('[S')||dataType.startsWith("'[S")) {
		                    	sql_p2.push(dataType);
		                    }
	            		}
	            	}            	
	            }
	        }
	        arr_sql[0] = sql_p1.join(",");
	        arr_sql[1] = sql_p2.join(",");
	        r_sql = 'insert into ' + tableName + '(' + arr_sql[0] + ') values(' + arr_sql[1] + ')' ;
	    } else if (actionMode == 'U'||actionMode=='EDIT') {
	    	sql_p1 = [];
	    	console.log('actionMode='+actionMode+' columnDef.length='+columnDef.length);
	    	
	    	for (var i = 0; i < columnDef.length; i++) {
	            fieldName = columnDef[i][CTL_COLUMN_NAME];
	            dataType = columnDef[i][CTL_DATA_TYPE];
	            fieldEditMode= columnDef[i][CTL_COLUMN_ATR];
	            if (fieldName != keyField && fieldEditMode != 'R' && fieldEditMode != 'I' && fieldEditMode !="P") {
	            	if(objData[fieldName]==null|| typeof objData[fieldName]=='undefined') {
	            		if (dataType.startsWith('[S')||dataType.startsWith("'[S")) {
	                    	sql_p1.push(fieldName+'='+dataType);
	                    }
	            		else {
	            			sql_p1.push(fieldName+'=NULL');
	            		}
	            		
	            	}
	            	else {
	            		var fieldValue=objData[fieldName].toString().trim();
	            		if (dataType == 'N') {            			
	            			if(fieldValue=='') fieldValue=0;
	            			sql_p2.push(fieldValue);
	            		}
	            		else {
	            			fieldValue = fieldValue.replace(/\'/g, "''");
			                if (dataType == 'S') fieldValue="'" + fieldValue + "'";
			                else if (dataType == 'D') fieldValue="TO_DATE('" + fieldValue + "','dd/mm/yyyy')";
			                else if (dataType == 'DT') fieldValue="TO_DATE('" + fieldValue + "','dd/mm/yyyy hh24:mi:ss')";
			                else if (dataType == 'T') fieldValue="TO_DATE('" + fieldValue + "','hh24:mi:ss')";
			                else if (dataType == 'SD') fieldValue="sysdate";
			                else if (dataType.startsWith("[S")||dataType.startsWith("'[S")) {
			                	fieldValue=dataType;
			                }
	            		}
	            		sql_p1.push(fieldName+"="+fieldValue);
	            	}
	            }
	        }
	    	if(sql_p1.length>0) {
		        arr_sql[0] = sql_p1.join(",");
		        arr_sql[1] = keyField + " = " + objData[keyField];
		        r_sql = 'update  ' + tableName + ' set ' + arr_sql[0] + ' where ' + arr_sql[1]  ;
	    	}
	    	else {
	    		r_sql='';
	    	}
	    }
	     console.log('r_sql='+r_sql);
	     var id=null;
	     if(r_sql!='') {
		     if(keyField!='') 
		    	 id=jsonrpc.AjaxJson.ajaxExecuteUpdateEx(r_sql,_par,keyField);
		     else
		    	 id=jsonrpc.AjaxJson.execute(r_sql,_par);
	     }
	     return id;
	    //return r_sql;
	}
};



/*
function clearForm(_containerId) {
    var _container=null;
    if ((_containerId == null) || (_containerId.length <= 0)) {
    	_container =  $(document);
    }
    else {
    	_container =  $('#' + _containerId);
    }
    if ((_container == null) || (_container.length <= 0)) return;
    var ctl_type=["txt","cbo","hid","chk"];
    for(var j=0;j<ctl_type.length;j++) {
    	_type=ctl_type[j];
	    var ctl_ar=_container.find("input[id^='"+_type+"'],textarea[id^='"+_type+"'],select[id^='"+_type+"']");
	    for(var i=0;i<ctl_ar.length;i++) {
	    	var ctl=ctl_ar[i];
	    	var fldName=ctl.id.substring(3);
	    	//console.log('fldName='+fldName);
	    	if(_type=='chk') {
	    		ctl.checked=false;
	    	}
	    	else {
	    		//ctl.val("");
	    		ctl.value="";
	    	}
	    	 
	    }
    }
	
	return true;
}
function setObjectToForm(_containerId,objData) {
	if (objData == null) objData = new Object();
    var _container=null;
    if ((_containerId == null) || (_containerId.length <= 0)) {
    	console.log('setObjectToForm._container=document');
    	_container =  $(document);
    }
    else {
    	console.log('setObjectToForm._container='+_containerId);
    	_container =  $('#' + _containerId);
    }
    if ((_container == null) || (_container.length <= 0)) return;
    var ctl_type=["txt","cbo","hid","chk","lbl"];
    for(var j=0;j<ctl_type.length;j++) {
    	_type=ctl_type[j];
    	var ctl_ar=[];
	    if ((_containerId == null) || (_containerId.length <= 0)) {
	    	ctl_ar=_container.find("input[id^='"+_type+"'],textarea[id^='"+_type+"'],select[id^='"+_type+"'],label[id^='"+_type+"']");
	    }
	    else {
	    	ctl_ar=_container.find("input[id^='"+_type+"'],textarea[id^='"+_type+"'],select[id^='"+_type+"'],label[id^='"+_type+"'],input[id^='"+_containerId+_type+"'],textarea[id^='"+_containerId+_type+"'],select[id^='"+_containerId+_type+"'],label[id^='"+_containerId+_type+"']");
	    }
	    for(var i=0;i<ctl_ar.length;i++) {
	    	var ctl=ctl_ar[i];
	    	var fldName=ctl.id.substring(3);
	    	//console.log('fldName='+fldName);
	    	if(objData[fldName.toUpperCase()] != null)
	    	{
		    	if(_type=='chk') {
		    		if(objData[fldName.toUpperCase()]==1) {
		    			ctl.checked=true;
		    		}
		    		else {
		    			ctl.checked=false;
		    		}
		    	} else if(_type=='lbl'){
		    		ctl.textContent = objData[fldName.toUpperCase()];
		    	} else
		    	{
	    			ctl.value = objData[fldName.toUpperCase()];
		    	}
	    	} 
	    }
    }
	
	return true;
}

function setFormToObject(_containerId, objData) {
    if (objData == null) objData = new Object();
    var _container=null;
    if ((_containerId == null) || (_containerId.length <= 0)) {
    	_container =  $(document);
    }
    else {
    	_container =  $('#' + _containerId);
    }
    
   
    if ((_container == null) || (_container.length <= 0)) return;
    var ctl_type=["txt","cbo","hid","chk", "rad"];
    for(var j=0;j<ctl_type.length;j++) {
    	_type=ctl_type[j];
	    var ctl_ar=[];
	    if ((_containerId == null) || (_containerId.length <= 0)) {
	    	ctl_ar=_container.find("input[id^='"+_type+"'],textarea[id^='"+_type+"'],select[id^='"+_type+"']");
	    }
	    else {
	    	ctl_ar=_container.find("input[id^='"+_type+"'],textarea[id^='"+_type+"'],select[id^='"+_type+"'],input[id^='"+_containerId+_type+"'],textarea[id^='"+_containerId+_type+"'],select[id^='"+_containerId+_type+"']");
	    }
	    
	    for(var i=0;i<ctl_ar.length;i++) {
	    	var ctl=ctl_ar[i];
	    	var fldName=ctl.id.substring(3);
	    	console.log('fldName='+fldName);
	    	if(_type=='chk') {
	    		objData[fldName.toUpperCase()] = ($(ctl).is(":checked") ? 1 : 0);
	    	}
	    	else if(_type=='rad') {
	    		objData[fldName.toUpperCase()] = $.find("[name='" + ctl.name + "']:checked")[0].value; 		    		
	    	}
	    	else if(_type=='cbo') {
	    		objData[fldName.toUpperCase()] = $(ctl).val();
	    		if($(ctl).attr("reffld")) {
	    			var reffld=$(ctl).attr("reffld");
	    			objData[reffld.toUpperCase()] = $(ctl).find("option:selected").text();
	    		}
	    	}
	    	else {
	    		objData[fldName.toUpperCase()] = $(ctl).val();
	    	}
	    	 
	    }
    }
}

function //syslog(uid,act,tab_name,key_fld,key_val) {
	console.log('//syslog='+uid+" act="+act);
	 //r_sql = "insert into mdr_log(user_id,action,table_name,key_field,key_val,action_date) values("+uid+",'"+act+"','"+tab_name+"','"+key_fld+"','"+key_val+"',NOW())";
	 //create table mdr_log(user_id int,action varchar(20),table_name varchar(50),key_field varchar(50),key_val varchar(500),action_date datetime)
	 //jsonrpc.AjaxJson.execute(r_sql);
}
function FormUtil.excecuteInsertOrUpdate(actionMode,tableName,columnDef,keyField,objData,_par) {
	if(_par==undefined) _par=[];
	var r_sql='';
	var arr_sql=[];
	console.log('FormUtil.excecuteInsertOrUpdate='+actionMode);
	var sql_p1 = [];
	var sql_p2 = [];
    if (actionMode == 'I'||actionMode=='NEW') {
    	
    	if(keyField!='') {
	        sql_p1.push(keyField);
	        sql_p2.push(tableName + '_SEQ.nextval');
    	}
        for (var i = 0; i < columnDef.length; i++) {
            fieldName = columnDef[i][CTL_COLUMN_NAME];
            dataType = columnDef[i][CTL_DATA_TYPE];
            fieldEditMode= columnDef[i][CTL_COLUMN_ATR];
            if (fieldName != keyField && fieldEditMode != 'R') {
            	if(objData[fieldName]==null|| typeof objData[fieldName]=='undefined') {
            		sql_p1.push(fieldName);
            		if (dataType.startsWith('[S')||dataType.startsWith("'[S")) {
                    	sql_p2.push(dataType);
                    }
            		else {
            			sql_p2.push('NULL');
            		}
            	}
            	else {
            		sql_p1.push(fieldName);
            		var fieldValue=objData[fieldName].toString().trim();
            		if (dataType == 'N') {
            			if(fieldValue=='') fieldValue=0;
            			sql_p2.push(fieldValue);
            		} else {
            			fieldValue = fieldValue.replace(/\'/g, "''");
	                    if (dataType == 'S') sql_p2.push("'" + fieldValue + "'");
	                    else if (dataType == 'D') sql_p2.push("TO_DATE('" + fieldValue + "','dd/mm/yyyy')");
	                    else if (dataType == 'DT') sql_p2.push("TO_DATE('" + fieldValue + "','dd/mm/yyyy hh24:mi:ss')");
	                    else if (dataType == 'T') sql_p2.push("TO_DATE('" + fieldValue + "','hh24:mi:ss')");
	                    else if (dataType == 'SD') sql_p2.push('sysdate');
	                    else if (dataType.startsWith('[S')||dataType.startsWith("'[S")) {
	                    	sql_p2.push(dataType);
	                    }
            		}
            	}            	
            }
        }
        arr_sql[0] = sql_p1.join(",");
        arr_sql[1] = sql_p2.join(",");
        r_sql = 'insert into ' + tableName + '(' + arr_sql[0] + ') values(' + arr_sql[1] + ')' ;
    } else if (actionMode == 'U'||actionMode=='EDIT') {
    	sql_p1 = [];
    	console.log('actionMode='+actionMode+' columnDef.length='+columnDef.length);
    	
    	for (var i = 0; i < columnDef.length; i++) {
            fieldName = columnDef[i][CTL_COLUMN_NAME];
            dataType = columnDef[i][CTL_DATA_TYPE];
            fieldEditMode= columnDef[i][CTL_COLUMN_ATR];
            if (fieldName != keyField && fieldEditMode != 'R') {
            	if(objData[fieldName]==null|| typeof objData[fieldName]=='undefined') {
            		if (dataType.startsWith('[S')||dataType.startsWith("'[S")) {
                    	sql_p1.push(fieldName+'='+dataType);
                    }
            		else {
            			sql_p1.push(fieldName+'=NULL');
            		}
            		
            	}
            	else {
            		var fieldValue=objData[fieldName].toString().trim();
            		if (dataType == 'N') {            			
            			if(fieldValue=='') fieldValue=0;
            			sql_p2.push(fieldValue);
            		}
            		else {
            			fieldValue = fieldValue.replace(/\'/g, "''");
		                if (dataType == 'S') fieldValue="'" + fieldValue + "'";
		                else if (dataType == 'D') fieldValue="TO_DATE('" + fieldValue + "','dd/mm/yyyy')";
		                else if (dataType == 'DT') fieldValue="TO_DATE('" + fieldValue + "','dd/mm/yyyy hh24:mi:ss')";
		                else if (dataType == 'T') fieldValue="TO_DATE('" + fieldValue + "','hh24:mi:ss')";
		                else if (dataType == 'SD') fieldValue="sysdate";
		                else if (dataType.startsWith("[S")||dataType.startsWith("'[S")) {
		                	fieldValue=dataType;
		                }
            		}
            		sql_p1.push(fieldName+"="+fieldValue);
            	}
            }
        }
    	if(sql_p1.length>0) {
	        arr_sql[0] = sql_p1.join(",");
	        arr_sql[1] = keyField + " = " + objData[keyField];
	        r_sql = 'update  ' + tableName + ' set ' + arr_sql[0] + ' where ' + arr_sql[1]  ;
    	}
    	else {
    		r_sql='';
    	}
    }
     console.log('r_sql='+r_sql);
     var id=null;
     if(r_sql!='') {
	     if(keyField!='') 
	    	 id=jsonrpc.AjaxJson.ajaxExecuteUpdateEx(r_sql,_par,keyField);
	     else
	    	 id=jsonrpc.AjaxJson.execute(r_sql,_par);
     }
     return id;
    //return r_sql;
}
function MYSQL_FormUtil.excecuteInsertOrUpdate(actionMode,tableName,columnDef,keyField,objData) {
	var r_sql='';
	var arr_sql=[];
	console.log('MYSQL_FormUtil.excecuteInsertOrUpdate='+actionMode);
    if (actionMode == 'I'||actionMode=='NEW') {
    	var sql_p1 = [];
    	var sql_p2 = [];
    	if(keyField!='') {
	        //sql_p1.push(keyField);
	        //sql_p2.push(tableName + '_SEQ.nextval');
    	}
    	console.log('columnDef.length='+columnDef.length);
        for (var i = 0; i < columnDef.length; i++) {
            fieldName = columnDef[i][CTL_COLUMN_NAME];
            dataType = columnDef[i][CTL_DATA_TYPE];
            fieldEditMode= columnDef[i][CTL_COLUMN_ATR];
            if (fieldName != keyField && fieldEditMode != 'R') {
            	if(objData[fieldName]==null|| typeof objData[fieldName]=='undefined') {
            		sql_p1.push(fieldName);
            		if (dataType == 'SD') 
            			sql_p2.push('NOW()');
            		else
            			sql_p2.push('NULL');
            	}
            	else {
            		sql_p1.push(fieldName);
            		var fieldValue=objData[fieldName].toString().trim().replace(/\'/g, "''");
            		
            		if (dataType == 'N') {
            			if(fieldValue=='') fieldValue=0;
            			sql_p2.push(fieldValue);
            		}
                    else if (dataType == 'S') sql_p2.push("'" + fieldValue + "'");//STR_TO_DATE('01/5/2013 09:30:17','%d/%m/%Y %h:%i:%s')
                    else if (dataType == 'D') {
                    	if(fieldValue.trim()==""){
                    		sql_p2.push('NOW()');
                    	}
                    	else
                    		sql_p2.push("STR_TO_DATE('" + fieldValue + "','%d/%m/%Y %H:%i:%s')");
                    } 
                    	
                    else if (dataType == 'SD') sql_p2.push('NOW()');
            	}
            }
        }
        arr_sql[0] = sql_p1.join(",");
        arr_sql[1] = sql_p2.join(",");
        r_sql = 'insert into ' + tableName + '(' + arr_sql[0] + ') values(' + arr_sql[1] + ')' ;
    } else if (actionMode == 'U'||actionMode=='EDIT') {
    	sql_p1 = [];
    	var sql_p2 = [];
    	console.log('actionMode='+actionMode+' columnDef.length='+columnDef.length);
    	
    	for (var i = 0; i < columnDef.length; i++) {
            fieldName = columnDef[i][CTL_COLUMN_NAME];
            dataType = columnDef[i][CTL_DATA_TYPE];
            fieldEditMode= columnDef[i][CTL_COLUMN_ATR];
            if (fieldName != keyField && fieldEditMode != 'R') {
            	if(objData[fieldName]==null|| typeof objData[fieldName]=='undefined') {
            		if (dataType == 'SD') 
            			sql_p1.push(fieldName+'=NOW()');
            		else
            			sql_p1.push(fieldName+'=NULL');
            	}
            	else {
            		var fieldValue=objData[fieldName].toString().trim().replace(/\'/g, "''");
            		if (dataType == 'N') {
            			if(fieldValue=='') fieldValue=0;
            			sql_p2.push(fieldValue);
            		}
                    else if (dataType == 'S') fieldValue="'" + fieldValue + "'";
                    else if (dataType == 'D') {
                    	if(fieldValue.trim()==""){
                    		fieldValue="NOW()";
                    	}
                    	else
                    		fieldValue="STR_TO_DATE('" + fieldValue + "','%d/%m/%Y %H:%i:%s')";
                    }
                    else if (dataType == 'SD') fieldValue="NOW()";
            		sql_p1.push(fieldName+"="+fieldValue);
            	}
            }
        }
    	if(sql_p1.length>0) {
	        arr_sql[0] = sql_p1.join(",");
	        arr_sql[1] = keyField + " = " + objData[keyField];
	        r_sql = 'update  ' + tableName + ' set ' + arr_sql[0] + ' where ' + arr_sql[1]  ;
    	}
    	else {
    		r_sql='';
    	}
    }
    console.log('r_sql='+r_sql);
     var id=null;
     
    	 
     
     if(r_sql!='') {
	     if(keyField!='') {
	    	 
	    	 try {
	    		 id=jsonrpc.AjaxJson.ajaxExecuteUpdateEx(r_sql,"");
	    		 //id=jsonrpc.AjaxJson.getOneValue("SELECT LAST_INSERT_ID()");
	    	 }
	         catch(e) {
	        	 alert(e);
	         }
	     }
	     else
	    	 id=jsonrpc.AjaxJson.execute(r_sql);
     }
     
     return id;
    //return r_sql;
}
function buildGridHeader_Type2(grid,hdrInfo) {
	//hdrInfo=field1,field2,fied3@77,112,112;left,left,right;ro,ro,ro;str,str,int
	var ATTRIB_WIDTH=0;
	var ATTRIB_ALIGN=1;
	var ATTRIB_TYPE=2;
	var ATTRIB_SORT=3;
	var ATTRIB_FORMAT=4;
	var ATTRIB_SLIT=5;
	var arInfoAttr=hdrInfo.split('@');
	var hdrAttr=null;
	if(arInfoAttr.length==2) {
		hdrAttr=arInfoAttr[1];
	} 
	var arHdr = arInfoAttr[0].split(";");
	var ar = arHdr[0].split(",");
	var arAlign = [];
	for(var ii = 0;ii<ar.length;ii++) {
		arAlign[ii] = "text-align:left;";
	}
	console.log('arHdr[0]='+arHdr[0]);
	grid.setHeader(arHdr[0],null,arAlign);
	for(var j = 1;j<arHdr.length;j++) {
		grid.attachHeader(arHdr[j],arAlign);
	}
	
	var data = new Array();
	//field1,field2,fied3@77,112,112;left,left,right;ro,ro,ro;str,str,int
	if(arInfoAttr.length==1) {
		var wd=(100 / ar.length)+'';
		for(var ii = 0;ii<ar.length;ii++) {
			data[ATTRIB_WIDTH]=wd;
			data[ATTRIB_ALIGN]="center";
			data[ATTRIB_TYPE]="ro";
			data[ATTRIB_SORT]="str";
		}
	} 
	else {
		data = hdrAttr.split(";");
	}
	
	//var _splitAt=parseInt(data[ATTRIB_SLIT]);
	if(arInfoAttr.length==1) {
		grid.setInitWidthsP(data[ATTRIB_WIDTH]);
	}	
	else {
		grid.setInitWidthsP(data[ATTRIB_WIDTH]);
	}
	grid.setColAlign(data[ATTRIB_ALIGN]);
	grid.setColTypes(data[ATTRIB_TYPE]);
	grid.setColSorting(data[ATTRIB_SORT]);
	grid.setColumnMinWidth(50, 0);
	//grid.attachFooter(ftrInfo);
	
}
*/