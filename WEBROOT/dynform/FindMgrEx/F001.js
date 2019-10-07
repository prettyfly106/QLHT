i18n_ims= i18n_ims || {};
i18n_ims.F001={
    'vn': {
        'title' : 'DANH SÁCH MÁY CHỦ BẢO MẬT',
        'locality' : 'Vùng',
        'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường/Xã',
        'type': 'Loại máy chủ',
        'owner': 'Đơn vị quản lý'
	},
	'en': {
		'title' : 'STATION MANAGEMENT',
		'locality' : 'Locality',
		'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường/Xã',
        'type': 'Loại máy chủ',
        'owner': 'Đơn vị quản lý'
	}
};
var _opts={};
_opts.vn={
		  "_param":session_par,
		  "_filter": [
		             [ "cboLOCALITY_ID", "LST.LOCALITY", "","Y","Y","","--Tất cả--"],
		            [ "cboCITY_CODE", "LST.CITY", "","Y","N","-1","--Tất cả--"],
				["cboDISTRICT_CODE","LST.DISTRICT","cboCITY_CODE", "Y","N","-1","--Tất cả--"],
				["cboWARDS_CODE","LST.WARDS","cboDISTRICT_CODE", "Y","Y","-1","--Tất cả--"],
	            [ "cboSTATIONTYPE_ID", "LST.STATIONTYPE", "","Y","Y","","--Tất cả--"],
	            [ "cboOWNER_ID", "LST.OWNER", "","Y","Y","","--Tất cả--"]
		   ],
	         "_onLoad":"",
	         "_type":0,
			 "_mode":"edit",
			 "_tableName":"STATIONS",
			 "_keyField":"STATION_ID",
			 "_gridHeader":"STATION_ID,STATION_ID,0,0,t,l;Mã máy chủ,STATION_CODE,80,0,f,l;Tên máy chủ,STATION_NAME,150,0,f,l;Địa chỉ,STATION_ADDRESS,150,0,f,l;Năm bắt đầu,START_YEAR,50,0,f,l",
			 "_gridSQL":"STATION.GR1",//F001.G01
			 "_template":"F001" 
			};
_opts.en={
		  "_param":session_par,
		  "_filter": [
		             [ "cboLOCALITY_ID", "LST.LOCALITY", "","Y","Y","","--Tất cả--"],
		            [ "cboCITY_CODE", "LST.CITY", "","Y","N","-1","--Tất cả--"],
				["cboDISTRICT_CODE","LST.DISTRICT","cboCITY_CODE", "Y","N","-1","--Tất cả--"],
				["cboWARDS_CODE","LST.WARDS","cboDISTRICT_CODE", "Y","Y","-1","--Tất cả--"],
	            [ "cboSTATIONTYPE_ID", "LST.STATIONTYPE", "","Y","Y","","--Tất cả--"],
	            [ "cboOWNER_ID", "LST.OWNER", "","Y","Y","","--Tất cả--"]
		   ],
	         "_onLoad":"",
	         "_type":0,
			 "_mode":"edit",
			 "_tableName":"STATIONS",
			 "_keyField":"STATION_ID",
			 "_gridHeader":"STATION_ID,STATION_ID,0,0,t,l;Mã máy chủ,STATION_CODE,80,0,f,l;Tên máy chủ,STATION_NAME,150,0,f,l;Địa chỉ,STATION_ADDRESS,150,0,f,l;Năm bắt đầu,START_YEAR,50,0,f,l",
			 "_gridSQL":"STATION.GR1",//F001.G01
			 "_template":"F001" 
			};
