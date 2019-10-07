i18n_ims= i18n_ims || {};
i18n_ims.L010={
    'vn': {        
        'title' : 'QUẢN LÝ DANH MỤC LOẠI THIẾT BỊ',
        'group' : 'Nhóm loại thiết bị',
        'code' : 'Mã loại thiết bị',
        'name' : 'Tên loại thiết bị'        
	},
	'en': {	
        'title' : 'DEVICE TYPE MANAGEMENT',
        'group' : 'Device type group',
        'code' : 'Device type code',
        'name' : 'Device type name'        
	}
};

var _opts={};
_opts.vn={
		  "_param":[],//session_par,
		  "_filter": [
	                ["cboDEVICETYPE_GROUP_ID", "LST.DEVICETYPE_GROUP", "", "Y","Y"]//L010.F01
	            ],
	         "_mode":"edit",
			 "_tableName":"LST_DEVICETYPE",
			 "_keyField":"DEVICETYPE_ID",
			 "_gridHeader":"ID,DEVICETYPE_ID,0,0,t,l;Mã loại thiết bị,DEVICETYPE_CODE,50,0,f,l;Tên loại thiết bị,DEVICETYPE_NAME,150,0,f,l;Nhóm thiết bị,DEVICETYPE_GROUP_NAME,80,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"DEVICETYPE.GR1",//L010.G01
			 "_comboList":[
						],
			"_data": [			           
			            ["N","cbo","DEVICETYPE_GROUP_ID","E"],			            
			            ["S","txt","DEVICETYPE_CODE","E"],
			            ["S","txt","DEVICETYPE_NAME","E"]
			            ],
			 "_formSQL": "DEVICETYPE.FR1",//L010.FR1
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["DEVICETYPE.DL1"],//L010.D01
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "DEVICETYPE_NAME","display" : "Tên loại thiết bị","rules" : "trim_required"},
				{"name" : "DEVICETYPE_CODE","display" : "Mã loại thiết bị","rules" : "trim_required"}
				],
			 "_template":"L010"
			};
_opts.en={
		 "_param":[],//session_par,
		  "_filter": [
	                ["cboMA_TINH", "L010.F01", "", "Y","Y"],
	                ["cboMA_HUYEN", "L010.F02", "cboMA_TINH", "Y","Y"]
	            ],
	         "_mode":"edit",
			 "_tableName":"LST_DEVICETYPE",
			 "_keyField":"DEVICETYPE_ID",
			 "_gridHeader":"ID,DEVICETYPE_ID,0,0,t,l;Mã loại thiết bị,DEVICETYPE_CODE,50,0,f,l;Tên loại thiết bị,DEVICETYPE_NAME,150,0,f,l;Nhóm thiết bị,DEVICETYPE_GROUP_NAME,80,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"L010.G01",
			 "_comboList":[
						],
			"_data": [			           
			            ["N","cbo","DEVICETYPE_GROUP_ID","E"],			            
			            ["S","txt","DEVICETYPE_CODE","E"],
			            ["S","txt","DEVICETYPE_NAME","E"]
			            ],
			 "_formSQL": "L010.FR1",
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["L010.D01"],
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "DEVICETYPE_NAME","display" : "Tên loại thiết bị","rules" : "trim_required"},
				{"name" : "DEVICETYPE_CODE","display" : "Mã loại thiết bị","rules" : "trim_required"}
				],
			 "_template":"L010"
			};