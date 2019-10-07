i18n_ims= i18n_ims || {};
i18n_ims.L006={
    'vn': {
    	'title' : 'QUẢN LÝ DANH MỤC ĐƠN VỊ QUẢN LÝ',    	
        'name' : 'Tên Đơn vị',
        'code' : 'Mã Đơn vị'        
	},
	'en': {
    	'title' : 'QUẢN LÝ DANH MỤC ĐƠN VỊ QUẢN LÝ',    	
        'name' : 'Tên Đơn vị',
        'code' : 'Mã Đơn vị'        
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_OWNER",
			 "_keyField":"OWNER_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"OWNER_ID,OWNER_ID,0,0,t,l;Mã Đơn vị,OWNER_CODE,100,0,e,l;Tên Đơn vị,OWNER_NAME,200,0,e,l",
			 "_gridSQL":"OWNER.GR1",//L006.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","OWNER_CODE","E",""],
			            ["S","txt","OWNER_NAME","E",""]
			            ],
			 "_formSQL": "OWNER.FR1", //L006.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["OWNER.DL1"],
			 "valid_ar": [ 
				{"name" : "txtOWNER_CODE","display" : "Mã Chủ sở hữu","rules" : "trim_required"},
				{"name" : "txtOWNER_NAME","display" : "Tên Chủ sở hữu","rules" : "trim_required"}
				],
			 "_template":"L006"
			};
_opts.en={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_OWNER",
			 "_keyField":"OWNER_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"OWNER_ID,OWNER_ID,0,0,t,l;Mã Đơn vị,OWNER_CODE,100,0,e,l;Tên Đơn vị,OWNER_NAME,200,0,e,l",
			 "_gridSQL":"OWNER.GR1",//L006.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","OWNER_CODE","E",""],
			            ["S","txt","OWNER_NAME","E",""]
			            ],
			 "_formSQL": "OWNER.FR1", //L006.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["OWNER.DL1"],
			 "valid_ar": [ 
				{"name" : "txtOWNER_CODE","display" : "Mã Chủ sở hữu","rules" : "trim_required"},
				{"name" : "txtOWNER_NAME","display" : "Tên Chủ sở hữu","rules" : "trim_required"}
				],
			 "_template":"L006"
			};