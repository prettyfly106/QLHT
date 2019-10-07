i18n_ims= i18n_ims || {};
i18n_ims.L012={
    'vn': {    	
    	'provice' : 'Tỉnh/TP',
    	'centre' : 'Trung tâm VT',
    	'user_group' : 'Nhóm người dùng',
        'user_manager' : 'QUẢN LÝ NGƯỜI DÙNG',
        'user_name' : 'Tên đăng nhập',
        'full_name' : 'Tên hiển thị',
        'pass_word' : 'Mật khẩu',
        'user_level' : 'Mức truy cập HT',
        'pick_level' : '- Chọn mức truy cập -'
	},
	'en': {		
    	'provice' : 'City',
    	'centre' : 'Tech Centre',
    	'user_group' : 'User group',
		'user_manager' : 'USER MANAGEMENT',
        'user_name' : 'User name',
        'full_name' : 'Full name',
        'pass_word' : 'Password',
        'user_level' : 'Access level',
        'pick_level' : '- Select access level -'
	}
};
var _opts = {};
_opts.vn={
		  "_param":session_par,
			 "_filter":[			            
			            ["cboUSER_GROUP_ID", "SELECT USER_GROUP_ID, USER_GROUP_NAME FROM ADM_USER_GROUP","","Y","Y"],//L012.C02
			            ["cboCITY_CODE", "LST.CITY","","Y","Y"],//L012.C01
			            ["cboCENTER_ID", "LST.CENTRE","cboCITY_CODE","Y","N"]//L012.C01
			          ],
			 "_mode":"edit",
			 "_tableName":"ADM_USER",
			 "_keyField":"USER_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"USER_ID,USER_ID,0,0,t,l;Tên đăng nhập,USER_NAME,100,0,e,l;Tên hiển thị,FULL_NAME,100,0,e,l;Nhóm NSD,USER_GROUP_NAME,50,0,f,l;Trung Tâm VT,CENTER_NAME,100,0,f,l",
			 "_gridSQL":"USER.GR1",//L012.G01
			 "_comboList":[
						],
			"_data": [
			            ["S","txt","USER_NAME","E",""],
			            ["S","txt","FULL_NAME","E",""],
			            ["S","txt","USER_PWD","E",""],			            
			            ["S","cbo","USER_GROUP_ID","I",""],
			            ["N","cbo","CITY_CODE","I",""],
			            ["N","cbo","CENTER_ID","E",""],			            
			            ["S","cbo","USER_LEVEL","E",""]
			            ],
			 "_formSQL": "USER.FR1",//L012.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["USER.DL1"],//L012.D01
			 "valid_ar": [ 
				{"name" : "txtUSER_NAME","display" : "Tên đăng ký","rules" : "trim_required"},
				{"name" : "txtFULL_NAME","display" : "Tên hiển thị","rules" : "trim_required"},				
				{"name" : "txtUSER_PWD","display" : "Mật khẩu","rules" : "trim_required"}
				],
			 "_template":"L012"
			};
_opts.en={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"ADM_USER",
			 "_keyField":"USER_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"USER_ID,USER_ID,0,0,t,l;User name,USER_NAME,100,0,f,l;Full name,FULL_NAME,100,0,f,l;User group,USER_GROUP_NAME,50,0,f,l",
			 "_gridSQL":"L012.G01",
			 "_comboList":[
							["cboCITY_CODE", "L012.C01","","","",""],
							["cboUSER_GROUP_ID", "L012.C02","","","",""]
						],
			"_data": [
			            ["S","txt","USER_NAME","E",""],
			            ["S","txt","FULL_NAME","E",""],
			            ["S","txt","USER_PWD","E",""],
			            ["S","cbo","COMPANY_ID","E",""],
			            ["S","cbo","USER_GROUP_ID","E",""],
			            ["S","cbo","USER_LEVEL","E",""],
			            ["S","txt","INSR_USER_NAME","E",""],
			            ["S","txt","INSR_USER_PWD","E",""]
			            ],
			 "_formSQL": "L012.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L012.D01"],
			 "valid_ar": [ 
				{"name" : "txtUSER_NAME","display" : "User name","rules" : "trim_required"},
				{"name" : "txtFULL_NAME","display" : "Full name","rules" : "trim_required"},
				{"name" : "cboCOMPANY_ID","display" : "User group","rules" : "trim_required"},
				{"name" : "txtUSER_PWD","display" : "Password","rules" : "trim_required"}
				],
			 "_template":"L012"
			};