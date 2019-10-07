i18n_ims = i18n_ims || {};
i18n_ims.StationInfo = {
	'vn' : {
		'title' : 'THÔNG TIN NHÀ TRẠM',
		'type' : 'Loại nhà trạm',
		'owner' : 'Đơn vị quản lý',
		'code' : 'Mã nhà trạm',
		'name' : 'Tên nhà trạm',
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
		'main_info' : 'Thông tin chung',
		'device_info' : 'Thiết bị mạng',
		'dc_device_info' : 'Thiết bị nhà trạm',
		'accessory_info' : 'Thiết bị phụ trợ',
		'odf_info' : 'ODF',
		'device_type_group' : 'Nhóm loại TB',
		'device_type' : 'Loại TB',
		'device_code' : 'Mã TB',
		'device_name' : 'Tên TB',
		'device_class' : 'Cấp TB',
		'manufacture' : 'Nhà sản xuất',
		'inf_device' : 'Chủng loại TB',
		'start_date' : 'Ngày SD',
		'odf_code' : 'Mã ODF',
		'capacity' : 'Số port',
		'door_sensor': 'Cảm biến mở cửa',
		'smoke_sensor': 'Cảm biến khói',
		'fire_sensor': 'Cảm biến cháy',
		'captured_camera': 'Camera Giám sát',
		'thermometer': 'Nhiệt kế',
		'fan': 'Quạt thông gió',
		'tension': 'Điện áp',
		'centre': 'Trung tâm VT',
		'setup' : 'Cài đặt'
	},
	'en' : {
		'title' : 'THÔNG TIN NHÀ TRẠM',
		'type' : 'Loại nhà trạm',
		'owner' : 'Đơn vị quản lý',
		'code' : 'Mã nhà trạm',
		'name' : 'Tên nhà trạm',
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
		'main_info' : 'Thông tin chung',
		'device_info' : 'Thiết bị mạng',
		'dc_device_info' : 'Thiết bị nhà trạm',
		'accessory_info' : 'Thiết bị phụ trợ',
		'odf_info' : 'ODF',
		'device_type_group' : 'Nhóm loại TB',
		'device_type' : 'Loại TB',
		'device_code' : 'Mã TB',
		'device_name' : 'Tên TB',
		'device_class' : 'Cấp TB',
		'manufacture' : 'Nhà sản xuất',
		'inf_device' : 'Chủng loại TB',
		'start_date' : 'Ngày SD',
		'odf_code' : 'Mã ODF',
		'capacity' : 'Số port',
		'door_sensor': 'Cảm biến mở cửa',
		'smoke_sensor': 'Cảm biến khói',
		'fire_sensor': 'Cảm biến cháy',
		'captured_camera': 'Camera Giám sát',
		'thermometer': 'Nhiệt kế',
		'fan': 'Quạt thông gió',
		'tension': 'Điện áp',
		'centre': 'Trung tâm VT'
	}
};

var _opts = _opts || {};
_opts["StationInfo"] = {};
_opts["StationInfo"].vn = {
	"_container" : "mainInfo",
	"_param" : session_par,
	"_filter" : [],
	"_mode" : "edit",
	"_tableName" : "STATIONS",
	"_keyField" : "STATION_ID",
	"_markerList" : "stations",
	"_getListFunc" : "getStations",
	"_comboList" : [
			[ "cboSTATIONTYPE_ID","LST.STATIONTYPE","", "", "" ],// STATION.C01
			[ "cboOWNER_ID", "LST.OWNER", "","", "" ],// STATION.C02
			[ "cboLOCALITY_ID",	"LST.LOCALITY", "",	"", "" ],// STATION.C03
			[ "cboCITY_CODE", "LST.CITY", "","", "" ],// LST.CITY
			["cboDISTRICT_CODE","LST.DISTRICT","cboCITY_CODE", "", "" ],
			["cboWARDS_CODE","LST.WARDS","cboDISTRICT_CODE", "", "" ]			
	],
	"_data" : [ [ "N", "txt", "STATION_ID", "E" ],
			[ "N", "cbo", "STATIONTYPE_ID", "E" ],
			[ "N", "cbo", "OWNER_ID", "E" ],
			[ "S", "txt", "STATION_CODE", "E" ],
			[ "S", "txt", "STATION_NAME", "E" ],
			[ "S", "txt", "STATION_ADDRESS", "E" ],
			[ "N", "txt", "START_YEAR", "E" ], [ "S", "txt", "NOTE", "E" ],
			[ "S", "txt", "CONTACT_PHONE", "E" ],
			[ "N", "cbo", "LOCALITY_ID", "E" ],
			[ "S", "cbo", "CITY_CODE", "E" ],
			[ "S", "cbo", "DISTRICT_CODE", "E" ],
			[ "S", "cbo", "WARDS_CODE", "E" ],
			[ "S", "cbo", "CENTRE_ID", "E" ],
			[ "S", "txt", "LATITUDE", "E" ],
			[ "S", "txt", "LONGITUDE", "E" ],[ "S", "txt", "CITY_NAME", "R" ],[ "S", "txt", "DISTRICT_NAME", "R" ],[ "S", "txt", "WARDS_NAME", "R" ]],			
	"_formSQL" : "STATION.FR1",// STATION.FR1
	"_insertSQL" : [],// ["INSERT INTO ORG_COMPANY (COMPANY_ID,
						// COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME,
						// DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES
						// (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
	"_deleteSQL" : [],// "STATION.D01"
	_afterLoad : function(object_id) {		
		if (user_type==2 && !$('#cboCITY_CODE').val()) {			
			$('#cboCITY_CODE').append(String.format('<option value="-1">{0}</option>', $('#txtCITY_NAME').val())).val(-1);
			$('#cboDISTRICT_CODE').append(String.format('<option value="-1">{0}</option>', $('#txtDISTRICT_NAME').val())).val(-1);
			$('#cboWARDS_CODE').append(String.format('<option value="-1">{0}</option>', $('#txtWARDS_NAME').val())).val(-1);
		}
		var _city_code = $('#cboCITY_CODE').val();
		var _centre_id = $('#cboCENTRE_ID').val();
		if (!object_id || user_type ==1 || user_type==2 && _city_code == province_id || user_type==3 && (_centre_id==center_id || _centre_id== null || _centre_id == '0')) {
			if (object_id) {
				$('#btnDelete').show();
			}
			else {
				$('#btnDelete').hide();
			}
			$('#btnGeoCode,#btnConnectManager,#btnSave,#btnNewDevice,#btnSaveDevice,#btnNewDCDevice,#btnSaveDCDevice,#btnSaveAccessory,#btnNewODF,#btnSaveODF').show();
		}
		else {			
			$('#btnGeoCode,#btnConnectManager,#btnSave,#btnDelete,#btnNewDevice,#btnSaveDevice,#btnNewDCDevice,#btnSaveDCDevice,#btnSaveAccessory,#btnNewODF,#btnSaveODF').hide();
		}
	},
	_onLoad : function(object_id) {
		$('#cboCITY_CODE').on('change',function() {
			var sql_par=setSysParam([{name:"[P0]", value: $(this).val()}]);			
			ComboUtil.getComboTag("cboCENTRE_ID", "LST.CENTRE",sql_par,"",{value:0,text:"Chưa chọn trung tâm"},'sql', null);			
		});
		var par = RSUtil.buildParam("",[object_id]);		
		jsonrpc.AjaxJson.ajaxExecuteQueryO('SELECT * FROM DC_ACCESSORIES WHERE STATION_ID=[0]',par,function(data) {
			var rt = $.parseJSON(data);			
			if (rt && rt[0]) {
				$('#chkDOOR_SENSOR').prop('checked', rt[0].DOOR_SENSOR == 1);
				$('#chkSMOKE_SENSOR').prop('checked', rt[0].SMOKE_SENSOR == 1);
				$('#chkFIRE_SENSOR').prop('checked', rt[0].FIRE_SENSOR == 1);
				$('#chkCAPTURED_CAMERA').prop('checked', rt[0].CAPTURED_CAMERA == 1);
				$('#THERMOMETER').prop('checked', rt[0].THERMOMETER == 1);
				$('#FAN').prop('checked', rt[0].FAN);
			}
		});
		$('#btnSaveAccessory').off().on("click",  function(e) {
			var station_id = home.objectId.StationInfo;			
			var rt;
			if (station_id) {
				var sql_par = RSUtil.buildParam("",[station_id,
				                                    $('#chkDOOR_SENSOR').is(':checked')? 1: 0,
				                                    $('#chkSMOKE_SENSOR').is(':checked')? 1: 0,
				                                    $('#chkFIRE_SENSOR').is(':checked')? 1: 0,
				                                    $('#chkCAPTURED_CAMERA').is(':checked')? 1: 0,
				                                    $('#THERMOMETER').is(':checked')? 1: 0,
				                                    $('#FAN').is(':checked')? 1: 0]);
				rt=jsonrpc.AjaxJson.execute('UPDATE DC_ACCESSORIES SET DOOR_SENSOR=[1], SMOKE_SENSOR=[2], FIRE_SENSOR=[3], CAPTURED_CAMERA=[4], THERMOMETER=[5], FAN=[6] WHERE STATION_ID=[0]',sql_par);
			}			
			if (rt) {
				$.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});
			}
		});
		$("#btnConnectManager").off().on(
				"click",
				function(e) {
					if (!$(this).is(":visible")) return;
					$("#connectInfo").addClass("open");						
					$('#connectInfo').load(
							'../template/StationConnect.tpl',
							function() {
								window.$source_list = $('#couplers_list');
								window.$target_list = $('#cables_list');
								window.$_source_list= $('#source_list');
							    window.$_target_list = $('#target_list');
								window.$connector_list = $('#connector_list');
								$('#connector_list,#source_list,#target_list').mouseenter(function(){ MOUSE_OVER=true; });
								$('#connector_list,#source_list,#target_list').mouseleave(function(){ MOUSE_OVER=false; });
								$('#connector_list,#source_list,#target_list').bind('mousewheel', function(e){							  
								  var delta = e.originalEvent.wheelDelta;								  
								  if(delta < 0){									 
									 var scollHeight = $connector_list.scrollTop() + 25;									
									 $connector_list.scrollTop(scollHeight);									
								  }
								  else{									
									var scollHeight = $connector_list.scrollTop() - 25;									
									$connector_list.scrollTop(scollHeight);
								  }								  
								  repaintConnector();
								  //instant.repaintEverything();
								});
								$('#btnSaveConnect').on('click',function(e) {
									var odf_indoor_id = $('#cboFROM').val();
									var cableline_id = $('#cboTO').val();
									var couplers = [];
									var cable_ids = [];
									var rt;
									$.each(instant.getAllConnections(),function(i,v) {
										couplers.push(v.sourceId.substr(v.sourceId.indexOf('_')+1));
										cable_ids.push(v.targetId.substr(v.targetId.indexOf('_')+1));
									});									
									if (couplers.length>0) {
										rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call CREATE_ODF_CABLE_CONNECTOR(?2L,?3L,?4S,?5L,?6S)}",[odf_indoor_id, object_id,couplers.join(','),cableline_id,cable_ids.join(',')].join('$'));
									}
									else {
										var cf = confirm("Tất cả các kết nối đều bị ngắt. Bạn có chắc chắn hay không?");
										if (cf) {
											var rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call CREATE_ODF_CABLE_CONNECTOR(?2L,?3L,?4S,?5L,?6S)}",[odf_indoor_id,object_id, '',cableline_id,''].join('$'));
										}
										else {
											return;
										}
									}
									if (rt>0) {										 
										 $.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});
									 }
									 else {
										 $.toaster({ title : $.i18n("system"), priority : 'warning', message : $.i18n("save_unsuccess"), settings : { timeout: 3000}});
									 }
								});
								$('#btnConnect').on('click',function(e) {
									var sourceFrom = $('#txtSourceFrom').val();
									var sourceTo = $('#txtSourceTo').val();
									var targetFrom = $('#txtTargetFrom').val();
									var targetTo = $('#txtTargetTo').val();
									var j=targetFrom;
									for(i=sourceFrom;i<=sourceTo;i++) {
										if (j>targetTo) return;										
										$source=$('#coupler_'+i);
										$target=$('div[type="target"][index$="'+(j-1)+'"]');
										if ($source.length>0 && $target.length>0) {
											connect('coupler_'+i,$target.attr('id'));
											j++;
										}
									}
									var endpoint_size = instant.getAllConnections().length;
									if (endpoint_size%2==1 && endpoint_size>24 && !$('#source_list').first().hasClass("jtk-endpoint-anchor")) {
										$('#source_list').prepend($('<div class="end-point">'));
										$('#target_list').prepend($('<div class="end-point">'));
									}
									repaintConnector();
									//instant.repaintEverything();
								});
								$('#btnDisconnect').on('click',function(e) {
									var connectors = instant.getAllConnections();
									i = connectors.length-1;
									while (i>=0) {
										disConnect(connectors[i]);
										i--;
									}
									instant.reset();
									
								});								
								function reloadConnectorList() {
									odf_indoor_id = $('#cboFROM').val();
									cable_id = $('#cboTO').val();
									var sql_par = RSUtil.buildParam("",[odf_indoor_id,object_id]);
									$dCoupler = $('#couplers_list');
									$dCoupler.empty();
									jsonrpc.AjaxJson.ajaxExecuteQueryO("SELECT * FROM (SELECT A.COUPLER, A.NOTE, B.CABLELINE_ID, B.CABLE_ID FROM (SELECT * FROM ODF_INDOOR_COUPLERS WHERE ODF_INDOOR_ID=[0] AND STATION_ID=[1]) A, (SELECT * FROM  ODF_INDOOR_CABLE_CONNECTOR WHERE STATION_ID=[1]) B WHERE A.ODF_INDOOR_ID = B.ODF_INDOOR_ID(+) AND A.STATION_ID = B.STATION_ID(+) AND A.COUPLER=B.COUPLER(+) ORDER BY A.COUPLER) WHERE CABLE_ID IS NULL", sql_par,function(rt){//CONNECT.003
										list = $.parseJSON(rt);
										if (list.length>0) {
											$.each(list,function(i,coupler) {
												if (!coupler.CABLELINE_ID)
													$dCoupler.append(String.format("<div class='circle' id='{0}' index={1} type='source' draggable='true' ondragstart='drag(event)' ondrop='sourceConnect(event)' ondragover='allowDropSource(event)'>{2}</div>",'coupler_' + coupler.COUPLER,coupler.COUPLER-1,coupler.COUPLER));												
											});
											$('#txtSourceFrom,#txtSourceTo').attr('min',list[0].COUPLER);
											$('#txtSourceFrom').val(list[0].COUPLER);
											$('#txtSourceFrom,#txtSourceTo').attr('max',list[list.length-1].COUPLER);
											$('#txtSourceTo').val(list[list.length-1].COUPLER);
										}										
									});
									sql_par = RSUtil.buildParam("",[cable_id,object_id]);
									$dCable = $('#cables_list');
									$dCable.empty();									
									jsonrpc.AjaxJson.ajaxExecuteQueryO("SELECT * FROM (SELECT A.CABLE_ID, A.CABLE_INDEX, B.ODF_INDOOR_ID, B.COUPLER FROM (SELECT * FROM CABLES WHERE CABLELINE_ID=[0]) A, (SELECT * FROM ODF_INDOOR_CABLE_CONNECTOR WHERE STATION_ID=[1]) B WHERE A.CABLELINE_ID=B.CABLELINE_ID(+)AND A.CABLE_ID=B.CABLE_ID(+) ORDER BY A.CABLE_INDEX) WHERE ODF_INDOOR_ID IS NULL", sql_par,function(rt){//CONNECT.004
										list = $.parseJSON(rt);										
										if (list.length>0) {
											$.each(list,function(i,cable) {
												if (!cable.ODF_INDOOR_ID)
													$dCable.append(String.format("<div class='circle' id='{0}' index='{1}' type='target' draggable='true' ondragstart='drag(event)' ondrop='targetConnect(event)' ondragover='allowDropTarget(event)'>{2}</div>",'cable_' + cable.CABLE_ID,cable.CABLE_INDEX,parseInt(cable.CABLE_INDEX)+1));												
											});
											$('#txtTargetFrom,#txtTargetTo').attr('min',parseInt(list[0].CABLE_INDEX)+1);
											$('#txtTargetFrom').val(parseInt(list[0].CABLE_INDEX)+1);
											$('#txtTargetFrom,#txtTargetTo').attr('max',parseInt(list[list.length-1].CABLE_INDEX)+1);
											$('#txtTargetTo').val(parseInt(list[list.length-1].CABLE_INDEX)+1);
										}
									});
									sql_par = RSUtil.buildParam("",[odf_indoor_id,cable_id]);
									jsonrpc.AjaxJson.ajaxExecuteQueryO("SELECT A.COUPLER, A.CABLE_ID, B.CABLE_INDEX  FROM ODF_INDOOR_CABLE_CONNECTOR A, CABLES B WHERE A.CABLE_ID=B.CABLE_ID AND ODF_INDOOR_ID=[0] AND A.CABLELINE_ID=[1] ORDER BY A.COUPLER", sql_par,function(rt){//CONNECT.005
										list = $.parseJSON(rt);
										$source = $('#source_list');
										$source.empty();
										$target = $('#target_list');
										$target.empty();
										connector_list = [];
										instant.reset();
										$.each(list,function(i,connector) {
											var sourceId = 'coupler_' + connector.COUPLER;
											var targetId = 'cable_' + connector.CABLE_ID; 
											$source.append(String.format("<div class='end-point' index='{0}' type='source' id='{1}' draggable='true' ondragstart='drag(event)' ondrop='sourceConnect(event)' ondragover='allowDropSource(event)'>{2}</div>",parseInt(connector.COUPLER)-1,sourceId,connector.COUPLER));
											$target.append(String.format("<div class='end-point' index='{0}' type='target' id='{1}' draggable='true' ondragstart='drag(event)' ondrop='targetConnect(event)' ondragover='allowDropTarget(event)'>{2}</div>",connector.CABLE_INDEX,targetId,parseInt(connector.CABLE_INDEX)+1));
											instant.connect({source:sourceId,target:targetId});								
										});
										repaintConnector();
									});
								}
								$('#cboFROM,#cboTO').on("change",function(e){
									reloadConnectorList();									
								});
								var sql_par = RSUtil.buildParam("",[object_id,0]);
								ComboUtil.getComboTag("cboFROM","SELECT ODF_INDOOR_ID, ODF_INDOOR_CODE || ' (' || CAPACITY || ' port)' FROM LST_ODF_INDOOR WHERE STATION_ID=[0] AND STATUS>0",sql_par,"",{},"sql");//CONNECT.001								$('#cboFROM')
								ComboUtil.getComboTag("cboTO","SELECT CABLELINE_ID, CABLELINE_CODE || ' (' || CAPACITY || 'FO)' FROM CABLELINES WHERE CABLELINE_ID IN (SELECT CABLELINE_ID FROM CABLELINE_DETAIL WHERE NODE_ID=[0] AND NODE_TYPE=[1]) AND STATUS>0",sql_par,"",{},"sql");//CONNECT.002
								$('#cboTO').change();
							});
						
				});
	},
	_onUpdate : function() {
		$("#tDevice,#tODF").removeClass("disabled");		
		$("#btnDelete").show();
		if (!current.info) current.info= {};
		current.info.name = $('#txtSTATION_NAME').val();
		current.info.code = $('#txtSTATION_CODE').val();
		current.info.address = $('#txtSTATION_ADDRESS').val();		
	},
	_onInsert : function() {
		$("#tDevice,#tODF").addClass("disabled");
		$("#btnDelete").hide();
		if (!current.info) current.info= {};
		current.info.name = $('#txtSTATION_NAME').val();
		current.info.code = $('#txtSTATION_CODE').val();
		current.info.address = $('#txtSTATION_ADDRESS').val();		
	},
	/*_onDelete : function() {
	},*/
	_customButton : [],
	"valid_ar" : [ {
		"name" : "txtSTATION_CODE",
		"display" : "Mã nhà trạm",
		"rules" : "trim_required",
		"checkExist":"N"
	}, {
		"name" : "txtSTATION_NAME",
		"display" : "Tên nhà trạm",
		"rules" : "trim_required"
	}, {
		"name" : "txtSTATION_ADDRESS",
		"display" : "Địa chỉ nhà trạm",
		"rules" : "trim_required"
	} ],
	"_template" : "StationInfo",
	"_child" : [
			{
				"_container" : "deviceInfo",
				"_filter" : [],
				"_mode" : "edit",
				"_tableName" : "DEVICES",
				"_keyField" : "DEVICE_ID",
				"_parentField" : "STATION_ID",
				"_dGridId" : "grdDevice",
				"_gridHeader" : "STATION_ID,STATION_ID,0,0,t,l;ID,DEVICE_ID,0,0,t,l;INF_DEVICE_ID,INF_DEVICE_ID,0,0,t,l;Nhóm Loại TB,DEVICETYPE_GROUP_NAME,90,0,f,l;Loại TB,DEVICETYPE_NAME,90,0,f,l;Mã TB,DEVICE_CODE,75,0,f,l;Serial,SERIAL,75,0,f,l;IP,IP_ADDRESS,95,0,f,l",
				"_gridSQL" : "SELECT D.*, T.DEVICETYPE_NAME, G.DEVICETYPE_GROUP_NAME FROM DEVICES D, LST_DEVICETYPE T, LST_DEVICETYPE_GROUP G WHERE D.DEVICETYPE_ID = T.DEVICETYPE_ID AND D.DEVICETYPE_GROUP_ID = G.DEVICETYPE_GROUP_ID AND STATUS>0 AND STATION_ID=[P0]",// "DEVICE.G01",
				"_comboList" : [
						[
								"cboDEVICETYPE_GROUP_ID",
								"SELECT DEVICETYPE_GROUP_ID, DEVICETYPE_GROUP_NAME FROM LST_DEVICETYPE_GROUP",
								"", "", "" ],// DEVICE.C01
						[
								"cboDEVICETYPE_ID",
								"SELECT DEVICETYPE_ID, DEVICETYPE_NAME FROM LST_DEVICETYPE WHERE DEVICETYPE_GROUP_ID=[P0] ",
								"cboDEVICETYPE_GROUP_ID", "", "" ],// DEVICE.C02
						[ "cboMANUFACTURE_ID","SELECT MANUFACTURE_ID, MANUFACTURE_NAME FROM LST_MANUFACTURE","", "", "" ],
						[
							"cboINF_DEVICE_ID",
							"SELECT INF_DEVICE_ID, PRODUCT_NUM FROM INF_DEVICE WHERE DEVICETYPE_ID=[P0] AND MANUFACTURE_ID=[P1]",
							"cboDEVICETYPE_ID,#cboMANUFACTURE_ID", "","" ]

				],
				"_data" : [ [ "N", "txt", "DEVICE_ID", "I" ],
						[ "N", "txt", "STATION_ID", "I" ],
						[ "N", "cbo", "DEVICETYPE_GROUP_ID", "E" ],
						[ "N", "cbo", "DEVICETYPE_ID", "E" ],
						[ "S", "txt", "DEVICE_CODE", "E" ],
						[ "S", "txt", "SUBCLASS", "E" ],
						[ "N", "cbo", "MANUFACTURE_ID", "E" ],
						[ "N", "cbo", "INF_DEVICE_ID", "E" ],
						[ "S", "txt", "SERIAL", "E" ],
						[ "S", "txt", "IP_ADDRESS", "E" ],
						[ "DT", "txt", "START_DATE", "E" ] ],
				"_formSQL" : "SELECT * FROM DEVICES WHERE DEVICE_ID = [0]",// DEVICE.FR1
				"_insertSQL" : [],// ["INSERT INTO ORG_COMPANY (COMPANY_ID,
									// COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME,
									// DB_NAME, DB_SCHEMA,PROVINCE_ID,
									// HOSPITAL_ID) VALUES
									// (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
				"_deleteSQL" : [],// "STATION.D01"
				"_buttonList" : [ {
					"id" : "btnNewDevice",
					"action" : "newEditorData",
					"onAction" : function() {
						$("#btnDeleteDevice").hide();
					}
				}, {
					"id" : "btnSaveDevice",
					"action" : "saveEditorData",
					"reloadGrid" : true,
					"onAction" : function(id) {						
						//var rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call INIT_DEVICE_SETUP(?2L)}",id);
						if (id > 0) {							 
							$("#btnDeleteDevice,#btnDeviceDetail,#btnDeviceSetup").show();
						}
						else
							$("#btnDeleteDevice,#btnDeviceDetail,#btnDeviceSetup").hide();
					}
				}, {
					"id" : "btnDeleteDevice",
					"action" : "deleteData",
					"reloadGrid" : true,
					"resetCtl" : true,
					"onAction" : function(id) {
						$("#btnDeleteDevice").hide();
					}
				} ],
				_onLoad : function() {
					$("#btnDeviceDetail,#btnDeviceSetup").hide();
				},
				_onResetForm : function() {
					$("#btnDeviceDetail,#btnDeviceSetup").hide();
					$("#deviceDetail").removeClass("open");
				},
				_onSelect : function(obj) {
					$("#deviceDetail").removeClass("open");
					$("#btnDeleteDevice,#btnDeviceSetup,#btnDeviceDetail").show();					
					$("#btnDeviceSetup").off().on("click",function(e) {								
						$("#deviceDetail").addClass("open");
						loadAsync('../template/DeviceSetup.js', function(){
							$('#deviceDetail').load('../template/DeviceSetup.tpl',function() {
								var station_id= obj.STATION_ID;
								var device_id = obj.DEVICE_ID;
								var inf_device_id = obj.INF_DEVICE_ID;										
								var _sql_par = RSUtil.buildParam("P", [station_id, device_id, inf_device_id]);										
								if (device_id && device_id != "") {
									var lastSel = null;
									var lastSelCard = null;
									var opt= _opts.DeviceSetup[_lang];											
									var btnSaveButton =$('#'+opt._saveButton);									
									var $grid=GridUtil.init(opt._dGridId,"420","100%",$.i18n("list"),false,opt._gridHeader);
									ComboUtil.getComboTag("cboINF_CARD_ID","SELECT INF_CARD_ID, PRODUCT_NUM FROM INF_DEVICE_CARD WHERE INSTR(','||DEVICE_COMPATIBLE||',', ','||[P2]||',')>0 AND INF_CARD_TYPE>0 ",_sql_par,"",{value:0,text:"Slot trống"},"sql");
									$grid.setGridParam({										
							    		ondblClickRow: function(rowId){										    			
							    			if (rowId) {
							    				var _grid = $(this);
							    				var _obj = _grid.jqGrid('getRowData', rowId);									    				
							    				if (_obj.INF_CARD_TYPE!="0") {									    					
							    					var id = _obj[opt._keyField];									    				
							    					lastSelCard = _obj.INF_CARD_ID;							    					
								    				home.loadEditorData(id,opt._formSQL,opt._data, opt._container,opt._prefix);
							    				}									    												    				
							    			}
							    		},
							    		rowNum:opt._rowNum,rowList: opt._rowList
							    	});									
									home.loadGridData(opt,device_id);											
									if (!$._data( btnSaveButton[0], 'events' )) {													
										btnSaveButton.on("click",{option:opt},function(e){
											var _opt = e.data.option;
											var obj = new Object();
											var cf=true;
											FormUtil.setFormToObject(_opt._container,_opt._prefix || "", obj);
											if (lastSelCard != "0" && obj.INF_CARD_ID != lastSelCard) {
												cf = confirm("Toàn bộ thông tin port sẽ bị xóa khi thay đổi card, bạn có chắc chắn hay không?");
											}
											if (cf) {																								    	
												var _par = [obj.CARD_ID, obj.INF_CARD_ID,obj.CARD_CODE, obj.CARD_SERIAL];													
												var rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call INSERT_DEVICE_CARD(?2L,?3L,?4S,?5S)}",_par.join('$'));
												if (rt != '0') {        	
										        	$.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});
										        	home.loadGridData(_opt,device_id);
										        }
										        else {
										        	$.toaster({ title : $.i18n("system"), priority : 'warning', message : $.i18n("save_unsuccess"), settings : { timeout: 3000}});											        	
										        }
											}
										});
									}
									
								}							
							});			
					    });
					});
					$("#btnDeviceDetail").off().on("click",function(e) {								
						$("#deviceDetail").addClass("open");
						loadAsync('../template/DeviceDetail.js', function(){
							$('#deviceDetail').load('../template/DeviceDetail.tpl',function() {
								var station_id= obj.STATION_ID;
								var device_id = obj.DEVICE_ID;
								var inf_device_id = obj.INF_DEVICE_ID;										
								var _sql_par = RSUtil.buildParam("P", [device_id, inf_device_id]);										
								if (device_id && device_id != "") {
									var lastSel = null;
									var lastSelCard = null;
									var opt= _opts.DeviceDetail[_lang];											
									var btnSaveButton =$('#'+opt._saveButton);
									var $grid=GridUtil.init(opt._dGridId,"420","100%",$.i18n("list"),false,opt._gridHeader);
									$grid.attr("sql",opt._gridSQL);									
									$grid.setGridParam({										
							    		ondblClickRow: function(rowId){										    			
							    			if (rowId) {
							    				var _grid = $(this);
							    				var _obj = _grid.jqGrid('getRowData', rowId);
							    				var id = _obj[opt._keyField];
								    			home.loadEditorData(id,opt._formSQL,opt._data, opt._container,opt._prefix);							    												    												    				
							    			}
							    		},
							    		rowNum:opt._rowNum,rowList: opt._rowList
							    	});
									home.loadFilter(opt._filter, opt._dGridId,_sql_par);
									//home.loadGridData(opt,device_id);											
									if (!$._data( btnSaveButton[0], 'events' )) {													
										btnSaveButton.on("click",{option:opt},function(e){
											var _opt = e.data.option;
											var obj = new Object();											
											FormUtil.setFormToObject(_opt._container,_opt._prefix || "", obj);
											var _object_id = obj[_opt._keyField];
											var rt=home.saveData(_opt, _object_id,obj);
											if (rt != '0' && rt != 'null') { 
									        	home.loadGridData(_opt,device_id);
									        }									        
										});
									}
									
								}							
							});			
					    });
					});
					
				},
				_customButton : [],
				"valid_ar" : [ {
					"name" : "txtDEVICE_CODE",
					"display" : "Mã Thiết bị",
					"rules" : "trim_required",
					"checkExist":"N"
				},
				{
					"name" : "txtINF_DEVICE_ID",
					"display" : "Chủng loại TB",
					"rules" : "trim_required"
				},
				{
					"name" : "txtSUBCLASS",
					"display" : "Cấp Thiết bị",
					"rules" : "trim_required"
				}, {
					"name" : "txtMANUFACTURER",
					"display" : "Nhà sản xuất",
					"rules" : "trim_required"
				}, {
					"name" : "txtSERIAL",
					"display" : "Serial",
					"rules" : "trim_required"
				}, {
					"name" : "txtIP_ADDRESS",
					"display" : "IP",
					"rules" : "trim_required"
				}, {
					"name" : "txtSTART_DATE",
					"display" : "Ngày SD",
					"rules" : "trim_required"
				}

				]
			},
			{
				"_container" : "DCDeviceInfo",
				"_prefix" : "dc_",
				"_filter" : [],
				"_mode" : "edit",
				"_tableName" : "DC_DEVICES",
				"_keyField" : "DC_DEVICE_ID",
				"_parentField" : "STATION_ID",
				"_dGridId" : "grdDCDevice",
				"_gridHeader" : "ID,DC_DEVICE_ID,0,0,t,l;Nhóm Loại TB,DC_DEVICE_GROUP_NAME,120,0,f,l;Mã TB,DC_DEVICE_CODE,100,0,f,l;Hãng sản xuất,MANUFACTURE,100,0,f,l;Serial,SERIAL,100,0,f,l",
				"_gridSQL" : "SELECT D.*, G.DC_DEVICE_GROUP_NAME FROM DC_DEVICES D,  LST_DC_DEVICE_GROUP G WHERE D.DC_DEVICE_GROUP_ID = G.DC_DEVICE_GROUP_ID AND STATUS>0 AND STATION_ID=[P0]",// "DEVICE.G01",
				"_comboList" : [
						[
								"dc_cboDC_DEVICE_GROUP_ID",
								"SELECT DC_DEVICE_GROUP_ID, DC_DEVICE_GROUP_NAME FROM LST_DC_DEVICE_GROUP",
								"", "", "" ],// DEVICE.C01
				],
				"_data" : [ [ "N", "txt", "DC_DEVICE_ID", "I" ],
						[ "N", "txt", "STATION_ID", "I" ],
						[ "N", "cbo", "DC_DEVICE_GROUP_ID", "I" ],						
						[ "S", "txt", "DC_DEVICE_CODE", "E" ],						
						[ "S", "txt", "MANUFACTURE", "E" ],
						[ "S", "txt", "SERIAL", "E" ],						
						[ "DT", "txt", "START_DATE", "E" ],
						[ "S", "txt", "TENSION", "E" ],
						[ "S", "txt", "CAPACITY", "E" ],
						[ "N", "txt", "QUANTITY", "E" ],
						[ "N", "cbo", "QUANTITY", "R" ]],
				"_formSQL" : "SELECT * FROM DC_DEVICES WHERE DC_DEVICE_ID = [0]",// DEVICE.FR1
				"_insertSQL" : [],// ["INSERT INTO ORG_COMPANY (COMPANY_ID,
									// COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME,
									// DB_NAME, DB_SCHEMA,PROVINCE_ID,
									// HOSPITAL_ID) VALUES
									// (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
				"_deleteSQL" : [],// "STATION.D01",
				"_onLoad" : function(object_id) {
					$('#dc_cboDC_DEVICE_GROUP_ID').on("change",function() {
						var type = $(this).val();
						switch(type) {
							case "1":
								$('#lTension,#iTension,#lQuanlity,#iQuanlity,#lCapacity,#iCapacity').hide();								
								break;
							case "2":
								$('#lTension,#iTension,#lQuanlity,#iQuanlity').hide();
								$('#lCapacity,#iCapacity').show();
								$('#lCapacity').html("Công suất");
								break;
							case "3":
							case "4":
								$('#lTension,#iTension,#lQuanlity,#iQuanlity,#lCapacity,#iCapacity').hide();
								break;
							case "5":
								$('#lTension,#iTension,#lCapacity,#iCapacity,#lQuanlity,#iQuanlity').show();						
								$('#lQuanlity').html('Số lượng');
								$('#lCapacity').html("Dung lượng");
								$('#dc_txtQUANTITY').show();
								$('#dc_cboQUANTITY').hide();
								break;
							case "6":
								$('#lTension,#iTension').hide();
								$('#lQuanlity,#iQuanlity,#lCapacity,#iCapacity').show();
								$('#lCapacity').html("Công suất");
								$('#lQuanlity').html('Loại máy');
								$('#dc_txtQUANTITY').hide();
								$('#dc_cboQUANTITY').show();
								ComboUtil.getComboTag('dc_cboQUANTITY', "SELECT GENERATOR_TYPE_ID, GENERATOR_TYPE_NAME FROM LST_GENERATOR_TYPE",[],"",{},'sql', null);
								break;
							case "7":
								$('#lTension,#iTension').hide();
								$('#lQuanlity,#iQuanlity,#lCapacity,#iCapacity').show();
								$('#lCapacity').html("Cân nặng");
								$('#lQuanlity').html('Loại bình');
								$('#dc_txtQUANTITY').hide();
								$('#dc_cboQUANTITY').show();
								ComboUtil.getComboTag('dc_cboQUANTITY', "SELECT EXTINGUISHER_TYPE_ID, EXTINGUISHER_TYPE_NAME FROM LST_EXTINGUISHER_TYPE",[],"",{},'sql', null);
								break;
						}						
					});
				},
				"_buttonList" : [ {
					"id" : "btnNewDCDevice",
					"action" : "newEditorData",
					"onAction" : function() {
						$("#btnDCDeleteDevice").hide();
					}
				}, {
					"id" : "btnSaveDCDevice",
					"action" : function(opt,object_id) {
						var obj = home.saveEditorData(opt,object_id, true);
						var type = $('dc_cboDC_DEVICE_GROUP_ID').val();
						if (type=="5") {
							obj.QUANLITY = $('dc_cboQUANLITY').val();
						}
						else if (type=="6" || type=="7") {
							obj.QUANLITY = $('dc_cboQUANLITY').val();
						}
						return home.saveData(opt,object_id,obj);
						
					},
					"reloadGrid" : true,
					"onAction" : function(id) {
						if (id > 0) {							 
							$("#btnDeleteDCDevice").show();
						}
						else
							$("#btnDeleteDCDevice").hide();
					}
				}, {
					"id" : "btnDeleteDCDevice",
					"action" : "deleteData",
					"reloadGrid" : true,
					"resetCtl" : true,
					"onAction" : function(id) {
						$("#btnDeleteDCDevice").hide();
					}
				} ],
				_onSelect : function() {
					console.log($("#btnDCDeleteDevice"));
					$("#btnDeleteDCDevice").show();
				},
				_customButton : [],
				"valid_ar" : [ {
					"name" : "txtDC_DEVICE_CODE",
					"display" : "Mã Thiết bị",
					"rules" : "trim_required",
					"checkExist":"N"
				}, {
					"name" : "txtMANUFACTURER",
					"display" : "Nhà sản xuất",
					"rules" : "trim_required"
				}, {
					"name" : "txtSERIAL",
					"display" : "Serial",
					"rules" : "trim_required"
				}, {
					"name" : "txtSTART_DATE",
					"display" : "Ngày SD",
					"rules" : "trim_required"
				}

				]
			},
			{
				"_container" : "odfInfo",
				"_prefix" : "odf_",
				"_filter" : [],
				"_mode" : "edit",
				"_tableName" : "LST_ODF_INDOOR",
				"_keyField" : "ODF_INDOOR_ID",
				"_parentField" : "STATION_ID",
				"_dGridId" : "grdODF",
				"_gridHeader" : "ID,ODF_INDOOR_ID,0,0,t,l;Mã ODF,ODF_INDOOR_CODE,150,0,f,l;Ngày SD,START_DATE,150,0,f,l;Dung lượng,CAPACITY,100,0,f,l",
				"_gridSQL" : "SELECT O.* FROM LST_ODF_INDOOR O WHERE STATUS>0 AND STATION_ID=[P0]",// "ODFINDOOR.G01",
				"_comboList" : [],
				"_data" : [ [ "N", "txt", "ODF_INDOOR_ID", "I" ],
						[ "N", "txt", "STATION_ID", "I" ],
						[ "S", "txt", "ODF_INDOOR_CODE", "E" ],
						[ "N", "txt", "CAPACITY", "E" ],
						[ "DT", "txt", "START_DATE", "E" ] ],
				"_formSQL" : "SELECT * FROM LST_ODF_INDOOR WHERE ODF_INDOOR_ID = [0]",// DEVICE.FR1
				"_insertSQL" : [],// ["INSERT INTO ORG_COMPANY (COMPANY_ID,
									// COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME,
									// DB_NAME, DB_SCHEMA,PROVINCE_ID,
									// HOSPITAL_ID) VALUES
									// (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
				"_deleteSQL" : [],// "STATION.D01"
				"_buttonList" : [ {
					"id" : "btnNewODF",
					"action" : "newEditorData",
					"onAction" : function() {
						$("#btnDeleteODF").hide();
					}
				}, {
					"id" : "btnSaveODF",
					"action" : "saveEditorData",
					"reloadGrid" : true,
					"onAction" : function(id) {
						if (i > 0) {
							jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call CREATE_ODF_INDOOR_COUPLERS(?2L)}",id);
							$("#btnDeleteODF").show();
						}							
						else
							$("#btnDeleteODF").hide();
					}
				}, {
					"id" : "btnDeleteODF",
					"action" : "deleteData",
					"reloadGrid" : true,
					"resetCtl" : true,
					"onAction" : function(id) {
						$("#btnDeleteODF").hide();
					}
				} ],
				_onSelect : function() {
					$("#btnDeleteODF").show();
				},
				_onEdit : function() {
					$("#tDevice,#tODF").removeClass("disabled");
				},
				_onNew : function() {
				},
				_customButton : [],
				"valid_ar" : [ {
					"name" : "txtODF_INDOOR_CODE",
					"display" : "Mã ODF",
					"rules" : "trim_required",
					"checkExist":"N"
				}, {
					"name" : "txtCAPACITY",
					"display" : "Dung lượng",
					"rules" : "trim_required"
				}, {
					"name" : "txtSTART_DATE",
					"display" : "Ngày SD",
					"rules" : "trim_required"
				}

				]
			} ]
};
_opts["StationInfo"].en = {
	"_param" : [],// session_par,
	"_filter" : [ [ "cboMA_TINH", "L001.F01", "", "Y", "Y" ],
			[ "cboMA_HUYEN", "L001.F02", "cboMA_TINH", "Y", "Y" ] ],
	"_mode" : "view",
	"_tableName" : "LST_CABLETYPE",
	"_keyField" : "CABLETYPE_ID",
	"_parentField" : "STATION_ID",
	"_gridHeader" : "ID,CABLETYPE_ID,0,0,t,l;Mã loại cáp,CABLETYPE_CODE,800,0,f,l;Tên loại cáp,CABLETYPE_NAME,150,0,f,l;Nhóm cáp,CABLETYPE_GROUP_NAME,80,0,f,l",
	// "_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa
	// chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
	"_gridSQL" : "L001.G01",
	"_comboList" : [

	],
	"_data" : [ [ "N", "cbo", "CABLETYPE_GROUP_ID", "E" ],
			[ "S", "txt", "CABLETYPE_CODE", "E" ],
			[ "S", "txt", "CABLETYPE_NAME", "E" ] ],
	"_formSQL" : "L001.FR1",
	"_insertSQL" : [],// ["INSERT INTO ORG_COMPANY (COMPANY_ID,
						// COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME,
						// DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES
						// (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
	"_deleteSQL" : [ "L001.D01" ],
	_onLoad : function() {
	},
	_customButton : [],
	"valid_ar" : [ {
		"name" : "CABLETYPE_NAME",
		"display" : "Tên loại cáp",
		"rules" : "trim_required"
	}, {
		"name" : "CABLETYPE_CODE",
		"display" : "Mã loại cáp",
		"rules" : "trim_required"
	} ],
	"_template" : "StationInfo"
};
