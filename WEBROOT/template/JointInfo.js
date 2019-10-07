i18n_ims= i18n_ims || {};
i18n_ims.JointInfo={
    'vn': {        
        'title' : 'THÔNG TIN MĂNG XÔNG',        
        'code' : 'Mã MS',
        'address' : 'Địa chỉ',       
        'reason' : 'Nguyên nhân',
        'start_date' : 'Ngày SD',
        'type': 'Loại MS',
        'hang_joint' : 'MS treo',
        'drop_joint' : 'MS thả bể',
        'capacity': 'Dung lượng',
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
        'odf_info': 'Danh sách ODF',
	}
};

var _opts = _opts || {};
_opts["JointInfo"] = {};
_opts["JointInfo"].vn={
		  "_container" : "mainInfo",
		  "_param":[],//session_par,
		  "_filter": [	                
	            ],
	         "_mode":"edit",
			 "_tableName":"JOINTS",
			 "_keyField":"JOINT_ID",
			 "_markerList" : "joints",
			 "_getListFunc" : "getJoints",
			 "_comboList":[			               				               	
			               	["cboCITY_CODE", "SELECT CITY_CODE, CITY_NAME FROM LST_CITY","","",""],//JOINT.C01			               	
			               	["cboDISTRICT_CODE", "SELECT DISTRICT_CODE, DISTRICT_NAME FROM LST_DISTRICT WHERE CITY_CODE = [P0]","cboCITY_CODE","",""],//JOINT.C02
			               	["cboWARDS_CODE", "SELECT WARDS_CODE, WARDS_NAME FROM LST_WARDS WHERE DISTRICT_CODE = [P0]","cboDISTRICT_CODE","",""]//JOINT.C03
						],
			"_data": [
			          	["N","txt","JOINT_ID","E"],			            
			            ["S","txt","JOINT_CODE","E"],			            
			            ["S","txt","ADDRESS","E"],			            
			            ["S","txt","REASON","E"],	
			            ["N","txt","CAPACITY","E"],
			            ["DT","txt","START_DATE","E"],
			            ["N","chk","IS_HANG_MANTLE","E"],
			            ["N","chk","IS_DROP_MANTLE","E"],
			            ["S","cbo","CITY_CODE","E"],
			            ["S","cbo","DISTRICT_CODE","E"],
			            ["S","cbo","WARDS_CODE","E"],
			            ["S","txt","LATITUDE","E"],
			            ["S","txt","LONGITUDE","E"],
			            ],
			 "_formSQL": "SELECT * FROM JOINTS WHERE JOINT_ID = [0]",//JOINT.FR1
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":[],//"JOINT.D01"			 
			 _onLoad : function(object_id) {
				 $('#txtSTART_DATE').val(moment().format('DD/MM/YYYY HH:mm:ss'));					
					$("#btnConnectManager").off().on(
							"click",
							function(e) {					
								$("#connectInfo").addClass("open");
								$('#connectInfo').load(
										'../template/JointConnect.tpl',
										function() {
											window.$source_list = $('#cables_in_list');
											window.$target_list = $('#cables_out_list');
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
												var cableline_id_in = $('#cboFROM').val();
												var cableline_id_out = $('#cboTO').val();
												var cable_ids_in = [];
												var cable_ids_out = [];
												var rt;
												$.each(instant.getAllConnections(),function(i,v) {
													cable_ids_in.push(v.sourceId.substr(v.sourceId.indexOf('_')+1));
													cable_ids_out.push(v.targetId.substr(v.targetId.indexOf('_')+1));
												});									
												if (cable_ids_in.length>0) {
													rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call CREATE_JOINT_CONNECTOR(?2L,?3L,?4S,?5L,?6S)}",[object_id,cableline_id_in,cable_ids_in.join(','),cableline_id_out,cable_ids_out.join(',')].join('$'));
												}
												else {
													var cf = confirm("Tất cả các kết nối đều bị ngắt. Bạn có chắc chắn hay không?");
													if (cf) {
														var rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call CREATE_JOINT_CONNECTOR(?2L,?3L,?4S,?5L,?6S)}",[object_id,cableline_id_in,'',cableline_id_out,''].join('$'));
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
												var j=parseInt(targetFrom);
												for(i=sourceFrom;i<=sourceTo;i++) {
													if (j>targetTo) break;													
													$source=$source_list.find('[type="source"][index="'+(i-1)+'"]').first();													
													$target=$target_list.find('[type="target"][index="'+(j-1)+'"]').first();													
													if ($source.length>0 && $target.length>0) {
														connect($source.attr('id'),$target.attr('id'));														
													}
													j++;
												}
												/*var endpoint_size = instant.getAllConnections().length;
												if (endpoint_size%2==1 && endpoint_size>24 && !$('#source_list').first().hasClass("jtk-endpoint-anchor")) {
													$('#source_list').prepend($('<div class="end-point">'));
													$('#target_list').prepend($('<div class="end-point">'));
												}*/
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
												cable_id_in = $('#cboFROM').val();
												cable_id_out = $('#cboTO').val();
												var sql_par = RSUtil.buildParam("",[cable_id_in]);
												$source_list.empty();
												jsonrpc.AjaxJson.ajaxExecuteQueryO("SELECT A.CABLE_ID, A.CABLE_INDEX FROM (SELECT * FROM CABLES WHERE CABLELINE_ID=[0]) A, JOINT_CABLE_CONNECTOR B WHERE A.CABLE_ID=B.CABLE_ID_IN(+) AND B.CABLE_ID_IN IS NULL AND A.STATUS>0 ORDER BY A.CABLE_INDEX", sql_par,function(rt){//CONNECT.003
													list = $.parseJSON(rt);
													if (list.length>0) {														
														$.each(list,function(i,cable) {															
															$source_list.append(String.format("<div class='circle' id='{0}' index={1} type='source' draggable='true' ondragstart='drag(event)' ondrop='sourceConnect(event)' ondragover='allowDropSource(event)'>{2}</div>",'cableIN_' + cable.CABLE_ID,cable.CABLE_INDEX,parseInt(cable.CABLE_INDEX)+1));												
														});
														$('#txtSourceFrom,#txtSourceTo').attr('min',parseInt(list[0].CABLE_INDEX)+1);
														$('#txtSourceFrom').val(parseInt(list[0].CABLE_INDEX)+1);
														$('#txtSourceFrom,#txtSourceTo').attr('max',parseInt(list[list.length-1].CABLE_INDEX)+1);
														$('#txtSourceTo').val(parseInt(list[list.length-1].CABLE_INDEX)+1);
													}										
												});
												sql_par = RSUtil.buildParam("",[cable_id_out]);												
												$target_list.empty();									
												jsonrpc.AjaxJson.ajaxExecuteQueryO("SELECT A.CABLE_ID, A.CABLE_INDEX FROM (SELECT * FROM CABLES WHERE CABLELINE_ID=[0] AND CABLE_ID NOT IN (SELECT (CASE WHEN CABLELINE_ID_IN=[0] THEN CABLE_ID_IN WHEN CABLELINE_ID_OUT=[0] THEN CABLE_ID_OUT END) FROM JOINT_CABLE_CONNECTOR)) A WHERE A.STATUS>0 ORDER BY A.CABLE_INDEX", sql_par,function(rt){//CONNECT.004
													list = $.parseJSON(rt);										
													if (list.length>0) {
														$.each(list,function(i,cable) {															
															$target_list.append(String.format("<div class='circle' id='{0}' index='{1}' type='target' draggable='true' ondragstart='drag(event)' ondrop='targetConnect(event)' ondragover='allowDropTarget(event)'>{2}</div>",'cableOUT_' + cable.CABLE_ID,cable.CABLE_INDEX,parseInt(cable.CABLE_INDEX)+1));												
														});
														$('#txtTargetFrom,#txtTargetTo').attr('min',parseInt(list[0].CABLE_INDEX)+1);
														$('#txtTargetFrom').val(parseInt(list[0].CABLE_INDEX)+1);
														$('#txtTargetFrom,#txtTargetTo').attr('max',parseInt(list[list.length-1].CABLE_INDEX)+1);
														$('#txtTargetTo').val(parseInt(list[list.length-1].CABLE_INDEX)+1);
													}
												});
												sql_par = RSUtil.buildParam("",[object_id,cable_id_in,cable_id_out]);
												jsonrpc.AjaxJson.ajaxExecuteQueryO("SELECT A.CABLE_ID_IN, CIN.CABLE_INDEX CABLE_INDEX_IN, A.CABLE_ID_OUT, COUT.CABLE_INDEX CABLE_INDEX_OUT FROM JOINT_CABLE_CONNECTOR A, CABLES CIN, CABLES COUT WHERE A.CABLE_ID_IN = CIN.CABLE_ID AND A.CABLE_ID_OUT = COUT.CABLE_ID AND JOINT_ID = [0] AND CABLELINE_ID_IN = [1] AND CABLELINE_ID_OUT=[2] ORDER BY CIN.CABLE_INDEX", sql_par,function(rt){//CONNECT.005
													list = $.parseJSON(rt);													
													$_source_list.empty();													 
													$_target_list.empty();
													connector_list = [];
													instant.reset();
													$.each(list,function(i,connector) {
														var sourceId = 'cableIN_' + connector.CABLE_ID_IN;
														var targetId = 'cableOUT_' + connector.CABLE_ID_OUT; 
														$_source_list.append(String.format("<div class='end-point' index='{0}' type='source' id='{1}' draggable='true' ondragstart='drag(event)' ondrop='sourceConnect(event)' ondragover='allowDropSource(event)'>{2}</div>",connector.CABLE_INDEX_IN,sourceId,parseInt(connector.CABLE_INDEX_IN)+1));
														$_target_list.append(String.format("<div class='end-point' index='{0}' type='target' id='{1}' draggable='true' ondragstart='drag(event)' ondrop='targetConnect(event)' ondragover='allowDropTarget(event)'>{2}</div>",connector.CABLE_INDEX_OUT,targetId,parseInt(connector.CABLE_INDEX_OUT)+1));
														instant.connect({source:sourceId,target:targetId});														
													});
													repaintConnector();
												});
											}											
											var sql_par = RSUtil.buildParam("",[object_id]);											
											ComboUtil.getComboTag('cboFROM',"SELECT A.CABLELINE_ID, B.CABLELINE_CODE || ' (' || B.CAPACITY || 'FO)' FROM CABLELINE_DETAIL A, CABLELINES B WHERE A.CABLELINE_ID = B.CABLELINE_ID AND NODE_ID = [0] AND NODE_TYPE=3",sql_par,"",{},"sql");//CONNECT.001
											$('#cboFROM').on("change",function(e){
												var cable_in_id = $(this).val();
												var par = RSUtil.buildParam("",[object_id,cable_in_id]);
												ComboUtil.getComboTag('cboTO',"SELECT A.CABLELINE_ID, B.CABLELINE_CODE || ' (' || B.CAPACITY || 'FO)' FROM CABLELINE_DETAIL A, CABLELINES B WHERE A.CABLELINE_ID = B.CABLELINE_ID AND NODE_ID = [0] AND NODE_TYPE=3 AND A.CABLELINE_ID<>[1]",par,"",{},"sql");//CONNECT.002
												reloadConnectorList();												
											}).trigger("change");
											
											$('#cboTO').on("change",function(e){
												reloadConnectorList();
											});
										});
									
							});
				},
			 _onUpdate : function() {
				 if (!current.info) current.info= {};				 
				 current.info.code = $('#txtJOINT_CODE').val();
				 current.info.address = $('#txtADDRESS').val();
			 },	
			 _onInsert : function(object_id) {
				 if (!current.info) current.info= {};				 
				 current.info.code = $('#txtJOINT_CODE').val();
				 current.info.address = $('#txtADDRESS').val();
				 rt=jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call INSERT_JOINT(?2L,?3L,?4L,?5S)}",[current_joint_cable.id, object_id,current.idx,user_id].join('$'));				 
				 if (rt>0) {					 
					 var path1=current_joint_cable.getPath();					 
					 var path2 = [];
					 var nodes1= current_joint_cable.nodes;					 
					 var nodes2= nodes1.splice(current.idx);
					 nodes2.unshift({id:current_id,type:3});					 
					 path2.push([current.getPosition().lat(),current.getPosition().lng()]);					 
					 var length=path1.getLength();					 
					 while(path1.getLength()>current.idx+1) {						 
						 var n = path1.getAt(current.idx+1);						 
						 path2.push([n.lat(),n.lng()]);
						 path1.removeAt(current.idx+1);		
						 
					 }					
					 nodes1.push({id:current_id,type:3});					 
					 var cable2=createCable(current_joint_cable.capacity,rt,path2);					
					 cable2.nodes=nodes2;
				 }
				 else {
					 
				 }
			 },	
			 _onDelete : function(object_id) {
				 return jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call DELETE_JOINT(?2L)}",object_id); 
			 },	
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "txtJOINT_CODE","display" : "Mã măng xông","rules" : "trim_required", "checkExist":"N"}
				],
			 "_template":"JointInfo",
			};
_opts["JointInfo"].en={
		 "_param":[],//session_par,
		  "_filter": [
	                ["cboMA_TINH", "L001.F01", "", "Y","Y"],
	                ["cboMA_HUYEN", "L001.F02", "cboMA_TINH", "Y","Y"]
	            ],
	         "_mode":"view",
			 "_tableName":"LST_CABLETYPE",
			 "_keyField":"CABLETYPE_ID",
			 "_parentField":"JOINT_ID",
			 "_gridHeader":"ID,CABLETYPE_ID,0,0,t,l;Mã loại cáp,CABLETYPE_CODE,800,0,f,l;Tên loại cáp,CABLETYPE_NAME,150,0,f,l;Nhóm cáp,CABLETYPE_GROUP_NAME,80,0,f,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"L001.G01",
			 "_comboList":[
			               
						],
			"_data": [			           
			            ["N","cbo","CABLETYPE_GROUP_ID","E"],			            
			            ["S","txt","CABLETYPE_CODE","E"],
			            ["S","txt","CABLETYPE_NAME","E"]
			            ],
			 "_formSQL": "L001.FR1",
			 "_insertSQL":[],//["INSERT INTO ORG_COMPANY (COMPANY_ID, COMPANY_TYPE,COMPANY_CODE,COMPANY_NAME, DB_NAME, DB_SCHEMA,PROVINCE_ID, HOSPITAL_ID) VALUES (ORG_COMPANY_SEQ.NEXTVAL,3,'[D0]','[D1]','[S4]','[S5]',[S3],'[D0]')"],
			 "_deleteSQL":["L001.D01"],
			 _onLoad : function() {				
			 },			 
			 _customButton:[			                
			                ],
			 "valid_ar": [ 
				{"name" : "CABLETYPE_NAME","display" : "Tên loại cáp","rules" : "trim_required"},
				{"name" : "CABLETYPE_CODE","display" : "Mã loại cáp","rules" : "trim_required"}
				],
			 "_template":"JointInfo"
			};
