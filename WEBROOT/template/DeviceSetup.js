i18n_ims= i18n_ims || {};
i18n_ims.DeviceSetup={
    'vn': {        
        'title' : 'CÀI ĐẶT THIẾT BỊ'
	},
	'en': {        
        'title' : 'THÔNG TIN NHÀ TRẠM'
	}
};

var _opts = _opts || {};
_opts["DeviceSetup"] = {};
_opts["DeviceSetup"].vn={
		  "_container" : "slotInfo",
		  "_param":[],//session_par,
		  "_filter": [				
		              ],
	         "_mode":"edit",
			 "_tableName":"LST_DEVICE_CARD",
			 "_keyField":"CARD_ID",		
			 "_dGridId" : "grdCardList",
			 "_gridHeader" : "ID,CARD_ID,0,0,t,l;TYPE,INF_CARD_TYPE,0,0,t,l;INF_ID,INF_CARD_ID,0,0,t,l;#,SLOT_INDEX,20,0,ns,c;Loại card,PRODUCT_NUM,90,0,e,l;Mã Card,CARD_CODE,90,0,e,l;Serial,CARD_SERIAL,90,0,e,l",
			 "_gridSQL" : "SELECT A.*, C.INF_CARD_TYPE, C.PRODUCT_NUM FROM LST_DEVICE_CARD A, INF_DEVICE_CARD C  WHERE A.INF_CARD_ID=C.INF_CARD_ID(+) AND STATUS>0 AND DEVICE_ID = [P0] ORDER BY SLOT_INDEX",// "SLOT.G01",
			 "_comboList":[						
						],
			"_data": [
			            ["S","txt","SLOT_INDEX","R"],
			          	["N","txt","CARD_ID","E"],
			          	["N","cbo","INF_CARD_ID","E"],
			            ["S","txt","CARD_CODE","E"],
			            ["S","txt","CARD_SERIAL","E"],
			            ["N","txt","STATION_ID","P"],
			            ["N","txt","DEVICE_ID","P"]
			            ],
			 "_formSQL" : "SELECT * FROM LST_DEVICE_CARD WHERE CARD_ID = [0]",
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":[],//"POLE.D01",			 
			 "_saveButton": "btnSaveCard",			 
			 "_rowNum": 5,
			 "_rowList": [5,10],
			 "_listText":"slot_list",
			 _onSave : function (device_id) {
				 var sql_par = RSUtil.buildParam("P",[device_id]);				 
			 },
			 /*_onUpdate : function(device_id) {
			 },	
			 _onInsert : function() {				 
			 },*/	
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "txtSLOT_CODE","display" : "Mã Slot","rules" : "trim_required"}
				],
			 "_template":"DeviceSetup",
			};

