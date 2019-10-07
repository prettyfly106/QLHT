i18n_ims= i18n_ims || {};
i18n_ims.DeviceDetail={
    'vn': { 
	},
	'en': {
	}
};

var _opts = _opts || {};
_opts["DeviceDetail"] = {};
_opts["DeviceDetail"].vn={
		  "_container" : "portInfo",
		  "_param":[],//session_par,
		  "_filter": [
				["cboSLOT_INDEX","SELECT SLOT_INDEX, '#'||SLOT_INDEX FROM LST_DEVICE_CARD WHERE DEVICE_ID=[P0] AND INF_CARD_ID>0 ORDER BY SLOT_INDEX","", "Y", "N"],				
				["cboCARD_INDEX","SELECT INF_CARD_LOGIC_ID, '#[F0]/'||CARD_INDEX || ' (' || PORT_NUM || ' ' || PORT_PREFIX || ')' FROM INF_DEVICE_CARD_LOGIC WHERE INF_CARD_ID=(SELECT INF_CARD_ID FROM LST_DEVICE_CARD WHERE DEVICE_ID=[P0] AND SLOT_INDEX=[F0])","cboSLOT_INDEX", "Y", "Y"]
		              ],
	         "_mode":"edit",
			 "_tableName":"LST_DEVICE_PORT",
			 "_keyField":"PORT_ID",		
			 "_dGridId" : "grdPortList",
			 "_gridHeader" : "ID,PORT_ID,0,0,t,l;Mã Port,PORT_CODE,50,0,f,c;Loại port,CONNECTOR_TYPE,50,0,f,c;Port IP,PORT_IP,80,0,f,c;Mô tả,DESCRIPTION,160,0,f,l",
			 "_gridSQL" : "SELECT * FROM LST_DEVICE_PORT WHERE STATUS>0 AND DEVICE_ID = [P0] AND SLOT_INDEX=[F0] AND INF_CARD_LOGIC_ID=[F1]",// "SLOT.G01",
			 "_comboList":[
						],
			"_data": [			          	
			          	["N","txt","PORT_ID","E"],			          	
			            ["S","txt","PORT_CODE","E"],
			            ["S","txt","PORT_IP","E"],
			            ["S","txt","DESCRIPTION","E"],
			            ["S","txt","NOTE","E"],
			            ["N","txt","STATION_ID","P"],
			            ["N","txt","DEVICE_ID","P"]
			            ],
			 "_formSQL" : "SELECT * FROM LST_DEVICE_PORT WHERE PORT_ID = [0]",
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":[],//"POLE.D01",			 
			 "_saveButton": "btnSavePort",			 
			 "_rowNum": 8,
			 "_rowList": [8,16],
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
				{"name" : "txtPORT_CODE","display" : "Mã Slot","rules" : "trim_required"}
				],
			 "_template":"DeviceDetail",
			};

