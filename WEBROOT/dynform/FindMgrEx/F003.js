i18n_ims= i18n_ims || {};
i18n_ims.F003={
    'vn': {
        'title' : 'DANH SÁCH CỐNG/BỂ',        
        'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường/Xã',
        'type': 'Loại cống/bể',
        'owner': 'Chủ sở hữu'
	},
	'en': {
		'title' : 'MANHOLE MANAGEMENT',		
		'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường/Xã',
        'type': 'Loại cống/bể',
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
	            [ "cboMANHOLE_TYPE_ID", "LST.MANHOLE_TYPE", "","Y","Y","","--Tất cả--"],
	            [ "cboOWNER_ID", "LST.OWNER", "","Y","Y","","--Tất cả--"]
		   ],
	         "_onLoad":"",
	         "_type":2,
			 "_mode":"edit",
			 "_tableName":"MANHOLES",
			 "_keyField":"MANHOLE_ID",
			 "_gridHeader":"MANHOLE_ID,MANHOLE_ID,0,0,t,l;Mã cống/bể,MANHOLE_CODE,80,0,f,l;Tên cống/bể,MANHOLE_NAME,150,0,f,l;Địa chỉ,MANHOLE_ADDRESS,150,0,f,l",
			 "_gridSQL":"MANHOLE.GR1",//F003.G01
			 "_template":"F003" 
			};
_opts.en={
		  "_param":session_par,
		  "_filter": [		             
		            [ "cboCITY_CODE", "LST.CITY", "","Y","N","-1","--Tất cả--"],
				["cboDISTRICT_CODE","LST.DISTRICT","cboCITY_CODE", "Y","N","-1","--Tất cả--"],
				["cboWARDS_CODE","LST.WARDS","cboDISTRICT_CODE", "Y","Y","-1","--Tất cả--"],
	            [ "cboMANHOLE_TYPE_ID", "LST.MANHOLE_TYPE", "","Y","Y","","--Tất cả--"],
	            [ "cboOWNER_ID", "LST.OWNER", "","Y","Y","","--Tất cả--"]
		   ],
	         "_onLoad":"",
	         "_type":2,
			 "_mode":"edit",
			 "_tableName":"MANHOLES",
			 "_keyField":"MANHOLE_ID",
			 "_gridHeader":"MANHOLE_ID,MANHOLE_ID,0,0,t,l;Mã cống/bể,MANHOLE_CODE,80,0,f,l;Tên cống/bể,MANHOLE_NAME,150,0,f,l;Địa chỉ,MANHOLE_ADDRESS,150,0,f,l",
			 "_gridSQL":"MANHOLE.GR1",//F003.G01
			 "_template":"F003" 
			};
