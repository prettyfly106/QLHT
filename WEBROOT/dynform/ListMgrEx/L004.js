i18n_ims= i18n_ims || {};
i18n_ims.L004={
    'vn': {
    	'title' : 'QUẢN LÝ DANH MỤC PHƯỜNG/XÃ',
    	'city': 'Tỉnh/TP',
    	'district': 'Quận/Huyện',
    	'name' : 'Tên Phường/Xã',
        'code' : 'Mã Phường/Xã'       
	},
	'en': {
    	'title' : 'QUẢN LÝ DANH MỤC PHƯỜNG/XÃ',
    	'city': 'Tỉnh/TP',
    	'district': 'Quận/Huyện',
    	'name' : 'Tên Phường/Xã',
        'code' : 'Mã Phường/Xã'        
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[
			            ["cboCITY_CODE", "LST.CITY", "", "Y","N"],//L001.F01
			            ["cboDISTRICT_CODE", "LST.DISTRICT", "cboCITY_CODE", "Y","Y"]//L001.F02
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_WARDS",
			 "_keyField":"WARDS_CODE",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"Mã phường xã,WARDS_CODE,100,0,e,l;Tên phường xã,WARDS_NAME,200,0,e,l",
			 "_gridSQL":"WARDS.GR1",//L004.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","WARDS_CODE","E",""],
			            ["S","txt","WARDS_NAME","E",""]
			            ],
			 "_formSQL": "WARDS.FR1", //L004.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["WARDS.DL1"],
			 "valid_ar": [ 
				{"name" : "txtWARDS_CODE","display" : "Mã Phường/Xã","rules" : "trim_required"},
				{"name" : "txtWARDS_NAME","display" : "Tên Phường/Xã","rules" : "trim_required"}
				],
			 "_template":"L004"
			};
_opts.en={
		  "_param":session_par,
			 "_filter":[
			            ["cboCITY_CODE", "LSTCITY", "", "Y","N"],//L001.F01
			            ["cboDISTRICT_CODE", "LST.DISTRICT", "cboCITY_CODE", "Y","Y"]//L001.F02
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_WARDS",
			 "_keyField":"WARDS_CODE",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"Mã phường xã,WARDS_CODE,100,0,e,l;Tên phường xã,WARDS_NAME,200,0,e,l",
			 "_gridSQL":"WARDS.GR1",//L004.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","WARDS_CODE","E",""],
			            ["S","txt","WARDS_NAME","E",""]
			            ],
			 "_formSQL": "WARDS.FR1", //L004.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["WARDS.DL1"],
			 "valid_ar": [ 
				{"name" : "txtWARDS_CODE","display" : "Mã Phường/Xã","rules" : "trim_required"},
				{"name" : "txtWARDS_NAME","display" : "Tên Phường/Xã","rules" : "trim_required"}
				],
			 "_template":"L004"
			};