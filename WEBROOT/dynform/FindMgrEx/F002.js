i18n_ims= i18n_ims || {};
i18n_ims.F002={
    'vn': {
        'title' : 'DANH SÁCH CỘT',        
        'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường/Xã',
        'type': 'Loại cột',
        'owner': 'Chủ sở hữu'
	},
	'en': {
		'title' : 'POLE MANAGEMENT',		
		'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường/Xã',
        'type': 'Loại cột',
        'owner': 'Owner'
	}
};
var _opts={};
_opts.vn={
		  "_param":session_par,
		  "_filter": [		             
		            [ "cboCITY_CODE", "LST.CITY", "","Y","N","-1","--Tất cả--"],
				["cboDISTRICT_CODE","LST.DISTRICT","cboCITY_CODE", "Y","N","-1","--Tất cả--"],
				["cboWARDS_CODE","LST.WARDS","cboDISTRICT_CODE", "Y","Y","-1","--Tất cả--"],
	            [ "cboPOLETYPE_ID", "LST.POLETYPE", "","Y","Y","","--Tất cả--"],
	            [ "cboOWNER_ID", "LST.OWNER", "","Y","Y","","--Tất cả--"]
		   ],
	         "_onLoad":"",
	         "_type":1,
			 "_mode":"edit",
			 "_tableName":"POLES",
			 "_keyField":"POLE_ID",
			 "_gridHeader":"POLE_ID,POLE_ID,0,0,t,l;Mã cột,POLE_CODE,80,0,f,l;Tên cột,POLE_NAME,150,0,f,l;Địa chỉ,ADDRESS,150,0,f,l",
			 "_gridSQL":"POLE.GR1",//F002.G01
			 "_template":"F002" 
			};
_opts.en={
		  "_param":session_par,
		  "_filter": [		             
		            [ "cboCITY_CODE", "LST.CITY", "","Y","N","-1","--Tất cả--"],
				["cboDISTRICT_CODE","LST.DISTRICT","cboCITY_CODE", "Y","N","-1","--Tất cả--"],
				["cboWARDS_CODE","LST.WARDS","cboDISTRICT_CODE", "Y","Y","-1","--Tất cả--"],
	            [ "cboPOLETYPE_ID", "LST.POLETYPE", "","Y","Y","","--Tất cả--"],
	            [ "cboOWNER_ID", "LST.OWNER", "","Y","Y","","--Tất cả--"]
		   ],
	         "_onLoad":"",
	         "_type":1,
			 "_mode":"edit",
			 "_tableName":"POLES",
			 "_keyField":"POLE_ID",
			 "_gridHeader":"POLE_ID,POLE_ID,0,0,t,l;Mã cột,POLE_CODE,80,0,f,l;Tên cột,POLE_NAME,150,0,f,l;Địa chỉ,ADDRESS,150,0,f,l",
			 "_gridSQL":"POLE.GR1",//F002.G01
			 "_template":"F002" 
			};
