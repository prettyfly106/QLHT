var FLT_ID=0;
var FLT_SQL=1;
var FLT_PARENT=2;
var FLT_ISPARAM=3;
var FLT_RELOAD=4;
var FLT_SELVAL=5;
var FLT_DFLTEXT=6;
function CFindMgr(opt) {
	var gridInfo;
	var _object_id = '';
	var _data = [];
	var flagLoading = false;
	var _mode=opt._mode;
	var _param=opt._param;
	var _filter=opt._filter;
	var _filterOption=opt._filterOption;
	var _tableName=opt._tableName;
	var _keyField=opt._keyField;
	var _gridHeader=opt._gridHeader;
	var _gridSQL=opt._gridSQL;
	var _customButton=opt._customButton;
	var _onLoad=opt._onLoad;
	var valid_ar =opt.valid_ar;
	var _template = opt._template;
	var _type = opt._type;
	var _lang = lang;
	var that=this;
	this.load=doLoad;
	/*
	function setSysParam(_sql) {
		var v_sql=""+_sql;
		for(var i1=0;i1<_param.length;i1++) {
			v_sql=replaceAll(v_sql,'[S'+i1+']',_param[i1]);
		}
		return v_sql;
	}
	*/
	function setSysParam(_par_ar) {
		var v_par=_par_ar;
		for(var i1=0;i1<_param.length;i1++) {
			//console.log('_param['+i1+']='+_param[i1]);
			v_par.push({"name":"[S"+i1+"]","value":_param[i1]});
		}
		return v_par;
	}
	
	
	function initControl(){
		if(i18n_ims[_template]) {
			//console.log('i18n1='+_template);
			$.i18n().load(i18n_ims[_template]);
		}
		$.i18n().load(i18n_ims.err_code);
		$.i18n().load(i18n_ims.com_msg);
		$.i18n().locale = _lang;
		
		$.jMaskGlobals = {
			    maskElements: 'input,td,span,div',
			    dataMaskAttr: '*[data-mask]',
			    dataMask: true,
			    watchInterval: 300,
			    watchInputs: true,
			    watchDataMask: true,
			    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
			    translation: {
			        '0': {pattern: /\d/},
			        '9': {pattern: /\d/, optional: true},
			        '#': {pattern: /\d/, recursive: true},
			        'A': {pattern: /[a-zA-Z0-9]/},
			        'S': {pattern: /[a-zA-Z]/}
			    }
			  };
		
		//var tpl=$("#template-"+_template).html();
		//$('#divContent').html(tpl);
		//if(_filter.length>0) {
		//	tpl=$("#template-"+_template+"-Filter").html();
		//	$('#divFilter').html(tpl);
		//}
		$('#divContent').load('../dynform/FindMgrEx/'+_template+'.tpl', function() {
			$("[data-i18n]").i18n();
			$(".select2").select2();
			loadFilter();
			bindEvent();		
			if(_onLoad) _onLoad();
			loadGridData();
		});
		gridInfo=GridUtil.init("gridInfo","600","100%",$.i18n("list"),_mode=='edit',_gridHeader);    			
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
		$("[data-i18n]").i18n();
		
	}
	function loadFilter() {
		if(_filter.length>0) {
			for(var i=0;i<_filter.length;i++) {
				var ctrId=""+_filter[i][FLT_ID];
				var ctrSql=""+_filter[i][FLT_SQL];
				//console.log('_sql: ', ctrSql);
				var ctrParentId=""+_filter[i][FLT_PARENT];
				var defaultValue =_filter[i][FLT_SELVAL];
				var defaultText = _filter[i][FLT_DFLTEXT];
				if(ctrSql!='') {
					if(ctrParentId=='') {
						var _sql=ctrSql;
						var sql_par=[];
						sql_par=setSysParam(sql_par);						
						ComboUtil.getComboTag(ctrId,_sql,sql_par, "", {value:defaultValue,text:defaultText},'sql');						
					}
					else {
						$('#'+ctrParentId).off();
						//console.log("ctrId="+ctrId+" ctrParentId="+ctrParentId+'_click');
					    $('#'+ctrParentId).on('change',{"_ctrId": ctrId,"_ctrSql":ctrSql, "_defaultValue":defaultValue, "_defaultText":defaultText}, function (e) {
					    	var __ctrId = e.data._ctrId;
					    	var __ctrSql = e.data._ctrSql;
					    	var __defaultValue = e.data._defaultValue;
					    	var __defaultText = e.data._defaultText;					    	
					    	var _pid=$(this).val();
					    	if(_pid>0 || _pid!= '') {					    		
					    		var sql_par=[];
					    		sql_par.push({"name":"[P0]","value":_pid});
					    		var _sql=__ctrSql;
					    		sql_par=setSysParam(sql_par);
					    		if ($("#"+__ctrId).is("select")) {					    			
							    	ComboUtil.getComboTag(__ctrId,_sql,sql_par,"", {value:__defaultValue,text:__defaultText},'sql');
							    	$('#' + __ctrId).change();
					    		}
					    		else if ($("#"+__ctrId).is("input")){
					    			//console.log('__ctrId',$("#"+__ctrId).is("input"));
						    		//console.log('__ctrSql',__ctrSql);
						    		//console.log('_pid',_pid);						    								    		
					    			 var rt=jsonrpc.AjaxJson.getOneValue(__ctrSql,sql_par);
					    			 //console.log('rt',rt);
					    			 if(rt && rt!='null') {
					    				 $("#"+__ctrId).val(rt);
					    			 }
					    			 else {
					    				 $("#"+__ctrId).val('');
					    			 }
					    		}
					    	}
					    }).trigger("change");
					}
					/*$('#'+ctrId).on('change', function (e) {
				    	var _id=$(this).val();
				    	if(_id>0) {
				    		loadGridData(gridInfo);
				    	}
					});*/
				}
				else {
					//console.log('cmdFilter_onclick');
				}
			}
			$('#cmdFilter').on('click', function (e) {				
				var valid= that.validator.validateForm();
				if(!valid){
					return false;
				}
				loadGridData(gridInfo);
			});
		}
		else {
			loadGridData(gridInfo);
		}
	}
	function doLoad() {
		//hd_module_id=document.getElementById("hd_module_id").value;
		initControl();		
		this.validator=new DataValidator([{region:'divFilter',fields:valid_ar? valid_ar : []}]);
	}
	function bindEvent() {
		
		GridUtil.setGridParam("gridInfo",{ 
    		ondblClickRow: function(rowId){
    			if (rowId) {    			
    				var _ret = $("#gridInfo").jqGrid('getRowData', rowId);
	                window.location.href='manager.jsp?func=../QLHT/home&type='+_type+'&cid=' +_ret[_keyField];
    			}
    		},
    		onSelectRow: function(id) {
	            if (id) {
	            	//loadEditorData(id,'CANCEL');
	            }
	    	},
    		rowNum:10,rowList: [10,20,50]
    	});    	
	}
	
	
	function getFilterParam() {
		var f_par=[];
		//alert('loadGridData _id='+_id);
		var enoughParam=true;
		for(var i=0;i<_filter.length;i++) {
			var ctrId=_filter[i][FLT_ID];
			var ctrParam=_filter[i][FLT_ISPARAM];
			if(_filter[i][1]!='') {
				
				if(ctrParam=='Y') {
					var _pid=$('#'+ctrId).val();
					if(_pid>0 || _filter[i][FLT_ISPARAM]) {
						//lookup_sql = replaceAll(lookup_sql,"[F"+i+"]",_pid);						
						f_par.push({"name":"[F"+i+"]","value":_pid});
					}
					else {
						enoughParam=false;
					}
				}
			}
			else {
				if(ctrParam=='Y') {
					var _pid=$('#'+ctrId).val();
					//console.log('_pid',_pid);
					if(_pid!='' || _filter[i][3]) {
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
		//console.log('f_par : ',f_par);
		if(enoughParam || _filterOption == "1") {
			return f_par;
		}
		else {			
			return null;
		}
	}
	function loadGridData(grd) {
		//if (flagLoading) return;
		//document.getElementById("cmdAddNew").disabled=false;
		
		//grd.clearAll();
		var lookup_sql = "";
		lookup_sql=_gridSQL;
		var sql_par=[];
		//alert('loadGridData _id='+_id);
		var filterParam=[];
		//console.log(_filterOption);
		filterParam=getFilterParam();		
		if(filterParam!=null) {
			//lookup_sql=setSysParam(lookup_sql);
			sql_par=setSysParam(filterParam);
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
}
