i18n_ims= i18n_ims || {};
i18n_ims.L001={
    'vn': {        
        'title' : 'QUẢN LÝ DANH MỤC LOẠI CÁP',
        'group' : 'Nhóm loại cáp',
        'code' : 'Mã loại cáp',
        'name' : 'Tên loại cáp'        
	},
	'en': {	
        'title' : 'CABLE TYPE MANAGEMENT',
        'group' : 'Cable type group',
        'code' : 'Cable type code',
        'name' : 'Cable type name'        
	}
};

var _opts={};
_opts.vn={
		  "_param":[],//session_par,
		  "_filter": [
	                ["cboCABLETYPE_GROUP_ID", "LST.CABLETYPE_GROUP", "", "Y","Y"]
	            ],
	         "_mode":"edit",
			 "_tableName":"LST_CABLETYPE",
			 "_keyField":"CABLETYPE_ID",
			 "_gridHeader":"ID,CABLETYPE_ID,0,0,t,l;Mã loại cáp,CABLETYPE_CODE,50,0,f,l;Tên loại cáp,CABLETYPE_NAME,150,0,f,l;Nhóm cáp,CABLETYPE_GROUP_NAME,80,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"CABLETYPE.GR1",
			 "_comboList":[
						],
			"_data": [			           
			            ["N","cbo","CABLETYPE_GROUP_ID","E"],			            
			            ["S","txt","CABLETYPE_CODE","E"],
			            ["S","txt","CABLETYPE_NAME","E"]
			            ],
			 "_formSQL": "CABLETYPE.FR1",
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["CABLETYPE.DL1"],
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "CABLETYPE_NAME","display" : "Tên loại cáp","rules" : "trim_required"},
				{"name" : "CABLETYPE_CODE","display" : "Mã loại cáp","rules" : "trim_required"}
				],
			 "_template":"L001"
			};
_opts.en={
		  "_param":[],//session_par,
		  "_filter": [
	                ["cboCABLETYPE_GROUP_ID", "LST.CABLETYPE_GROUP", "", "Y","Y"]
	            ],
	         "_mode":"edit",
			 "_tableName":"LST_CABLETYPE",
			 "_keyField":"CABLETYPE_ID",
			 "_gridHeader":"ID,CABLETYPE_ID,0,0,t,l;Mã loại cáp,CABLETYPE_CODE,50,0,f,l;Tên loại cáp,CABLETYPE_NAME,150,0,f,l;Nhóm cáp,CABLETYPE_GROUP_NAME,80,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"CABLETYPE.GR1",
			 "_comboList":[
						],
			"_data": [			           
			            ["N","cbo","CABLETYPE_GROUP_ID","E"],			            
			            ["S","txt","CABLETYPE_CODE","E"],
			            ["S","txt","CABLETYPE_NAME","E"]
			            ],
			 "_formSQL": "CABLETYPE.FR1",
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["CABLETYPE.DL1"],
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "CABLETYPE_NAME","display" : "Tên loại cáp","rules" : "trim_required"},
				{"name" : "CABLETYPE_CODE","display" : "Mã loại cáp","rules" : "trim_required"}
				],
			 "_template":"L001"
			};