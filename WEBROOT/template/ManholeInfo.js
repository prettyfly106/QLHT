i18n_ims= i18n_ims || {};
i18n_ims.ManholeInfo={
    'vn': {        
        'title' : 'THÔNG TIN CỐNG, BỂ',
        'type' : 'Loại cống, bể',
        'owner' : 'Đơn vị quản lý',
        'code' : 'Mã cống, bể',
        'name' : 'Tên cống, bể',
        'capacity' : 'Dung lượng',
        'distance' : 'Khoảng cách',
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
        'capacity' : 'Dung lượng',
        'distance' : 'Khoảng cách',
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
_opts["ManholeInfo"] = {};
_opts["ManholeInfo"].vn={
		  "_container" : "mainInfo",
		  "_param":[],//session_par,
		  "_filter": [	                
	            ],
	         "_mode":"edit",
			 "_tableName":"MANHOLES",
			 "_keyField":"MANHOLE_ID",
			 "_markerList" : "manholes",
			 "_getListFunc" : "getManholes",
			 "_comboList":[
			               	["cboMANHOLE_TYPE_ID", "SELECT MANHOLE_TYPE_ID, MANHOLE_TYPE_NAME FROM LST_MANHOLE_TYPE","","",""],//MANHOLE.C01
			               	["cboOWNER_ID", "SELECT OWNER_ID, OWNER_NAME FROM LST_OWNER","","",""],//MANHOLE.C02			               	
			               	["cboCITY_CODE", "SELECT CITY_CODE, CITY_NAME FROM LST_CITY","","",""],//MANHOLE.C03			               	
			               	["cboDISTRICT_CODE", "SELECT DISTRICT_CODE, DISTRICT_NAME FROM LST_DISTRICT WHERE CITY_CODE = [P0]","cboCITY_CODE","",""],//MANHOLE.C04
			               	["cboWARDS_CODE", "SELECT WARDS_CODE, WARDS_NAME FROM LST_WARDS WHERE DISTRICT_CODE = [P0]","cboDISTRICT_CODE","",""]//MANHOLE.C05
						],
			"_data": [
			          	["N","txt","MANHOLE_ID","E"],
			            ["N","cbo","MANHOLE_TYPE_ID","E"],
			            ["N","cbo","OWNER_ID","E"],
			            ["S","txt","MANHOLE_CODE","E"],
			            ["S","txt","MANHOLE_NAME","E"],
			            ["S","txt","MANHOLE_CAPACITY","E"],
			            ["N","txt","MANHOLE_DISTANCE","E"],
			            ["S","txt","MANHOLE_ADDRESS","E"],
			            ["S","cbo","CITY_CODE","E"],
			            ["S","cbo","DISTRICT_CODE","E"],
			            ["S","cbo","WARDS_CODE","E"],
			            ["S","txt","LATITUDE","E"],
			            ["S","txt","LONGITUDE","E"],
			            ],
			 "_formSQL": "SELECT * FROM MANHOLES WHERE MANHOLE_ID = [0]",//MANHOLE.FR1
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":[],//"MANHOLE.D01"
			 _onUpdate : function() {
				 if (!current.info) current.info= {};
				current.info.name = $('#txtMANHOLE_NAME').val();
				current.info.code = $('#txtMANHOLE_CODE').val();
				current.info.address = $('#txtMANHOLE_ADDRESS').val();
			 },	
			 _onInsert : function() {
				 if (!current.info) current.info= {};
				 current.info.name = $('#txtMANHOLE_NAME').val();
				current.info.code = $('#txtMANHOLE_CODE').val();
				current.info.address = $('#txtMANHOLE_ADDRESS').val();
			 },	
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "txtMANHOLE_CODE","display" : "Mã cột","rules" : "trim_required", "checkExist":"N"},
				{"name" : "txtMANHOLE_NAME","display" : "Tên cột","rules" : "trim_required"},
				{"name" : "txtMANHOLE_ADDRESS","display" : "Địa chỉ cột","rules" : "trim_required"}
				],
			 "_template":"ManholeInfo",
			};
_opts["ManholeInfo"].en={
		 "_param":[],//session_par,
		  "_filter": [
	                ["cboMA_TINH", "L001.F01", "", "Y","Y"],
	                ["cboMA_HUYEN", "L001.F02", "cboMA_TINH", "Y","Y"]
	            ],
	         "_mode":"view",
			 "_tableName":"LST_CABLETYPE",
			 "_keyField":"CABLETYPE_ID",
			 "_parentField":"MANHOLE_ID",
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
