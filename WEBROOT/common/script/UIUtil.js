	
var jqGrid_formater= [];
var dlgPopup;
Element.prototype.getElementWidth = function() {
	   if (typeof this.clip !== "undefined") {
	      return this.clip.width;
	   } else {
	      if (this.style.pixelWidth) {
	         return this.style.pixelWidth;
	      } else {
	         return this.offsetWidth;
	      }
	   }
	};
/**/


//--------- EventUtil --------------------------------------------------------------------------------------
var EventUtil={
	eventPool:{},
	varPool:{},
	getVar:function (varName) {
		return this.varPool[varName];
	},
	setVar:function (varName,varObj) {
		this.varPool[varName]=varObj;
	},
	
	getEvent:function (evName) {
		console.log('getEvent '+evName);
		return this.eventPool[evName];
	},
	setEvent:function (evName,evFunc) {
		console.log('setEvent '+evName+ (typeof evFunc));
		this.eventPool[evName]=evFunc;
	},
	raiseEvent:function (evName,evObj) {
		console.log('setEvent '+evName+ (typeof evFunc));
		var evFunc=this.eventPool[evName];
		if(typeof evFunc==='function') {
			evFunc(evObj);
		}
		else {
			console.log('evFunc not a function');
		}
	}
};
//--------- DlgUtil --------------------------------------------------------------------------------------
var DlgUtil={
		dlg:[],
		buildPopupGrid: function (dlgId,gridId,_title,_width,_height) {
			//popup 1 grid
			$('#'+dlgId).html('<table id="'+gridId+'"></table><div id="pager_'+gridId+'"></div>');
		    dlgPopup = new jBox('Modal', {
		        title: _title,
		        overlay: false,
		        content: $('#'+dlgId),
		        draggable: 'title',
		        width: _width,
		        height: _height,
		        onClose: function() {
		            EventUtil.raiseEvent(dlgId+'_onClose',dlgId);
		        }
		    });
		    return dlgPopup;
		},
showMsg: function (msgInfo,_func,_delay) {
	
	//DlgUtil.showMsg("Nội dung thông báo","Thông báo",0);
	//alert(msgInfo);
	alertify.set({
		labels : {
			ok     : "Đồng ý",
			cancel : "Hủy bỏ"
		},
		delay : 5000,
		buttonReverse : false,
		buttonFocus   : "ok"
	});
	console.log('showMsg _delay='+_delay);
	alertify.alert(msgInfo,_func,"",_delay);
	/*
	$.waitUntil(function(){
		console.log('waitUntil.waitFlag='+waitFlag);
		return !waitFlag;
    }, function(){}, function(){},10,1000);
    */
    
},

showConfirm: function (msgInfo,_func,_delay) {
	//DlgUtil.showMsg("Nội dung thông báo","Thông báo",0);
	//alert(msgInfo);
	alertify.set({
		labels : {
			ok     : "Đồng ý",
			cancel : "Hủy bỏ"
		},
		delay : 5000,
		buttonReverse : false,
		buttonFocus   : "ok"
	});
	alertify.confirm(msgInfo,_func,"",_delay);
},


buildPopupUrl: function (dlgName,dlgId,_url,_var,_title,_width,_height,_opt) {
//dlgName: Tên dialog, sử dụng để điều khiển đóng mở dialog
//dlgId: Id thẻ div chứa nội dung dialog
//_url: url nội dung dialog
//_var: biến truyền vào dialog
//_title,_width,_height: Tiêu đề, độ rộng, chiều cao của dialog	
	dlgId=dlgName;
			if ($('#divHidden').find("#"+dlgId).length > 0 ) {
		        console.log('divHidden.html='+$('#divHidden').html());
		    }
			else {
				var _html='';
				_html+='<div id="'+dlgId+'" style="width: 100%; display: none">';
				_html+='<iframe src="" id="'+dlgId+'ifmView"	frameborder="0"></iframe>';
				_html+='</div>';
				$('#divHidden').html(_html);
			}
			//$('#'+dlgId+'ifmView').css("width",_width-30);
			//$('#'+dlgId+'ifmView').css("height",_height-30);
			
			$('#'+dlgId+'ifmView').css("width",_width);
			//$('#'+dlgId+'ifmView').css("height",_height+11);
			console.log('#'+dlgId+'ifmView.height'+_height);
			$('#'+dlgId+'ifmView').height(_height);
			
			EventUtil.setVar("dlgVar",_var);
			$('#'+dlgId+'ifmView').attr("src",_url+'&showMode=dlg');
			var __opts={
			        title: _title,
			        theme:'ModalBorder',
			        closeOnClick:false,
			        closeButton:'title',
			        overlay: true,
			        zIndex: 10000,
			        content: $('#'+dlgId),
			        draggable: 'title',
			        width: _width,
			        height: _height,
			        onClose: function() {
			        	console.log('raiseEvent onClose ='+dlgName);
			            EventUtil.raiseEvent(dlgName+'_onClose',dlgName);
			        }
			    };
			if(_opt) {
				__opts=$.extend(__opts,_opt);
			}
		    dlgPopup = new jBox('Modal',__opts);
		    this.dlg[dlgName]=dlgPopup;
		    return dlgPopup;
		},		
buildPopup: function (dlgName,dlgId,_title,_width,_height,_opt) {
			//popup 1 grid
			//var _dlgName = Object.create(dlgName);
			var __opts={
			        title: _title,
			        overlay: false,
			        content: $('#'+dlgId),
			        draggable: 'title',
			        width: _width,
			        height: _height,
			        onClose: function() {
			        	EventUtil.raiseEvent(dlgName+'_onClose',dlgName);
			        }
			    };
			if(_opt) {
				__opts=$.extend(__opts,_opt);
			}
		    dlgPopup = new jBox('Modal',__opts );
		    this.dlg[dlgName]=dlgPopup;
		    return dlgPopup;
		},
open: function (dlgName){
	if(this.dlg[dlgName]) {
		this.dlg[dlgName].open();
	}
},
close: function (dlgName){
	if(this.dlg[dlgName]) {
		this.dlg[dlgName].close();
	}
},
tunnel: function (fn) {
	/*
	var fnc=function(e){
		alert('e.msg='+e.msg);
		//DlgUtil.close("dlgCDDV");
	};
	*/
    fn(EventUtil.eventPool,EventUtil.varPool);
},
moveEvent: function (_evt,_var) {
	EventUtil.eventPool=$.extend(EventUtil.eventPool,_evt);
	EventUtil.varPool=$.extend(EventUtil.varPool,_var);
},
openForm: function (url,width,height,func) {	
	form=window.open(url, '_blank', 'toolbar=no,location=no,scrollbars=yes,directories=0,status=yes,menubar=no,resizable=yes, copyhistory=no, width='+width+', height='+height+',left=50,top=50');
	form.callbackHandler=func;
	return form;
}
}
//--------- ToolbarUtil ------------------------------------------------------------------------------------
var ToolbarUtil={
		__toolbar:[],
		__iconPrefix:'glyphicon glyphicon-',
		build:function(tbrId,ctl_ar,icoPrefix) {
			var _self=this;
			if(icoPrefix) this.__iconPrefix=icoPrefix;
			this.__toolbar[tbrId]=new _self.JsToolbar(tbrId,this.__iconPrefix);
			if(ctl_ar) {
				//console.log('1ctl_ar='+JSON.stringify(ctl_ar));
				this.__toolbar[tbrId].buildToolbar(ctl_ar);
			}
			return this.__toolbar[tbrId];
		},
		getToolbar:function(tbrId) {
			return this.__toolbar[tbrId];
		},
		JsToolbar: function (toolbarId,iconPrefix){
			var __toolbarId=toolbarId;
			var __iconPrefix=iconPrefix;
			var __items=[];
			var __htmls=[];
			var _self=this;
			this.buildToolbar=function(ctl_ar){
				//console.log('2ctl_ar='+JSON.stringify(ctl_ar));
				for(var i1=0;i1<ctl_ar.length;i1++) {
					var ctl=ctl_ar[i1];
					//console.log('ctl['+i1+']='+JSON.stringify(ctl));
					_self.addToolbarCtl(ctl,true);
				}
				$('#'+__toolbarId).html(__htmls.join(""));
				//bindEvent();
				
			}
			this.addEvent=function(ctlId,evtName, evtFunc) {
				$('#'+__toolbarId+ctlId).on(evtName,evtFunc);
			}
			this.setValue=function(ctlId,_val) {
				return $('#'+__toolbarId+ctlId).val(_val);
			}
			this.getValue=function(ctlId) {
				return $('#'+__toolbarId+ctlId).val();
			}
			this.setCSS=function(ctlId,_attr,_val) {
				$('#'+__toolbarId+ctl.id).css(_attr,_val);
			}
			this.setAttr=function(ctlId,_attr,_val) {
				$('#'+__toolbarId+ctl.id).attr(_attr,_val);
			}
			this.removeAttr=function(ctlId,_attr,_val) {
				$('#'+__toolbarId+ctl.id).removeAttr(_attr);
			}
			
			this.addToolbarCtl=function(_ctl,_flag) {
				//ctlType,ctlId,ctlIcon,ctlText,ctlChild
				//ctlChild=[{id:'',text:'',icon:'',hlink:''}]
				var toolbar=$('#'+__toolbarId);
				//alert(toolbar);
				var _html='';
				
				if(_ctl.type=='button') {
					_html+='<button type="button" id="'+__toolbarId+_ctl.id+'" class="btn btn-lg btn-default wd100"><span class="'+__iconPrefix+_ctl.icon+'" ></span>&nbsp;'+_ctl.text+'&nbsp;</button>';
				}
				else if(_ctl.type=='buttongroup') {
					_html+='<div class="btn-group wd100" role="group" >';
					_html+='  <button type="button" id="'+__toolbarId+_ctl.id+'" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  style="width:100%;">';
					_html+='    <span class="'+__iconPrefix+_ctl.icon+'"></span>&nbsp;'+_ctl.text+'&nbsp;<span class="caret"></span>';
					_html+='  </button>';
					_html+='  <ul class="dropdown-menu">';
					for(var i1=0;i1<_ctl.children.length;i1++) {
						var item=_ctl.children[i1];
						_html+='<li id="'+__toolbarId+item.id+'"><a href="'+item.hlink+'"><i class="__iconPrefix+'+item.icon+'"></i> '+item.text+'</a></li>';
					}
					_html+='    </ul>';
				  	_html+='</div>';
				}
				else if(_ctl.type=='textbox') {
					_html+='<input type="text" id="'+__toolbarId+_ctl.id+'" class="input-sm" placeholder="Search">';
				}
				else if(_ctl.type=='datetime') {
					_html+='<div class="input-group inline" >';	
					_html+='<input type="text" id="'+__toolbarId+_ctl.id+'" class="input-sm" data-mask="00/00/0000" placeholder="dd/MM/yyyy">';
					_html+='<span class="btn input-group-addon glyphicon glyphicon-calendar" style="display:inline-block;height:28px; width: 32px; padding: 6px 4px; top:0;" type="sCal"  onclick="NewCssCal(\''+__toolbarId+_ctl.id+'\',\'ddMMyyyy\',\'dropdown\',false,\'24\',true)"></span>';
					_html+='</div>';
				}
				__items.push(_ctl);
				__htmls.push(_html);
				if(!_flag) toolbar.html(__htmls.join(""));
			}
			this.clearAll=function() {
				$('#'+__toolbarId).html("");
				__currentButton=null;
				//__handler=[];
				__items=[];
				__htmls=[];
			}
			
		}
	};


//--------- ComboUtil --------------------------------------------------------------------------------------
var ComboUtil={
showListCtl:function (_lstCtl,_data){
	//"cboFIELD=ICD10CODE:ICD10NAME,txtField1=IDC10CODE,txtField2=ICD10NAME"
	var map_ar=_lstCtl.split(",");
	for(var i1=0;i1<map_ar.length;i1++) {
		var fld_ar=map_ar[i1].split('=');
		if( $("#"+fld_ar[0]).is("select") ) {
			var _flds=fld_ar[1].split(":");
			if(_flds.length==2) {
				this.showValueText(fld_ar[0], _data[_flds[0]], _data[_flds[1]]);
			}
			else {
				$("#"+fld_ar[0]).val(_data[fld_ar[1]]);
			}
		}
		else {
			$("#"+fld_ar[0]).val(_data[fld_ar[1]]);
		}
	}
},		
showValueText: function(cboId,_val,_text) {
	if( $("#"+cboId).is("select") ) {
		if ( $("#"+cboId+" option[value='"+_val+"']").length == 0 ){
			$("#"+cboId).append("<option value='"+_val+"' selected >"+_text+"</option>");
		}
		else {
			$("#"+cboId+" option[value='"+_val+"']").attr("selected","selected");
		}
	}
	else if($("#"+cboId).is("input:text")) {
		$("#"+cboId).val(_text);
		$("#"+cboId).attr("val",_val);
	}
},
getComboText: function(cboId) {
	var _val=$("#"+cboId).val();
	return $("#"+cboId).find("option[value='"+_val+"']").text();
},	
getComboTag: function (comboid,sql,sqlPar,rowSel,defOpt,sqlType,cache,callback)
		{	//getComboTag("cboId","select * from t",[],"1",{value:'',text:''},'sql','',cbFunc);
			//console.log('getComboTag='+comboid+' sql='+sql+" sqlPar="+JSON.stringify(sqlPar));
			//console.log('1sql='+sql+' sqlPar='+sqlPar);	
			function _loadOptions(combo_id, value, rowSel, _defOpt)
			{					
					if (!value) return;
					//console.log('ComboUtil.getComboTag_loadOptions '+combo_id+'.value.length='+value.length);
					var cboList=combo_id.split(",");
					var _html='';
					if(_defOpt.value || _defOpt.value==''){
						_html+='<option value="'+_defOpt.value+'">'+_defOpt.text+'</option>';
					}
					var optGroupLabel = '';
					var optGroup;
					var openGroup=false;
					for (var i = 0; i < value.length; i++)
					{
						if(_defOpt.group) {
							if (optGroupLabel != value[i][3]) {
								if(openGroup) {
									_html+='</optgroup>';
								}
								openGroup=true;
								optGroupLabel = value[i][3];
								_html+='<optgroup label="'+optionLabel+'">';
							}
						}
						if(value[i].length >=2){
							var _selected='';
							if(value[i][0] == rowSel) {
								_selected=' selected="selected" ';
							}
							_html+='<option value="'+value[i][0]+'" '+_selected+'>'+value[i][1]+'</option>';	
						}
		
					}
					if(_defOpt.group && openGroup) {
						_html+='</optgroup>';
					}
					for(var i1=0;i1<cboList.length;i1++) {
						var elem = $('#'+cboList[i1]);
						if(!elem) continue;
						elem.empty();
						elem.append(_html);
					}
			}
			var vlist;
			//defer = $.Deferred();
			if(cache && cache!='') {
				//console.log('cache='+cache);
				cacheData=$.localStorage.get(cache);
			}
			else {
				cacheData=null;
			}
			if(cacheData) {
				//console.log('cacheData');
				vlist=cacheData;
				//defer.resolve(vlist);
				if(cache && cache!='') {
					$.localStorage.set(cache,vlist);
				}
				_loadOptions(comboid,vlist, rowSel, defOpt);
				if (callback && typeof callback=='function') {
					callback();
				}
			}
			else {
				//console.log('NOT cacheData');
				if(!callback || typeof callback != "function") {					
					var data;
					if(sqlType=='sp') {
						data=jsonrpc.AjaxJson.ajaxCALL_SP_R(sql,sqlPar,[]);
					}
					else {
						data=jsonrpc.AjaxJson.ajaxExecuteQuery(sql,sqlPar);
						
					}
					//console.log('sql='+sql+' sqlPar='+sqlPar+' DATA='+data);
					//vlist = $.parseJSON(data);
					vlist = { result: data };
					//defer.resolve(vlist);
					if(cache && cache!='') {
						$.localStorage.set(cache,vlist.result);
					}
					_loadOptions(comboid,vlist.result, rowSel, defOpt);
				}
				else {
					if(sqlType=='sp') {
						jsonrpc.AjaxJson.ajaxCALL_SP_R(sql,sqlPar,[],function(data) {
							//console.log('sql='+sql+' sqlPar='+sqlPar+' DATA='+data);
							vlist = $.parseJSON(data);
							//defer.resolve(vlist);
							if(cache && cache!='') {
								$.localStorage.set(cache,vlist.result);
							}
							_loadOptions(comboid,vlist.result, rowSel, defOpt);
							if (callback && typeof callback=='function') {
								callback(comboid.split(","));
							}
						});
					}
					else {
						jsonrpc.AjaxJson.ajaxExecuteQuery(sql,sqlPar,function(data) {
							//console.log('data='+data);
							vlist = $.parseJSON(data);
							//defer.resolve(vlist);
							if(cache && cache!='') {
								$.localStorage.set(cache,vlist);
							}
							_loadOptions(comboid,vlist, rowSel, defOpt);
							if (callback && typeof callback=='function') {
								callback(comboid.split(","));
							}
						});
					}
				}
			}
			//defer.done(function(vlist) {
				
			//});
		},
		initComboGrid: function (cboId,_sql,_sql_par,_wd,_col,_selfnc) {
			//comboGrid_init	
			var _self=this;
						var ATTRIB_LABEL=0;
						var ATTRIB_NAME=1;
						var ATTRIB_WIDTH=2;
						var ATTRIB_FORMAT=3;
						var ATTRIB_HIDDEN=4;
						var ATTRIB_ALIGN=5;	
						
						var cbo_url=this.loadGridBySql(_sql,_sql_par);
						var arHdr = _col.split(";");
						var _model=[];
						
						for(var j = 0;j<arHdr.length;j++) {
							var colAttr=arHdr[j].split(",");
							var colInfo=new Object();
							colInfo.label=colAttr[ATTRIB_LABEL];
							colInfo.columnName=colAttr[ATTRIB_NAME];
							colInfo.width=colAttr[ATTRIB_WIDTH];
							if(colAttr[ATTRIB_HIDDEN]=="t") {
								colInfo.hidden=true;
							}
							
							if(colAttr[ATTRIB_ALIGN]=="l") {
								colInfo.align="left";
							}
							else if(colAttr[ATTRIB_ALIGN]=="r") {
								colInfo.align="right";
							}
							else if(colAttr[ATTRIB_ALIGN]=="c") {
								colInfo.align="center";
							}
							/*
							if (colAttr[ATTRIB_FORMAT] && colAttr[ATTRIB_FORMAT] != "0") {			
								colInfo.formatter = colAttr[ATTRIB_FORMAT];			
							}
							*/	
							_model.push(colInfo);
						}
						//console.log("model="+JSON.stringify(_model));
						//"txtField1=IDC10CODE,txtField2=ICD10NAME,"
						//cboFIELD=ICD10CODE:ICD10NAME
						var cbFunc=null;
						if(typeof _selfnc == "function") {
							cbFunc=_selfnc;
						}
						else {
							cbFunc=function(event, ui) {
								_self.showListCtl(_selfnc,ui.item);
						        return false;
						    };
						}
						var cbo_opt={
						    url: cbo_url,
						    debug: true,
						    width: _wd,
						    colModel: _model,
						    select: cbFunc
						};
						
						$("#"+cboId).attr("exttype","cbg");
						console.log("#"+cboId+".exttype="+$("#"+cboId).attr("exttype"));
						$("#"+cboId).combogrid(cbo_opt);
					},
					
loadGridBySql: function (_gridSQL,___sqlParam){
//comboGrid_loadGridBySql	
			console.log('_sqlParam='+JSON.stringify(___sqlParam));
			if(___sqlParam==undefined) ___sqlParam=[];
			var _data= {
			 	"func":"ajaxExecuteQueryPaging",
			 	"uuid":jsonrpc.AjaxJson.uuid,
			 	"params":[_gridSQL],
			 	"options":___sqlParam
			 };
			var _postdata=JSON.stringify(_data);
			//console.log('_postdata='+_postdata);
			_postdata=encodeURIComponent(_postdata);
			//console.log('_postdata='+_postdata);
			return '../RestService?func=doComboGrid&postData='+_postdata;
		}


};
ComboUtil.init=ComboUtil.initComboGrid;
//--------- GridUtil ------------------------------------------------------------------------------------
if(!$.fn.fmatter) $.fn.fmatter={};
$.fn.fmatter.EditRowAction = function(act) {
	var $tr = $(this).closest("tr.jqgrow"),
		rid = $tr.attr("id"),
		$id = $(this).closest("table.ui-jqgrid-btable").attr('id').replace(/_frozen([^_]*)$/,'$1'),
		$grid = $("#"+$id),
		$t = $grid[0],
		p = $t.p,
		cm = p.colModel[$.jgrid.getCellIndex(this)],
		$actionsDiv = cm.frozen ? $("tr#"+rid+" td:eq("+$.jgrid.getCellIndex(this)+") > div",$grid) :$(this).parent(),
		op = {
			extraparam: {}
		},
		saverow = function(rowid, res) {
			if($.isFunction(op.afterSave)) { op.afterSave.call($t, rowid, res); }
			$actionsDiv.find("div.ui-inline-edit,div.ui-inline-del").show();
			$actionsDiv.find("div.ui-inline-save,div.ui-inline-cancel").hide();
		},
		restorerow = function(rowid) {
			if($.isFunction(op.afterRestore)) { op.afterRestore.call($t, rowid); }
			$actionsDiv.find("div.ui-inline-edit,div.ui-inline-del").show();
			$actionsDiv.find("div.ui-inline-save,div.ui-inline-cancel").hide();
		};
		

	if (cm.formatoptions !== undefined) {
		op = $.extend(op,cm.formatoptions);
	}
	if (p.editOptions !== undefined) {
		op.editOptions = p.editOptions;
	}
	if (p.delOptions !== undefined) {
		op.delOptions = p.delOptions;
	}
	if ($tr.hasClass("jqgrid-new-row")){
		op.extraparam[p.prmNames.oper] = p.prmNames.addoper;
	}
	var actop = {
		keys: op.keys,
		oneditfunc: op.onEdit,
		successfunc: op.onSuccess,
		url: op.url,
		extraparam: op.extraparam,
		aftersavefunc: saverow,
		errorfunc: op.onError,
		afterrestorefunc: restorerow,
		restoreAfterError: op.restoreAfterError,
		mtype: op.mtype
	};
	switch(act)
	{
		case 'edit':
			console.log('editRow');
			$grid.trigger("EditRowAction",[act,rid]);
			$grid.jqGrid('editRow', rid, actop);
			$actionsDiv.find("div.ui-inline-edit,div.ui-inline-del").hide();
			$actionsDiv.find("div.ui-inline-save,div.ui-inline-cancel").show();
			//$grid.triggerHandler("jqGridAfterGridComplete");
			break;
		case 'save':
			if ($grid.jqGrid('saveRow', rid, actop)) {
				$grid.trigger("EditRowAction",[act,rid]);
				//$grid.jqGrid('restoreRow', rid, restorerow);
				$actionsDiv.find("div.ui-inline-edit,div.ui-inline-del").show();
				$actionsDiv.find("div.ui-inline-save,div.ui-inline-cancel").hide();
				//$grid.triggerHandler("jqGridAfterGridComplete");
			}
			break;
		case 'cancel' :
			$grid.jqGrid('restoreRow', rid, restorerow);
			$grid.trigger("EditRowAction",[act,rid]);
			$actionsDiv.find("div.ui-inline-edit,div.ui-inline-del").show();
			$actionsDiv.find("div.ui-inline-save,div.ui-inline-cancel").hide();
			//$grid.triggerHandler("jqGridAfterGridComplete");
			break;
		case 'del':
			//$grid.jqGrid('delGridRow', rid, op.delOptions);
			var rt=$grid.triggerHandler("CustomAction",[act,rid]);
			console.log('CustomAction rt='+rt);
			if(rt) $grid.jqGrid('delRowData',rid);
			break;
		case 'formedit':
			$grid.jqGrid('setSelection', rid);
			$grid.jqGrid('editGridRow', rid, op.editOptions);
			$grid.trigger("EditRowAction",[act,rid]);
			break;
	}
};
$.fn.fmatter.customButton = function(cellval,opts) {
	var op={keys:false, editbutton:false, delbutton:false, editformbutton: false},
		rowid=opts.rowId, str="",ocl;
	if(opts.colModel.formatoptions !== undefined) {
		op = $.extend(op,opts.colModel.formatoptions);
	}
	if(rowid === undefined || $.fmatter.isEmpty(rowid)) {return "";}
	if(op.editformbutton){
		ocl = "id='jEditButton_"+rowid+"' onclick=jQuery.fn.fmatter.EditRowAction.call(this,'formedit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
		str += "<div title='"+$.jgrid.nav.edittitle+"' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' "+ocl+"><span class='ui-icon ui-icon-pencil'></span></div>";
	} else if(op.editbutton){
		console.log('customButton op.editbutton='+op.editbutton);
		ocl = "id='jEditButton_"+rowid+"' onclick=jQuery.fn.fmatter.EditRowAction.call(this,'edit'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
		str += "<div title='"+$.jgrid.nav.edittitle+"' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' "+ocl+"><span class='ui-icon ui-icon-pencil'></span></div>";
	}
	if(op.delbutton) {
		console.log('customButton op.delbutton='+op.delbutton);
		ocl = "id='jDeleteButton_"+rowid+"' onclick=jQuery.fn.fmatter.EditRowAction.call(this,'del'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
		str += "<div title='"+$.jgrid.nav.deltitle+"' style='float:left;margin-left:5px;' class='ui-pg-div ui-inline-del' "+ocl+"><span class='ui-icon ui-icon-trash'></span></div>";
	}
	ocl = "id='jSaveButton_"+rowid+"' onclick=jQuery.fn.fmatter.EditRowAction.call(this,'save'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
	str += "<div title='"+$.jgrid.edit.bSubmit+"' style='float:left;display:none' class='ui-pg-div ui-inline-save' "+ocl+"><span class='ui-icon ui-icon-disk'></span></div>";
	ocl = "id='jCancelButton_"+rowid+"' onclick=jQuery.fn.fmatter.EditRowAction.call(this,'cancel'); onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
	str += "<div title='"+$.jgrid.edit.bCancel+"' style='float:left;display:none;margin-left:5px;' class='ui-pg-div ui-inline-cancel' "+ocl+"><span class='ui-icon ui-icon-cancel'></span></div>";
	return "<div style='margin-left:8px;'>" + str + "</div>";
};
//--------- GridUtil --------------------------------------------------------------------------------------
var GridUtil={
fm:{
	iconMap: {
		'1':'cancel',
		'2':'trash'
	},
	iconFormat:function(cellvalue, options, rowObject ) {
		//console.log('iconFormat=');
		if(cellvalue) {
			return '<i class="ui-icon ui-icon-'+ GridUtil.fm.iconMap[cellvalue] +'"></i>';
		}
		else {
			return '<i class="ui-icon ui-icon-circle-check"></i>';
		}
	},
	imageMap: {
		'1':'icon_share.png',
		'2':'icon_share.png'
	},
	imageFormat:function(cellvalue, options, rowObject ) {
		//console.log('imageFormat=');
		if(cellvalue) {
			return '<img src="../common/img/'+ GridUtil.fm.imageMap[cellvalue] +'"/>';
		}
		else {
			return '<img src="../common/img/icon_share.png" style="width:16px;height:16px"/>';
		}
	}
},
groupHeader: function (gridId,colSpan,hdrInfo) {
	//jqGird_XXXX()
			//name,3,caption
			var ATTRIB_NAME=0;
			var ATTRIB_NAME=1;
			var ATTRIB_WIDTH=2;
			var arHdr = hdrInfo.split(";");
			var _ghdr=[];
			for(var j = 0;j<arHdr.length;j++) {
				var colAttr=arHdr[j].split(",");
				var colInfo=new Object();
				colInfo.startColumnName=colAttr[0];
				colInfo.numberOfColumns=colAttr[1];
				colInfo.titleText=colAttr[2];
				_ghdr.push(colInfo);
			}
			
			$("#"+gridId).jqGrid('setGroupHeaders', {
				  useColSpanStyle: colSpan, 
				  groupHeaders:_ghdr
			});
		},
buildOption: function (gridId,_width,_height,_caption,_multiselect,hdrInfo,_shrinkToFit) {
//http://stackoverflow.com/questions/5385239/jqgrid-how-to-lose-focus-when-i-click-outside-the-grid-or-anywhere-else-for-th/21906387#21906387	
			var ATTRIB_LABEL=0;
			var ATTRIB_NAME=1;
			var ATTRIB_WIDTH=2;
			var ATTRIB_FORMAT=3;
			var ATTRIB_HIDDEN=4;
			var ATTRIB_ALIGN=5;	
			if(!_shrinkToFit) shrinkToFit=false; 
			//label,name,width,format,hidden,align
			//hdrInfo="ICD,icd,100,0,f,l;Mô tả bệnh lý,mo_ta_benh_ly,400,0,f,l";
			//hdrInfo="ICD,Mô tả bệnh lý;100,400;0,0;t,f,l,l";
			var arHdr = hdrInfo.split(";");
			var _model=[];
			var _cellEdit=false;
			for(var j = 0;j<arHdr.length;j++) {
				
				var colAttr=arHdr[j].split(",");
				var colInfo=new Object();
				colInfo.label=colAttr[ATTRIB_LABEL];
				colInfo.name=colAttr[ATTRIB_NAME];
				colInfo.index=colAttr[ATTRIB_NAME];
				colInfo.width=colAttr[ATTRIB_WIDTH];
				if(colAttr[ATTRIB_HIDDEN]=="ro") {
					colInfo.editable=false;
				}
				else if(colAttr[ATTRIB_HIDDEN]=="ns") {
					colInfo.search=false;
				}
				else if(colAttr[ATTRIB_HIDDEN]=="e") {
					colInfo.editable=true;
					colInfo.edittype='text';
					_cellEdit=true;
				}
				else if(colAttr[ATTRIB_HIDDEN]=="t") {
					colInfo.hidden=true;
				}
				
				if(colAttr[ATTRIB_ALIGN]=="l") {
					colInfo.align="left";
				}
				else if(colAttr[ATTRIB_ALIGN]=="r") {
					colInfo.align="right";
				}
				else if(colAttr[ATTRIB_ALIGN]=="c") {
					colInfo.align="center";
				}
				
				var ruleRegex=/^([aed|]+)$/;
				//if (colAttr[ATTRIB_FORMAT].indexOf('a')>0||colAttr[ATTRIB_FORMAT].indexOf('e')>0||colAttr[ATTRIB_FORMAT].indexOf('d')>0) {			
				if (ruleRegex.test(colAttr[ATTRIB_FORMAT])) {
					console.log('customButton '+colAttr[ATTRIB_FORMAT]);
					//colInfo.formatter = 'actions';
					colInfo.formatter = 'customButton';
					colInfo.formatoptions={keys: true, editbutton:false,delbutton:false };
					if(colAttr[ATTRIB_FORMAT].indexOf('a')>=0) {
						colInfo.formatoptions.addbutton=true;
					}
					if(colAttr[ATTRIB_FORMAT].indexOf('e')>=0) {
						colInfo.formatoptions.editbutton=true;
					}
					if(colAttr[ATTRIB_FORMAT].indexOf('d')>=0) {
						colInfo.formatoptions.delbutton=true;
					}
					
				}
				else if(colAttr[ATTRIB_FORMAT]=="ico") {
					console.log('colAttr[ATTRIB_FORMAT]='+colAttr[ATTRIB_FORMAT]);
					colInfo.formatter = GridUtil.fm.iconFormat;
				}
				else if(colAttr[ATTRIB_FORMAT]=="img") {
					console.log('colAttr[ATTRIB_FORMAT]='+colAttr[ATTRIB_FORMAT]);
					colInfo.formatter = GridUtil.fm.imageFormat;
				}
				else if(colAttr[ATTRIB_FORMAT]=="b") {
					//button
					colInfo.formatter=function(cellvalue, options, rowObject){
						var edit = "<input type='button' value='Edit' onclick=\"$('#'"+gridId+").editRow('" + options.rowId + "');\"  />"; 
						return edit;
					};
				}
				else if (colAttr[ATTRIB_FORMAT] && colAttr[ATTRIB_FORMAT] != "0") {			
					colInfo.formatter = colAttr[ATTRIB_FORMAT];			
				}
				/*
				for(var i = 1;i<colAttr.length;i++) {
					
					
				}
				*/
				_model.push(colInfo);
				
			}
			console.log("_height="+_height);
			var gr_opt={
		        //url: '../RestService?postData='+_postdata,
				formatter:  jqGrid_formater,
		        datatype: "local",
		        height: _height,
		        width: _width,
		        //width: null,
		        autowidth: true,
		        multiselect: _multiselect,
		        colModel: _model,
		        rowNum: 5,
		        rowList: [5,10,20, 30, 50, 100, 200],
		        ignoreCase: true,
		        pager: '#pager_'+gridId,
		        viewrecords: true,
		        rownumbers: true,
		        caption: _caption,
		        loadonce: false,
		        shrinkToFit:_shrinkToFit,
		        //cellEdit:_cellEdit,
		        cellsubmit:'clientArray',
		        editurl:'clientArray',
		        jsonReader : {
		            root:"rows",
		            page: "page",
		            total: "total",
		            records: "records"
		         },
		         loadComplete : function () {
				     //var gridParentWidth = $('#gbox_' + gridId).parent().width();
		        	 
		        	 //var _parentNode = document.getElementById('gbox_' + gridId).parentNode;
		        	 //var gridParentWidth=_parentNode.offsetWidth;
		        	 
				 },
				 onSelectRow: function(rowid) {
					 //var _self=this;
					 //var grid=$(this);
					 //GridUtil.markRow(gridId,rowid);
					 //var row = $(this).getLocalRow(rowid);
					    // do something with row
				},
		         ondblClickRow: function(rowId,iRow, iCol, e) {
		        	 //if(_cellEdit)	$(this).jqGrid('editGridRow', rowid);
		        	 //this.options.editRID=rowid;
		        	 var grid=$(this);
		        	 //GridUtil.unmarkRow(gridId,rowId);
		        	 if(_cellEdit){
		        		 //$(this).jqGrid('editRow', rowid);
		        		    var lastSel=grid.attr("lastSel");
		        		    if(lastSel) {
		        		    	if(rowId && rowId!==lastSel){ //lastSel is a global variable
		        		    		grid.saveRow(lastSel); 
		        		    		//lastSel=rowId; 
		        		    	}        
		        		    }
		        		    grid.attr("lastSel",rowId);
		        		    grid.jqGrid('resetSelection');   
		        		    grid.jqGrid('editRow', rowId, true, null, null, 'clientArray');
		        	        
	        			   //grid.jqGrid('editRow', rowid, true);
	        			  $("input, select", e.target).focus().blur(function() {
	        				  //grid.jqGrid('restoreRow', rowid);
	        				  grid.saveRow(rowId); 
	        			  });
	        			  return;
		        	 }
				}
		    };
				
			return gr_opt;
		},
addExcelButton:function(gridId,_isClient) {
	var _self=this;
	$("#"+gridId).navButtonAdd('#pager_'+gridId,{
	   caption:"Excel", 
	   buttonicon:"ui-icon-contact", 
	   onClickButton: function() {	     //console.log("jqGrid_export="+gridId);
		   _self.exportExcel(gridId,_isClient);
	   }, 
	   position:"last"
	});
},		
init: function (gridId,_width,_height,_caption,_multiselect,hdrInfo,_shrinkToFit,_isClient){
			//_gridHeader= "Mã thuốc,MA_THUOC,20,0,f,l;Tên thuốc,TEN_THUOC,50,0,f,l;Hoạt chất,HOAT_CHAT,20,0,f,l;ĐV tính,DONVI_TINH,20,0,f,l;Đường dùng,DUONG_DUNG,20,0,f,l;Giá,GIA_THUOC,20,0,f,l;Mã BYT,MA_BYT,20,0,f,l";
			//jqGrid_init("gridThuoc","600","100%","Danh mục thuốc",true,_gridHeader);
			//_gridHeader = 
				//ten_cot,
				//ten_db_column,
				//do_rong_cot,
				//format: mac dinh = 0, chua dung
				//hidden column: t=hidden, f=show
				//align: l=left,r=right,c=center
			var _self=this;
			//console.log("gridId="+gridId+" 1_height="+_height);
			var _gr_opt=_self.buildOption(gridId,_width,_height,_caption,_multiselect,hdrInfo,_shrinkToFit);
			//console.log("2_height="+_height);
			//console.log('_gr_opt='+JSON.stringify(_gr_opt));
			$("#"+gridId).jqGrid(_gr_opt);
			$("#"+gridId).jqGrid('navGrid', '#pager_'+gridId, {edit: false, add: false, del: false, search: false});
			_self.addExcelButton(gridId,_isClient ? _isClient : false);
			
			
			if(_height) { 
				if(typeof _height!="string") {
					_height=_height+"px !important";
				}
				else if(!_height.endsWith("px")){
					_height=_height+"px !important";
				}
				else {
					_height=_height+" !important";
				}
			}
			
			$('#gview_'+gridId).find('.ui-jqgrid-bdiv').attr("style","height: "+_height);
			 /*
			 var _parent=$('#gbox_' + gridId).parent();
	       	 while(_parent && _parent.width()==0) {
	       		 _parent=_parent.parent();
	       	 }
			 $('#' + gridId).jqGrid('setGridWidth',_parent.width());
			 */
			if(typeof _width == "string" && _width.endsWith("%")) {
				var wdP=_width.substring(0,_width.length-1);
				_self.setWidthPercent(gridId,parseInt(wdP));
			}
			//$('.ui-jqgrid-bdiv').height(_height+" !important");
			//$('.ui-jqgrid-bdiv').style('height', _height, 'important');
			
			//console.log('height='+_height+" !important");
		    $("#"+gridId).jqGrid('filterToolbar', {ignoreCase: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn"});
			//$('#list').jqGrid('setGridParam', { onSelectRow: function(id){ alert(id); } } );
		    
		   // $('#gview_'+gridId).find('.ui-jqgrid-bdiv').attr('style', 'height: '+_height+' !important;width: '+_width+' !important');
		   // $('#gbox_'+gridId).attr('style', 'height: '+_height+' !important;width: '+_width+' !important');
		   // $('#gview_'+gridId).attr('style', 'height: '+_height+' !important;width: '+_width+' !important');
		    
		   // $('#gview_'+gridId).find('.ui-jqgrid-hbox').attr('style', 'width: '+_width+' !important');
		    
		   
			return $("#"+gridId);
		},
		setWidthPercent: function (gridId,_percent) {
			var _parent=$('#gbox_' + gridId).parent();
	       	 while(_parent && _parent.width()==0) {
	       		 _parent=_parent.parent();
	       	 }
	       	 var gridParentWidth=_parent.width();
	       	 if(gridParentWidth>$('.container').width()) {
	       		gridParentWidth=$('.container').width();
	       	 }
	       	 console.log('setWidthP.gridParentWidth='+_parent.width()+'='+gridParentWidth);
	       	 console.log('setWidthP.container='+$('.container').width());
			 $('#' + gridId).jqGrid('setGridWidth',gridParentWidth * _percent/100);
		},

initGroup: function (gridId,_width,_height,_caption,_multiselect,_group,hdrInfo){
			//var _gridHeader = "manhom,MANHOMBHYT,0,0,t,l;dichvuid,DICHVUID,0,0,t,l;Tên DV,TENDICHVU,250,0,f,l;Giá BH,GIABHYT,60,0,f,l;Giá ND,GIANHANDAN,60,0,f,l;Giá YC,GIADICHVU,60,0,f,l";
			//var _group={
				//groupField : ['MANHOMBHYT'],
				//groupColumnShow : [false],
				//groupText : ['<b>{0}</b>']
		    //};
			//jqGrid_initGroup("grdXetNghiem","300","100%","",true,_group,_gridHeader);
			//_gridHeader = 
				//ten_cot,
				//ten_db_column,
				//do_rong_cot,
				//format: mac dinh = 0, chua dung
				//hidden column: t=hidden, f=show
				//align: l=left,r=right,c=center
			//_group = 
				//groupField: ten cot tao nhom
				//groupColumnShow: hien thi cot group
				//groupText: {0}=Ten nhom, {1}=so thu tu
			var _gr_opt=this.buildOption(gridId,_width,_height,_caption,_multiselect,hdrInfo);
			_gr_opt.grouping=true;
			_gr_opt.groupingView=_group;
			$("#"+gridId).jqGrid(_gr_opt);
			$("#"+gridId).jqGrid('navGrid', '#pager_'+gridId, {edit: false, add: false, del: false});
		    $("#"+gridId).jqGrid('filterToolbar', {ignoreCase: true, stringResult: true, searchOnEnter: false, defaultSearch: "cn"});
		    
		    
			//$('#list').jqGrid('setGridParam', { onSelectRow: function(id){ alert(id); } } );
			return $("#"+gridId);
		},
unmarkAll: function (gridId) {		
			//$('#'+gridId).jqGrid('setGridParam', { rowList: [20, 30, 50, 100, 200]} );
			//var _self=this;
			var marked_list=$('#'+gridId).attr("marked");
			var marked=[];
			if(marked_list) {
				marked=marked_list.split(',');
			}
			for(var i1=0;i1<marked.length;i1++) {
				var rowid=marked[i1];
				if(rowid) {
					var _color='#FFFFFF';
					//_self.setRowData(rowid, false, {'background-color':_color});
					console.log('unmarkRow rowid='+rowid+'_color='+_color);
					//$('#'+gridId).jqGrid('setRowData', rowid, false,  {'background-color':_color} );
					$('#'+gridId).find("tr[id='" + rowid + "']").find('td').each(function(index, element) {
				        $(element).css({'background-color':_color});
				    });
					
				}
			}
			$('#'+gridId).attr("marked",'');
	},
unmarkRow: function (gridId,_rowid) {		
		//$('#'+gridId).jqGrid('setGridParam', { rowList: [20, 30, 50, 100, 200]} );
		//var _self=this;
		var marked_list=$('#'+gridId).attr("marked");
		console.log('unmarkRow marked_list='+marked_list);
		var marked=[];
		if(marked_list) {
			marked=marked_list.split(',');
		}
		for(var i1=0;i1<marked.length;i1++) {
			var rowid=marked[i1];
			if(rowid==_rowid) {
				var _color='#FFFFFF';
				//_self.setRowData(rowid, false, {'background-color':_color});
				console.log('unmarkRow rowid='+rowid+'_color='+_color);
				//$('#'+gridId).jqGrid('setRowData', rowid, false,  {'background-color':_color} );
				$('#'+gridId).find("tr[id='" + rowid + "']").find('td').each(function(index, element) {
			        $(element).css({'background-color':_color});
			    });
				marked.splice(i1,1);
				i1--;
			}
		}
		$('#'+gridId).attr("marked",marked.join(','));
},	
markRow: function (gridId,rowid,_color) {		
		//$('#'+gridId).jqGrid('setGridParam', { rowList: [20, 30, 50, 100, 200]} );
		//var _self=this;
		//this.unmarkAll(gridId);
		var marked_list=$('#'+gridId).attr("marked");
		var marked=[];
		if(marked_list) {
			marked=marked_list.split(',');
		}
		if(!_color) _color='#FF6F6F';
		//_self.setRowData(rowid, false, {'background-color':_color});
		console.log('markRow rowid='+rowid+'_color='+_color);
		//$('#'+gridId).jqGrid('setRowData', rowid, false,  {'background-color':_color} );
		$('#'+gridId).find("tr[id='" + rowid + "']").find('td').each(function(index, element) {
	        $(element).css({'background-color':_color});
	    });
		marked.push(rowid);
		$('#'+gridId).attr("marked",marked.join(','));
},
getMarked: function (gridId) {		
	//$('#'+gridId).jqGrid('setGridParam', { rowList: [20, 30, 50, 100, 200]} );
	//var _self=this;
	var marked_list=$('#'+gridId).attr("marked");
	var marked=[];
	if(marked_list) {
		marked=marked_list.split(',');
	}
	return marked;
},
fetchGridData: function (gridId,jsonData) {
			//$("#"+gridId).setGridParam({datatype: 'json'}); 
			// show loading message
			$("#"+gridId)[0].grid.beginReq();
			$("#"+gridId).jqGrid('setGridParam', { data: jsonData});
			// hide the show message
			$("#"+gridId)[0].grid.endReq();
			// refresh the grid
			$("#"+gridId).trigger('reloadGrid');
			//$("#"+gridId).setGridParam({datatype: 'local'}); 
		},
		//$("#listDichVu").jqGrid('setGridParam', {datatype: 'json', url: 'DanhSachDichVu?trangthai=' + $("#trangthai").val()}).trigger('reloadGrid');
loadGridBySqlPage: function (gridId,_gridSQL,_sqlParam,callback){
			//console.log('_sqlParam='+JSON.stringify(___sqlParam));
			//jqGrid_loadGridBySqlPage("grdChuyenKhoa",lookup_sql,sql_par);			
			$grid = $("#"+gridId);
			var loadonce = $grid.getGridParam("loadonce");	
			if(_sqlParam==undefined) _sqlParam=[];
			var _postdata;
			// Trường hợp loadonce == true thì lấy tất cả dữ liệu về
			if (loadonce != true) {
				_postdata= {
				 	"func":"ajaxExecuteQueryPaging",
				 	"uuid":jsonrpc.AjaxJson.uuid,
				 	"params":[_gridSQL],
				 	"options":_sqlParam
				 };	
				var _querydata=JSON.stringify(_postdata);
				//console.log('_postdata='+_postdata);
				_querydata=encodeURIComponent(_querydata);				
				$grid.jqGrid('setGridParam', {datatype: 'json',url: '../RestService?postData='+_querydata}).trigger('reloadGrid');
			}
			else {		
				if (callback && typeof callback == "function") {
					jsonrpc.AjaxJson.ajaxExecuteQueryO(_gridSQL, _sqlParam,function(data) {
						var griddata = $.parseJSON(data);
						$grid.setGridParam( { 
				            datatype: 'local',
				            data:griddata
				        }).trigger('reloadGrid');
						callback();
					});
				}
				else {
					var griddata = $.parseJSON(jsonrpc.AjaxJson.ajaxExecuteQueryO(_gridSQL, _sqlParam));
					$grid.setGridParam( { 
			            datatype: 'local',
			            data:griddata
			        }).trigger('reloadGrid');
				}
				
			}
		},
setGridParam: function (gridId,paramObject) {
			// show loading message
			$("#"+gridId).jqGrid('setGridParam',paramObject);
		},
exportExcel: function (gridId,_client) {
			//var columnNms = $("#"+gridId).jqGrid('getGridParam','colNames');
			var _colModel=$("#"+gridId).jqGrid ('getGridParam', 'colModel');
		    var theads = "";
		    //console.log('_colModel='+JSON.stringify(_colModel));
		    var colNames=new Array();
		    var ii=0;
		    for(var cc=0;cc<_colModel.length;cc++){
		    	if(!_colModel[cc].hidden && _colModel[cc].label) {
		    		theads = theads +"<th>"+_colModel[cc].label+"</th>";
		    		//colNames[ii++]=_colModel[cc];
		    		var col=new Object();
		    		col.name=_colModel[cc].name;
		    		var _wd="100";
		    		var _ta="left";
		    		if (_colModel[cc].width != null) {
		    			_wd=_colModel[cc].width;
		            }
		    		if (_colModel[cc].align != null) {
		    			_ta=_colModel[cc].align;
		            }
		    		//text-align:center;
		    		col.style=" style='width: " + _wd + ";text-align: "+_ta+"'";
		    		col.name=_colModel[cc].name.toUpperCase();
		    		colNames[ii++]=col;
		    	}
		    	else {
		    		console.log("_colModel[cc].hidden="+_colModel[cc].hidden +" _colModel[cc].label="+_colModel[cc].label);
		    	}
		    }
		    theads = "<tr>"+theads+"</tr>";
		    
		    var html="<table border='1' class='tableList_1 t_space' cellspacing='10' cellpadding='0'>"+theads;
		    var mya=new Array();
		    mya=$("#"+gridId).getDataIDs();  // Get All IDs
		    if(_client) {
		    	/*
		    	var data=$("#"+gridId).getRowData(mya[0]);     // Get First row to get the labels
		        for(i=0;i<mya.length;i++)
		        {
		            html=html+"<tr>";
		            data=$("#"+gridId).getRowData(mya[i]); // get each row
		            for(j=0;j<colNames.length;j++){
		            	html=html+"<td "+colNames[j].style+">"+data[colNames[j].name]+"</td>";
		            }
		            html=html+"</tr>";  // output each row with end of line
		        }
		        */
		    	//mya= $("#"+gridId).jqGrid('getGridParam', 'data');
		    	mya= $("#"+gridId).jqGrid('getRowData');
		    	//console.log('mya='+JSON.stringify(mya));
		    	for(i=0;i<mya.length;i++)
		        {
		            html=html+"<tr>";
		            data=mya[i]; // get each row
		            for(j=0;j<colNames.length;j++){
		            	var v= data[colNames[j].name];
		            	if (!v || v == 'undefined' || v=='null') {
		            		v = '';
		            	}
		            	html=html+"<td "+colNames[j].style+">"+v+"</td>";
		            }
		            html=html+"</tr>";  // output each row with end of line
		        }
		    }
		    else {
		    	//var data=
		    	var myUrl = $("#"+gridId).jqGrid('getGridParam', 'url');
		    	var rt=$.ajax({
		    	    url : myUrl,
		    	    type: "GET",
		    	    data : "rows=full",
		    	    contentType: "text/plain; charset=utf-8",
		    	    async: false
		    	}).responseText;
		    	console.log("exportExcel.rt="+rt);
		    	var _rtObj=JSON.parse(rt);
		    	mya=_rtObj.rows;
		    	//console.log("mya.length="+mya.length);
		    	//console.log('colNames='+JSON.stringify(colNames));
		    	for(i=0;i<mya.length;i++)
		        {
		            html=html+"<tr>";
		            data=mya[i]; // get each row
		            for(j=0;j<colNames.length;j++){
		            	var v= data[colNames[j].name];
		            	if (!v || v == 'undefined' || v=='null') {
		            		v = '';
		            	}
		            	html=html+"<td "+colNames[j].style+">"+v+"</td>";
		            }
		            html=html+"</tr>";  // output each row with end of line
		        }
		    }
		    
		    
		    html=html+"</table>";  // end of line at the end
		    //console.log('html='+html);
		    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
		    excelFile += "<head>";
		    excelFile += '<meta http-equiv="Content-type" content="text/html;charset=utf-8" />';
		    excelFile += "<!--[if gte mso 9]>";
		    excelFile += "<xml>";
		    excelFile += "<x:ExcelWorkbook>";
		    excelFile += "<x:ExcelWorksheets>";
		    excelFile += "<x:ExcelWorksheet>";
		    excelFile += "<x:Name>";
		    excelFile += "Sheet1";
		    excelFile += "</x:Name>";
		    excelFile += "<x:WorksheetOptions>";
		    excelFile += "<x:DisplayGridlines/>";
		    excelFile += "</x:WorksheetOptions>";
		    excelFile += "</x:ExcelWorksheet>";
		    excelFile += "</x:ExcelWorksheets>";
		    excelFile += "</x:ExcelWorkbook>";
		    excelFile += "</xml>";
		    excelFile += "<![endif]-->";
		    excelFile += "</head>";
		    excelFile += "<body>";
		    excelFile += html.replace(/"/g, '\'');
		    excelFile += "</body>";
		    excelFile += "</html>";

		    var uri = "data:application/vnd.ms-excel;base64,";
		    //var ctx = { worksheet: $settings.worksheetName, table: htmltable };
			//base64
			var base64_excelFile=window.btoa(unescape(encodeURIComponent(excelFile)));
		    var _excelData= (uri + base64_excelFile);
		    window.open(_excelData);
		    
		}
};


//--------- TreeUtil ---------------------------------------------------------------------------------------
var TreeUtil={
	_makeTree : function(options,data) {
			  var children, e, id, o, pid, temp, _i, _len, _ref;
			  id = options.id || "id";
			  pid = options.parentid || "parentid";
			  children = options.children || "children";
			  temp = {};
			  o = [];
			  _ref = data;
			 
			  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			    //e = _ref[_i];
				e={};
			    for (var _property in _ref[_i]) {
		          if (_ref[_i].hasOwnProperty(_property)) {
		          	e[_property.toLowerCase()]=_ref[_i][_property];
		          }
			    }
			    e[children] = [];
			    temp[e[id]] = e;
			    if (temp[e[pid]] != null) {
			      temp[e[pid]][children].push(e);
			    } else {
			      o.push(e);
			    }
			  }
			  console.log("reload_newData="+JSON.stringify(o));
			  return o;
			},	
init:function (treeId,_checkbox,_dnd) {
	var t_opt={
		  extensions: ["filter"],
		  checkbox: _checkbox,
	      selectMode: 3,
	      folder: true,
	      quicksearch: true,
	      source: [],
	      filter: {
	          autoApply: true,
	          // autoExpand: true,
	          mode: "hide"
	      }
	      
			/*
	      ,select: function(event, data) {
	          nguoidung = $.map(data.tree.getSelectedNodes(), function(node) {
	          	console.log('select='+node.key);
	              return node.key;
	          });
	      }
	      */
	  };
		if(_dnd) {
			t_opt.extensions=["dnd", "edit","filter"];
			t_opt.dnd={
		          autoExpandMS: 400,
		          focusOnClick: true,
		          preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
		          preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
		          dragStart: _dnd.dragStart,
		          dragEnter: _dnd.dragEnter,
		          dragDrop: _dnd.dragDrop
		        };
			}
				console.log('fcTree_init='+treeId);
				$("#"+treeId).fancytree(t_opt);
			  var tree = $("#"+treeId).fancytree("getTree");
			  return tree;
			  
			},
load: function (treeId,_data,_bExpand) {
	var _self=this;
				if(_data!=undefined) {
					/**/
					$(function() {
						var _newData=_self._makeTree({id:"key",parentid:"parent"},_data);
						var tree = $("#"+treeId).fancytree("getTree");
						//console.log("reload_newData="+JSON.stringify(_newData));
						tree.reload(_newData);
						if(_bExpand) {
							$("#"+treeId).fancytree("getRootNode").visit(function(node){
						        node.setExpanded(true);
						    });
						}
					});
					
				}
				else {
					console.log('fcTree_load._data=undefined');
				}
			}
};
//--------- UploadUtil ---------------------------------------------------------------------------------------
var UploadUtil={
	upload:function(_formId,_param,_succFnc) {
		$("#param").value=_param;
		var opts={
	    		url: "../upload/saveFile.jsp",
	    		type: "post",
	    		dataType: "json",
	    		success:function(data)
	    		{
	    			console.log('upload data.id='+data.id);
	    			$('#imgMEDIA_ID').attr("src",data.url);
	    		}
	    };
		if(typeof _succFnc =="function") {
			opts.success=_succFnc;
		}
		
    	$("#"+_formId).ajaxForm(opts).submit();
	}	
};