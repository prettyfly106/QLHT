i18n_ims= i18n_ims || {};
i18n_ims.L017={
    'vn': {
    	'title' : 'QUẢN LÝ CHI TIẾT CARD',    	
    	'device_type_group': 'Nhóm loại TB',
        'device_type' : 'Loại thiết bị',
        'card' : 'Card',
        'type': 'Loại card',        
        'card_index' : 'Thứ tự (index)',
        'card_type': 'Loại giao diện',
        'port_num':'Số port',
        'port_speed':'Tốc độ',
        'port_prefix':'Port Prefix (FE/GE)'
	},
	'en': {
		'title' : 'QUẢN LÝ CHI TIẾT CARD',    	
    	'device_type_group': 'Nhóm loại TB',
        'device_type' : 'Loại thiết bị',
        'card' : 'Card',
        'type': 'Loại card',        
        'card_index' : 'Thứ tự (index)',
        'card_type': 'Loại giao diện',
        'port_num':'Số port',
        'port_speed':'Tốc độ',
        'port_prefix':'Port Prefix (FE/GE)'        
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
							"cboINF_CARD_ID",
							"LST.INF_CARD",
							"cboDEVICETYPE_ID", "Y","Y" ]
			          ],
			 "_mode":"edit",
			 "_tableName":"INF_DEVICE_CARD_LOGIC",
			 "_keyField":"INF_CARD_LOGIC_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"INF_CARD_LOGIC_ID,INF_CARD_LOGIC_ID,0,0,t,l;Thứ tự,CARD_INDEX,80,0,e,l;Loại giao diện,CARD_TYPE_NAME,80,0,e,l;Số port,PORT_NUM,80,0,e,l;Tốc độ,PORT_SPEED_NAME,80,0,e,l;Port Prefix (FE/GE),PORT_PREFIX,80,0,e,l",
			 "_gridSQL":"CARD_LOGIC.GR1",//L006.G01
			 "_comboList":[
			               [ "cboCARD_TYPE_ID","SELECT * FROM INF_DEVICE_CARD_TYPE","", "", "" ],//L017.C01
			               [ "cboPORT_SPEED_ID","SELECT * FROM INF_PORT_SPEED","", "", "" ]//L017.C02
						],
			"_data": [			            
			            ["N","cbo","INF_CARD_ID","I",""],
			            ["N","txt","CARD_INDEX","E",""],
			            ["N","cbo","CARD_TYPE_ID","E",""],
			            ["N","txt","PORT_NUM","E",""],
			            ["N","cbo","PORT_SPEED_ID","E",""],
			            ["S","txt","PORT_PREFIX","E",""]
			            ],
			 "_formSQL": "CARD_LOGIC.FR1", //L006.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["CARD_LOGIC.DL1"],
			 "valid_ar": [				
				],
			 "_template":"L017"
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
			 "_template":"L017"
			};