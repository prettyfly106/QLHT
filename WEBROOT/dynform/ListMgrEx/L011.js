i18n_ims= i18n_ims || {};
i18n_ims.L011={
    'vn': {
    	'title' : 'QUẢN LÝ NHÓM NGƯỜI DÙNG',    	
    	'name' : 'Tên nhóm NSD'
	},
	'en': {
		'title' : 'USER GROUP MANAGEMENT',		
    	'name' : 'User group name'
	}
};
var _opts = {};
_opts.vn={
		  "_param":[],
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"ADM_USER_GROUP",
			 "_keyField":"USER_GROUP_ID",
			 "_gridHeader":"USER_GROUP_ID,USER_GROUP_ID,0,0,t,l;Tên nhóm NSD,USER_GROUP_NAME,100,0,f,l",
			 "_gridSQL":"USER_GROUP.GR1",//L011.G01
			 "_comboList":[
						],
			"_data": [
			            ["S","txt","USER_GROUP_NAME","E"]
			            ],
			 "_formSQL": "USER_GROUP.FR1",//L011.FR1
			 "_insertSQL":[],
			 "_deleteSQL":["USER_GROUP.DL1"],//L011.D01
			 "valid_ar": [ 
				{"name" : "txtUSER_GROUP_NAME","display" : "Tên nhóm","rules" : "trim_required"},
				],
			 "_template":"L011"
			};
_opts.en={
		  "_param":[],
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"ADM_USER_GROUP",
			 "_keyField":"USER_GROUP_ID",
			 "_gridHeader":"USER_GROUP_ID,USER_GROUP_ID,0,0,t,l;User group name,USER_GROUP_NAME,100,0,f,l;Note,INFO,100,0,f,l",
			 "_gridSQL":"L011.G01",
			 "_comboList":[
						],
			"_data": [
			            ["S","txt","USER_GROUP_NAME","E"]
			            ],
			 "_formSQL": "L011.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L011.D01"],
			 "valid_ar": [ 
				{"name" : "txtUSER_GROUP_NAME","display" : "User group name","rules" : "trim_required"},
				],
			 "_template":"L011"
			};