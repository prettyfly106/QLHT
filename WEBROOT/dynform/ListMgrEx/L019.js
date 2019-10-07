i18n_ims= i18n_ims || {};
i18n_ims.L019={
    'vn': {
    	'title' : 'QUẢN LÝ DANH CHẶNG TRUYỀN DẪN',    	
        'description' : 'Mô tả',
        'code' : 'Mã Chặng'        
	},
	'en': {
    	'title' : 'QUẢN LÝ DANH CHẶNG TRUYỀN DẪN',    	
        'description' : 'Mô tả',
        'code' : 'Mã Chặng'        
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_SDH_TRANSMISSIONS",
			 "_keyField":"TRANSMISSION_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"TRANSMISSION_ID,TRANSMISSION_ID,0,0,t,l;Mã Chặng,TRANSMISSION_CODE,200,0,e,l;Mô tả,DESCRIPTION,200,0,e,l",
			 "_gridSQL":"TRANSMISSION.GR1",//L006.G01
			 "_comboList":[							
						],
			"_data": [
			          	["S","txt","TRANSMISSION_CODE","E",""],
			            ["S","txt","DESCRIPTION","E",""]
			            ],
			 "_formSQL": "TRANSMISSION.FR1", //L006.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["TRANSMISSION.DL1"],
			 "valid_ar": [
				{"name" : "txtTRANSMISSION_CODE","display" : "Mã Chặng","rules" : "trim_required"}
				],
			 "_template":"L019"
			};
_opts.en={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_TRANSMISSIONS",
			 "_keyField":"TRANSMISSION_CODE",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"Mã chặng,TRANSMISSION_CODE,100,0,e,l;Tên Chặng,TRANSMISSION_NAME,200,0,e,l",
			 "_gridSQL":"SELECT * FROM LST_SDH_TRANSMISSIONS",//L006.G01
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","TRANSMISSION_CODE","E",""],
			            ["S","txt","DESCRIPTION","E",""]
			            ],
			 "_formSQL": "SELECT * FROM LST_SDH_TRANSMISSIONS WHERE TRANSMISSION_CODE='[0]'", //L006.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["DELETE LST_SDH_TRANSMISSIONS WHERE TRANSMISSION_CODE='[0]'"],
			 "valid_ar": [ 
				{"name" : "txtTRANSMISSION_CODE","display" : "Mã Chặng","rules" : "trim_required"}
				],
			 "_template":"L019"
			};