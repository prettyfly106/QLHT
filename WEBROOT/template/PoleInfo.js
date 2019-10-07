i18n_ims= i18n_ims || {};
i18n_ims.PoleInfo={
    'vn': {        
        'title' : 'THÔNG TIN CỘT',
        'type' : 'Loại cột',
        'owner' : 'Đơn vị quản lý',
        'code' : 'Mã cột',
        'name' : 'Tên cột',
        'address' : 'Địa chỉ',       
        'note' : 'Ghi chú',
        'start_year' : 'Năm sử dụng',        
        'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường xã',
        'lat' : 'Vĩ độ',
        'lng' : 'Kinh độ'
	},
	'en': {        
        'title' : 'THÔNG TIN NHÀ TRẠM',
        'type' : 'Loại cột',
        'owner' : 'Đơn vị quản lý',
        'code' : 'Mã cột',
        'name' : 'Tên cột',
        'address' : 'Địa chỉ',
        'phone' : 'ĐT liên hệ',
        'note' : 'Ghi chú',
        'start_year' : 'Năm sử dụng',
        'locality' : 'Thuộc vùng',
        'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường xã',
        'lat' : 'Vĩ độ',
        'lng' : 'Kinh độ',
        'main_info': 'Thông tin chung',
        'device_info': 'Danh sách Thiết bị',
        'odf_info': 'Danh sách ODF',
	}
};

var _opts = _opts || {};
_opts["PoleInfo"] = {};
_opts["PoleInfo"].vn={
		  "_container" : "mainInfo",
		  "_param":[],//session_par,
		  "_filter": [	                
	            ],
	         "_mode":"edit",
			 "_tableName":"POLES",
			 "_keyField":"POLE_ID",
			 "_markerList" : "poles",
			 "_getListFunc" : "getPoles",
			 "_comboList":[
			               	["cboPOLETYPE_ID", "SELECT POLETYPE_ID, POLETYPE_NAME FROM LST_POLETYPE","","",""],//POLE.C01
			               	["cboOWNER_ID", "SELECT OWNER_ID, OWNER_NAME FROM LST_OWNER","","",""],//POLE.C02			               	
			               	["cboCITY_CODE", "SELECT CITY_CODE, CITY_NAME FROM LST_CITY","","",""],//POLE.C03			               	
			               	["cboDISTRICT_CODE", "SELECT DISTRICT_CODE, DISTRICT_NAME FROM LST_DISTRICT WHERE CITY_CODE = [P0]","cboCITY_CODE","",""],//POLE.C04
			               	["cboWARDS_CODE", "SELECT WARDS_CODE, WARDS_NAME FROM LST_WARDS WHERE DISTRICT_CODE = [P0]","cboDISTRICT_CODE","",""]//POLE.C05
						],
			"_data": [
			          	["N","txt","POLE_ID","E"],
			            ["N","cbo","POLETYPE_ID","E"],
			            ["N","cbo","OWNER_ID","E"],
			            ["S","txt","POLE_CODE","E"],
			            ["S","txt","POLE_NAME","E"],
			            ["S","txt","ADDRESS","E"],			            
			            ["S","txt","NOTE","E"],	
			            ["S","cbo","CITY_CODE","E"],
			            ["S","cbo","DISTRICT_CODE","E"],
			            ["S","cbo","WARDS_CODE","E"],
			            ["S","txt","LATITUDE","E"],
			            ["S","txt","LONGITUDE","E"],
			            ],
			 "_formSQL": "SELECT * FROM POLES WHERE POLE_ID = [0]",//POLE.FR1
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":[],//"POLE.D01"
			 _onUpdate : function() {
				 if (!current.info) current.info= {};
				 current.info.name = $('#txtPOLE_NAME').val();
				 current.info.code = $('#txtPOLE_CODE').val();
				 current.info.address = $('#txtADDRESS').val();
			 },	
			 _onInsert : function() {
				 if (!current.info) current.info= {};
				 current.info.name = $('#txtPOLE_NAME').val();
				 current.info.code = $('#txtPOLE_CODE').val();
				 current.info.address = $('#txtADDRESS').val();
			 },	
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "txtPOLE_CODE","display" : "Mã cột","rules" : "trim_required", "checkExist":"N"},
				{"name" : "txtPOLE_NAME","display" : "Tên cột","rules" : "trim_required"},
				{"name" : "txtADDRESS","display" : "Địa chỉ cột","rules" : "trim_required"}
				],
			 "_template":"PoleInfo",
			};
_opts["PoleInfo"].en={
		 "_param":[],//session_par,
		  "_filter": [
	                ["cboMA_TINH", "L001.F01", "", "Y","Y"],
	                ["cboMA_HUYEN", "L001.F02", "cboMA_TINH", "Y","Y"]
	            ],
	         "_mode":"view",
			 "_tableName":"LST_CABLETYPE",
			 "_keyField":"CABLETYPE_ID",
			 "_parentField":"POLE_ID",
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
			 "_template":"PoleInfo"
			};
