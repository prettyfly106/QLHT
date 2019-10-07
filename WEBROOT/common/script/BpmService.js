
/* JSONRpcClient constructor */

function initBpm(_ctx) {
	try {
	    //jsonrpc = new JSONRpcClient("/eStudy/JSON-RPC");
	    //company_id=jsonrpc.RPCCommon.getCompany_id();
	    jsonrpc={};
	    if(_ctx==undefined) _ctx="/hPortal";
	    jsonrpc.AjaxBpm=new BpmService(_ctx+"/BpmService");
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
BpmService =function(_url) {
	if(!_url)
		this.serviceURL="/hPortal/BpmService";
	else
		this.serviceURL=_url;
	console.log("BpmService="+this.serviceURL);
};


BpmService.prototype.syncCall=function(_jsonData) {
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
/*
BpmService.prototype.asyncCall=function(_jsonData,_cb) {
	//alert("begin syncCall()=");
	var _self=this;
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
*/
//public static String startTask(String processName,String vars) {
BpmService.prototype.startTask=function(_processName,_vars) {
	//alert("begin syncCall()=");
	var _jsonData={
		 	"func":"startTask",
		 	"params":[_processName],
			"vars":[_vars]
		 };
	var rt=this.syncCall(_jsonData);
	return rt;
};
//public static String findTask(String _taskKey,String _filter) {
BpmService.prototype.findTask=function(_taskKey,_vars) {
	//alert("begin syncCall()=");
	var _jsonData={
		 	"func":"findTask",
		 	"params":[_taskKey],
		 	"vars":[_vars]
		 };
	var rt=this.syncCall(_jsonData);
	return rt;
};
//public static void completeTask(String _taskId,String _vars) {
BpmService.prototype.completeTask=function(_taskId,_vars) {
	//alert("begin syncCall()=");
	var _jsonData={
		 	"func":"completeTask",
		 	"params":[_taskId],
		 	"vars":[_vars]
		 };
	var rt=this.syncCall(_jsonData);
	return rt;
};


/**/