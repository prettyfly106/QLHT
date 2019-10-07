i18n_ims= i18n_ims || {};
i18n_ims.L016={
    'vn': {
    	'title' : 'QUẢN LÝ DANH MỤC CARD',    	
    	'device_type_group': 'Nhóm loại TB',
        'device_type' : 'Loại thiết bị',
        'type': 'Loại card',
        'manufacture' : 'Nhà sản xuất',
        'product_num' : 'Mã sản phẩm',
        'compatible': 'TB Tương thích'
	},
	'en': {
		'title' : 'QUẢN LÝ DANH MỤC CARD',    	
    	'device_type_group': 'Nhóm loại TB',
        'device_type' : 'Loại thiết bị',
        'type': 'Loại card',
        'manufacture' : 'Nhà sản xuất',
        'product_num' : 'Mã sản phẩm',
        'compatible': 'TB Tương thích'        
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
						"cboDEVICETYPE_GROUP_ID", "Y","Y" ],
					[
						"cboMANUFACTURE_ID",
						"LST.MANUFACTURE",
						"", "Y","Y" ]
			          ],
			 "_mode":"edit",
			 "_tableName":"INF_DEVICE_CARD",
			 "_keyField":"INF_CARD_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"INF_CARD_ID,INF_CARD_ID,0,0,t,l;Loại card,INF_CARD_TYPE,80,0,e,l;Mã Card,PRODUCT_NUM,80,0,e,l",
			 "_gridSQL":"INF_DEVICE_CARD.GR1",//L006.G01
			 "_comboList":[			               
						],
			"_onLoad": function() {
				$('#cboDEVICETYPE_ID,#cboMANUFACTURE_ID').on("change",function() {
					var devicetype_id = $('#cboDEVICETYPE_ID').val();
					var manufacture_id = $('#cboMANUFACTURE_ID').val();
					console.log(devicetype_id,manufacture_id);
					var sql_par=RSUtil.buildParam("F",[devicetype_id,manufacture_id]);
					console.log(sql_par);
		    		ComboUtil.getComboTag("cboDEVICE_COMPATIBLE","LST.INF_DEVICE",sql_par, "",{},"sql",null,false);
				});
			},
			"_data": [			            
			            ["S","cbo","INF_CARD_TYPE","E",""],
			            ["S","cbo","DEVICETYPE_ID","I",""],
			            ["S","cbo","MANUFACTURE_ID","I",""],
			            ["S","txt","PRODUCT_NUM","E",""],
			            ["S","cbo","DEVICE_COMPATIBLE","E",""]
			            ],
			 "_formSQL": "INF_DEVICE_CARD.FR1", //L006.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["INF_DEVICE_CARD.DL1"],
			 "valid_ar": [				
				],
			 "_template":"L016"
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
			 "_template":"L016"
			};