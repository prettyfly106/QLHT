i18n_ims= i18n_ims || {};
i18n_ims.L013={
    'vn': {
    	'title' : 'QUẢN LÝ DANH TRUNG TÂM',
    	'city': 'Tỉnh/TP',
        'name' : 'Tên Trung tâm',
        'code' : 'Mã Trung tâm'        
	},
	'en': {
    	'title' : 'QUẢN LÝ TRUNG TÂM',
    	'city': 'Tỉnh/TP',
    	'name' : 'Tên Trung tâm',
        'code' : 'Mã Trung tâm'        
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[
			            ["cboCITY_CODE", "LST.CITY", "", "Y","Y"]//L001.F01
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_TECH_CENTRE",
			 "_keyField":"CENTRE_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"ID,CENTRE_ID,100,0,t,l;Mã Trung tâm,CENTRE_CODE,100,0,e,l;Tên Trung tâm,CENTRE_NAME,200,0,e,l",
			 "_gridSQL":"TECH_CENTRE.GR1",//L003.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","CENTRE_CODE","E",""],
			            ["S","cbo","CITY_CODE","I",""],
			            ["S","txt","CENTRE_NAME","E",""]
			            ],
			 "_formSQL": "TECH_CENTRE.FR1", //L003.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["TECH_CENTRE.DL1"],
			 "valid_ar": [ 
				{"name" : "txtCENTRE_CODE","display" : "Mã Trung tâm","rules" : "trim_required"},
				{"name" : "txtCENTRE_NAME","display" : "Tên Trung tâm","rules" : "trim_required"}
				],
			 "_template":"L013"
			};
_opts.en={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_TECH_CENTRE",
			 "_keyField":"CENTRE_CODE",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"Mã tỉnh/TP,CENTRE_CODE,100,0,e,l;Tên Tỉnh/TP,CENTRE_NAME,200,0,e,l",
			 "_gridSQL":"SELECT * FROM LST_TECH_CENTRE",//L003.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","CENTRE_CODE","E",""],
			            ["S","txt","CENTRE_NAME","E",""]
			            ],
			 "_formSQL": "SELECT * FROM LST_TECH_CENTRE WHERE CENTRE_CODE='[0]'", //L003.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["DELETE LST_TECH_CENTRE WHERE CENTRE_CODE='[0]'"],
			 "valid_ar": [ 
				{"name" : "txtCENTRE_CODE","display" : "Mã Tỉnh/TP","rules" : "trim_required"},
				{"name" : "txtCENTRE_NAME","display" : "Tên Tỉnh/TP","rules" : "trim_required"}
				],
			 "_template":"L013"
			};