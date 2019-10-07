

/* JSONRpcClient constructor */
var RSUtil={
		initRest: function (_uuid,_ctx) {
			try {
			    //jsonrpc = new JSONRpcClient("/eStudy/JSON-RPC");
			    //company_id=jsonrpc.RPCCommon.getCompany_id();
			    jsonrpc={};
			    if(!_uuid) _uuid="thu@nnc";
			    if(!_ctx) _ctx="/QLHT";
			    jsonrpc.AjaxJson=new RestService(_uuid,_ctx+"/RestService");
			} 
			catch (e){	
				alert('initRest error '+e.message);
			}
		},
		buildParam:function(_prefix,_val_ar) {
			var _par_ar=[];
			for(var i1=0;i1<_val_ar.length;i1++) {
				_par_ar.push({"name":"["+_prefix+i1+"]","value": _val_ar[i1]});
			}
			return _par_ar;
		},
		setSysParam:function(_par_ar,_param) {
			var v_par=_par_ar;
			if(!v_par) v_par=[];
			for(var i1=0;i1<_param.length;i1++) {
				console.log('_param['+i1+']='+_param[i1]);
				v_par.push({"name":"[S"+i1+"]","value":_param[i1]});
			}
			return v_par;
		},
		addParam:function addParam(_par_ar,_prefix,_val_ar) {
			if(_par_ar==undefined) _par_ar=[];
			for(var i1=0;i1<_val_ar.length;i1++) {
				_par_ar.push({"name":"["+_prefix+i1+"]","value": _val_ar[i1]});
			}
			return _par_ar;
		},
		parseJson: function (jsonData) {
			var rt;
			try {
				rt=JSON.parse(jsonData);
			}
			catch(e) {
				console.log('parseJson error='+e);
			}
			return rt;
		}
};

function initRest(_uuid,_ctx) {
	try {
	    //jsonrpc = new JSONRpcClient("/eStudy/JSON-RPC");
	    //company_id=jsonrpc.RPCCommon.getCompany_id();
	    jsonrpc={};
	    if(!_uuid) _uuid="thu@nnc";
	    if(!_ctx) _ctx="/QLHT";
	    jsonrpc.AjaxJson=new RestService(_uuid,_ctx+"/RestService");
	} 
	catch (e){	
		alert('initRest error '+e.message);
	}
}


RestService =function(_uuid,_url) {
	if(_uuid==undefined) _uuid="thu@nnc";
	this.uuid=_uuid;
	if(!_url)
		this.serviceURL="/QLHT/RestService";
	else
		this.serviceURL=_url;
	console.log("RestService="+this.serviceURL);
};


RestService.prototype.syncCall=function(_jsonData) {
	var _self=this;
	//alert("begin syncCall()=");
	if (!_jsonData.uuid) _jsonData.uuid = this.uuid;
	var _data=JSON.stringify(_jsonData); 
	var rt=$.ajax({
	    url : _self.serviceURL,
	    type: "POST",
	    data : _data,
	    contentType: "text/plain; charset=utf-8",
	    async: false
	}).responseText;
	//alert("syncCall()="+rt);
	//console.log("rt="+rt);
	return rt;
	
};
RestService.prototype.asyncCall=function(_jsonData,_cb) {
	//alert("begin syncCall()=");
	var _self=this;
	if (!_jsonData.uuid) _jsonData.uuid = this.uuid;
	var _data=JSON.stringify(_jsonData); 
	var rt=$.ajax({
	    url :  _self.serviceURL,
	    type: "POST",	    
	    data : _data,
	    contentType: "text/plain; charset=utf-8",
	    success: function(data) {
	    	//called when successful
	    	_cb(data);
	    },
	});
	//alert("syncCall()="+rt);
	return rt;
};

RestService.prototype.setVariable=function(_var_ar) {
	var _jsonData={
		 	"func":"setVariable",
		 	"params":[],
		 	"options":_var_ar
		 };
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
	
};
RestService.prototype.ajaxCALL_SP_I=function(sp_name,sp_param) {
	//alert("begin syncCall()=");
	
	var _param=sp_param;
	var _jsonData={
		 	"func":"ajaxCALL_SP_I",
		 	"params":[sp_name,_param]
		 };
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
	
};
RestService.prototype.ajaxCALL_MYSQL_SP_R=function(sp_name,sp_param,sp_type) {
	//alert("begin syncCall()=");
	var _jsonData={
		 	"func":"ajaxCALL_MYSQL_SP_R",
		 	"params":[sp_name,sp_param,sp_type]
		 };
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return RSUtil.parseJson(rt);
	}
	
};

RestService.prototype.ajaxCALL_SQL_SP_R=function(sp_name,sp_param,sp_type) {
	//alert("begin syncCall()=");
	var _jsonData={
		 	"func":"ajaxCALL_SQL_SP_R",
		 	"params":[sp_name,sp_param,sp_type]
		 };
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return RSUtil.parseJson(rt);
	}
};
RestService.prototype.ajaxCALL_SP_S=function(sp_name,sp_param) {
	//alert("begin syncCall()=");
	var _param=sp_param;
	var _jsonData={
		 	"func":"ajaxCALL_SP_S",
		 	"params":[sp_name,_param]
		 };
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
};
RestService.prototype.ajaxCALL_SP_R=function(sp_name,sp_param,sp_out) {
	//alert("begin syncCall()=");
	var _param=sp_param;
	if(!sp_out) sp_out=[];
	var _jsonData={
		 	"func":"ajaxCALL_SP_R",
		 	"params":[sp_name,_param,sp_out.length]
		 };
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		var ob_rt=RSUtil.parseJson(rt);
		for(var i1=0;i1<sp_out.length;i1++) {
			sp_out[i1]=ob_rt.out_var[i1];
		}
		return ob_rt.result;
	}
};

RestService.prototype.ajaxCALL_SP_O=function(sp_name,sp_param,sp_out) {
	//alert("begin syncCall()=");
	var _param=sp_param;
	if(!sp_out) sp_out=[];
	var _jsonData={
		 	"func":"ajaxCALL_SP_O",
		 	"params":[sp_name,_param,sp_out.length]
		 };
	
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		//console.log(sp_name+'.rt='+rt);
		var ob_rt=RSUtil.parseJson(rt);
		//console.log(sp_name+'.ob_rt.out_var='+ob_rt.out_var.length);
		for(var i1=0;i1<sp_out.length;i1++) {
			sp_out[i1]=ob_rt.out_var[i1];
		}
		
		return ob_rt.result;
	}
};

RestService.prototype.ajaxGetComboTag=function(_sql,_disp,_sel) {
	//alert("begin syncCall()=");
	var _jsonData={
		 	"func":"ajaxGetComboTag",
		 	"params":[_sql,_disp,_sel]
		 };
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
};
RestService.prototype.ajaxGetRowsByValue=function(_table,_field,_value) {
	//alert("begin syncCall()=");
	var _jsonData={
		 	"func":"ajaxGetRowsByValue",
		 	"params":[_table,_field,_value]
		 };
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
};

RestService.prototype.dbExecuteQuery=function(db_name,sql,sqlpar) {
	//alert("begin syncCall()=");
	var _jsonData;
	//alert('RestService.prototype.execute arguments.length='+arguments.length);
	var arg_len=arguments.length;
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		arg_len=arg_len-1;
	}
	_jsonData={
		 	"func":"ajaxExecuteQuery",
		 	"params":[arguments[0],arguments[1]],
		 	"options":arguments[2]
	};
	
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return RSUtil.parseJson(rt);
	}
	
};

RestService.prototype.ajaxExecuteQuery=function(sql,sqlpar) {
	//alert("begin syncCall()=");
	var _jsonData;
	//alert('RestService.prototype.execute arguments.length='+arguments.length);
	var arg_len=arguments.length;
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		arg_len=arg_len-1;
	}
	_jsonData={
		 	"func":"ajaxExecuteQuery",
		 	"params":["",arguments[0]],
		 	"options":arguments[1]
	};
	
	
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return RSUtil.parseJson(rt);
	}
	
};

RestService.prototype.dbExecuteQueryO=function(db_name,sql,sqlpar) {
	//alert("begin syncCall()=");
	var _jsonData;
	//alert('RestService.prototype.execute arguments.length='+arguments.length);
	var arg_len=arguments.length;
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		arg_len=arg_len-1;
	}
	_jsonData={
		 	"func":"ajaxExecuteQueryO",
		 	"params":[arguments[0],arguments[1]],
		 	"options":arguments[2]
	};
	//console.log('_jsonData='+JSON.stringify(_jsonData));
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
	
};
RestService.prototype.ajaxExecuteQueryO=function(sql,sqlpar) {
	//alert("begin syncCall()=");
	var _jsonData;
	//alert('RestService.prototype.execute arguments.length='+arguments.length);
	var arg_len=arguments.length;
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		arg_len=arg_len-1;
	}
	_jsonData={
		 	"func":"ajaxExecuteQueryO",
		 	"params":["",arguments[0]],
		 	"options":arguments[1]
	};
	//console.log('_jsonData='+JSON.stringify(_jsonData));
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
	
};
RestService.prototype.dbFirstRowO=function(db_name,sql,sqlpar) {
	//alert("begin syncCall()=");
	var _jsonData;
	//alert('RestService.prototype.execute arguments.length='+arguments.length);
	var arg_len=arguments.length;
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		arg_len=arg_len-1;
	}
	_jsonData={
		 	"func":"getFirstRowO",
		 	"params":[arguments[0],arguments[1]],
		 	"options":arguments[2]
	};
	
	//console.log('_jsonData='+JSON.stringify(_jsonData));
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		console.log('getFirstRowO.rt='+rt);
		return RSUtil.parseJson(rt);
	}
	
};

RestService.prototype.getFirstRowO=function(sql,sqlpar) {
	//alert("begin syncCall()=");
	var _jsonData;
	//alert('RestService.prototype.execute arguments.length='+arguments.length);
	var arg_len=arguments.length;
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		arg_len=arg_len-1;
	}
	_jsonData={
		 	"func":"getFirstRowO",
		 	"params":[arguments[0],arguments[1]],
		 	"options":arguments[2]
	};
	
	//console.log('_jsonData='+JSON.stringify(_jsonData));
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		console.log('getFirstRowO.rt='+rt);
		return RSUtil.parseJson(rt);
	}
	
};
RestService.prototype.dbOneValue=function(db_name,sql,sqlpar) {
	//alert("begin syncCall()=");
	
	var _jsonData;
	//alert('RestService.prototype.execute arguments.length='+arguments.length);
	_jsonData={
		 	"func":"getOneValue",
		 	"params":[arguments[0],arguments[1]],
		 	"options":arguments[2]
	};
	var rt=this.syncCall(_jsonData);
	return rt;
};

RestService.prototype.getOneValue=function(db_name,sql) {
	//alert("begin syncCall()=");
	
	var _jsonData;
	//alert('RestService.prototype.execute arguments.length='+arguments.length);
	_jsonData={
		 	"func":"getOneValue",
		 	"params":["",arguments[0]],
		 	"options":arguments[1]
	};
	var rt=this.syncCall(_jsonData);
	return rt;
};
RestService.prototype.dbExecute=function(db_name,sql) {
	//alert("begin syncCall()=");

	var _jsonData;
	var arg_len=arguments.length;
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		arg_len=arg_len-1;
	}
	_jsonData={
		 	"func":"execute",
		 	"params":[arguments[0],arguments[1]],
		 	"options":arguments[2]
	};
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
};
RestService.prototype.execute=function(sql,sql_par) {
	//alert("begin syncCall()=");

	var _jsonData;
	var arg_len=arguments.length;
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		arg_len=arg_len-1;
	}
	_jsonData={
		 	"func":"execute",
		 	"params":["",arguments[0]],
		 	"options":arguments[1]
	};
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
};
RestService.prototype.dbExecuteUpdateEx=function(db_name,sql,sql_par,retField) {
	//alert("begin syncCall()=");
	var _jsonData;
	var _jsonData;
	var arg_len=arguments.length;
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		arg_len=arg_len-1;
	}
	_jsonData={
		 	"func":"ajaxExecuteUpdateEx",
		 	"uuid":this.uuid,
		 	"params":[arguments[0],arguments[1],arguments[3]],
		 	"options":arguments[2]
	};
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
};
RestService.prototype.ajaxExecuteUpdateEx=function(sql,sql_par,retField) {
	//alert("begin syncCall()=");
	var _jsonData;
	var _jsonData;
	var arg_len=arguments.length;
	var last_agr=arguments[arguments.length-1];
	if(typeof last_agr == "function") {
		arg_len=arg_len-1;
	}
	_jsonData={
		 	"func":"ajaxExecuteUpdateEx",
		 	"uuid":this.uuid,
		 	"params":["",arguments[0],arguments[2]],
		 	"options":arguments[1]
	};
	if(typeof last_agr == "function") {
		this.asyncCall(_jsonData,last_agr);
	}
	else {
		var rt=this.syncCall(_jsonData);
		return rt;
	}
};

/**/