i18n_ims= i18n_ims || {};
i18n_ims.L009={
    'vn': {        
        'title' : 'QUẢN LÝ DANH MỤC LOẠI CỐNG/BỂ',        
        'code' : 'Mã loại cống/bể',
        'name' : 'Tên loại cống/bể'        
	},
	'en': {	
        'title' : 'MANHOLE TYPE MANAGEMENT',        
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
			 "_tableName":"LST_MANHOLE_TYPE",
			 "_keyField":"MANHOLE_TYPE_ID",
			 "_gridHeader":"ID,MANHOLE_TYPE_ID,0,0,t,l;Mã loại cống/bể,MANHOLE_TYPE_CODE,50,0,f,l;Tên loại cống/bể,MANHOLE_TYPE_NAME,150,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"MANHOLE_TYPE.GR1",//L009.G01
			 "_comboList":[
						],
			"_data": [  			            
			            ["S","txt","MANHOLE_TYPE_CODE","E"],
			            ["S","txt","MANHOLE_TYPE_NAME","E"]
			            ],
			 "_formSQL": "MANHOLE_TYPE.FR1",//L009.FR1
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["MANHOLE_TYPE.DL1"],//L009.D01
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "MANHOLE_TYPE_NAME","display" : "Tên loại cống/bể","rules" : "trim_required"},
				{"name" : "MANHOLE_TYPE_CODE","display" : "Mã loại cống/bể","rules" : "trim_required"}
				],
			 "_template":"L009"
			};
_opts.en={
		 "_param":[],//session_par,
		  "_filter": [
	                ["cboMA_TINH", "L009.F01", "", "Y","Y"],
	                ["cboMA_HUYEN", "L009.F02", "cboMA_TINH", "Y","Y"]
	            ],
	         "_mode":"edit",
			 "_tableName":"LST_MANHOLE_TYPE",
			 "_keyField":"MANHOLE_TYPE_ID",
			 "_gridHeader":"ID,MANHOLE_TYPE_ID,0,0,t,l;Mã loại cống/bể,MANHOLE_TYPE_CODE,50,0,f,l;Tên loại cống/bể,MANHOLE_TYPE_NAME,150,0,f,l;Nhóm cống/bể,MANHOLE_TYPE_GROUP_NAME,80,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"L009.G01",
			 "_comboList":[
						],
			"_data": [			           
			            ["N","cbo","MANHOLE_TYPE_GROUP_ID","E"],			            
			            ["S","txt","MANHOLE_TYPE_CODE","E"],
			            ["S","txt","MANHOLE_TYPE_NAME","E"]
			            ],
			 "_formSQL": "L009.FR1",
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["L009.D01"],
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "MANHOLE_TYPE_NAME","display" : "Tên loại cống/bể","rules" : "trim_required"},
				{"name" : "MANHOLE_TYPE_CODE","display" : "Mã loại cống/bể","rules" : "trim_required"}
				],
			 "_template":"L009"
			};