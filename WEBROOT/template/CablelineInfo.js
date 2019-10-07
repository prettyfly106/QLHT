i18n_ims= i18n_ims || {};
i18n_ims.CablelineInfo={
    'vn': {        
        'title' : 'THÔNG TIN CÁP',
        'type_group' : 'Nhóm loại cáp',
        'type' : 'Loại cáp',        
        'code' : 'Mã cáp',        
        'capacity' : 'Dung lượng',       
        'distance' : 'Khoảng cách',
        'description' : 'Mô tả'
	},
	'en': {        
		'title' : 'THÔNG TIN CỘT',
        'type_group' : 'Nhóm loại cáp',
        'type' : 'Loại cáp',        
        'code' : 'Mã cáp',        
        'capacity' : 'Dung lượng',
        'distance' : 'Khoảng cách',
        'description' : 'Mô tả'
	}
};

var _opts = _opts || {};
_opts["CablelineInfo"] = {};
_opts["CablelineInfo"].vn={
		  "_container" : "mainInfo",
		  "_param":[],//session_par,
		  "_filter": [	                
	            ],
	         "_mode":"edit",
			 "_tableName":"CABLELINES",
			 "_keyField":"CABLELINE_ID",
			 "_markerList" : "cablelines",
			 "_getListFunc" : "getCablelines",
			 "_comboList":[
			               	["cboCABLETYPE_GROUP_ID", "SELECT CABLETYPE_GROUP_ID, CABLETYPE_GROUP_NAME FROM LST_CABLETYPE_GROUP","","",""],//CABLELINE.C01
			               	["cboCABLETYPE_ID", "SELECT CABLETYPE_ID, CABLETYPE_NAME FROM LST_CABLETYPE WHERE CABLETYPE_GROUP_ID=[P0]","cboCABLETYPE_GROUP_ID","",""]//CABLELINE.C02
						],
			"_data": [
			          	["N","txt","CABLELINE_ID","E"],
			          	["N","cbo","CABLETYPE_GROUP_ID","E"],
			            ["N","cbo","CABLETYPE_ID","E"],			            
			            ["S","txt","CABLELINE_CODE","E"],			            			            
			            ["S","txt","DESCRIPTION","E"],
			            ["S","cbo","CAPACITY","ASC"],
			            ["N","txt","DISTANCE","E"],
			            ],			 
			 "_formSQL": "SELECT * FROM CABLELINES WHERE CABLELINE_ID = [0]",//CABLELINE.FR1
			 "_insertSQL":[],
			 "_deleteSQL":[],//"CABLELINE.D01"			 
			 _onSave:function(obj) {				 
				 var rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call SAVE_CABLELINE(?2S,?3S,?4L,?5L,?6S,?7L,?8L)}",[obj.CABLELINE_ID, obj.CABLELINE_CODE, obj.CAPACITY,obj.DISTANCE,obj.DESCRIPTION, obj.CABLETYPE_ID, obj.CABLETYPE_GROUP_ID].join('$'));
				 
				 if (rt>0) {
					 $("#cboCAPACITY").change();
					 $.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});
				 }
				 else {
					 $.toaster({ title : $.i18n("system"), priority : 'warning', message : $.i18n("save_unsuccess"), settings : { timeout: 3000}});
				 }
				 return rt;
			 },
			 _onLoad : function() {				 
				 $.each(cablecolors,function(i,v) {
					 $('#cboCAPACITY').append($("<option></option>").attr("value",v.CAPACITY).text(v.NOTE ? v.NOTE : v.CAPACITY)); 
				 });
				 $('#cboCAPACITY').on("change",function(e) {
					 current.capacity=$(this).val();
					 current.setOptions({strokeColor:cablecolors[current.capacity].COLOR});					 
				 });
				 var _gridHeader = "ID,NODE_ID,0,0,t,l;Loại Node,NODE_TYPE,80,0,f,l;Vĩ độ,LATITUDE,100,0,f,r;Kinh độ,LONGITUDE,100,0,f,l;Khoảng cách (m),DISTANCE,100,0,ns,r";
				 gridInfo=GridUtil.init("grdCableline","450","100%",$.i18n("list"),false,_gridHeader);
				 GridUtil.setGridParam("grdCableline",{
					 rowNum:5,rowList: [5,10]
				 });
				 home.bindCableGrid();
			 },			 
			 _onUpdate : function(cableline_id) {				 
			 },	
			 _onInsert : function(obj) {			
			 },	
			 _onDelete : function(object_id) {
				 return jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call DELETE_CABLELINE(?2L)}",object_id);
			 },	
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "txtCABLELINE_CODE","display" : "Mã cáp","rules" : "trim_required", "checkExist":"N"},				
				{"name" : "txtCAPACITY","display" : "Dung lượng","rules" : "trim_required"},
				{"name" : "txtDISTANCE","display" : "Khoảng cách","rules" : "trim_required"}
				],
			 "_template":"CablelineInfo",
			};
_opts["CablelineInfo"].en={
		 "_param":[],//session_par,
		  "_filter": [
	                ["cboMA_TINH", "L001.F01", "", "Y","Y"],
	                ["cboMA_HUYEN", "L001.F02", "cboMA_TINH", "Y","Y"]
	            ],
	         "_mode":"view",
			 "_tableName":"LST_CABLETYPE",
			 "_keyField":"CABLETYPE_ID",
			 "_parentField":"CABLELINE_ID",
			 "_gridHeader":"ID,CABLETYPE_ID,0,0,t,l;Mã loại cáp,CABLETYPE_CODE,800,0,f,l;Tên loại cáp,CABLETYPE_NAME,150,0,f,l;Nhóm cáp,CABLETYPE_GROUP_NAME,80,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"L001.G01",
			 "_comboList":[
			               
						],
			"_data": [			           
			            ["N","cbo","CABLETYPE_GROUP_ID","E"],			            
			            ["S","txt","CABLETYPE_CODE","E"],
			            ["S","txt","CABLETYPE_NAME","E"]
			            ],
			 "_formSQL": "L001.FR1",
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["L001.D01"],
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "CABLETYPE_NAME","display" : "Tên loại cáp","rules" : "trim_required"},
				{"name" : "CABLETYPE_CODE","display" : "Mã loại cáp","rules" : "trim_required"}
				],
			 "_template":"CablelineInfo"
			};
