i18n_ims= i18n_ims || {};
i18n_ims.L003={
    'vn': {
    	'title' : 'QUẢN LÝ DANH MỤC QUẬN/HUYỆN',
    	'city': 'Tỉnh/TP',
        'name' : 'Tên Quận/Huyện',
        'code' : 'Mã Quận/Huyện'        
	},
	'en': {
    	'title' : 'QUẢN LÝ DANH MỤC QUẬN/HUYỆN',
    	'city': 'Tỉnh/TP',
    	'name' : 'Tên Quận/Huyện',
        'code' : 'Mã Quận/Huyện'        
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[
			            ["cboCITY_CODE", "LST.CITY", "", "Y","Y"]//L001.F01
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_DISTRICT",
			 "_keyField":"DISTRICT_CODE",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"Mã quận huyện,DISTRICT_CODE,100,0,e,l;Tên Quận huyện,DISTRICT_NAME,200,0,e,l",
			 "_gridSQL":"DISTRICT.GR1",//L003.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","DISTRICT_CODE","E",""],
			            ["S","cbo","CITY_CODE","I",""],
			            ["S","txt","DISTRICT_NAME","E",""]
			            ],
			 "_formSQL": "DISTRICT.FR1", //L003.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["DISTRICT.DL1"],
			 "valid_ar": [ 
				{"name" : "txtDISTRICT_CODE","display" : "Mã Quận/Huyện","rules" : "trim_required"},
				{"name" : "txtDISTRICT_NAME","display" : "Tên Quận/Huyện","rules" : "trim_required"}
				],
			 "_template":"L003"
			};
_opts.en={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_DISTRICT",
			 "_keyField":"DISTRICT_CODE",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"Mã tỉnh/TP,DISTRICT_CODE,100,0,e,l;Tên Tỉnh/TP,DISTRICT_NAME,200,0,e,l",
			 "_gridSQL":"SELECT * FROM LST_DISTRICT",//L003.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","DISTRICT_CODE","E",""],
			            ["S","txt","DISTRICT_NAME","E",""]
			            ],
			 "_formSQL": "SELECT * FROM LST_DISTRICT WHERE DISTRICT_CODE='[0]'", //L003.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["DELETE LST_DISTRICT WHERE DISTRICT_CODE='[0]'"],
			 "valid_ar": [ 
				{"name" : "txtDISTRICT_CODE","display" : "Mã Tỉnh/TP","rules" : "trim_required"},
				{"name" : "txtDISTRICT_NAME","display" : "Tên Tỉnh/TP","rules" : "trim_required"}
				],
			 "_template":"L003"
			};