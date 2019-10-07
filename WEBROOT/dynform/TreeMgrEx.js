var FLT_ID=0;
var FLT_SQL=1;
var FLT_PARENT=2;
var FLT_ISPARAM=3;
var FLT_RELOAD=4;

var CBO_ID=0;
var CBO_SQL=1;
var CBO_PARENT=2;
var CBO_SELVAL=3;
var CBO_DFLTEXT=4;

function CTreeMgr(opt) {
	//à,á,ạ,ả,ã,ă,ằ,ắ,ặ,ẳ,ẵ,â,ầ,ấ,ậ,ẩ,ẫ,đ,è,é,ẹ,ẻ,ẽ,ê,ề,ế,ệ,ể,ễ,ì,í,ị,ỉ,ĩ,ò,ó,ọ,ỏ,õ,ô,ồ,ố,ộ,ổ,ỗ,ơ,ờ,ớ,ợ,ở,ỡ,ù,ú,ụ,ủ,ũ,ư,ừ,ứ,ự,ử,ữ,ỳ,ý,ỵ,ỷ,ỹ
	//
	//µ,¸,¹,¶,·,¡,»,¾,Æ,¼,½,¢,Ç,Ê,Ë,È,É,§,Ì,Ð,Ñ,Î,Ï,£,Ò,Õ,Ö,Ó,Ô,×,Ý,Þ,Ø,Ü,ß,ã,ä,á,â,¤,å,è,é,æ,ç,¥,ê,í,î,ë,ì,ï,ó,ô,ñ,ò,¦,õ,ø,ù,ö,÷,ú,ý,þ,û,ü
	//Ă=¡,Â=¢,Đ=§,Ê=£,Ô=¤,Ơ=¥,Ư=¦
	//µ,¸,¹,¶,·,¨,»,¾,Æ,¼,½,©,Ç,Ê,Ë,È,É,®,Ì,Ð,Ñ,Î,Ï,ª,Ò,Õ,Ö,Ó,Ô,×,Ý,Þ,Ø,Ü,ß,ã,ä,á,â,«,å,è,é,æ,ç,¬,ê,í,î,ë,ì,ï,ó,ô,ñ,ò,­,õ,ø,ù,ö,÷,ú,ý,þ,û,ü,¡,¢,§,£,¤,¥,¦
	//a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,d,e,e,e,e,e,e,e,e,e,e,e,i,i,i,i,i,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,u,u,u,u,u,u,u,u,u,u,u,y,y,y,y,y,A,A,D,E,O,O,U
	//Céng hßa x· héi chñ nghÜa viÖt nam
	//select ascii('µ')||','||ascii('¸')||','||ascii('¹')||','||ascii('¶')||','||ascii('·')||','||ascii('¨')||','||ascii('»')||','||ascii('¾')||','||ascii('Æ')||','||ascii('¼')||','||ascii('½')||','||ascii('©')||','||ascii('Ç')||','||ascii('Ê')||','||ascii('Ë')||','||ascii('È')||','||ascii('É')||','||ascii('®')||','||ascii('Ì')||','||ascii('Ð')||','||ascii('Ñ')||','||ascii('Î')||','||ascii('Ï')||','||ascii('ª')||','||ascii('Ò')||','||ascii('Õ')||','||ascii('Ö')||','||ascii('Ó')||','||ascii('Ô')||','||ascii('×')||','||ascii('Ý')||','||ascii('Þ')||','||ascii('Ø')||','||ascii('Ü')||','||ascii('ß')||','||ascii('ã')||','||ascii('ä')||','||ascii('á')||','||ascii('â')||','||ascii('«')||','||ascii('å')||','||ascii('è')||','||ascii('é')||','||ascii('æ')||','||ascii('ç')||','||ascii('¬')||','||ascii('ê')||','||ascii('í')||','||ascii('î')||','||ascii('ë')||','||ascii('ì')||','||ascii('ï')||','||ascii('ó')||','||ascii('ô')||','||ascii('ñ')||','||ascii('ò')||','||ascii('­')||','||ascii('õ')||','||ascii('ø')||','||ascii('ù')||','||ascii('ö')||','||ascii('÷')||','||ascii('ú')||','||ascii('ý')||','||ascii('þ')||','||ascii('û')||','||ascii('ü')||','||ascii('¡')||','||ascii('¢')||','||ascii('§')||','||ascii('£')||','||ascii('¤')||','||ascii('¥')||','||ascii('¦') from dual
	//181,184,185,182,183,168,187,190,198,188,189,169,199,202,203,200,201,174,204,208,209,206,207,170,210,213,214,211,212,215,221,222,216,220,223,227,228,225,226,171,229,232,233,230,231,172,234,237,238,235,236,239,243,244,241,242,173,245,248,249,246,247,250,253,254,251,252,161,162,167,163,164,165,166
	//select chr(181)||chr(184)||chr(185)||chr(182)||chr(183)||chr(168)||chr(187)||chr(190)||chr(198)||chr(188)||chr(189)||chr(169)||chr(199)||chr(202)||chr(203)||chr(200)||chr(201)||chr(174)||chr(204)||chr(208)||chr(209)||chr(206)||chr(207)||chr(170)||chr(210)||chr(213)||chr(214)||chr(211)||chr(212)||chr(215)||chr(221)||chr(222)||chr(216)||chr(220)||chr(223)||chr(227)||chr(228)||chr(225)||chr(226)||chr(171)||chr(229)||chr(232)||chr(233)||chr(230)||chr(231)||chr(172)||chr(234)||chr(237)||chr(238)||chr(235)||chr(236)||chr(239)||chr(243)||chr(244)||chr(241)||chr(242)||chr(173)||chr(245)||chr(248)||chr(249)||chr(246)||chr(247)||chr(250)||chr(253)||chr(254)||chr(251)||chr(252)||chr(161)||chr(162)||chr(167)||chr(163)||chr(164)||chr(165)||chr(166) from dual
	
	var _leftTree;
	var _leftItem;
	var _object_id;
	var gridInfo;
	var _toolbar;
	var _orgLevel = 0;
	var flagLoading = false;
	var _parent_id;
	var _title=opt._title;
	var _mode=opt._mode;
	var _param=opt._param;
	var _filter=opt._filter;
	var _tableName=opt._tableName;
	var _keyField=opt._keyField;
	var _gridHeader=opt._gridHeader;
	var _gridSQL=opt._gridSQL;
	var _comboList=opt._comboList;
	var _dataCtl=opt._data;
	var _formSQL= opt._formSQL;
	var _onSave=opt._onSave;
	var _onDelete=opt._onDelete;
	var _customButton=opt._customButton;
	var _onLoad=opt._onLoad;
	var _updateSQL=opt._updateSQL;
	var _deleteSQL = opt._deleteSQL;
	var _treeSQL = opt._treeSQL;
	var __currentNodeId;
	var valid_ar =opt.valid_ar;
	//console.log('valid_ar='+JSON.stringify(valid_ar));
	var _template = opt._template;
	var that=this;
	var _lang = lang;
	this.load=doLoad;
	function setSysParam(_par_ar) {
		var v_par=_par_ar;
		for(var i1=0;i1<_param.length;i1++) {
			var _parName='[S'+i1+']';
			v_par.push({"name":_parName,"value":_param[i1]});
		}
		
		return v_par;
	}
	
	function initControl(){
		if(i18n_hpt[_template]) {
			console.log('i18n1='+_template);
			$.i18n().load(i18n_hpt[_template]);
		}
		$.i18n().load(i18n_hpt.err_code);
		$.i18n().load(i18n_hpt.com_msg);
		$.i18n().locale = _lang;
		
		$('#treeTitle').html(_title[0]);
		$('#title').html(_title[1]);
		_toolbar=new DBToolbar("db_toolbar",_lang);
		_toolbar.setButtons(true,false,true,true,true,false);//new,edit,cancel,save,delete,close
		//_toolbar.setButtonTexts(_res.add_new,null, _res.cancel,_res.save,_res.del,null, "btn-sm btn-info", null, "btn-sm btn-primary", "btn-sm btn-warning","btn-sm btn-invert");
		_toolbar.attachEvent("NEW",newEditorData);
		_toolbar.attachEvent("SAVE",saveEditorData);
		_toolbar.attachEvent("DELETE",deleteData);
		_toolbar.setMode('CANCEL');
		if(_mode=='view') {
			$("#db_toolbar").hide();
		}
		_leftTree = TreeUtil.init("leftTree",false);
		
		//var tpl=$("#template-"+_template).html();
		//$('#divContent').html(tpl);
		//if(_filter.length>0) {
		//	tpl=$("#template-"+_template+"-Filter").html();
		//	$('#divFilter').html(tpl);
		//}
		$('#divContent').load('../dynform/TreeMgrEx/'+_template+'.tpl', function() {
			$("[data-i18n]").i18n();
			loadFilter();
		});
		gridInfo=GridUtil.init("gridInfo","600","100%",$.i18n("list"),true,_gridHeader);
		for(var i1=0;i1<_customButton.length;i1++) {
			var btn=_customButton[i1];
			var custom_toolbar=document.getElementById('custom_toolbar');
			//alert(toolbar);
			var oBtn= document.createElement('input');
			oBtn.setAttribute('type','button');
			oBtn.setAttribute('id',btn.id);
			oBtn.setAttribute('class','btn btn-primary ');
			oBtn.setAttribute('style','min-width:100px;');
			oBtn.setAttribute('value',btn.text);
			oBtn.style.margin='3px';
			//btn.setAttribute('height', '24px'); 
			//btn.setAttribute('width', '126px');
			oBtn.onclick=btn.func;
			custom_toolbar.appendChild(oBtn);
		}
		$("[data-i18n]").i18n();
		
	}
	function loadFilter() {
		if(_filter.length>0) {
			for(var i=0;i<_filter.length;i++) {
				var ctrId=_filter[i][FLT_ID];
				var ctrSql=_filter[i][FLT_SQL];
				var ctrParentId=_filter[i][FLT_PARENT];
				var ctlFilter=_filter[i][FLT_ISPARAM];
				var sql_par=[];
				if(_filter[i][2]=='') {
					var _sql=ctrSql;
					//_sql=setSysParam(_sql);
					sql_par=setSysParam(sql_par);
					ComboUtil.getComboTag(ctrId,_sql,sql_par, "",{},'sql');
				}
				else {
					$('#'+ctrParentId).unbind();
				    $('#'+ctrParentId).bind('click',{parentId:ctrParentId,controlId:ctrId,controlSql:ctrSql},function (e) {
				    	var _ctrParentId=e.data.parentId;
				    	var _ctrId=e.data.controlId;
				    	var _ctrSql=e.data.controlSql;
				    	//alert('_ctrParentId='+_ctrParentId+' _ctrId='+_ctrId);
				    	var _pid=$(this).attr("value");
				    	if(_pid>0) {
					    	//var _sql=replaceAll(_ctrSql,'[F0]',_pid);
				    		var _sql=_ctrSql;
					    	sql_par.push({"name":"[F0]","value":_pid});
					    	//_sql=setSysParam(_sql);
					    	sql_par=setSysParam(sql_par);
					    	ComboUtil.getComboTag(_ctrId,_sql,sql_par, "",{},'sql');
				    	}
				    });
				}
				if(ctlFilter=='Y') {
					$('#'+ctrId).bind('click',{controlId:ctrId}, function (e) {
				    	var _id=$('#'+e.data.controlId).attr("value");
				    	if(_id>0) {
				    		loadTree(_leftTree);
				    	}
					});
				}
			}
		}
		else {
			loadTree(_leftTree);
		}
	}
	function loadEditorCtl() {
		if(_comboList.length>0) {
			for(var i=0;i<_comboList.length;i++) {
				var ctrId=""+_comboList[i][0];
				var ctrSql=""+_comboList[i][1];
				var sql_par=[];
				sql_par.push({"name":"[T0]","value":_parent_id});
				var ctrParentId=""+_comboList[i][2];
				if(_comboList[i][2]=='') {
					var _sql=ctrSql;
					//_sql=setSysParam(_sql);
					sql_par=setSysParam(sql_par);
					ComboUtil.getComboTag(ctrId, _sql,sql_par, _comboList[i][3],{value:_comboList[i][4],text:_comboList[i][5]},'sql');
				}
				else {
					$('#'+ctrParentId).off();
					$('#'+ctrParentId).on('click',{"_ctrId": ctrId,"_ctrSql":ctrSql}, function (e) {
				    	var __ctrId = e.data._ctrId;
				    	var __ctrSql = e.data._ctrSql;
				    	console.log('#'+ctrParentId+'=click');
				    	var _pid=$(this).attr("value");
				    	if(_pid>0) {
					    	//var _sql=replaceAll(ctrSql,'[P0]',_pid);
					    	var _sql=__ctrSql;
					    	sql_par.push({"name":"[P0]","value":_pid});
					    	//_sql=setSysParam(_sql);
					    	sql_par=setSysParam(sql_par);
					    	ComboUtil.getComboTag(__ctrId,_sql,sql_par, "", {},"sql");
				    	}
				    });
				}
				$('#'+ctrId).on('click', function (e) {
					
			    	var _id=$(this).attr("value");
			    	if(_id>0) {
			    		//loadGridData(gridInfo);
			    	}
				});
			}
		}
	}
	function bindEvent() {
		$("#leftTree").fancytree({
			click: function(event, data){
				console.log('leftTree.click data.node.key='+data.node.key+' data.node.title='+data.node.title);
		        //var node = data.node;
				if (flagLoading)
					return;
		        _parent_id=data.node.key;
		        //alert('_parent_id='+_parent_id);
		        if(_parent_id>0) {
			        //var obj=_leftTree.getUserData(_parent_id);
			        //var _level=obj.data[0];
			        
		        }
		        loadGridData(gridInfo,_parent_id);
		        loadEditorCtl();
		        return true; 
		    }
		});

		GridUtil.setGridParam("gridInfo",{ 
    		ondblClickRow: function(id){
    			if (id) {
    				loadEditorData(id,'EDIT');
    			}
    		}
    	});
    	GridUtil.setGridParam("gridInfo",{ 
	    	onSelectRow: function(id) {
	            if (id) {
	            	loadEditorData(id,'CANCEL');
	            }
	    	}
        });
	}
	function doLoad() {
		
		//hd_module_id=document.getElementById("hd_module_id").value;
		this.validator=new DataValidator([{region:'divContent',fields:valid_ar}]);	
		initControl();
		bindEvent();
		if(_onLoad) _onLoad();
		//_leftTree.enableDragAndDrop(true);

		//_leftTree.setDragBehavior("complex");
		//loadTree(db_name,rightTree,"2175");
		//document.getElementById("cmdAddNew").disabled=true;
		//document.getElementById("cmdSave").disabled=true;
		
	}
	
	
	function getFilterParam() {
		var f_par=[];
		//alert('loadGridData _id='+_id);
		var enoughParam=true;
		for(var i=0;i<_filter.length;i++) {
			var ctrId=_filter[i][FLT_ID];
			var ctrParam=_filter[i][FLT_ISPARAM];
			if(_filter[i][FLT_SQL]!='') {
				
				if(ctrParam=='Y') {
					var _pid=$('#'+ctrId).attr("value");
					//console.log(ctrId+'.value='+_pid);
					if(_pid!='' && _pid!=0) {
						//lookup_sql = replaceAll(lookup_sql,"[F"+i+"]",_pid);
						f_par.push({"name":"[F"+i+"]","value":_pid});
					}
					else {
						//console.log(ctrId +' ?='+_pid);
						enoughParam=false;
					}
				}
			}
			else {
				if(ctrParam=='Y') {
					var _pid=$('#'+ctrId).attr("value");
					console.log(ctrId+'.value='+_pid);
					if(_pid!='') {
						//lookup_sql = replaceAll(lookup_sql,"[F"+i+"]",_pid);
						f_par.push({"name":"[F"+i+"]","value":""+_pid});
					}
					else {
						f_par.push({"name":"[F"+i+"]","value":""+_pid});
						//enoughParam=false;
					}
				}
			}
		}
		if(enoughParam) {
			return f_par;
		}
		else {
			return null;
		}
	}
	function loadTree(treeObj) {
		//treeObj.insertNewChild(null,"12345","xxxxxx",0,0,0,0,"CALL,CHILD");
		//treeObj.insertNewChild(0,1,"aaa",0,0,0,0,"CALL,CHILD");
		/**/
		//_orgLevel = leaf_level;
		var _id=null;
		var _sql=_treeSQL;
		var _flag=true;
		var sql_par=[];
		if(_filter.length>0) {
			for(var i=0;i<_filter.length;i++) {
				var ctrId=_filter[i][0];
				var ctrSql=_filter[i][1];
				var ctrParentId=_filter[i][2];
				var ctlFilter=_filter[i][3];
				if(ctlFilter=='Y') {
					_id=$('#'+ctrId).attr("value");
					console.log('loadTree id='+_id);
			    	if(_id>0) {
			    		//_sql=replaceAll(_sql,'[F'+i+']',_id);
			    		sql_par.push({"name":"[F"+i+"]","value":_id});
			    	}
			    	else {
			    		_flag=false;
			    	}
				}
			}
		}
		
		
		if(_flag) {
			//var data_ar = jsonrpc.AjaxJson.ajaxExecuteQuery(_sql);
			
			//_sql=setSysParam(_sql);
			sql_par=setSysParam(sql_par);
			//var data_ar = jsonrpc.AjaxJson.ajaxCALL_MYSQL_SP_R("{call tree_query(?,?,?,?,?,?)}",_sql,"S,S,S,S,S,S");
			var data_ar = jsonrpc.AjaxJson.ajaxExecuteQueryO(_sql,sql_par);
			console.log('data_ar='+data_ar.toLowerCase());
			//alert('data_ar='+data_ar);
			flagLoading = true;
			TreeUtil.load("leftTree",JSON.parse(data_ar),true);
			//loadEditorCtl();
			//treeObj.clearAll();
			//treeObj.parse(data_ar);
			//treeObj.bind();
		}
		flagLoading = false;
		//treeObj.loadJSArray(data_ar); // loading from an array object
	}
	function loadEditorCtl() {
		var filterParam=[];
		filterParam=getFilterParam();
		if(_comboList.length>0) {
			for(var i=0;i<_comboList.length;i++) {
				var ctrId=_comboList[i][0];
				var ctrSql=_comboList[i][1];
				var ctrParentId=_comboList[i][2];
				var sql_par=[];
				sql_par.push({"name":"[T0]","value":_parent_id});
				if(_comboList[i][2]=='') {
					var _sql=ctrSql;
					//_sql=setSysParam(_sql);
					sql_par=setSysParam(sql_par);
					if(filterParam!=null && filterParam.length>0) {
						for(var i2=0;i2<filterParam.length;i2++) {
							sql_par.push(filterParam[i2]);
						}
					}
					ComboUtil.getComboTag(ctrId, _sql,sql_par,_comboList[i][3],{value:_comboList[i][4],text:_comboList[i][5]},'sql');
				}
				else {
					$('#'+ctrParentId).off();
					$('#'+ctrParentId).on('click',{"_ctrId": ctrId,"_ctrSql":ctrSql}, function (e) {
				    	var __ctrId = e.data._ctrId;
				    	var __ctrSql = e.data._ctrSql;
				    	var _pid=$(this).val();
				    	if(_pid>0) {
					    	//var _sql=replaceAll(ctrSql,'[P0]',_pid);
				    		var _sql=__ctrSql;
					    	sql_par.push({"name":"[P0]","value":_pid});
					    	//_sql=setSysParam(_sql);
					    	sql_par=setSysParam(sql_par);
					    	if(filterParam!=null && filterParam.length>0) {
								for(var i2=0;i2<filterParam.length;i2++) {
									sql_par.push(filterParam[i2]);
								}
							}
					    	ComboUtil.getComboTag(__ctrId,_sql,sql_par, "", {},"sql");
				    	}
				    });
				}
				$('#'+ctrId).on('click', function (e) {
			    	var _id=$(this).val();
			    	if(_id>0) {
			    		//loadGridData(gridInfo);
			    	}
				});
			}
		}
	}
	function loadGridData(grd, _tid) {
		if (flagLoading)
			return;
		_toolbar.setMode('ENABLE');
		
		//document.getElementById("cmdAddNew").disabled=false;
		//grd.clearAll();
		var lookup_sql = _gridSQL;
		var sql_par=[];
		//alert('loadGridData _id='+_id);
		var filterParam=[];
		filterParam=getFilterParam();
		if(filterParam!=null && filterParam.length>0) {
			for(var i2=0;i2<filterParam.length;i2++) {
				sql_par.push(filterParam[i2]);
			}
		}
		sql_par.push({"name":"[T0]","value":_tid});
		sql_par=setSysParam(sql_par);
		GridUtil.loadGridBySqlPage("gridInfo",lookup_sql,sql_par);
		
		
	}

	function newEditorData() {
		//alert("user_id="+user_id);
		_object_id=null;
		for(var i=0;i<_dataCtl.length;i++) {
			var ctlName=_dataCtl[i][CTL_CONTROL_TYPE]+_dataCtl[i][CTL_COLUMN_NAME];
			var reset=true;
			for(var j=0;j<_filter.length;j++) {
				if(ctlName==_filter[j][0]) {
					reset=false;
					break;
				}
			}
			if(reset)
				$('#'+ctlName).val("");
		}
		return true;
	}
	function loadEditorData(item_id,mode) {
		_toolbar.setMode('CANCEL');
		var row = $("#gridInfo").jqGrid('getRowData', item_id);
		_object_id = row[_keyField];//gridInfo.cellById(item_id,_gridKeyIdx).getValue();
		//alert('_object_id='+_object_id);
		//document.getElementById("cmdSave").disabled=false;
		//var sql = replaceAll(_formSQL,"[0]",_object_id);
		var sql = _formSQL;
		var sql_par=[];
		sql_par.push({"name":"[0]","value":_object_id});
		//sql=setSysParam(sql);
		sql_par=setSysParam(sql_par);
		console.log('sql='+sql);
		var data_ar = jsonrpc.AjaxJson.ajaxExecuteQueryO(sql,sql_par);
		console.log('data_ar='+data_ar);
		var rows=JSON.parse(data_ar);
		console.log('rows='+JSON.stringify(rows));
		if (rows != null && rows.length > 0) {
			var row=rows[0];
			for(var i=0;i<_dataCtl.length;i++) {
				col=_dataCtl[i];
				if(col[CTL_CONTROL_TYPE] != 'non')
					$('#'+col[CTL_CONTROL_TYPE]+col[CTL_COLUMN_NAME]).val(row[col[CTL_COLUMN_NAME]]);
			}
			
			_toolbar.setMode(mode);
		}
		return true;
	}

	function saveEditorData() {
		//console.log('saveEditorData');
		var valid=that.validator.validateForm();
		if(!valid) {
			//alert('xxxxxx');
			return false;
		}
		var obj = new Object();
		FormUtil.setFormToObject(null,_dataCtl, "", obj);
        //console.log('saveEditorData 1');
        //console.log('saveEditorData _toolbar.getMode()='+_toolbar.getMode());
        obj[_keyField]=_object_id;
        //console.log('saveEditorData='+_toolbar.getMode()+' _object_id='+_object_id);
        if(_toolbar.getMode()=='EDIT') {
        	//syslog(user_id,_toolbar.getMode(),_tableName,_keyField,obj[_keyField]);
        }
        var _spar=[];
        _spar=setSysParam(_spar);
        _object_id = FormUtil.excecuteInsertOrUpdate(_toolbar.getMode(),_tableName, _dataCtl, _keyField, obj,_spar);
        if(_toolbar.getMode()=='NEW') {
        	//syslog(user_id,_toolbar.getMode(),_tableName,_keyField,_object_id);
        }
        
        //alert('_object_id='+_object_id);
        if(typeof _onSave === "function") {
        	console.log('_onSave is func');
        	_onSave(_toolbar.getMode(),_object_id,obj);
        }
        else {
        	console.log('_onSave not func');
        	for(var i=0;i<_updateSQL.length;i++) {
	    		   //var _sql = replaceAll(_updateSQL[i],"[0]",_object_id);
        			var _sql = _updateSQL[i];
	    		    var sql_par=[];
	    			sql_par.push({"name":"[0]","value":_object_id});
	    			sql_par=setSysParam(sql_par);
	    		   //alert('replaceAll='+replaceAll);
	    		   //_sql=setSysParam(_sql);
	    		   var rt=jsonrpc.AjaxJson.execute(_sql,sql_par);
	    		   //executeDelete(_tableName,_keyField+"="+del_id);
	    	}
        }
		loadGridData(gridInfo, _parent_id);	
		loadTree(_leftTree,0);
		return true;
	}

	function deleteData(){
		var idx = $("#gridInfo").jqGrid('getGridParam', 'selarrrow');
		for(i=0;i<idx.length;i++){
		      var row = $("#gridInfo").jqGrid('getRowData', idx[i]);
		      var del_id=row[_keyField];//gridInfo.cellById(id,_gridKeyIdx).getValue();
	    	   //syslog(user_id,'DELETE',_tableName,_keyField,del_id);
	    	   if(typeof _onDelete === "function") {
	           		console.log('_onDelete is func');
	           		_onDelete(del_id);
	           }
	           else {
	           	console.log('_onDelete not func');
	           	for(var i=0;i<_deleteSQL.length;i++) {
		    		   //var _sql = replaceAll(_deleteSQL[i],"[0]",del_id);
		    		   //alert('replaceAll='+replaceAll);
		    		   //_sql=setSysParam(_sql);
		    		   var rt=jsonrpc.AjaxJson.execute(_sql);
		    		   var _sql = _deleteSQL[i];
		    		    var sql_par=[];
		    			sql_par.push({"name":"[0]","value":del_id});
		    			sql_par=setSysParam(sql_par);
				        jsonrpc.AjaxJson.execute(_sql,sql_par);
				        
		    		}
	           }
		}
		loadGridData(gridInfo,_parent_id);
		loadTree(_leftTree);
		_toolbar.setMode('CANCEL');
		return true;
	}
}