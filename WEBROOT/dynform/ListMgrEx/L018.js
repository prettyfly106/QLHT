i18n_ims= i18n_ims || {};
i18n_ims.L018={
    'vn': {
    	'title' : 'QUẢN LÝ SLOT THIẾT BỊ',    	
    	'device_type_group': 'Nhóm loại TB',
        'device_type' : 'Loại thiết bị',
        'device' : 'Thiết bị',
        'type': 'Loại card',        
        'slot_index' : 'Thứ tự (index)',
        'install_card': 'Cài đặt card'
	},
	'en': {
		'title' : 'QUẢN LÝ SLOT THIẾT BỊ',    	
    	'device_type_group': 'Nhóm loại TB',
        'device_type' : 'Loại thiết bị',
        'device' : 'Thiết bị',
        'type': 'Loại card',        
        'slot_index' : 'Thứ tự (index)',
        'install_card': 'Cài đặt card'        
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[
					[
						"cboDEVICETYPE_GROUP_ID",
						"LST.DEVICETYPE_GROUP",
						"", "Y" ,"N" ],// DEVICE.C01
					[
						"cboDEVICETYPE_ID",
						"LST.DEVICETYPE",
						"cboDEVICETYPE_GROUP_ID", "Y","N" ],
						[
							"cboINF_DEVICE_ID",
							"LST.INF_DEVICE01",
							"cboDEVICETYPE_ID", "Y","Y" ]
			          ],
			 "_mode":"edit",
			 "_tableName":"INF_DEVICE_SLOT",
			 "_keyField":"INF_SLOT_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"INF_SLOT_ID,INF_SLOT_ID,0,0,t,l;Thứ tự,INF_SLOT_INDEX,150,0,e,l;Card cài đặt,FIXED_CARD_NAME,200,0,e,l",
			 "_gridSQL":"INF_DEVICE_SLOT.GR1",//L006.G01
			 "_comboList":[
			               [ "cboINF_CARD_ID","LST.CARD_COMPATIBLE","", "0", "Có thể thay đổi"]],
			"_data": [
			          	["N","cbo","INF_DEVICE_ID","I",""],
			            ["N","cbo","INF_SLOT_ID","E",""],
			            ["N","txt","INF_SLOT_INDEX","E",""],
			            ["N","cbo","INF_CARD_ID","E",""]
			            ],
			 "_formSQL": "INF_DEVICE_SLOT.FR1", //L006.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["INF_DEVICE_SLOT.DL1"],
			 "valid_ar": [				
				],
			 "_template":"L018"
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
			 "_template":"L018"
			};