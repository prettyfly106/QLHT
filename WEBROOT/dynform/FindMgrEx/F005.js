i18n_ims= i18n_ims || {};
i18n_ims.F005={
    'vn': {
        'title' : 'DANH SÁCH TUYẾN CÁP',        
        'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường/Xã',
        'search_type': 'Tìm theo',
        'capacity': 'Dung lượng'
	},
	'en': {
		'title' : 'CABLELINE MANAGEMENT',		
		'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường/Xã',
        'search_type': 'Loại tuyến cáp',
        'owner': 'Owner'
	}
};
var _opts={};
_opts.vn={
		  "_param":session_par,
		  "_filter": [
		              ["cboSEARCH_TYPE","","","Y"],
		            [ "cboCITY_CODE", "LST.CITY", "","Y","N","-1","--Tất cả--"],
				["cboDISTRICT_CODE","LST.DISTRICT","cboCITY_CODE", "Y","N","-1","--Tất cả--"],
				["cboWARDS_CODE","LST.WARDS","cboDISTRICT_CODE", "Y","Y","-1","--Tất cả--"],	            
	            [ "cboCAPACITY", "LST.CAPACITY", "","Y","Y","","--Tất cả--"]
		   ],
	         "_onLoad":"",
	         "_type":4,
			 "_mode":"edit",
			 "_tableName":"CABLELINES",
			 "_keyField":"CABLELINE_ID",
			 "_gridHeader":"CABLELINE_ID,CABLELINE_ID,0,0,t,l;Mã tuyến cáp,CABLELINE_CODE,80,0,f,l;Tên tuyến cáp,CABLELINE_NAME,150,0,f,l;Địa chỉ,ADDRESS,150,0,f,l",
			 "_gridSQL":"CABLELINE.GR1",//F005.G01
			 "_template":"F005" 
			};
_opts.en={
		  "_param":session_par,
		  "_filter": [
		           
		            ["txtSEARCH", "", "", "Y"],
	                ["txtFROM_DT", "", "", "Y"],
	                ["txtTO_DT", "", "", "Y"]
	            ],
	         "_onLoad":function() {
	        	 $('#txtFROM_DT').val(moment().startOf('day').format('DD/MM/YYYY HH:mm:ss'));
	        	 $('#txtTO_DT').val(moment().endOf('day').format('DD/MM/YYYY HH:mm:ss'));
	         },
			 "_mode":"view",
			 "_tableName":"LOADXML",
			 "_keyField":"FILE_ID",
			 "_gridHeader":"ID,FILE_ID,0,0,t,l;File Name,FILE_NAME,80,0,f,l;File status,FILE_STATUS,50,0,f,l;Loaded Time,LOADED_TIME,50,0,f,l;Update time,UPDATE_TIME,0,0,t,l;Error Msg,ERROR_MSG,200,0,f,l",
			 "_gridSQL":"F005.G01",
			 "_template":"F005"
			};
