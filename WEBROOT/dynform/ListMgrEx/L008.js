i18n_ims= i18n_ims || {};
i18n_ims.L008={
    'vn': {        
        'title' : 'QUẢN LÝ DANH MỤC LOẠI CỘT',        
        'code' : 'Mã loại cột',
        'name' : 'Tên loại cột'        
	},
	'en': {	
        'title' : 'POLE TYPE MANAGEMENT',        
        'code' : 'Cable type code',
        'name' : 'Cable type name'        
	}
};

var _opts={};
_opts.vn={
		  "_param":[],//session_par,
		  "_filter": [	                
	            ],
	         "_mode":"edit",
			 "_tableName":"LST_POLETYPE",
			 "_keyField":"POLETYPE_ID",
			 "_gridHeader":"ID,POLETYPE_ID,0,0,t,l;Mã loại cột,POLETYPE_CODE,50,0,f,l;Tên loại cột,POLETYPE_NAME,150,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"POLETYPE.GR1",//L008.G01
			 "_comboList":[
						],
			"_data": [  			            
			            ["S","txt","POLETYPE_CODE","E"],
			            ["S","txt","POLETYPE_NAME","E"]
			            ],
			 "_formSQL": "POLETYPE.FR1",//L008.FR1
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["POLETYPE.DL1"],//L008.D01
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "POLETYPE_NAME","display" : "Tên loại cột","rules" : "trim_required"},
				{"name" : "POLETYPE_CODE","display" : "Mã loại cột","rules" : "trim_required"}
				],
			 "_template":"L008"
			};
_opts.en={
		 "_param":[],//session_par,
		  "_filter": [
	                ["cboMA_TINH", "L008.F01", "", "Y","Y"],
	                ["cboMA_HUYEN", "L008.F02", "cboMA_TINH", "Y","Y"]
	            ],
	         "_mode":"edit",
			 "_tableName":"LST_POLETYPE",
			 "_keyField":"POLETYPE_ID",
			 "_gridHeader":"ID,POLETYPE_ID,0,0,t,l;Mã loại cột,POLETYPE_CODE,50,0,f,l;Tên loại cột,POLETYPE_NAME,150,0,f,l;Nhóm cột,POLETYPE_GROUP_NAME,80,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"L008.G01",
			 "_comboList":[
						],
			"_data": [			           
			            ["N","cbo","POLETYPE_GROUP_ID","E"],			            
			            ["S","txt","POLETYPE_CODE","E"],
			            ["S","txt","POLETYPE_NAME","E"]
			            ],
			 "_formSQL": "L008.FR1",
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["L008.D01"],
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "POLETYPE_NAME","display" : "Tên loại cột","rules" : "trim_required"},
				{"name" : "POLETYPE_CODE","display" : "Mã loại cột","rules" : "trim_required"}
				],
			 "_template":"L008"
			};