i18n_ims= i18n_ims || {};
i18n_ims.L020={
    'vn': {
    	'title' : 'QUẢN LÝ TUYẾN TRUYỀN DẪN',    	
    	'transmission': 'Chặng truyền dẫn',
        'transmission_type' : 'Loại truyền dẫn',
        'route_index' : 'Thứ tự',
        'bandwidth': 'Tốc độ',        
        'city' : 'Tỉnh/TP',
        'tech_centre': 'TT VT',
        'route_b': 'Điểm đầu tuyến',
        'route_e': 'Điểm cuối tuyến',
        'station': 'Nhà trạm',
        'device': 'Thiết bị',
        'port_in': 'Port vào',
        'port_out': 'Port ra'
	},
	'en': {
    	'title' : 'QUẢN LÝ TUYẾN TRUYỀN DẪN',    	
    	'transmission': 'Chặng truyền dẫn',
        'transmission_type' : 'Loại truyền dẫn',
        'route_index' : 'Thứ tự (index)',
        'bandwidth': 'Dung lượng',        
        'city' : 'Tỉnh/TP',
        'tech_centre': 'Trung tâm VT',
        'route_b': 'Điểm đầu tuyến',
        'route_e': 'Điểm cuối tuyến',
        'station': 'Nhà trạm',
        'device': 'Thiết bị',
        'port_in': 'Port vào',
        'port_out': 'Port ra'
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[
					[
						"cboTRANSMISSION_ID",
						"LST.TRANSMISSION",
						"", "Y" ,"Y" ],// DEVICE.C01
					[
						"cboTRANSMISSION_TYPE_ID",
						"LST.TRANSMISSION_TYPE",
						"", "Y","Y" ]
			          ],
			 "_mode":"edit",
			 "_tableName":"LST_SDH_ROUTES",
			 "_keyField":"ROUTE_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"ROUTE_ID,ROUTE_ID,0,0,t,l;Thứ tự,ROUTE_INDEX,50,0,e,l;Trạm đầu,STATION_CODE_B,80,0,e,l;Trạm cuối,STATION_CODE_E,80,0,e,l;TB đầu,DEVICE_B,80,0,e,l;TB cuối,DEVICE_E,80,0,e,l;Port đầu,PORT_CODE_B,80,0,e,l;Port cuối,PORT_CODE_E,80,0,e,l",
			 "_gridSQL":"ROUTE.GR1",//L006.G01
			 "_comboList":[
			               ["cboCITY_CODE", "LST.CITY","","",""],			               
			               [["cboCENTER_ID","cboSTATION_ID_B,cboSTATION_ID_E"], ["LST.CENTRE","LST.STATION","LST.STATION"],"cboCITY_CODE","",""],
			               ["cboDEVICE_ID_B", "LST.DEVICE","cboSTATION_ID_B","",""],
			               ["cboDEVICE_ID_E", "LST.DEVICE","cboSTATION_ID_E","",""],
			               [["cboPORT_ID_B_IN","cboPORT_ID_B_OUT"], "LST.PORT","cboDEVICE_ID_B","",""],
			               [["cboPORT_ID_E_IN","cboPORT_ID_E_OUT"], "LST.PORT","cboDEVICE_ID_E","",""]],
			"_data": [
			          	["N","cbo","TRANSMISSION_ID","P",""],
			            ["N","cbo","TRANSMISSION_TYPE_ID","P",""],
			            ["N","txt","ROUTE_INDEX","E",""],
			            ["N","txt","ROUTE_CAPACITY","E",""],
			            ["N","cbo","CITY_CODE","E",""],
			          	["N","cbo","CENTER_ID","E",""],
			          	["N","cbo","STATION_ID_B","E",""],
			          	["N","cbo","DEVICE_ID_B","E",""],
			          	["N","cbo","PORT_ID_B_IN","E",""],
			          	["N","cbo","PORT_ID_B_OUT","E",""],
			          	["N","cbo","STATION_ID_E","E",""],
			          	["N","cbo","DEVICE_ID_E","E",""],
			          	["N","cbo","PORT_ID_E_IN","E",""],
			          	["N","cbo","PORT_ID_E_OUT","E",""]
			          	
			            ],			 
			 "_formSQL": "SELECT * FROM LST_SDH_ROUTES WHERE ROUTE_ID='[0]'", //L006.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["DELETE LST_SDH_ROUTES WHERE ROUTE_ID='[0]'"],
			 "valid_ar": [
                     {"name" : "txtROUTE_INDEX","display" : "Thứ tự","rules" : "trim_required"},
                     {"name" : "txtROUTE_CAPACITY","display" : "Dung lượng","rules" : "trim_required"},
                     {"name" : "cboSTATION_ID_B","display" : "Trạm đầu","rules" : "trim_required"},
                     {"name" : "cboSTATION_ID_E","display" : "Trạm cuối","rules" : "trim_required"},
                     {"name" : "cboDEVICE_ID_B","display" : "Thiết bị đầu","rules" : "trim_required"},
                     {"name" : "cboDEVICE_ID_E","display" : "Thiết bị cuối","rules" : "trim_required"},
                     {"name" : "cboPORT_ID_B_OUT","display" : "Port đầu ra","rules" : "trim_required"},
                     {"name" : "cboPORT_ID_E_IN","display" : "Port cuối vào","rules" : "trim_required"}
				],
			 "_template":"L020"
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