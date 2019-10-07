i18n_ims= i18n_ims || {};
i18n_ims.L002={
    'vn': {
    	'title' : 'QUẢN LÝ DANH MỤC TỈNH/TP',    	
        'name' : 'Tên Tỉnh/TP',
        'code' : 'Mã Tỉnh/TP'        
	},
	'en': {
    	'title' : 'QUẢN LÝ DANH MỤC TỈNH/TP',    	
        'name' : 'Tên Tỉnh/TP',
        'code' : 'Mã Tỉnh/TP'        
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_CITY",
			 "_keyField":"CITY_CODE",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"Mã tỉnh/TP,CITY_CODE,100,0,e,l;Tên Tỉnh/TP,CITY_NAME,200,0,e,l",
			 "_gridSQL":"CITY.GR1",//L002.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","CITY_CODE","E",""],
			            ["S","txt","CITY_NAME","E",""]
			            ],
			 "_formSQL": "CITY.FR1", //L002.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["CITY.DL1"],
			 "valid_ar": [ 
				{"name" : "txtCITY_CODE","display" : "Mã Tỉnh/TP","rules" : "trim_required"},
				{"name" : "txtCITY_NAME","display" : "Tên Tỉnh/TP","rules" : "trim_required"}
				],
			 "_template":"L002"
			};
_opts.en={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_CITY",
			 "_keyField":"CITY_CODE",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"Mã tỉnh/TP,CITY_CODE,100,0,e,l;Tên Tỉnh/TP,CITY_NAME,200,0,e,l",
			 "_gridSQL":"CITY.GR1",//L002.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","CITY_CODE","E",""],
			            ["S","txt","CITY_NAME","E",""]
			            ],
			 "_formSQL": "CITY.FR1", //L002.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["CITY.DL1"],
			 "valid_ar": [ 
				{"name" : "txtCITY_CODE","display" : "Mã Tỉnh/TP","rules" : "trim_required"},
				{"name" : "txtCITY_NAME","display" : "Tên Tỉnh/TP","rules" : "trim_required"}
				],
			 "_template":"L002"
			};