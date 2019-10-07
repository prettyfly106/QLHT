var FLT_ID=0;
var FLT_SQL=1;
var FLT_PARENT=2;
var FLT_ISPARAM=3;
var FLT_RELOAD=4;
var FLT_SELVAL=5;
var FLT_DFLTEXT=6;
var CBO_ID=0;
var CBO_SQL=1;
var CBO_PARENT=2;
var CBO_SELVAL=3;
var CBO_DFLTEXT=4;
var CBO_BROTHER=5;


function CListMgr(opt) {
	var gridInfo;
	var _object_id = '';
	var _toolbar;
	var _data = [];
	var flagLoading = false;
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
	var _customButton=opt._customButton;
	var _onLoad=opt._onLoad;
	var _insertSQL = opt._insertSQL;
	var _deleteSQL = opt._deleteSQL;
	var _beforeInsert = opt._beforeInsert;
	var _beforeUpdate = opt._beforeUpdate;
	var _comboLoaded = false;
	var lastSel = null;
	
	var valid_ar =opt.valid_ar;
	var _template = opt._template;
	var _lang = lang;
	//console.log('_res: ', _res);
	
	
	var that=this;
	this.load=doLoad;
	function setSysParam(_par_ar) {
		var v_par=_par_ar.slice();
		for(var i1=0;i1<_param.length;i1++) {
			//console.log('_param['+i1+']='+_param[i1]);
			v_par.push({"name":"[S"+i1+"]","value":_param[i1]});
		}
		return v_par;
	}
	
	function getFunctionSysParam(func_param){
		var tmp_par = func_param;
		for(var i1=0;i1<_param.length;i1++) {
			tmp_par = tmp_par.replaceAll("[S"+i1+"]",_param[i1]);			
		}		
		return tmp_par;
	}
	
	function getFunctionParam(func_param,arr_param) {
		var tmp_par = func_param;
		for(var i1=0;i1<arr_param.length;i1++) {
			tmp_par = tmp_par.replaceAll(arr_param.name,arr_param.value);			
		}		
		return tmp_par;
	}
	
	function initControl(){
		if(i18n_ims[_template]) {
			//console.log('i18n1='+_template);
			$.i18n().load(i18n_ims[_template]);
		}
		
		$.i18n().load(i18n_ims.err_code);
		$.i18n().load(i18n_ims.com_msg);		
		$.i18n().locale = _lang;
		
		_toolbar=new DBToolbar("db_toolbar",_lang);		
		//_toolbar.setButtonTexts(_res.add_new,null, _res.cancel,_res.save,_res.del,null, "btn-sm btn-info", null, "btn-sm btn-primary", "btn-sm btn-warning","btn-sm btn-invert");
		_toolbar.setButtons(true,false,true,true,true,false);//new,edit,cancel,save,delete,close
		_toolbar.attachEvent("NEW",newEditorData);
		_toolbar.attachEvent("CANCEL",newEditorData);
		_toolbar.attachEvent("SAVE",saveEditorData);
		_toolbar.attachEvent("DELETE",deleteData);
		_toolbar.setMode('CANCEL');
		if(_mode=='view') {
			$("#db_toolbar").hide();
		}
		else {
			$("#cmdFilter").hide();
		}
		$("#db_toolbar").addClass("btn-toolbar");
		//var tpl=$("#template-"+_template).html();
		//$('#divContent').html(tpl);
		$('#divContent').load('../dynform/ListMgrEx/'+_template+'.tpl', function() {
			$("[data-i18n]").i18n();
			$(".select2").select2();
			gridInfo=GridUtil.init("gridInfo","600","100%",$.i18n("list"),_mode == 'edit',_gridHeader);
			GridUtil.setGridParam("gridInfo",{     		
	    		rowNum:10,rowList: [5,10,20,50]
	    	});
			loadFilter();
			loadGridData(gridInfo);
			that.validator=new DataValidator([{region:'divContent',fields:valid_ar}]);			
			if(_customButton!=undefined && _customButton.length>0) {
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
			}
			//console.log(_filter);
			
			//console.log('i18n1='+JSON.stringify(i18n_ims[_template]));
			$("[data-i18n]").i18n();
			bindEvent();
			if(_onLoad) _onLoad();
		});
		//#master_checkbox,STT,ID,Mã khoa,Tên khoa@3,5,0,52,40;left,left,left,left,left;ch,ro,ro,ro,ro;int,int,int,str,str
		//gridInfo=GridUtil.init("gridInfo","600","100%","Danh sách",true,_gridHeader,_gridSQL);
		
	}
	function loadFilter() {
		if(_filter.length>0) {			
			for(var i=0;i<_filter.length;i++) {
				var ctrId=""+_filter[i][FLT_ID];
				var ctrSql=""+_filter[i][FLT_SQL];
				var ctrParentId=""+_filter[i][FLT_PARENT];
				var defaultValue = _filter[i][FLT_SELVAL] && _filter[i][FLT_SELVAL]!= "" ? _filter[i][FLT_SELVAL] : null;
				var defaultText = _filter[i][FLT_DFLTEXT] ? _filter[i][FLT_DFLTEXT] : "";
				//console.log("ctrId="+ctrId+" ctrParentId="+ctrParentId+' ctrSql='+ctrSql);
				if(ctrSql!='') {
					
					if(ctrParentId=='') {
						var _sql=ctrSql;
						//console.log(_sql);
						var sql_par=[];
						sql_par=setSysParam(sql_par);
						ComboUtil.getComboTag(ctrId,_sql,sql_par,"",{value:defaultValue,text:defaultText},"sql",null,false);
					}
					else {
						//console.log("ctrId="+ctrId+" ctrParentId="+ctrParentId+'_change');
						$('#'+ctrParentId).off();
						//console.log("ctrId="+ctrId+" ctrParentId="+ctrParentId+'_click');
					    $('#'+ctrParentId).on('change',{"_ctrId": ctrId,"_ctrSql":ctrSql, "_ctrReload": _filter[i][FLT_RELOAD], "_defaultValue":defaultValue, "_defaultText":defaultText}, function (e) {					    	
					    	var __ctrId = e.data._ctrId;
					    	var __ctrSql = e.data._ctrSql;
					    	var __ctrReload = e.data._ctrReload;
					    	var __defaultValue = e.data._defaultValue;
					    	var __defaultText = e.data._defaultText;
					    	var _pid=$(this).val();					    	
					    	if(_pid>0 || _pid && _pid != '') {					    		
						    	//var _sql=replaceAll(ctrSql,'[F0]',_pid);
					    		var _sql=__ctrSql;
					    		var sql_par=[];
					    		sql_par.push({"name":"[P0]","value":_pid});
					    		sql_par=setSysParam(sql_par);					    		
					    		if ($("#"+__ctrId).is("select")) {					    			
					    			ComboUtil.getComboTag(__ctrId,_sql,sql_par, "",{value:__defaultValue,text:__defaultText},"sql",null,false);
					    		}
					    		else if ($("#"+__ctrId).is("input")){					    			
					    			 var rt=jsonrpc.AjaxJson.getOneValue(__ctrSql,sql_par);
					    			 if(rt && rt!='null') {
					    				 $("#"+__ctrId).val(rt);
					    			 }
					    			 else {
					    				 $("#"+__ctrId).val('');
					    			 }
					    		}
					    	}
					    	//console.log('__ctrReload ',__ctrReload);
					    	var _id=$(this).val();
					    	if (__ctrReload == "Y" && _id>0){
					    		//console.log('loadGridData 1');
					    		loadGridData(gridInfo);
					    		//loadEditorCtl();
					    	}
					    }).trigger("change");
					}
					$('#'+ctrId).on('change',{"_ctrId": ctrId,"_ctrReload": _filter[i][FLT_RELOAD]}, function (e) {						
						var __ctrId = e.data._ctrId;
						var __ctrReload = e.data._ctrReload;	
				    	var _id=$(this).val();
				    	//console.log(__ctrId+' onchange='+_id+' __ctrReload='+__ctrReload);
				    	if(__ctrReload == "Y") {
				    		//console.log('loadGridData 2='+_id);
				    		loadGridData(gridInfo);
				    		//loadEditorCtl();
				    	}
					});
				}
				else {
					$('#cmdFilter').on('click', function (e) {
						//alert(''+ctrId+'change');
				    	//var _id=$('#'+ctrId).attr("value");
				    	//if(_id>0) {
				    	//	loadGridData(gridInfo);
				    	//}

						$("#gridInfo").setGridParam({page:1});

						loadGridData(gridInfo);
						if (jQuery("#gridInfo").jqGrid('getGridParam', 'records')==1) {
							loadEditorCtl($("#gridInfo").jqGrid('getRowData', 1)[_keyField]);
						}
						else {
							loadEditorCtl();
						}
					}).trigger("click");
				}
			}
		}
		else {
			
		}
		//console.log('loadGridData 4');
		loadGridData(gridInfo);
		loadEditorCtl();
	}
	function doLoad() {
		//hd_module_id=document.getElementById("hd_module_id").value;
		initControl();		
		//_leftTree.enableDragAndDrop(true);

		//_leftTree.setDragBehavior("complex");
		//loadTree(db_name,rightTree,"2175");
		//document.getElementById("cmdAddNew").disabled=true;
		//document.getElementById("cmdSave").disabled=true;
		
		//this.validator=new DataValidator([{region:'divContent',fields:valid_ar}]);	
		
	}
	function bindEvent() {
		if (_mode == 'edit') {
			GridUtil.setGridParam("gridInfo",{ 
	    		ondblClickRow: function(id){	    			
	    			if (id) {
	    				loadEditorData(id,'EDIT');
	    			}
	    		}/*,
	    		onSelectRow: function(id){
	    		     if(id && id!==lastSel){ 
	    		        jQuery('#gridInfo').restoreRow(lastSel); 
	    		        lastSel=id; 
	    		     }
	    		     jQuery('#gridInfo').editRow(id, true); 
	    		   }*/
	    	});
		}
	}
	function newEditorData() {
		//alert("user_id="+user_id);
		_object_id=null;
		for(var i=0;i<_dataCtl.length;i++) {
			var ctlName=_dataCtl[i][CTL_CONTROL_TYPE]+_dataCtl[i][CTL_COLUMN_NAME];
			var reset=true;
			for(var j=0;j<_filter.length;j++) {
				if(ctlName==_filter[j][FLT_ID] && _filter[j][FLT_ISPARAM] == 'Y') {
					reset=false;
					break;
				}
			}			
			if(reset) {
				var defaultValue = _dataCtl[i][CBO_DFLTEXT];				
				if (defaultValue) {					
					$('#'+ctlName).val(defaultValue);
				}
				else {
					if ($("#"+ctlName).is("input")) {
						$('#'+ctlName).val("");
					}
					else if ($("#"+ctlName).is("select")) {
						if ($("#"+ctlName+"[multiple]").length>0) {
							$("#"+ctlName + " option").prop('selected', false);
						}
						else $("#"+ctlName + " option").eq(0).prop('selected', true);
					}					
				}
			}				
		}
		return true;
	}
	function saveEditorData(){
		//alert('saveEditorData');
		var valid= that.validator.validateForm();
		if(!valid){
			return false;
		}
    	var obj = new Object();
    	FormUtil.setFormToObject("divContent","", obj);
        obj[_keyField]=_object_id;        
        var _spar=[];
        _spar=setSysParam(_spar);
        _spar.push({"name":"[0]","value":_object_id});
        //console.log(_spar);
        //console.log(obj);        
        if(_toolbar.getMode()=='NEW') {
        	if (_beforeInsert && _beforeInsert!= "") {
        		var _sql_type =  _beforeInsert[0];
        		var _sql =  _beforeInsert[1];        		
        		if (_sql_type == 'F') {
        			var _sql_param = _beforeInsert[2];
        			if (typeof _sql_param == 'object') {
        				_sql_param = _sql_param.join('$');
        			}        			
        			_sql_param = getFunctionSysParam(_sql_param);        			
        			_sql_param.replaceAll("[0]",_object_id);        			
        			jsonrpc.AjaxJson.ajaxCALL_SP_I(_sql, _sql_param,function(data) {        				
        				if (data>0) {
        					_object_id = FormUtil.excecuteInsertOrUpdate(_toolbar.getMode(),_tableName, _dataCtl, _keyField, obj,_spar);
        					if (_object_id != 'null') {
        				        //console.log('loadGridData 5');        	
        				        loadGridData(gridInfo);
        				        //alert('Ghi thành công');
        				        $.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});        				        
        			        }
        				}
        				else {
        					$.toaster({ title : $.i18n("system"), priority : 'danger', message : $.i18n("save_unsucess"), settings : { timeout: 3000}});
        					return false;
        				}
        			})
        		}
        		else if (_sql_type == 'Q') {
        			jsonrpc.AjaxJson.execute(_sql, _spar, function() {
        				_object_id = FormUtil.excecuteInsertOrUpdate(_toolbar.getMode(),_tableName, _dataCtl, _keyField, obj,_spar);
        				if (_object_id != 'null') {
        			        //console.log('loadGridData 5');        	
        			        loadGridData(gridInfo);
        			        //alert('Ghi thành công');
        			        $.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});        			       
        		        }
        			})
        		}
        		
        	}
        	else {
        		_object_id = FormUtil.excecuteInsertOrUpdate(_toolbar.getMode(),_tableName, _dataCtl, _keyField, obj,_spar);
        		//syslog(user_id,_toolbar.getMode(),_tableName,_keyField,_object_id);
        		if (_object_id != 'null') {
        	        //console.log('loadGridData 5');        	
        	        loadGridData(gridInfo);
        	        //alert('Ghi thành công');
        	        $.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});        	      
                }
        	}
        }
        else if (_toolbar.getMode()=='EDIT' || _toolbar.getMode()=='SAVE') {        	
        	if (_beforeUpdate && _beforeUpdate != "") {        		
        		var _sql_type =  _beforeUpdate[0];
        		var _sql =  _beforeUpdate[1];        		
        		if (_sql_type == 'F') {
        			var _sql_param = _beforeUpdate[2];
        			if (typeof _sql_param == 'object') {
        				_sql_param = _sql_param.join('$');
        			}
        			_sql_param=getFunctionSysParam(_sql_param);
        			//console.log('_sql_param ',_sql_param);
        			_sql_param.replaceAll("[0]",_object_id);
        			jsonrpc.AjaxJson.ajaxCALL_SP_I(_sql, _sql_param,function(data) {        				
        				if (data>0) {        					
        					_object_id = FormUtil.excecuteInsertOrUpdate('EDIT',_tableName, _dataCtl, _keyField, obj,_spar);
        					if (_object_id != 'null') {
        				        //console.log('loadGridData 5');        	
        				        loadGridData(gridInfo);
        				        //alert('Ghi thành công');
        				        $.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});        				      
        			        }
        				}
        				else {
        					$.toaster({ title : $.i18n("system"), priority : 'danger', message : $.i18n("save_unsucess"), settings : { timeout: 3000}});
        					return false;
        				}
        			})
        		}
        		else if (_sql_type == 'Q') {
        			jsonrpc.AjaxJson.execute(_sql, _spar, function() {
        				_object_id = FormUtil.excecuteInsertOrUpdate('EDIT',_tableName, _dataCtl, _keyField, obj,_spar);
        				if (_object_id != 'null') {
        			        //console.log('loadGridData 5');        	
        			        loadGridData(gridInfo);
        			        //alert('Ghi thành công');
        			        $.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});        			       
        		        }
        			})
        		}
        		
        	}
        	else {
        		_object_id = FormUtil.excecuteInsertOrUpdate('EDIT',_tableName, _dataCtl, _keyField, obj,_spar);
        		//syslog(user_id,_toolbar.getMode(),_tableName,_keyField,_object_id);        		
        		if (_object_id != 'null') {
        	        //console.log('loadGridData 5');        	
        	        loadGridData(gridInfo);
        	        //alert('Ghi thành công');
        	        $.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});        	        
                }
        	}
        }        
        if(_insertSQL &&(_toolbar.getMode()=='I'||_toolbar.getMode()=='NEW')) {
        	var sql_par=[];
    		sql_par.push({"name":"[0]","value":_object_id});
    		sql_par=setSysParam(sql_par);     		
    		for (i=0; i<_dataCtl.length; i++) {
    			var _d = _dataCtl[i][2];
    			sql_par.push({"name":"[D"+i+"]","value":obj[_d]});
    		}    		
        	for(var i1=0;i1<_insertSQL.length;i1++) {        		
        		if (typeof _insertSQL[i1] == 'object') {
        			var _sql =  _insertSQL[i1].sql;
        			var _sql_param = _insertSQL[i1].par;
        			if (typeof _sql_param == 'object') {
        				_sql_param = _sql_param.join('$');
        			} 
        			_sql_param = getFunctionParam(_sql_param,sql_par);
        			jsonrpc.AjaxJson.ajaxCALL_SP_I(_sql, _sql_param);
        		}
        		else if (typeof _insertSQL[i1] == 'string') {        			
        			var _sql = ""+_insertSQL[i1];
        			jsonrpc.AjaxJson.execute(_sql,sql_par);
        		}
        		
        	}
        }
        return true;
	} 
	
	function deleteData(){				
		var idx = $("#gridInfo").jqGrid('getGridParam', 'selarrrow');
		if (idx.length > 0) {
			var cf =confirm($.i18n("delete_confirm"));
			if (!cf) return;
			var count= 0;
			for(i=0;i<idx.length;i++){
			      var row = $("#gridInfo").jqGrid('getRowData', idx[i]);
			      var del_id=row[_keyField];//gridInfo.cellById(id,_gridKeyIdx).getValue();
		    	   //syslog(user_id,'DELETE',_tableName,_keyField,del_id);
		    	   if (_deleteSQL.length > 0) {
			    	   for(var i1=0;i1<_deleteSQL.length;i1++) {
			        		var _sql = ""+_deleteSQL[i1];
			        		//_sql=replaceAll(_sql,"[0]",del_id);
			        		var sql_par=[];
				    		sql_par.push({"name":"[0]","value":del_id});
				    		sql_par=setSysParam(sql_par);
			 	    	  var rt=jsonrpc.AjaxJson.execute(_sql,sql_par);
			 	    	 if (rt>0)
			    			   count++;
			           }
		    	   }
		    	   else {
		    		   var sql_par = [_tableName, _keyField,del_id];
		    		   var rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call DEL_BY_KEY(?2S,?3S,?4S)}",sql_par.join('$'));
		    		   if (rt>0)
		    			   count++;
		    	   }
			}			
			if (count==0) {
				$.toaster({ title : $.i18n("system"), priority : 'danger', message : $.i18n("delete_unsuccess") , settings : { timeout: 3000}});
			}
			else {
				$.toaster({ title : $.i18n("system"), priority : 'success', message :  String.format("{0} ({1}/{2})",$.i18n("delete_success"),count,idx.length) , settings : { timeout: 3000}});
			}
			newEditorData();
			//console.log('loadGridData 6');
			loadGridData(gridInfo);
			_toolbar.setMode('CANCEL');			
		}
		else {
			$.toaster({ title : $.i18n("list"), priority : 'danger', message : $.i18n("unchecked") , settings : { timeout: 3000}});			
		}
		return true;
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
					var _pid=$('#'+ctrId).val();					
					if(!_pid) {
						f_par.push({"name":"[F"+i+"]","value":''});						
					}
					else {
						f_par.push({"name":"[F"+i+"]","value":_pid});
						//enoughParam=false;
					}
				}
			}
			else {
				if(ctrParam=='Y') {
					var _pid=$('#'+ctrId).val();
					//console.log(ctrId+'.value='+_pid);
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
		return f_par;
		/*if(enoughParam) {
			return f_par;
		}
		else {
			return null;
		}*/
	}
	function loadGridData(grd) {
		if (flagLoading)
			return;
		_toolbar.setMode('ENABLE');
		//document.getElementById("cmdAddNew").disabled=false;
		
		//grd.clearAll();
		var lookup_sql = "";
		lookup_sql=_gridSQL;		
		var sql_par=[];
		//alert('loadGridData _id='+_id);
		var filterParam=[];
		filterParam=getFilterParam();
		//console.log('lookup_sql ',lookup_sql);
		//console.log('filterParam ',filterParam);		
		if(filterParam!=null) {
			//lookup_sql=setSysParam(lookup_sql);
			sql_par=setSysParam(filterParam || []);
			GridUtil.loadGridBySqlPage("gridInfo",lookup_sql,sql_par);
			/*
			var data_ar = jsonrpc.AjaxJson.ajaxExecuteQueryO(lookup_sql);
			var jsonData=JSON.parse(data_ar);
			console.log('jsonData.length='+jsonData.length);
			try {
				//grd.clearAll();
				//grd.parse(data_ar, "jsarray");
				jqGrid_fetchGridData("gridInfo",jsonData);
			} catch (e) {
				alert('eeeex=' + e);
			}
			*/
		}
	}

	function loadEditorCtl() {
		var filterParam=[];
		filterParam=getFilterParam();
		if(!_comboLoaded && _comboList.length>0) {
			for(var i=0;i<_comboList.length;i++) {
				var ctrId=_comboList[i][CBO_ID];
				var ctrSql=_comboList[i][CBO_SQL];
				var ctrParentId=""+_comboList[i][CBO_PARENT];						
				var sql_par=[];
				if(ctrParentId=='') {
					var _sql=ctrSql;
					//_sql=setSysParam(_sql);
					sql_par=setSysParam(sql_par);
					if(filterParam!=null && filterParam.length>0) {
						for(var i2=0;i2<filterParam.length;i2++) {
							sql_par.push(filterParam[i2]);
						}
					}
					if (typeof ctrId == "string") {
						ComboUtil.getComboTag(ctrId, _sql,sql_par,"",{value:_comboList[i][CBO_SELVAL] != "" ? _comboList[i][CBO_SELVAL] : null,text:_comboList[i][CBO_DFLTEXT]},'sql',null,false);
					}
					else if (typeof ctrId == "object" ) {
			    		for(k=0;k<ctrId.length;k++) {
			    			var sql= (typeof ctrSql == "object") ? ctrSql[k] : ctrSql;
			    			ComboUtil.getComboTag(ctrId[k],sql,sql_par, "",{value:_comboList[i][CBO_SELVAL] != "" ? _comboList[i][CBO_SELVAL] : null,text:_comboList[i][CBO_DFLTEXT]},'sql',null,false);
			    		}
			    	}
				}
				else {
					var $parent = $('#'+ctrParentId);
					$parent.off();
					if ($parent.data('select2')) $parent = $parent.select2();					
					$parent.on('change',{"_ctrId": ctrId,"_ctrSql":ctrSql}, function (e) {				    	
				    	var __ctrId = e.data._ctrId;
				    	var __ctrSql = e.data._ctrSql;
				    	var _pid=$(this).val();				    	
				    	if(_pid!='') {					    				    		
				    		var sql_par=[];
					    	sql_par.push({"name":"[P0]","value":_pid});					    	
					    	//_sql=setSysParam(_sql);
					    	sql_par=setSysParam(sql_par);
					    	if(filterParam!=null && filterParam.length>0) {
					    		for(var i2=0;i2<filterParam.length;i2++) {
									sql_par.push(filterParam[i2]);
								}
							}
					    	if (typeof __ctrId == "string") {					    		
					    		ComboUtil.getComboTag(__ctrId,__ctrSql,sql_par, "",{},'sql',null,function(cl) {					    			
					    			$.each(cl,function(i,c) {
					    				var $ctl = $('#'+c);					    		
							    		if ($ctl.data('select2')) $ctl = $ctl.select2();					    		
							    		$ctl.change();
					    			});
					    		});
					    		
					    	}
					    	else if (typeof __ctrId == "object" ) {
					    		for(j=0;j<__ctrId.length;j++) {					    			
					    			var sql= (typeof __ctrSql == "object") ? __ctrSql[j] : __ctrSql;					    			
					    			ComboUtil.getComboTag(__ctrId[j],sql,sql_par, "",{},'sql',null,function(cl) {					    				
					    				$.each(cl,function(i,c) {
						    				var $ctl = $('#'+c);					    		
								    		if ($ctl.data('select2')) $ctl = $ctl.select2();					    		
								    		$ctl.change();
						    			});
					    			});					    			
					    		}
					    	}
					    	
				    	}
				    	else {
				    		$.each(__ctrId.split(","),function(i,c) {
			    				var $ctl = $('#'+c);
			    				$ctl.empty();
					    		if ($ctl.data('select2')) $ctl = $ctl.select2();					    		
					    		$ctl.change();
			    			});
				    	}
				    }).change();
				}
			}
			//_comboLoaded = true;
		}
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
		var data_ar = jsonrpc.AjaxJson.ajaxExecuteQueryO(sql,sql_par);
		//console.log('data_ar='+data_ar);
		var rows=$.parseJSON(data_ar);
		//console.log('rows='+JSON.stringify(rows));
		if (rows != null && rows.length > 0) {
			var row=rows[0];			
			for(var i=0;i<_dataCtl.length;i++) {
				var reset=true;				
				col=_dataCtl[i];
				var ctlName = col[CTL_CONTROL_TYPE]+col[CTL_COLUMN_NAME];
				for(var j=0;j<_filter.length;j++) {					
					if(ctlName==_filter[j][FLT_ID] && _filter[j][FLT_ISPARAM] == 'Y') {
						reset=false;
						break;
					}
				}
				if (reset) {									
					if(col[CTL_CONTROL_TYPE] != 'non')
					{
						if ($('#'+ctlName+'[multiple]').length>0 && row[col[CTL_COLUMN_NAME]]) {
							$.each(row[col[CTL_COLUMN_NAME]].split(','), function(i,e){
							    $('#' + ctlName + ' option[value="' + e + '"]').prop("selected", true);
							});
						}
						else $('#'+ctlName).val(row[col[CTL_COLUMN_NAME]]);
					}	
						
				}				
			}
			console.log(mode);
			_toolbar.setMode(mode);
		}
		return true;
	}
}
