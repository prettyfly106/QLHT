function relationNxN(tableName,pid) {
	var company_id = document.getElementById('company_id').value;
	var center_id = document.getElementById('center_id').value;
	var team_id = document.getElementById('team_id').value;
	var center_id = document.getElementById('center_id').value;
	var user_id = document.getElementById('user_id').value;
	var program_id=pid;
	var __options=[];
	var _param=[program_id];
	initRest();
	initData();
	
	opt=__options[tableName];
	
	document.getElementById('lblTitle').innerHTML=opt.title;
	
	var hasParent=false;
	if(opt.L_parentSQL!="") {
		document.getElementById('lblParentL').innerHTML=opt.L_parentLabel;
		var sql_par=[];
		sql_par=setSysParam(sql_par);
		ComboUtil.getComboTag("cboParentL", opt.L_parentSQL,sql_par,"",{value:'',text:'-- Chọn --'},'sql');
		//document.getElementById('tableParentL').style.display="block";
		hasParent=true;
	}
	else {
		//document.getElementById('tableParentL').style.display="none";
	}
	
	if(opt.R_parentSQL!="") {
		document.getElementById('lblParentR').innerHTML=opt.R_parentLabel;
		var sql_par=[];
		sql_par=setSysParam(sql_par);
		ComboUtil.getComboTag("cboParentR", opt.R_parentSQL,sql_par,"",{value:'',text:'-- Chọn --'},'sql');
		hasParent=true;
		//document.getElementById('tableParentR').style.display="block";
	}
	else {
		//document.getElementById('tableParentR').style.display="none";
	}
	//var gridL=initGrid("grdLeft",opt.leftHeader);
	GridUtil.init("gridLeft","600","200",opt.leftLabel,false,opt.leftHeader);
	//gridL.attachEvent("onRowSelect", gridL_onRowSelect);
	GridUtil.setGridParam("gridLeft",{ 
	    	onSelectRow: function(id) {
	            if (id) {
	            	gridL_onRowSelect(id);
	            }
	    	}
        });
	$('#cboParentL').on('click', function (e) {
		loadLeftGrid();
	});
	$('#cboParentR').on('click', function (e) {
		__left_parent_id=""+document.getElementById("cboParentL").value;
		__right_parent_id=""+document.getElementById("cboParentR").value;
		var rid = $("#gridLeft").jqGrid('getGridParam', 'selrow');
		if(rid) {
			gridL_onRowSelect(rid);	
		}
	});
	$('#btnDelete').on('click', function (e) {
		var _idL = __left_id;
		var idx = $("#gridCenter").jqGrid('getGridParam', 'selarrrow');
		if (idx.length > 0) {
			for(i=0;i<idx.length;i++){
			      var row = $("#gridCenter").jqGrid('getRowData', idx[i]);
			      var _idM=row.ID;//gridInfo.cellById(id,_gridKeyIdx).getValue();
			      var sql_par=[];
		    	  sql_par.push({"name":"[P0]","value":__left_parent_id});
		    	  sql_par.push({"name":"[P1]","value":__right_parent_id});	
		    	  sql_par.push({"name":"[0]","value":_idL});
		    	  sql_par.push({"name":"[1]","value":_idM});	
		    	  var _sql=opt.deleteSQL;
		    	  var rt = jsonrpc.AjaxJson.execute(_sql,sql_par);
		    	  /*
			      var _sql=replaceAll(opt.deleteSQL,"[PARENT_LEFT]",__left_parent_id);
	            	_sql=replaceAll(_sql,"[PARENT_RIGHT]",__right_parent_id);
	            	_sql=replaceAll(_sql,"[LEFT_ID]",_idL);
	            	_sql=replaceAll(_sql,"[RIGHT_ID]",_idM);
	            	var rt = jsonrpc.AjaxJson.execute(_sql,[]);
	             */
			}
			var rid = $("#gridLeft").jqGrid('getGridParam', 'selrow');
			gridL_onRowSelect(rid);
		}
	});
	$('#btnInsert').on('click', function (e) {
		console.log('btnInsert');
		var _idL = __left_id;
		var idx = $("#gridRight").jqGrid('getGridParam', 'selarrrow');
		if (idx.length > 0) {
			for(i=0;i<idx.length;i++){
			      var row = $("#gridRight").jqGrid('getRowData', idx[i]);
			      var _idR=row.ID;//gridInfo.cellById(id,_gridKeyIdx).getValue();
			      var sql_par=[];
		    	  sql_par.push({"name":"[P0]","value":__left_parent_id});
		    	  sql_par.push({"name":"[P1]","value":__right_parent_id});	
		    	  sql_par.push({"name":"[0]","value":_idL});
		    	  sql_par.push({"name":"[1]","value":_idR});	
		    	  var _sql=opt.insertSQL;
		    	  var rt = jsonrpc.AjaxJson.execute(_sql,sql_par);
		    	  /*
	            	var _sql=replaceAll(opt.insertSQL,"[PARENT_LEFT]",__left_parent_id);
	            	_sql=replaceAll(_sql,"[PARENT_RIGHT]",__right_parent_id);
	            	_sql=replaceAll(_sql,"[LEFT_ID]",_idL);
	            	_sql=replaceAll(_sql,"[RIGHT_ID]",_idR);  
	            	var rt = jsonrpc.AjaxJson.execute(_sql,[]);
	              */
			}
			var rid = $("#gridLeft").jqGrid('getGridParam', 'selrow');
			gridL_onRowSelect(rid);
		}
	});
	
	
	GridUtil.init("gridCenter","600","100%",opt.centerLabel,true,opt.centerHeader);
	GridUtil.init("gridRight","600","100%",opt.rightLabel,true,opt.rightHeader);
	if(!hasParent) {
		//document.getElementById('tableParent').style.display="none";
		loadLeftGrid();
	}
	var __left_parent_id;
	var __right_parent_id;
	var __left_id;
	function setSysParam(_par_ar) {
		var v_par=_par_ar;
		for(var i1=0;i1<_param.length;i1++) {
			var _parName='[S'+i1+']';
			v_par.push({"name":_parName,"value":_param[i1]});
		}
		
		return v_par;
	}
	
	function initData() {
		__options["DR_REPORT_GRANT"]={
				title:"PHÂN QUYỀN SỬ DỤNG BÁO CÁO",
				leftLabel:"Nhóm người dùng",
				centerLabel:"Danh sách báo cáo đã cấp",
				rightLabel:"Danh sách báo cáo chưa cấp",
				L_parentLabel:"Hệ thống:",
				L_parentSQL:"SELECT a.id, a.name FROM dreport.dr_program a WHERE id=[S0]",
				R_parentLabel:"Nhóm báo cáo:",
				R_parentSQL:"select id,name from dreport.dr_report_group WHERE program_id=[S0] and status=1",
				leftSQL:"select group_id ID,group_name from dreport.ADM_USER_GROUP where program_id=[P0]",
				rightSQL:"select report_id ID,REPORT_CODE,report_name from dreport.dr_report a where A.group_id=[P1] AND not exists (select 1 from dreport.dr_report_grant b where a.report_id=b.report_id and b.user_group_id=[0])",
				centerSQL:"select report_id ID,REPORT_CODE,report_name from dreport.dr_report a where A.group_id=[P1] AND exists (select 1 from dreport.dr_report_grant b where a.report_id=b.report_id and b.user_group_id=[0])",
				insertSQL:"INSERT INTO dreport.dr_report_grant (ID,user_group_id,report_id,program_id) VALUES(dreport.dr_report_grant_SEQ.NEXTVAL,[0],[1],[P0])",
				deleteSQL:"DELETE FROM dreport.dr_report_grant WHERE program_id=[P0] and user_group_id=[0] and report_id=[1]",
				leftHeader:"ID,ID,0,0,t,l;Nhóm người dùng,GROUP_NAME,120,0,f,l",
				rightHeader:"ID,ID,0,0,t,l;Mã báo cáo,REPORT_CODE,60,0,f,l;Tên báo cáo,REPORT_NAME,120,0,f,l",
				centerHeader:"ID,ID,0,0,t,l;Mã báo cáo,REPORT_CODE,60,0,f,l;Tên báo cáo,REPORT_NAME,120,0,f,l"
		};
		__options["RNN002"]={
				title:"PHÂN QUYỀN QUẢN LÝ CSYT TUYẾN DƯỚI",
				L_parentLabel:"Tỉnh/thành phố:",
				L_parentSQL:"SELECT a.ma_so, a.ten_tinh FROM dm_tinh a",
				R_parentLabel:"Tuyến bệnh viện:",
				R_parentSQL:"select ma_so,ten from dm_tuyen_bv WHERE MA_SO=3",
				leftLabel:"Cơ sở y tế",
				centerLabel:"Danh sách CSYT đã cấp",
				rightLabel:"Danh sách CSYT chưa cấp",
				leftSQL:"select MA_BV ID,TEN_BV from DM_COSO_KCB where MA_TINH=[P0] AND TUYEN_BV=[P1]",
				rightSQL:"select MA_BV ID,MA_BV,TEN_BV from DM_COSO_KCB a where A.MA_TINH=[P0] AND TUYEN_BV=[P1]+1 AND not exists (select 1 from DM_QL_CSKCB b where a.MA_BV=b.MA_BV and b.MA_BV_CHA='[0]')",
				centerSQL:"select MA_BV ID,MA_BV,TEN_BV from DM_COSO_KCB a where A.MA_TINH=[P0] AND TUYEN_BV=[P1]+1 AND exists (select 1 from DM_QL_CSKCB b where a.MA_BV=b.MA_BV and b.MA_BV_CHA='[0]')",
				insertSQL:"INSERT INTO DM_QL_CSKCB (ID,MA_BV_CHA,MA_BV) VALUES(DM_QL_CSKCB_SEQ.NEXTVAL,'[0]','[1]')",
				deleteSQL:"DELETE FROM DM_QL_CSKCB WHERE MA_BV_CHA='[0]' and MA_BV='[1]'",
				leftHeader:"Mã CSYT,ID,60,0,f,l;Cơ sở y tế,TEN_BV,120,0,f,l",
				rightHeader:"Mã CSYT,ID,60,0,f,l;Tên CSYT,TEN_BV,120,0,f,l",
				centerHeader:"Mã CSYT,ID,60,0,f,l;Tên CSYT,TEN_BV,120,0,f,l"
		};
	}
	
	
	
	function loadLeftGrid() {
		__left_parent_id=""+document.getElementById("cboParentL").value;
		__right_parent_id=""+document.getElementById("cboParentR").value;
		console.log("__left_parent_id="+__left_parent_id);
		console.log("__right_parent_id="+__right_parent_id);
		var sql_par=new Array();
		sql_par.push({"name":"[P0]","value":__left_parent_id});
		sql_par.push({"name":"[P1]","value":__right_parent_id});	
  	  	console.log("sql_par="+JSON.stringify(sql_par));
		//alert('opt.leftSQL='+opt.leftSQL);
		//alert('__left_parent_id='+__left_parent_id);
		var _sqlL=opt.leftSQL;
		
		//_sqlL=replaceAll(_sqlL,"[PARENT_LEFT]",__left_parent_id);
		//_sqlL=replaceAll(_sqlL,"[PARENT_RIGHT]",__right_parent_id);
		GridUtil.loadGridBySqlPage("gridLeft",_sqlL,sql_par);
	}
	
	
	function gridL_onRowSelect(item_id,ind){
		var row = $("#gridLeft").jqGrid('getRowData', item_id);
		
		__left_parent_id=""+document.getElementById("cboParentL").value;
		__right_parent_id=""+document.getElementById("cboParentR").value;
		var _sqlM=opt.centerSQL;//replaceAll(opt.centerSQL,"[PARENT_LEFT]",__left_parent_id);
		var _sqlR=opt.rightSQL;//replaceAll(opt.rightSQL,"[PARENT_LEFT]",__left_parent_id);
		var _idL = row.ID;
		__left_id=_idL;
		//_sqlM=replaceAll(_sqlM,"[LEFT_ID]",_idL);
		//_sqlR=replaceAll(_sqlR,"[LEFT_ID]",_idL);
		if(__right_parent_id!=null && __right_parent_id!='undefined') {
			//_sqlM=replaceAll(_sqlM,"[PARENT_RIGHT]",__right_parent_id);
			//_sqlR=replaceAll(_sqlR,"[PARENT_RIGHT]",__right_parent_id);
		}
		var sql_par=[];
  	  	sql_par.push({"name":"[P0]","value":__left_parent_id});
  	  	sql_par.push({"name":"[P1]","value":__right_parent_id});	
  	  	sql_par.push({"name":"[0]","value":_idL});
  	  	//sql_par.push({"name":"[1]","value":_idM});	
  	  	
		GridUtil.loadGridBySqlPage("gridCenter",_sqlM,sql_par);
		GridUtil.loadGridBySqlPage("gridRight",_sqlR,sql_par);
	}
	
}	
