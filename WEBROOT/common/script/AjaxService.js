
/* JSONRpcClient constructor */

function initAjax(_ctx) {
	try {
	    //jsonrpc = new JSONRpcClient("/eStudy/JSON-RPC");
	    //company_id=jsonrpc.RPCCommon.getCompany_id();
		ajaxSvc={};
	    if(_ctx==undefined) _ctx="/hPortal";
	    ajaxSvc=new AjaxService(_ctx+"/AjaxService");
	} 
	catch (e){
		alert('initBpm error '+e.message);
	}
}
function parseJson(jsonData) {
	var rt;
	try {
		rt=JSON.parse(jsonData);
	}
	catch(e) {
		console.log('parseJson error='+e);
	}
	return rt;
}
AjaxService =function(_url) {
	if(!_url)
		this.serviceURL="/hPortal/AjaxService";
	else
		this.serviceURL=_url;
	console.log("AjaxService="+this.serviceURL);
};


AjaxService.prototype.syncCall=function(_jsonData) {
	var _self=this;
	//alert("begin syncCall()=");
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

//public static String startTask(String processName,String vars) {
AjaxService.prototype.register=function(_class) {
	//alert("begin syncCall()=");
	var _jsonData={
			"class":"ActUtil",
		 	"func":"register",
		 	"params":[_class]
		 };
	var rt=this.syncCall(_jsonData);
	console.log('register.rt='+rt);
	this.addMethods(_class,rt);
	//register.rt=[{"return":"java.lang.String","method":"findTask","params":["java.lang.String","java.lang.String"]},{"return":"void","method":"completeTask","params":["java.lang.String","java.lang.String"]},{"return":"java.lang.String","method":"startTask","params":["java.lang.String","java.lang.String"]}]
	return rt;
};
AjaxService.prototype.addMethods =
	function AjaxService_addMethods(_class,methods)
	{
	    var method_ar=JSON.parse(methods);
	    var obj = this;
	    if(obj[_class]) {
	    	obj = obj[_class];
	    } else {
	    	obj[_class]  = new Object();
	    	obj = obj[_class];
	    }
	    
		for(var i=0; i<method_ar.length; i++) {
			var mth=method_ar[i];
			var method = this.createMethod(_class,mth.method);
			obj[mth.method] = method;
		}
	};
	AjaxService.prototype.createMethod =
		function AjaxService_createMethod(className,methodName)
		{
		    var fn=function()
		    {
				var args = [];
				for(var i=0;i<arguments.length;i++) {
					console.log('arguments['+i+']='+arguments[i]);
					args.push(arguments[i]);
				}
				var obj = {};
				obj.class=fn.className;
				obj.func = fn.methodName;
			    obj.params = args;
			    return fn.client.syncCall.call(fn.client,obj);
		    };
		    fn.client = this;
		    fn.className = className;
		    fn.methodName = methodName;
		    return fn;
		};
/**/