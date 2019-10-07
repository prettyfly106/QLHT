i18n_ims= i18n_ims || {};
i18n_ims.F004={
    'vn': {
        'title' : 'DANH SÁCH MĂNG XÔNG',        
        'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường/Xã',
        'type': 'Loại măng xông',
        'owner': 'Chủ sở hữu'
	},
	'en': {
		'title' : 'JOINT MANAGEMENT',		
		'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường/Xã',
        'type': 'Loại măng xông',
        'owner': 'Owner'
	}
};
var _opts={};
_opts.vn={
		  "_param":session_par,
		  "_filter": [		             
		            [ "cboCITY_CODE", "LST.CITY", "","Y","N","-1","--Tất cả--"],
				["cboDISTRICT_CODE","LST.DISTRICT","cboCITY_CODE", "Y","N","-1","--Tất cả--"],
				["cboWARDS_CODE","LST.WARDS","cboDISTRICT_CODE", "Y","Y","-1","--Tất cả--"]	            
	            
		   ],
	         "_onLoad":"",
	         "_type":3,
			 "_mode":"edit",
			 "_tableName":"JOINTS",
			 "_keyField":"JOINT_ID",
			 "_gridHeader":"JOINT_ID,JOINT_ID,0,0,t,l;Mã măng xông,JOINT_CODE,80,0,f,l;Địa chỉ,ADDRESS,150,0,f,l;Ngày bắt đầu,START_DATE,50,0,f,l",
			 "_gridSQL":"JOINT.GR1",//F004.G01
			 "_template":"F004" 
			};
_opts.en={
		  "_param":session_par,
		  "_filter": [		             
		            [ "cboCITY_CODE", "LST.CITY", "","Y","N","-1","--Tất cả--"],
				["cboDISTRICT_CODE","LST.DISTRICT","cboCITY_CODE", "Y","N","-1","--Tất cả--"],
				["cboWARDS_CODE","LST.WARDS","cboDISTRICT_CODE", "Y","Y","-1","--Tất cả--"]	            
	            
		   ],
	         "_onLoad":"",
	         "_type":3,
			 "_mode":"edit",
			 "_tableName":"JOINTS",
			 "_keyField":"JOINT_ID",
			 "_gridHeader":"JOINT_ID,JOINT_ID,0,0,t,l;Mã măng xông,JOINT_CODE,80,0,f,l;Địa chỉ,ADDRESS,150,0,f,l;Ngày bắt đầu,START_DATE,50,0,f,l",
			 "_gridSQL":"JOINT.GR1",//F004.G01
			 "_template":"F004" 
			};
