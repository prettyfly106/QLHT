i18n_ims= i18n_ims || {};
i18n_ims.L014={
    'vn': {
    	'title' : 'QUẢN LÝ CHỦNG LOẠI THIẾT BỊ',
    	'device_type_group': 'Nhóm loại TB',
        'device_type' : 'Loại thiết bị',
        'manufacture' : 'Nhà sản xuất',
        'product_num' : 'Mã sản phẩm'
	},
	'en': {
		'title' : 'QUẢN LÝ CHỦNG LOẠI THIẾT BỊ',
    	'device_type_group': 'Nhóm loại TB',
        'device_type' : 'Loại thiết bị',
        'manufacture' : 'Nhà sản xuất',
        'product_num' : 'Mã sản phẩm'        
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
								"cboDEVICETYPE_GROUP_ID", "Y","Y" ]
			          ],
			 "_mode":"edit",
			 "_tableName":"INF_DEVICE",
			 "_keyField":"INF_DEVICE_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"ID,INF_DEVICE_ID,100,0,t,l;Nhóm loại TB,DEVICETYPE_GROUP_NAME,100,0,ro,l;Loại thiết bị,DEVICETYPE_NAME,100,0,e,l;Nhà sản xuất,MANUFACTURE_NAME,200,0,e,l;Mã sản phẩm,PRODUCT_NUM,100,0,e,l",
			 "_gridSQL":"INF_DEVICE.GR1",//L014.G01
			 "_comboList":[
			               [ "cboMANUFACTURE_ID","SELECT MANUFACTURE_ID, MANUFACTURE_NAME FROM LST_MANUFACTURE","", "", "" ]//L014.C01
						],
			"_data": [
			            ["N","cbo","MANUFACTURE_ID","E",""],
			            ["S","cbo","DEVICETYPE_ID","I",""],
			            ["S","txt","PRODUCT_NUM","E",""]
			            ],
			 "_formSQL": "INF_DEVICE.FR1", //L003.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["INF_DEVICE.DL1"],
			 "valid_ar": [
				],
			 "_template":"L014"
			};
_opts.en={
		  "_param":session_par,
			 "_filter":[
			            [
								"cboDEVICETYPE_GROUP_ID",
								"SELECT DEVICETYPE_GROUP_ID, DEVICETYPE_GROUP_NAME FROM LST_DEVICETYPE_GROUP",
								"", "", "Y" ,"Y"  ],// DEVICE.C01
						[
								"cboDEVICETYPE_ID",
								"SELECT DEVICETYPE_ID, DEVICETYPE_NAME FROM LST_DEVICETYPE WHERE DEVICETYPE_GROUP_ID=[P0] ",
								"cboDEVICETYPE_GROUP_ID", "", "Y","Y" ]
			          ],
			 "_mode":"edit",
			 "_tableName":"INF_DEVICE",
			 "_keyField":"INF_DEVICE_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"ID,INF_DEVICE_ID,100,0,t,l;Nhóm loại TB,DEVICETYPE_GROUP_NAME,100,0,e,l;Loại thiết bị,DEVICETYPE_NAME,100,0,e,l;Nhà sản xuất,MANUFACTURE_NAME,200,0,e,l;Mã sản phẩm,PRODUCE_NUM,100,0,e,l",
			 "_gridSQL":"SELECT A.*,G.DEVICETYPE_GROUP_NAME,T.DEVICETYPE_NAME FROM INF_DEVICE A, LST_DEVICETYPE_GROUP G, LST_DEVICETYPE T WHERE A.DEVICETYPE_ID=T.DEVICETYPE_ID AND T.DEVICETYPE_GROUP_ID=G.DEVICETYPE_GROUP_ID AND A.DEVICETYPE_ID=[F1]",//L003.G01
			 "_comboList":[							
						],
			"_data": [
			            ["N","cbo","MANUFACTURE_ID","E",""],
			            ["S","cbo","DEVICETYPE_ID","I",""],
			            ["S","txt","PRODUCT_NUM","E",""]
			            ],
			 "_formSQL": "SELECT * FROM LST_TECH_CENTRE WHERE CENTRE_ID='[0]'", //L003.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["DELETE LST_TECH_CENTRE WHERE CENTRE_ID='[0]'"],
			 "valid_ar": [
				],
			 "_template":"L014"
			};