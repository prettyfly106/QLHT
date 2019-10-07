i18n_ims= i18n_ims || {};
i18n_ims.L005={
    'vn': {
    	'title' : 'QUẢN LÝ DANH MỤC VÙNG',    	
        'name' : 'Tên Vùng',
        'code' : 'Mã Vùng'        
	},
	'en': {
    	'title' : 'QUẢN LÝ DANH MỤC VÙNG',    	
        'name' : 'Tên Vùng',
        'code' : 'Mã Vùng'        
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_LOCALITY",
			 "_keyField":"LOCALITY_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"LOCALITY_ID,LOCALITY_ID,0,0,t,l;Mã vùng,LOCALITY_CODE,100,0,e,l;Tên Vùng,LOCALITY_NAME,200,0,e,l",
			 "_gridSQL":"SELECT * FROM LST_LOCALITY",//L005.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","LOCALITY_CODE","E",""],
			            ["S","txt","LOCALITY_NAME","E",""]
			            ],
			 "_formSQL": "SELECT * FROM LST_LOCALITY WHERE LOCALITY_ID='[0]'", //L005.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["DELETE LST_LOCALITY WHERE LOCALITY_ID='[0]'"],
			 "valid_ar": [ 
				{"name" : "txtLOCALITY_CODE","display" : "Mã Vùng","rules" : "trim_required"},
				{"name" : "txtLOCALITY_NAME","display" : "Tên Vùng","rules" : "trim_required"}
				],
			 "_template":"L005"
			};
_opts.en={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_LOCALITY",
			 "_keyField":"LOCALITY_CODE",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"Mã tỉnh/TP,LOCALITY_CODE,100,0,e,l;Tên Vùng,LOCALITY_NAME,200,0,e,l",
			 "_gridSQL":"LOCALITY.GR1",//L005.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","LOCALITY_CODE","E",""],
			            ["S","txt","LOCALITY_NAME","E",""]
			            ],
			 "_formSQL": "LOCALITY.FR1", //L005.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["LOCALITY.DL1"],
			 "valid_ar": [ 
				{"name" : "txtLOCALITY_CODE","display" : "Mã Vùng","rules" : "trim_required"},
				{"name" : "txtLOCALITY_NAME","display" : "Tên Vùng","rules" : "trim_required"}
				],
			 "_template":"L005"
			};