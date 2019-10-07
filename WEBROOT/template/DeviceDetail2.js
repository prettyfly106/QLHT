i18n_ims= i18n_ims || {};
i18n_ims.DeviceDetail={
    'vn': {        
        'title' : 'THÔNG TIN CỘT',
        'type' : 'Loại cột',
        'owner' : 'Đơn vị quản lý',
        'code' : 'Mã cột',
        'name' : 'Tên cột',
        'address' : 'Địa chỉ',       
        'note' : 'Ghi chú',
        'start_year' : 'Năm sử dụng',        
        'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường xã',
        'lat' : 'Vĩ độ',
        'lng' : 'Kinh độ'
	},
	'en': {        
        'title' : 'THÔNG TIN NHÀ TRẠM',
        'type' : 'Loại cột',
        'owner' : 'Đơn vị quản lý',
        'code' : 'Mã cột',
        'name' : 'Tên cột',
        'address' : 'Địa chỉ',
        'phone' : 'ĐT liên hệ',
        'note' : 'Ghi chú',
        'start_year' : 'Năm sử dụng',
        'locality' : 'Thuộc vùng',
        'city' : 'Tỉnh/TP',
        'district' : 'Quận/Huyện',
        'wards' : 'Phường xã',
        'lat' : 'Vĩ độ',
        'lng' : 'Kinh độ',
        'main_info': 'Thông tin chung',
        'device_info': 'Danh sách Thiết bị',
        'odf_info': 'Danh sách ODF'
	}
};

var _opts = _opts || {};
_opts["DeviceDetail"] = {};
_opts["DeviceDetail"].vn=[{
		  "_container" : "slotInfo",
		  "_param":[],//session_par,
		  "_filter": [],
	         "_mode":"edit",
			 "_tableName":"LST_DEVICE_SLOT",
			 "_keyField":"SLOT_ID",		
			 "_dGridId" : "grdSlotList",
			 "_gridHeader" : "ID,SLOT_ID,0,0,t,l;Mã Slot,SLOT_CODE,90,0,f,l",
			 "_gridSQL" : "SELECT * FROM LST_DEVICE_SLOT WHERE STATUS>0 AND DEVICE_ID = [P0]",// "SLOT.G01",
			 "_comboList":[
							["cboSLOT_ID","SELECT SLOT_ID, SLOT_CODE FROM LST_DEVICE_SLOT WHERE STATION_ID=[P0] AND DEVICE_ID=[P1]","", "", ""]
						],
			"_data": [
			          	["N","txt","SLOT_ID","E"],
			            ["S","txt","SLOT_CODE","E"],			           
			            ["N","txt","STATION_ID","P"],
			            ["N","txt","DEVICE_ID","P"]
			            ],
			 "_formSQL": "SELECT * FROM LST_DEVICE_SLOT WHERE SLOT_ID = [0]",//POLE.FR1
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":[],//"POLE.D01",
			 "_addNewButton": "btnAddSlot",
			 "_saveButton": "btnSaveSlot",
			 "_delButton": "btnDeleteSlot",
			 "_rowRum": 5,
			 "_rowList": [5,10],
			 "_listText":"slot_list",
			 _onSave : function (device_id) {
				 var sql_par = RSUtil.buildParam("P",[device_id]);
				 ComboUtil.getComboTag("cboSLOT_ID", "SELECT SLOT_ID, SLOT_CODE FROM LST_DEVICE_SLOT WHERE STATUS>0 AND DEVICE_ID = [P0]",sql_par,"",{},'sql', null);
				 ComboUtil.getComboTag("cboSLOT_ID1", "SELECT SLOT_ID, SLOT_CODE FROM LST_DEVICE_SLOT WHERE STATUS>0 AND DEVICE_ID = [P0]",sql_par,"",{},'sql', null);
				 var slot1 = $('#cboSLOT_ID1').val();
				 sql_par.push({"name":"[P1]","value":slot1});
				 ComboUtil.getComboTag("cboCARD_ID", "SELECT CARD_ID, CARD_CODE FROM LST_DEVICE_CARD WHERE STATUS>0 AND DEVICE_ID = [P0] AND SLOT_ID=[P1]",sql_par,"",{},'sql', null);
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
			 "_template":"DeviceDetail",
			},
			{
				  "_container" : "cardInfo",
				  "_param":[],//session_par,
				  "_filter": [				              	
				              ],
			         "_mode":"edit",
					 "_tableName":"LST_DEVICE_CARD",
					 "_keyField":"CARD_ID",		
					 "_dGridId" : "grdCardList",
					 "_gridHeader" : "ID,CARD_ID,0,0,t,l;Mã Card,CARD_CODE,90,0,f,l",
					 "_gridSQL" : "SELECT * FROM LST_DEVICE_CARD WHERE STATUS>0 AND DEVICE_ID = [P0]",// "CARD.G01",
					 "_comboList":[			               	
								],
					"_data": [
					          	["N","txt","CARD_ID","E"],
					            ["S","txt","CARD_CODE","E"],			           
					            ["N","txt","STATION_ID","P"],
					            ["N","txt","DEVICE_ID","P"]
					            ],
					 "_formSQL": "SELECT * FROM LST_DEVICE_CARD WHERE CARD_ID = [0]",//POLE.FR1
					 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
					 "_deleteSQL":[],//"POLE.D01",
					 "_addNewButton": "btnAddCard",
					 "_saveButton": "btnSaveCard",
					 "_delButton": "btnDeleteCard",
					 "_rowRum": 5,
					 "_rowList": [5,10],
					 "_listText":"card_list",
					 _onSave : function (device_id) {
						 var sql_par = RSUtil.buildParam("P",[device_id]);						
						 ComboUtil.getComboTag("cboSLOT_ID1", "SELECT SLOT_ID, SLOT_CODE FROM LST_DEVICE_SLOT WHERE STATUS>0 AND DEVICE_ID = [P0]",sql_par,"",{},'sql', null);
						 var slot1 = $('#cboSLOT_ID1').val();
						 sql_par.push({"name":"[P1]","value":slot1});
						 ComboUtil.getComboTag("cboCARD_ID", "SELECT CARD_ID, CARD_CODE FROM LST_DEVICE_CARD WHERE STATUS>0 AND DEVICE_ID = [P0] AND SLOT_ID=[P1]",sql_par,"",{},'sql', null);
					 },
					/* _onUpdate : function() {				 
					 },	
					 _onInsert : function() {				 
					 },	*/
					 _customButton:[			                
					                ],
					 "valid_ar": [ 
						{"name" : "txtCARD_CODE","display" : "Mã cột","rules" : "trim_required"}
						],
					 "_template":"DeviceDetail",
					}];

