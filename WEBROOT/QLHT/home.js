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
var CBO_DISABLE=5;

function Home() {	
    
    var draging = false;
    var _comboLoaded = false;    
    window._lang = "vn";
    var str_search_params = [
	     ["STATION_CODE","STATION_NAME"],
	     ["POLE_CODE","POLE_NAME"],
	     ["MANHOLE_CODE","MANHOLE_NAME"],
	     ["JOINT_CODE"],
	     ["A.CABLELINE_CODE"]
     ];
    var str_search = "SELECT A.TYPE, A.ID, A.CODE, A.NAME, A.ITEM_TYPE, (D.WARDS_NAME || ' - '|| C.DISTRICT_NAME || ' - ' || B.CITY_NAME) INFO, LATITUDE, LONGITUDE FROM " +
    		"(SELECT 0 TYPE, STATION_ID ID, STATION_CODE CODE, STATION_NAME NAME, STATIONTYPE_ID ITEM_TYPE, CITY_CODE, DISTRICT_CODE, WARDS_CODE,  LATITUDE, LONGITUDE FROM STATIONS WHERE STATUS>0 [C0] " +
    		"UNION ALL " +
    		"SELECT 1, POLE_ID, POLE_CODE, POLE_NAME, POLETYPE_ID, CITY_CODE, DISTRICT_CODE, WARDS_CODE, LATITUDE, LONGITUDE FROM POLES WHERE STATUS>0 [C1] " +
    		"UNION ALL " +
    		"SELECT 2, MANHOLE_ID, MANHOLE_CODE, MANHOLE_NAME,MANHOLE_TYPE_ID, CITY_CODE, DISTRICT_CODE, WARDS_CODE,  LATITUDE, LONGITUDE FROM MANHOLES WHERE STATUS>0 [C2] " +
    		"UNION ALL " +
    		"SELECT 3, JOINT_ID, JOINT_CODE, REASON, CAPACITY, CITY_CODE, DISTRICT_CODE, WARDS_CODE,  LATITUDE, LONGITUDE FROM JOINTS WHERE STATUS>0 [C3] " +
    		"UNION ALL " +
    		"SELECT 4, A.CABLELINE_ID, A.CABLELINE_CODE, A.DESCRIPTION, A.CAPACITY ,B.CITY_CODE , B.DISTRICT_CODE,B.WARDS_CODE,  B.LATITUDE, B.LONGITUDE FROM CABLELINES A, TABLE(GET_NODE_INFO(A.CABLELINE_ID,0)) B WHERE A.STATUS > 0 [C4]) A, LST_CITY B, LST_DISTRICT C, LST_WARDS D " +
    		"WHERE A.CITY_CODE = B.CITY_CODE AND A.DISTRICT_CODE=C.DISTRICT_CODE AND A.WARDS_CODE = D.WARDS_CODE";
	var that=this;	
	this.load=doLoad;
	that.infoType;
	var object_id = {};
	that.objectId = object_id;
	that.allowed = false;
	var MOUSE_OVER = false;
	$('body').bind('mousewheel', function(e){
	  if(MOUSE_OVER){
	    if(e.preventDefault) { e.preventDefault(); } 
	    e.returnValue = false; 
	    return false; 
	  }
	});
    
	$(window).resize(function() {
		$("#"+mapId).css("height",$(this).height()-161 + "px");		
	}).trigger("resize");
    
	$(document).on('click','button',function(e) {		
		if (!$(this).is(":visible")) {			
			e.stopImmediatePropagation();
		};
	});
	
	function loadInfo(infoType, infoId) {
		(function () {			
			loadAsync('../template/'+infoType+'.js', function(){
				object_id[infoType] = infoId;				
				that.infoType = infoType;
				initControl(_opts[infoType][_lang],infoType);				
		    });
		})();
	}
	
	function initControl(opts, infoType){		
		if(i18n_ims[opts._template]) {			
			$.i18n().load(i18n_ims[opts._template]);
		}		
		$('#dInfo').load('../template/'+opts._template+'.tpl', function() {
			$("[data-i18n]").i18n();
			in_zone=true;
			$((opts._container ? "#" + opts._container +" ": "") + ".select2").select2();
			if(opts._onLoad) opts._onLoad(object_id[infoType]);
			that.loadFilter(opts._filter);			
			that.loadEditorCtl(opts._comboList, opts._filter);
			if (object_id[infoType]) {				
				that.loadEditorData(object_id[infoType], opts._formSQL,opts._data)				
				if (opts._onEdit && typeof opts._onEdit == 'function') {
					opts._onEdit();
				}				
			}
			else {
				$("#txtLATITUDE").val(current_event.latLng.lat());
	        	$("#txtLONGITUDE").val(current_event.latLng.lng());
	        	$("#btnDelete").hide();
	        	that.CapNhatViTri();
	        	if (opts._onNew && typeof opts._onNew == 'function') {
					opts._onNew();
				}	        	
			}
			if(opts._afterLoad) opts._afterLoad(object_id[infoType]);
			$btnGeoCode = $('#btnGeoCode');
			if ($btnGeoCode.length>0) {
				$btnGeoCode.on("click", function(e) {
					that.CapNhatViTri();
				});
			}
			
			function saveData() {
				var isNew = !object_id[infoType];				
				var rt = that.saveEditorData(opts, object_id[infoType], opts._onSave != undefined);
				if (rt && rt != 'null') {
					// Nếu tồn tại hàm onSave => Lưu dữ liệu bằng hàm onSave
					if (rt && opts._onSave && typeof opts._onSave == 'function') {						
						rt = opts._onSave(rt);
					}
					if (isNew) {												
						object_id[infoType] = rt;
						current_id = rt;
						if (current.type==4) {
							current.setMap(null);
							current=createCable(current.capacity,rt,current.getPath());							
						}
						else {
							current=replaceMarker(current,current_id);							
						}
						window[opts._markerList][rt]=current;
						if (opts._onInsert && typeof opts._onInsert == 'function') {
							opts._onInsert(rt);
						}
					}
					else{
						if (opts._onUpdate && typeof opts._onUpdate == 'function') {
							opts._onUpdate(rt);
						}
					}					
					$("#btnDelete").show();					
					if (!current_line) {
						if (!isNew) {
							jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call UPDATE_CABLE_NODE(?2L,?3L,?4L,?5S)}",[current_id, current.type,1,user_id].join('$'));
						}
						currentLatLng = current.getPosition();
						
						jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call UPDATE_USER_STARTUP_COORDINATE(?2L,?3L,?4S,?5S)}",[user_id, _map.getZoom(),currentLatLng.lat(),currentLatLng.lng()].join('$'));
					}
					else { // Lưu thông tin cáp.
						if (current_line.length>0) {
							jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call UPDATE_USER_STARTUP_COORDINATE(?2L,?3L,?4S,?5S)}",[user_id, _map.getZoom(),current_line[0].getPosition().lat(),current_line[0].getPosition().lng()].join('$'));
						}
						saveCableNodes(current, current_line);						
					}
					
					window[opts._getListFunc].apply(null);
				}
			}
			
			
			$('#btnSave').on("click",function(e){
				if (!$(this).is(":visible")) return;
				console.log($('#cboDISTRICT_CODE').val());
				saveData();
				/*if (user_type==2 && !current_line) {
					that.CapNhatViTri(function(in_zone) {						
						if (!in_zone) {
							cf = confirm("Ngoài vùng quản lý. Vẫn lưu?");
							if (!cf) return;							
						}						
						saveData();
					})
				}
				else {
					saveData();
				}*/
								
			});
			$('#btnDelete').on("click",function(e){
				if (!$(this).is(":visible")) return;
				var rt;
				if (opts._onDelete && typeof opts._onDelete == 'function') {
					rt=opts._onDelete(object_id[infoType]);
				}
				else {
					rt=that.deleteData(opts, object_id[infoType]);
				}
				if (rt>0) {
					if (!current_line) {
						reDrawCables(current,true);
						jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call UPDATE_CABLE_NODE(?2L,?3L,?4L,?5S)}",[current_id, current.type,0,user_id].join('$'));
					}				
					$("#dInfo").removeClass("open");					
					current.setMap(null);
					delete window[opts._markerList][current_id];
					that.endDrawingCable();
					current = null;	
					current_id = null;
					currentLatLng = null;
					current_cable_over = null;				
					$.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("delete_success"), settings : { timeout: 3000}});
				}
				else {
					$.toaster({ title : $.i18n("system"), priority : 'warning', message : $.i18n("delete_unsuccess"), settings : { timeout: 3000}});
				}
			});
			$('#btnCancel,#btnClose').on("click",function(e){				
				if ($('#connectInfo').hasClass('open')) {
					$('#connectInfo').removeClass('open');
					setTimeout(function(){$("#dInfo").removeClass("open")},1000);
				}
				else if ($('#deviceDetail').hasClass('open')) {
					$('#deviceDetail').removeClass('open');
					setTimeout(function(){$("#dInfo").removeClass("open")},1000);
				}
				else {
					$("#dInfo").removeClass("open");
				}								
				if (current_id && current_id!= 0) {					
					if (!current_line) {
						current.setPosition(currentLatLng);
						reDrawCables(current);
						current.setDraggable(false);
					}
					else {
						reDrawCable(current,current_id);						
					}
				}
				else {
					if (current_joint_cable) {
						var index = current.idx;
						current_joint_cable.getPath().removeAt(index);
					}
					current.setMap(null);					
				}				
				that.endDrawingCable();
				current = null;	
				current_id = null;
				current_line = null;
				currentLatLng = null;
				current_cable_over = null;
				current_joint_cable = null;
			});
			 $(document).on('click', '#btnConnectClose,#btnCancelConnect,.info-close', function(e) {
				var target = $(this).attr("target");				
				$("#"+target).removeClass("open");
			});
			if (opts._child) {				
				for(i=0; i<opts._child.length; i++) {
					var _child = opts._child[i];
					if (_child._onLoad && typeof _child._onLoad == 'function') _child._onLoad(object_id[infoType]);
					that.loadFilter(_child._filter);			
					that.loadEditorCtl(_child._comboList, _child._filter);
					gridInfo=GridUtil.init(_child._dGridId,"450","100%",$.i18n("list"),false,_child._gridHeader);
					$("#" + _child._dGridId).attr("index",i);
					GridUtil.setGridParam(_child._dGridId,{ 
			    		ondblClickRow: function(rowId){		    			
			    			if (rowId) {
			    				var idx = $(this).attr("index");
			    				var __child = opts._child[idx];		    				
			    				var _obj = $("#"+__child._dGridId).jqGrid('getRowData', rowId);
			    				var id = _obj[__child._keyField];
			    				that.loadEditorData(id,__child._formSQL,__child._data, __child._container,__child._prefix);				    				
			    				if (__child._onSelect && typeof __child._onSelect == "function") {			    					
			    					__child._onSelect(_obj);
								} 
			    			}
			    		},
			    		rowNum:5,rowList: [5,10]
			    	});				
					that.loadGridData(_child,object_id[infoType]);				
					for(j=0; j<_child._buttonList.length;j++) {
						var button = _child._buttonList[j];					
						$('#'+button.id).on("click",{child:_child,button:button},function(e){
							if (!$(this).is(":visible")) return;
							var _button = e.data.button;						
							var __child = e.data.child;
							var idQuery = "#"+(__child._prefix || "")+"txt" +__child._keyField;							
							if (__child._container) {
								idQuery = "#" + __child._container + " " + idQuery;
							}						
							var id = $(idQuery).val();
							console.log(idQuery,id);
							var rt;
							if (typeof _button.action != 'function') rt=that[_button.action].apply(null,[__child,id]);
							else rt=_button.action(__child,id);
							console.log('rt: ',rt);
							if (rt) {
								if (id=='') {
									id=rt;
									$(idQuery).val(id);
								}								
								
								if (_button.reloadGrid) {
									that.loadGridData(__child,object_id[infoType]);							
								}						
								if (_button.resetCtl) {
									that.newEditorData(__child);							
								}
								if (_button.onAction && typeof _button.onAction == "function") {
									_button.onAction(id);
								}
							}
						});
					}
				}
			}			
		});		
		$("[data-i18n]").i18n();		
	}
	
	that.CapNhatViTri=function(cb) {		
		geocoder.geocode({
		    latLng: new google.maps.LatLng($("#txtLATITUDE").val(), $("#txtLONGITUDE").val())
		  }, function(responses) {	        			
		    if (responses && responses.length > 0) {		      
		      var address = responses[0].formatted_address.split(', ').reverse();	        		      
		      if (address[0] != "Việt Nam") return;	        		      
		      $city = $('#cboCITY_CODE');		      
		      if (address[1] == "Hồ Chí Minh") address[1] = "TP Hồ Chí Minh";	        		      
		      else if (address[1] == "Thừa Thiên Huế") address[1] = "Thừa Thiên - Huế";
		      address[1] = address[1].toUpperCase();	        		      
		      $city.find("option").filter(function() {	        		    	  
		    	    return $(this).text().toUpperCase() == address[1]; 
		    	}).prop('selected', true);
		      if (user_type==2 && $("#cboCITY_CODE option:selected").text().toUpperCase() != address[1]) {
		    	  if (cb && typeof cb == 'function') cb(false);
		    	  else $.toaster({ title : $.i18n("system"), priority : 'warning', message : $.i18n("over_zone"), settings : { timeout: 3000}});
		    	  return false;
		      }		      
		      $city.change();
		      if (address[2].startsWith('tx.') || address[2].startsWith('tp.')) address[2] = address[2].substr(4);
		      address[2] = address[2].toUpperCase();
		      $district = $('#cboDISTRICT_CODE');
		      $district.find("option").filter(function() {
		    	  var text = $(this).text().toUpperCase();
		    	    return address[2] == text || "THỊ XÃ " + address[2] == text || "THÀNH PHỐ " + address[2] == text || "TP " + address[2] == text || "QUẬN " + address[2] == text || "HUYỆN " + address[2] == text; 
		    	}).prop('selected', true);
		      $district.change();
		      address[3] = address[3].toUpperCase();	        		      
		      $wards = $('#cboWARDS_CODE');
		      $wards.find("option").filter(function() {
		    	  var text = $(this).text().toUpperCase();
		    	    return address[3] == text || "XÃ " + address[3] == text || "PHƯỜNG " + address[3] == text; 
		    	}).prop('selected', true);
		      $wards.change();		      
		      if (cb && typeof cb == 'function') cb(true);
		      return true;
		    }
		  });
	}
	
	that.loadGrid=function(gridId, sql, par) {
		var grid = $('#' + gridId);
		if (!sql) {
			sql = grid.attr('sql');
		}
		var sql_par= par ? par.slice() : [];		
		sql_par=setSysParam(sql_par);		
		GridUtil.loadGridBySqlPage(gridId,sql,sql_par);
	}
	
	that.loadGridData=function(opt,parentId) {				
		var lookup_sql = "";
		lookup_sql=opt._gridSQL;		
		var sql_par=[];
		//alert('loadGridData _id='+_id);
		var filterParam=[];
		filterParam=getFilterParam(opt._filter);
		//console.log('lookup_sql ',lookup_sql);
		//console.log('filterParam ',filterParam);		
		if(filterParam!=null) {
			//lookup_sql=setSysParam(lookup_sql);
			sql_par=setSysParam(filterParam);
			if (parentId) {
				sql_par.push({name:"[P0]",value:parentId});
			}			
			GridUtil.loadGridBySqlPage(opt._dGridId,lookup_sql,sql_par);			
		}
	}
	
	that.saveEditorData=function(opts, objectId, getOjbectOnly) {
		var _object_id = objectId;		
		var valid= new DataValidator([{region:opts._container,fields:opts.valid_ar}]).validateForm();
		if(!valid){
			return false;
		}		
    	var obj = new Object();    	
    	FormUtil.setFormToObject(opts._container,opts._prefix || "", obj);    	
    	for (x=0; x<opts._data.length;x++) {
    		_opt = opts._data[x];
    		if (_opt[CTL_COLUMN_ATR]=="P") {
    			obj[_opt[CTL_COLUMN_NAME]] = $('#' + _opt[CTL_CONTROL_TYPE] + _opt[CTL_COLUMN_NAME]).val();
    		}
    	}
    	for(i=0;i<opts.valid_ar.length;i++) {
    		var v = opts.valid_ar[i];
			if (v.checkExist) {				
				var check_field = v.name.substr(3);
				var check_value = obj[check_field];
				var check_condition;
				if (v.checkExist == "N") {
					check_condition = String.format("UPPER({0}) = UPPER('{1}')",check_field,check_value);
				}
				else {
					check_condition = String.format("{0} = '{1}'",check_field,check_value);
				}				
				var sql_check = String.format("SELECT COUNT(*) FROM [0] WHERE STATUS>0 AND [1]");//CHECK.001;
				
				if (_object_id && _object_id != '') {
					check_condition +=  String.format(" AND {0}<>{1}",opts._keyField,_object_id);
				}
				var sql_par = RSUtil.buildParam("", [opts._tableName, check_condition]);
				var rt = jsonrpc.AjaxJson.ajaxExecuteQuery(sql_check, sql_par);
				if (rt && rt[0][0]>0) {
					$.toaster({ title : $.i18n("system"), priority : 'warning', message : v.display + " " + $.i18n("existed") , settings : { timeout: 3000}});
					$elm = $('#'+ opts._container).find('#'+v.name);
					$elm.animateCss("shake");
					$elm.focus();
					return false;
				}
			}
		};
        obj[opts._keyField]=_object_id;
        console.log('_object_id: ',_object_id);
        if (opts._parentField) {
        	obj[opts._parentField] = object_id[that.infoType];        	
        }        
        if (getOjbectOnly) {
        	return obj;
        }
        return that.saveData(opts, _object_id,obj);        
	}
	
	that.saveData=function(opts, objectId,obj) {
		var _object_id=objectId
		var _spar=[];
        _spar=setSysParam(_spar);
        _spar.push({"name":"[0]","value":_object_id});
        _object_id = FormUtil.excecuteInsertOrUpdate((_object_id && _object_id != '' && $.isNumeric(_object_id)) ? "EDIT" : "NEW",opts._tableName, opts._data, opts._keyField, obj,_spar);        		
        if (_object_id != 'null') {        	
        	$.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("save_success"), settings : { timeout: 3000}});
        	$((opts._container ? "#" + opts._container + " " : "") + "#" + (opts._prefix || "") + "txt" + opts._keyField).val(_object_id);
        }
        else {
        	$.toaster({ title : $.i18n("system"), priority : 'warning', message : $.i18n("save_unsuccess"), settings : { timeout: 3000}});
        	return false;
        }
        return _object_id;
	}
	
	 that.deleteData=function(opts, objectId){
		var cf =confirm($.i18n("delete_confirm"));		
		if (!cf) return;	
	   var sql_par = [opts._tableName, opts._keyField,objectId];
	   var rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call DEL_BY_KEY(?2S,?3S,?4S)}",sql_par.join('$'));
		/*if (rt>0) {			
			$.toaster({ title : $.i18n("system"), priority : 'success', message : $.i18n("delete_success") , settings : { timeout: 3000}});
		}
		else {
			$.toaster({ title : $.i18n("system"), priority : 'danger', message : $.i18n("delete_unsuccess") , settings : { timeout: 3000}});
		}*/
		return true;
	}
	
	that.loadFilter=function(_filter,gridId,par) {
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
						var sql_par = [];
						if (par) sql_par = par.slice();
						sql_par=setSysParam(sql_par);
						ComboUtil.getComboTag(ctrId,_sql,sql_par,"",{value:defaultValue,text:defaultText},"sql", null, false);
					}
					else {
						$('#'+ctrParentId).off();
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
					    		var sql_par=par ? par.slice() : [];
					    		sql_par.push({"name":"[F0]","value":_pid});
					    		sql_par=setSysParam(sql_par);					    		
					    		if ($("#"+__ctrId).is("select")) {					    			
					    			ComboUtil.getComboTag(__ctrId,_sql,sql_par, "",{value:__defaultValue,text:__defaultText},"sql", null, false);
					    			$("#"+__ctrId).trigger("change");
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
					    		var filterParam=getFilterParam(_filter);					    		
					    		that.loadGrid(gridId,null,par.concat(filterParam));					    		
					    	}
					    }).trigger("change");
					}
					$('#'+ctrId).on('change',{"_ctrId": ctrId,"_ctrReload": _filter[i][FLT_RELOAD]}, function (e) {						
						var __ctrId = e.data._ctrId;
						var __ctrReload = e.data._ctrReload;	
				    	var _id=$(this).val();
				    	//console.log(__ctrId+' onchange='+_id+' __ctrReload='+__ctrReload);
				    	if(__ctrReload == "Y" && _id>0) {
				    		//console.log('loadGridData 2='+_id);
				    		var filterParam=getFilterParam(_filter);				    		
				    		that.loadGrid(gridId,null,par.concat(filterParam));			    		
				    	}
					}).trigger("change");
				}
			}
		}
		else {
			
		}
		
	}
	
	function getFilterParam(_filter) {
		var f_par=[];
		//alert('loadGridData _id='+_id);
		var enoughParam=true;
		for(var i=0;i<_filter.length;i++) {
			var ctrId=_filter[i][FLT_ID];
			var ctrParam=_filter[i][FLT_ISPARAM];
			if(_filter[i][FLT_SQL]!='') {
				
				if(ctrParam=='Y') {
					var _pid=$('#'+ctrId).val();					
					if(_pid!=undefined && _pid!='' && _pid>=0) {
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
		if(enoughParam) {
			return f_par;
		}
		else {
			return null;
		}
	}
	
	that.loadEditorCtl=function(_comboList,_filter,par) {		
		var filterParam=[];
		filterParam=getFilterParam(_filter);
		if(_comboList.length>0) {
			for(var i=0;i<_comboList.length;i++) {
				var ctrId=""+_comboList[i][CBO_ID];
				var ctrSql=""+_comboList[i][CBO_SQL];
				var ctrParentId=""+_comboList[i][CBO_PARENT];						
				var sql_par=par||[];
				if(ctrParentId=='') {
					var _sql=ctrSql;
					//_sql=setSysParam(_sql);
					sql_par=setSysParam(sql_par);
					if(filterParam!=null && filterParam.length>0) {
						for(var i2=0;i2<filterParam.length;i2++) {
							sql_par.push(filterParam[i2]);
						}
					}					
					ComboUtil.getComboTag(ctrId, _sql,sql_par,"",{value:_comboList[i][CBO_SELVAL] != "" ? _comboList[i][CBO_SELVAL] : null,text:_comboList[i][CBO_DFLTEXT]},'sql', null);
					//$('#'+ctrId).trigger("change");
				}
				else {
					$parent = $('#'+ctrParentId);									
					//$parent.off();
					$parent.select2().on('change',{"_parentId":ctrParentId,"_ctrId": ctrId,"_ctrSql":ctrSql,"_cltSelVal":_comboList[i][CBO_SELVAL], "_ctlDefaultText": _comboList[i][CBO_DFLTEXT]}, function (e) {
						var __parentId = e.data._parentId;
				    	var __ctrId = e.data._ctrId;
				    	var __ctrSql = e.data._ctrSql;
				    	var _ctlSelVal = e.data._cltSelVal;
				    	var _ctlDefaultText = e.data._ctlDefaultText;
				    	var parents = $('#'+__parentId);
				    	var _sql_par=[];
				    	parents.each(function(i,p) {
				    		var parent = $(p);
				    		var _pid;				    		
				    		if (parent.data('select2'))
					    	{	
					    		_pid=parent.select2("val");				    		
					    	}
					    	else {
					    		_pid=parent.val();
					    	}
				    		if (_pid) {
				    			_sql_par.push({"name":"[P"+i+"]","value":_pid});
				    		}
				    	});				    	
				    	
				    	if(_sql_par.length>0) {
					    	//var _sql=replaceAll(ctrSql,'[P0]',_pid);
				    		var _sql=__ctrSql;  		
					    	//_sql=setSysParam(_sql);
				    		_sql_par=setSysParam(_sql_par);
					    	if(filterParam!=null && filterParam.length>0) {
					    		for(var i2=0;i2<filterParam.length;i2++) {
					    			_sql_par.push(filterParam[i2]);
								}
							}
					    	ComboUtil.getComboTag(__ctrId,_sql,_sql_par, "",{value :_ctlSelVal != "" ? _ctlSelVal : null, text: _ctlDefaultText},'sql');
					    	$('#' + __ctrId).select2().change();
				    	}				    	
				    }).change();
				}				
			}			
		}
	}
	
	that.newEditorData=function(opts) {		
		var ctl = opts._data;
		var filter = opts._filter;
		var container = opts._container;
		_object_id=null;
		if (opts._onResetForm && typeof opts._onResetForm=="function") {
			opts._onResetForm();
		}
		for(var i=0;i<ctl.length;i++) {
			var ctlName=ctl[i][CTL_CONTROL_TYPE]+ctl[i][CTL_COLUMN_NAME];			
			var reset=ctl[i][CTL_COLUMN_ATR] != "P";
			if (reset) {
				for(var j=0;j<filter.length;j++) {
					if(ctlName==filter[j][FLT_ID] && filter[j][FLT_ISPARAM] == 'Y') {
						reset=false;
						break;
					}
				}
			}			
			if(reset) {
				var defaultValue = ctl[i][CBO_DFLTEXT];
				$ctl = $((container ? "#"+ container + ' ' : '') + '#'+ (opts._prefix || "")+ctlName);				
				$ctl.prop('disabled',null);				
				if (defaultValue) {					
					$ctl.val(defaultValue);
				}
				else {
					if ($ctl.is("input")) {
						var data_type= ctl[i][CTL_DATA_TYPE];
						if (data_type == "DT") {
							$ctl.val(moment().format('DD/MM/YYYY HH:mm:ss'));
						}
						else if (data_type == "D") {
							$ctl.val(moment().format('DD/MM/YYYY HH:mm:ss'));
						}
						else {							
							$ctl.val("");							
						}
						
					}
					else if ($ctl.is("select")) {						
						$ctl.find("option").eq(0).prop('selected', true);						
						$ctl.trigger("change");
					}					
				}
			}				
		}
		return true;
	}
	
	that.loadEditorData=function(id,sql,ctl,container,prefix) {			
		var sql_par=[];
		sql_par.push({"name":"[0]","value":id});
		//sql=setSysParam(sql);
		sql_par=setSysParam(sql_par);		
		var data_ar = jsonrpc.AjaxJson.ajaxExecuteQueryO(sql,sql_par);		
		var rows=$.parseJSON(data_ar);	
		if (rows != null && rows.length > 0) {
			var row=rows[0];			
			for(var i=0;i<ctl.length;i++) {				
				col=ctl[i];				
				if(col[CTL_CONTROL_TYPE] != 'non' && col[CTL_COLUMN_ATR]!="P") {					
					$ctl = $((container ? "#"+ container + ' ' : '') + '#'+(prefix||"")+col[CTL_CONTROL_TYPE]+col[CTL_COLUMN_NAME]);					
				    if ($ctl.is(':checkbox')) {
				    	$ctl.prop('checked', row[col[CTL_COLUMN_NAME]]>0);
				    }
				    else if ($ctl.is('span')) {
				    	$ctl.html(row[col[CTL_COLUMN_NAME]]);
				    }
				    else {				    	
				    	$ctl.val(row[col[CTL_COLUMN_NAME]]);				    	
				    }					
					$ctl.prop('disabled', col[CTL_COLUMN_ATR] == "R"   && (!id) || col[CTL_COLUMN_ATR] == "I" && id);				
					
					if (col[CTL_COLUMN_ATR] == "ASC") {
						idx=$ctl.prop('selectedIndex');
						$ctl.find('option:lt(' + idx + ')').prop('disabled',true);
					}
					else if (col[CTL_COLUMN_ATR] == "DESC") {
						idx=$ctl.prop('selectedIndex');
						$ctl.find('option:gt(' + idx + ')').prop('disabled',true);
					}
					else {
						$ctl.find('option').prop('disabled',false);
					}
					if ($ctl.is("select")) {						
						$ctl.trigger("change");
					}
				}
			}
			
		}
		return true;
	}
	
	function getArray(LatLngArray) {
    	var arr = LatLngArray.map(function(obj) {
    		return [obj.lat(), obj.lng()];    		
    	});
    	return arr;
    }
    
	routeMenu.add("editCable","Chỉnh sửa","separator",function(cable){
		routeMenu.close();
		that.editCable(cable);
	});
	
	routeMenu.add("addJoint","Thêm măng xông","", function(cable) {
		routeMenu.close();
    	$("#dInfo").addClass("open");
		loadInfo("JointInfo", null);
    	current=addMarker(null,3);		
		currentLatLng = current.getPosition();
		current_id=0;
		var path = cable.getPath();		
		var nodeIdx = ~~((findNodeIndex(currentLatLng, path.getArray())-1)/10)+1;		
		current.idx=nodeIdx;
		path.insertAt(nodeIdx,currentLatLng);		
		current_joint_cable=cable;
    });
    
    vertexMenu.add("delVertex","Xóa node","", function(index) {
    	vertexMenu.close();
    	if (current && current_line) {
    		var path = current.getPath();
    		var nodes = current.nodes;    		
        	path.removeAt(index);
        	nodes.splice(index,1);
        	var mk = current_line.splice(index,1)[0];        	
        	mk.setMap(null);
        	delete mk;
        	that.bindCableGrid();
    	}    	
    });
    
    vertexMenu.add("addVertex","Thêm node","", function() {
    	vertexMenu.close();
    	if (current && current_line) {    		 			 
			var path = current.getPath();
			var nodes = current.nodes;
			var marker = addMarker(null,null);
			var Latlng = marker.getPosition();
			var nodeIdx = ~~((findNodeIndex(Latlng, path.getArray())-1)/10)+1;			
			path.insertAt(nodeIdx,Latlng);
			current_line.splice(nodeIdx,0,marker);
			nodes.splice(nodeIdx,0,{id:marker.id,type:marker.type});
			that.bindCableGrid();
	}    	
    });
       
    
	menu.add("addStation","Thêm Nhà trạm", "separator Station", 
	  function(){
		$("#dInfo").addClass("open");
		loadInfo("StationInfo", null)
	    menu.close();
		current=addMarker(null,0);		
		currentLatLng = current.getPosition();
		current_id=0;
	  });
	menu.add("addPole","Thêm Cột", "separator Pole", 
	  function(){
		$("#dInfo").addClass("open");
		loadInfo("PoleInfo", null)
		 menu.close();
		current=addMarker(null,1);		
		currentLatLng = current.getPosition();
		current_id=0;
	  });
	menu.add("addManhole","Thêm Cống bể", "separator Manhole", 
	  function(){
		$("#dInfo").addClass("open");
		loadInfo("ManholeInfo", null)
		 menu.close();
		current=addMarker(null,2);		
		currentLatLng = current.getPosition();
		current_id=0;
	  });
	cableMenu.add("removeCable","Ngắt cáp", "separator unlinkCable", 
		  function(params){				
			 cableMenu.close();			 
			var path = current.getPath();
			var nodes = current.nodes;
			path.removeAt(params.idx);
			nodes.splice(params.idx,1);
			current_line.splice(params.idx,1);
			if (!isDrawingLine && (params.nodeType == 0 || params.nodeType == 3)) {
				that.startDrawingCable();
			}
			that.bindCableGrid();
		  });
	cableMenu.add("pickCable","Nối cáp", "separator pickCable", 
			  function(marker){				
				 cableMenu.close();			 
				var path = current.getPath();
				var nodes = current.nodes;
				var Latlng = marker.getPosition();
				var nodeIdx = ~~((findNodeIndex(Latlng, path.getArray())-1)/10)+1;
				path.insertAt(nodeIdx,Latlng);
				current_line.splice(nodeIdx,0,marker);
				nodes.splice(nodeIdx,0,{id:marker.id,type:marker.type});
				that.bindCableGrid();
			  });
	// MENU : ITEM 3
	
	stationMenu.add("addRoute","Thêm tuyến cáp","sperator Cableline",function(params){
		//that.editInfo(params.station,params.station_id,"StationInfo");		
		that.drawingCable(params.station);
		stationMenu.close();
	});
	
	that.editInfo = function(item,item_id, type) {
		if (current) {
			if (current_line) {
				that.endDrawingCable();				
			}
			else {
				current.setDraggable(false);
			}
		}
		current=item;	
		current_id = current.id;		
    	if (!current_id) {
    		current_id = item_id;
    	}
    	current_id = current_id.substr(current_id.indexOf('_')+1);
    	currentLatLng = current.getPosition();
    	current_cable_over = null;
    	if ($('#connectInfo').hasClass('open')) {
			$('#connectInfo').removeClass('open');			
		}		
		$("#dInfo").addClass("open");
		current.setDraggable(true);
		loadInfo(type, current_id);
	}
	
	that.startDrawingCable = function() {
		_map.setOptions({draggableCursor:'crosshair'});
		current.setOptions({clickable: false});
		isDrawingLine = true;
	}
	
	that.endDrawingCable = function(keepNodeList) {
		_map.setOptions({draggableCursor:'hand'});
		current.setOptions({clickable: true});		
		if (!keepNodeList) {
			$.each(current_line, function(i,v) {
				if (v.type==null) {
					v.setMap(null);
					delete v;
				}
			});
			current_line = null;
		}
		isDrawingLine = false;
	}
	
	that.editCable = function(cable) {
		if (current) {
			if (current_line) {
				that.endDrawingCable();				
			}
			else {
				current.setDraggable(false);
			}
		}		
		$("#dInfo").addClass("open");		
		loadInfo("CablelineInfo", cable.id);
		current=cable;		
		current_id = cable.id;
		current_line = getCableNodes(current);
		last = current_line[current_line.length-1];
		if (last.type != 0 && last.type!=3) {
			that.startDrawingCable();
		}
	}
	
	that.bindCableGrid = function(cableline) {
		if (!cableline && current_line) {
			cableline= current_line;
		}
		else if (!current_line) {
			return;
		}
		var currentNode;
		var colSum = 0;
		var griddata = cableline.map(function(v) {
			var row = {};
			if (v.type != null) {
				row.NODE_TYPE = $.i18n(listType[v.type]);
			}
			else {
				row.NODE_TYPE = $.i18n('empty');
			}
			var pos = v.getPosition();
			row.LATITUDE = pos.lat();
			row.LONGITUDE = pos.lng();
			if (currentNode) {
				row.DISTANCE = Math.round(getDistance(currentNode,pos),2);
			}
			else {
				row.DISTANCE = 0;
			}
			colSum +=row.DISTANCE;
			currentNode = pos;
			return row;
		});		
		$grid = $('#grdCableline')
		$grid.jqGrid('clearGridData');
		$grid.jqGrid('setGridParam',{ 
            datatype: 'local',
            data:griddata
        }).trigger('reloadGrid');
		$('tr.ui-search-toolbar').children().last().html(String.format('<div class="pull-right">{0}</div>',colSum));
	}
	
	that.drawingCable = function(start) {
		$("#dInfo").addClass("open");
		loadInfo("CablelineInfo", null);		
		var lineId = guid();		
		current = createCable(0,lineId,[start.getPosition()]);
		that.startDrawingCable();
		current_id = 0;
		current_line = [start];					
		current.nodes = [{id:start.id, type:start.type}];
		current.capacity=$('#cboCAPACITY').val();		
		current.setOptions({strokeColor:cablecolors[current.capacity].COLOR});	
	}
	
	function buildSqlSearch(search_key) {
		var param = [];
		var lst_search = [];
		var match_search = $("#match_search").prop("checked")== undefined ? false : $("#match_search").prop("checked") ;
		var code_search = $("#code_search").prop("checked")== undefined ? true : $("#code_search").prop("checked");
		var name_search = $("#name_search").prop("checked")== undefined ? true : $("#name_search").prop("checked");
		lst_search[0] = $("#station_search").prop("checked")== undefined ? true : $("#station_search").prop("checked");
		lst_search[1] = $("#pole_search").prop("checked")== undefined ? true : $("#pole_search").prop("checked");
		lst_search[2] = $("#manhole_search").prop("checked")== undefined ? true :  $("#manhole_search").prop("checked");
		lst_search[3] = $("#joint_search").prop("checked")== undefined ? true :  $("#joint_search").prop("checked");
		lst_search[4] = $("#cable_search").prop("checked")== undefined ? true :  $("#cable_search").prop("checked");		
		for(i=0;i<5;i++) {			
			var str_condition = "";
			if (lst_search[i]) {
				if (code_search) {
					if (str_search_params[i][0] && match_search) {
						str_condition = String.format("{0} LIKE '%{1}%' ",str_search_params[i][0],search_key);
					}
					else {
						str_condition = String.format("UPPER({0}) LIKE '%{1}%' ",str_search_params[i][0],search_key);
					}
				}			
				if (str_search_params[i][1] && name_search) {
					if (match_search) {
						str_condition += String.format(" {0} {1} LIKE '%{2}%' ",str_condition == "" ? "" : "OR", str_search_params[i][1],search_key);
					}else {
						str_condition += String.format(" {0} UPPER({1}) LIKE '%{2}%' ",str_condition == "" ? "" : "OR",str_search_params[i][1],search_key);
					}
				}
			}
			if (str_condition != "") {
				param.push({"name":"[C"+i+"]","value":String.format(" AND ({0})",str_condition)});
			}
			else {
				param.push({"name":"[C"+i+"]","value":" AND 0=1"});
			}
		}		
		return param;
	}
	
	that.addStation = function() {
		jsonrpc.AjaxJson.ajaxExecuteQueryO("SELECT * FROM TMP_STATION WHERE STATION_CODE NOT IN (SELECT STATION_CODE FROM STATIONS)", [], function(rt) {
			var data = $.parseJSON(rt);
			if (data && data.length > 0) {
				index = 0;
				var i = setInterval(function(){
					row = data[index];
						  //your code to be executed after 1 second					
					if (row && row.LATITUDE && row.LONGITUDE)						
					geocoder.geocode({
					    latLng: new google.maps.LatLng(row.LATITUDE,row.LONGITUDE)
					  }, function(responses) {				
						  console.log(responses);  
					    if (responses && responses.length > 0) {					      
					      var address = responses[1].formatted_address.split(', ').reverse();	        		      
					      if (address[0] != "Việt Nam") return;	        		      
					      $city = $('#cboCITY_CODE');		      
					      if (address[1] == "Hồ Chí Minh") address[1] = "TP Hồ Chí Minh";	        		      
					      else if (address[1] == "Thừa Thiên Huế") address[1] = "Thừa Thiên - Huế";
					      address[1] = address[1].toUpperCase();	        		      
					      $city.find("option").filter(function() {	        		    	  
					    	    return $(this).text().toUpperCase() == address[1]; 
					    	}).prop('selected', true);	        		      
					      $city.change();
					      city_code = $city.val() ? $city.val(): 501;
					      if (address[2].startsWith('tx.') || address[2].startsWith('tp.')) address[2] = address[2].substr(4);
					      address[2] = address[2].toUpperCase();
					      $district = $('#cboDISTRICT_CODE');
					      $district.find("option").filter(function() {
					    	  var text = $(this).text().toUpperCase();
					    	    return address[2] == text || "THỊ XÃ " + address[2] == text || "THÀNH PHỐ " + address[2] == text || "TP " + address[2] == text || "QUẬN " + address[2] == text || "HUYỆN " + address[2] == text; 
					    	}).prop('selected', true);
					      $district.change();
					      district_code = $district.val() ? $district.val() : 50101;
					      if (!address[3]) {
					    	  for(j=2;j<responses.length;j++) {
					    		  var wards = responses[j].formatted_address.split(', ').reverse()[3]; 
					    		  if (wards) {
					    			  address[3] = wards;
					    			  break;
					    		  }
					    	  }
					      }
					      address[3] = address[3].toUpperCase();	        		      
					      $wards = $('#cboWARDS_CODE');
					      $wards.find("option").filter(function() {
					    	  var text = $(this).text().toUpperCase();
					    	    return address[3] == text || "XÃ " + address[3] == text || "PHƯỜNG " + address[3] == text; 
					    	}).prop('selected', true);
					      $wards.change();
					      wards_code = $wards.val() ? $wards.val() : 5010101;
					      strSQL = "INSERT INTO STATIONS (STATION_ID, STATION_CODE, STATION_NAME, STATION_ADDRESS, STATIONTYPE_ID, OWNER_ID, LOCALITY_ID, CITY_CODE,DISTRICT_CODE,WARDS_CODE, LATITUDE,LONGITUDE) VALUES (STATIONS_SEQ.NEXTVAL,'{0}','{1}','{2}',{3},{4},{5},{6},{7}, {8},'{9}','{10}')";					   
						    jsonrpc.AjaxJson.execute(String.format(strSQL,row.STATION_CODE,row.STATION_CODE,responses[0].formatted_address.replaceAll('\'','\'\''),1,1,1,city_code,district_code, wards_code,row.LATITUDE,row.LONGITUDE),[]);
					    }

					  });
					index++;
				    if(index === data.length - 1) {
				        clearInterval(i);
				    }
				}, 1500);			
			}
		});
	}
	
	
	function doLoad() {
		$.i18n().load(i18n_ims.err_code);
		$.i18n().load(i18n_ims.com_msg);		
		$.i18n().locale = _lang;		
		var template=$("#advanced-search").html();
		$("#advancedSearch").qtip({
			content: template,
			position : {
				my: 'top left',
				at: 'bottom center'
			},
		    style: {
		        widget: true, // Use the jQuery UI widget classes
		        def: false // Remove the default styling (usually a good idea, see below)
		    },
		    show: {
		        event: 'click'
		    },
		    hide: {
		        event: 'click unfocus'
		    }
		});
		$("#txtSearch").select2({			
			language: "vi",
		    minimumInputLength: 1,		    
		    ajax: {
		    	delay: 250,
		    	url: jsonrpc.AjaxJson.serviceURL,
		    	dataType: 'json',	       
		        data: function (params) {
		        	var match_search = $("#match_search").prop("checked")== undefined ? false : $("#match_search").prop("checked") ;
		        	var search_key = params.term;
		        	if (!match_search) {
		        		search_key = replaceAll(search_key.toUpperCase(),' ','%');
		        	}
		        	var sql_par=buildSqlSearch(search_key);
		    		_postdata= {
		    			 	"func":"ajaxExecuteQueryPaging",
		    			 	"uuid":jsonrpc.AjaxJson.uuid,
		    			 	"params":[str_search],
		    			 	"options":sql_par
		    			 };
		    		
		    		//_querydata=encodeURIComponent(JSON.stringify(_postdata));
		    		return {postData:JSON.stringify(_postdata), page:params.page || 1, rows:20};
		          },
		          processResults: function (data, params) {		        	  
		        	  params.page = params.page || 1;
		        	  return {results:data.rows.map(function(item){
		        		  item.id = item.ID;
		        		  item.CODE = item.CODE.replaceAll(params.term,String.format('<span class="highlight">{0}</span>', params.term));
		        		  item.NAME = item.NAME.replaceAll(params.term,String.format('<span class="highlight">{0}</span>', params.term));
		        		  //item.TEXT=String.format('<div class="search-item"><div><img class="icon" src={0} /></div><div class="code"><b>{1}:</b> {2}</div><div class="name"><b>{3}:</b> {4}</div><div class="address"><b>{5}:</b> {6}</div></div>',marker_icon_48[item.TYPE],$.i18n("cod"),item.CODE,$.i18n("nm"),item.NAME, $.i18n("add"), item.INFO);		        		  
		        		  if (item.TYPE>=0 && item.TYPE<3) {
		  		    			item.TEXT=String.format('<div class="search-item"><div><img class="icon" src={0} /></div><div class="code"><b>{1}:</b> {2}</div><div class="name"><b>{3}:</b> {4}</div><div class="address"><b>{5}:</b> {6}</div></div>',marker_icon_48[item.TYPE],$.i18n("cod"),item.CODE,$.i18n("nm"),item.NAME, $.i18n("add"), item.INFO);
		        		  }
		        		  else if (item.TYPE==3) {
		        			  item.TEXT=String.format('<div class="search-item"><div><img class="icon" src={0} /></div><div class="code"><b>{1}:</b> {2} ({3})</div><div class="name"><b>{4}:</b> {5}</div><div class="address"><b>{6}:</b> {7}</div></div>',marker_icon_48[item.TYPE],$.i18n("cod"),item.CODE,item.ITEM_TYPE + " " + $.i18n("port"),$.i18n("reason"),item.NAME, $.i18n("add"), item.INFO);
		        		  }
		  		    	  else {
		  		    		item.TEXT=String.format('<div class="search-item"><div><img class="icon" src={0} /></div><div class="code"><b>{1}:</b> {2} ({3}FO)</div><div class="name"><b>{4}:</b> {5}</div><div class="address"><b>{6}:</b> {7}</div></div>',marker_icon_48[item.TYPE],$.i18n("cod"),item.CODE,item.ITEM_TYPE,$.i18n("description"),item.NAME, $.i18n("add"), item.INFO);
		  		    	  }
		        		  return item;
		        	  }),
		        	  pagination: {
		                  more: params.page < data.total
		                }
		        	  };
		          },
		          cache:true
		    },		    
		    templateResult: function(option,elm) {		    	
		    	return option.TEXT;
		    }, // omitted for brevity, see the source of this page
		    templateSelection: function (option,elm) {		    	
		    	elm.attr("lat",option.LATITUDE);
		    	elm.attr("lng",option.LONGITUDE);		    	
		    	elm.attr("type",option.TYPE);
		    	return String.format('<img src="{0}" style="margin-bottom:4px;"> {1} ({2})', marker_icon[option.TYPE], option.NAME, option.CODE);
	        },
		    dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
		    escapeMarkup: function (m) { return m; }
		}).on('select2:select', function (evt) {
			var sel = $(this).parent().find(".select2-selection__rendered");			
			var _lat = parseFloat(sel.attr("lat"));			
			var _lng = parseFloat(sel.attr("lng"));
			var type = sel.attr("type");
			var search_id = $(this).val();			
			_map.panTo({lat:_lat,lng:_lng});			
			window.setTimeout(function(){
				var search_item = window[listCtl[type]][search_id];
				if (type<=3) {
					that.editInfo(search_item, search_id, infoType[type]);
				}
				else {
					that.editCable(search_item);
				}
			},500);						
		});		
		var data = $.parseJSON(jsonrpc.AjaxJson.ajaxExecuteQueryO("SELECT * FROM CAPACITY", []));
		if (data && data.length>0) {
			$.each(data, function(i,v) {
				cablecolors[v.CAPACITY] = v;
			});
		}
		
		var _lat = lat;
		var _lng = lng
		var _zoom = zoom_level;		
		if (type && cid) {
			str_sql = '';
			if (type>=0 && type <=3) {
				str_sql = String.format('SELECT LATITUDE, LONGITUDE FROM {0} WHERE {1}ID = {2}',listCtl[type],prefix[type],cid );				
				rt = jsonrpc.AjaxJson.ajaxExecuteQueryO(str_sql,[]); 
				if (rt) {
					var ls = $.parseJSON(rt);
					_lat = ls[0].LATITUDE;
					_lng = ls[0].LONGITUDE;					
				}
			}
		}
		
	    $("#"+mapId).gmap3({       
	        map:{
	          options:{
	        	center: {lat: _lat, lng:_lng },  
	            zoom: _zoom,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            mapTypeControlOptions: {
	               mapTypeIds: ['roadmap','hideAddress', 'satellite','terrain','hybrid']
	            }
	          },
	          events:{
	              rightclick:function(map, event){
	                current_event = event;   
	                if (!current) {
	                	menu.open(current_event);
	                }
	                else if (current && current_line) {
	                	vertexMenu.open(event, {"delVertex":{"cl":"hide"}});
	                }
	              },
	              click: function(map,event){
	                menu.close();	                
	                if (current && isDrawingLine) {	                	
	                	current_event=event;
	                	var path = current.getPath();
	                	path.setAt(path.getLength()-1,event.latLng);	                	
	                	current_line.push(addMarker(null,null));
	                	current.nodes.push({id:guid(),type:null});
	                	that.bindCableGrid();
	                }	                
	              },
	              mousemove:function(map,event) {	            	  
	            	  if (current && isDrawingLine) {	                	
		                	var path = current.getPath();		                	
		                	if (path.getLength() == current_line.length) {
		                		path.push(event.latLng);
		                	}	                	
		                	else {
		                		path.setAt(path.getLength()-1,event.latLng);
		                	}
		                }	            	
	              },
	              dragstart: function(){
	                menu.close();
	              },
	              
	              zoom_changed: function(){
	            	  scheduleDelayedCallback(function() {
	            		  markerClusterer();
	  	                  menu.close();
	            	  });	            	
	              },
	              bounds_changed: function(map,event,context){
	            	  if (!draging) {
	            		  scheduleDelayedCallback(function() {
	            			  getStations(map);
		            		  getPoles(map);
		            		  getManholes(map);
		            		  getJoints(map);
		            		  getCablelines(map);  
	            		  });	  
	            	  }
	               }
	            }
	        },
		    styledmaptype:{
	            id: "hideAddress",
	            options:{
	              name: "Ẩn địa chỉ"
	            },
	            styles:[						
	                {
	                    featureType: 'poi',
	                    stylers: [{visibility: 'off'}]
	                  },
	                  {
	                    featureType: 'transit',
	                    elementType: 'labels.icon',
	                    stylers: [{visibility: 'off'}]
	                  }
	                ]
	          }
	      });
	    _map = $("#"+mapId).gmap3("get");	    
	    if (_map && cid && type) {
	    	setTimeout(function() {
	    		window.history.replaceState("", "","manager.jsp?func=../QLHT/home");
	    		var item = $("#" + mapId).gmap3({
		    		get : {
		    			id : prefix[type] + cid
		    		}
		    	});	    		
	    		if (item) that.editInfo(item,cid,infoType[type]);	    		
	    	},1500);	    	
	    }	    
	}
}

function setSysParam(_par_ar) {
	var v_par=_par_ar;
	for(var i1=0;i1<session_par.length;i1++) {
		//console.log('_param['+i1+']='+_param[i1]);
		v_par.push({"name":"[S"+i1+"]","value":session_par[i1]});
	}
	return v_par;
}