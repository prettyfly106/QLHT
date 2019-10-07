i18n_ims= i18n_ims || {};
i18n_ims.L007={
    'vn': {        
        'title' : 'QUẢN LÝ DANH MỤC LOẠI MÁY CHỦ BẢO MẬT',        
        'code' : 'Mã loại máy chủ',
        'name' : 'Tên loại máy chủ'        
	},
	'en': {	
        'title' : 'STATION TYPE MANAGEMENT',        
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
			 "_tableName":"LST_STATIONTYPE",
			 "_keyField":"STATIONTYPE_ID",
			 "_gridHeader":"ID,STATIONTYPE_ID,0,0,t,l;Mã loại máy chủ,STATIONTYPE_CODE,50,0,f,l;Tên loại máy chủ,STATIONTYPE_NAME,150,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"STATIONTYPE.GR1",//L007.G01
			 "_comboList":[
						],
			"_data": [  			            
			            ["S","txt","STATIONTYPE_CODE","E"],
			            ["S","txt","STATIONTYPE_NAME","E"]
			            ],
			 "_formSQL": "STATIONTYPE.FR1",//L007.FR1
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["STATIONTYPE.DL1"],//L007.D01
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "STATIONTYPE_NAME","display" : "Tên loại nhà trạm","rules" : "trim_required"},
				{"name" : "STATIONTYPE_CODE","display" : "Mã loại nhà trạm","rules" : "trim_required"}
				],
			 "_template":"L007"
			};
_opts.en={
		 "_param":[],//session_par,
		  "_filter": [
	                ["cboMA_TINH", "L007.F01", "", "Y","Y"],
	                ["cboMA_HUYEN", "L007.F02", "cboMA_TINH", "Y","Y"]
	            ],
	         "_mode":"edit",
			 "_tableName":"LST_STATIONTYPE",
			 "_keyField":"STATIONTYPE_ID",
			 "_gridHeader":"ID,STATIONTYPE_ID,0,0,t,l;Mã loại máy chủ,STATIONTYPE_CODE,50,0,f,l;Tên loại máy chủ,STATIONTYPE_NAME,150,0,f,l;Nhóm nhà trạm,STATIONTYPE_GROUP_NAME,80,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"L007.G01",
			 "_comboList":[
						],
			"_data": [			           
			            ["N","cbo","STATIONTYPE_GROUP_ID","E"],			            
			            ["S","txt","STATIONTYPE_CODE","E"],
			            ["S","txt","STATIONTYPE_NAME","E"]
			            ],
			 "_formSQL": "L007.FR1",
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["L007.D01"],
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "STATIONTYPE_NAME","display" : "Tên loại nhà trạm","rules" : "trim_required"},
				{"name" : "STATIONTYPE_CODE","display" : "Mã loại nhà trạm","rules" : "trim_required"}
				],
			 "_template":"L007"
			};