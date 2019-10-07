i18n_ims= i18n_ims || {};
i18n_ims.L015={
    'vn': {
    	'title' : 'QUẢN LÝ DANH MỤC NHÀ SẢN XUẤT',    	
        'name' : 'Tên Nhà sản xuất',
        'code' : 'Mã Nhà sản xuất'        
	},
	'en': {
    	'title' : 'QUẢN LÝ DANH MỤC NHÀ SẢN XUẤT',    	
        'name' : 'Tên Nhà sản xuất',
        'code' : 'Mã Nhà sản xuất'        
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_MANUFACTURE",
			 "_keyField":"MANUFACTURE_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"MANUFACTURE_ID,MANUFACTURE_ID,0,0,t,l;Tên Nhà sản xuất,MANUFACTURE_NAME,200,0,e,l",
			 "_gridSQL":"MANUFACTURE.GR1",//L006.G01
			 "_comboList":[							
						],
			"_data": [			            
			            ["S","txt","MANUFACTURE_NAME","E",""]
			            ],
			 "_formSQL": "MANUFACTURE.FR1", //L006.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["MANUFACTURE.DL1"],
			 "valid_ar": [
				{"name" : "txtMANUFACTURE_NAME","display" : "Tên Nhà sản xuất","rules" : "trim_required"}
				],
			 "_template":"L015"
			};
_opts.en={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_MANUFACTURE",
			 "_keyField":"MANUFACTURE_CODE",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"Mã tỉnh/TP,MANUFACTURE_CODE,100,0,e,l;Tên Nhà sản xuất,MANUFACTURE_NAME,200,0,e,l",
			 "_gridSQL":"SELECT * FROM LST_MANUFACTURE",//L006.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","MANUFACTURE_CODE","E",""],
			            ["S","txt","MANUFACTURE_NAME","E",""]
			            ],
			 "_formSQL": "SELECT * FROM LST_MANUFACTURE WHERE MANUFACTURE_CODE='[0]'", //L006.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["DELETE LST_MANUFACTURE WHERE MANUFACTURE_CODE='[0]'"],
			 "valid_ar": [ 
				{"name" : "txtMANUFACTURE_CODE","display" : "Mã Nhà sản xuất","rules" : "trim_required"},
				{"name" : "txtMANUFACTURE_NAME","display" : "Tên Nhà sản xuất","rules" : "trim_required"}
				],
			 "_template":"L015"
			};