YTabToolbar=function(_container,prefix) {
	this.__raiseEvent=false;
	var __tabs=[];
	var __items=[];
	var __handler=[];
	var __prefix=prefix;
	var tabView = new YAHOO.widget.TabView(_container); 
	var __container=_container;
	var __ignoreFlag=false;
	this.addToolbarTab=function (tabId,tabLabel,tabWidth) {
		//alert("addToolbarTab="+tabLabel);
		var opts={};
		opts.label=tabLabel;
		opts.content="<div id='"+__container+":"+tabId+"'></div>";
		var new_idx=__tabs.length;
		__tabs[new_idx]=new YAHOO.widget.Tab(opts);
		__tabs[new_idx].id=tabId;
		//var tabs=tabView.get('tabs');
		//tabView.addTab(__tabs[new_idx],0);
		tabView.addTab(__tabs[new_idx],0);
	}
	this.addToolbarButton=function (tabId,tabLabel,tabWidth) {
		//alert("addToolbarButton="+tabLabel);
		var opts={};
		opts.label="<b><font color='#4682B4'>"+tabLabel+"</font></b>";
		opts.content="<div id='"+__prefix+":"+__container+":"+tabId+"'></div>";
		var new_idx=__items.length;
		__items[new_idx]=new YAHOO.widget.Tab(opts);
		__items[new_idx].id=__prefix+":"+tabId;

		tabView.addTab(__items[new_idx]);
	}
	this.clearAllButton=function() {
		__ignoreFlag=true;
		for(var i=0;i<__items.length;i++) {
			tabView.removeTab(__items[i]);
		}
		__currentButton=null;
		__items=[];
		__ignoreFlag=false;
	}
	this.clearAllTab=function() {
		__ignoreFlag=true;
		for(var i=0;i<__tabs.length;i++) {
			//alert('tabView.removeTab='+i);
			tabView.removeTab(__tabs[i]);
			//alert('tabView.removeTab o='+i);
		}
		__tabs=[];
		__ignoreFlag=false;
	}
	this.attachEvent=function(evtName,evtFunc) {
		__handler[evtName]=evtFunc;
	}
	this.bindEvents=function() {
		tabView.on("activeTabChange",function (e) {
			if(__ignoreFlag) return;
			var nIndex = tabView.get('activeIndex');
			var tab=tabView.getTab(nIndex);
			//alert('_tabId='+tab.id+" nIndex="+nIndex);
			var _tabId=tab.id;
			if(_tabId.indexOf(__prefix+":")>=0) {
				
				var pl=__prefix.length+1;
				_buttonId=_tabId.substring(pl);
				//_setButtonActive(_buttonId);
				__currentButton=_buttonId;
				//__tabToolbarObj.hideTab(_tabId);
				if(__handler['onClick'] != 'undefined' && __handler['onClick'] != null) {
					__handler['onClick'](__currentButton);
				}
			}
			else {
				if(__handler['onSelect'] != 'undefined' && __handler['onSelect']!=null) {
					__handler['onSelect'](_tabId);
				}
			}
			return true;
			
		});
	}
	function _getButtonIndex(buttonId) {
		var tabs=tabView.get('tabs');
		for(var i=0;i<tabs.length;i++) {
			//alert("tabs["+i+"]="+tabs[i].id);
			if(tabs[i].id==buttonId) {
				return i;
			}
		}
		return -1;
	}
	
	this.setTabActive=function (buttonId,raiseEvent) {
		var idx=-1;
		//alert("setTabActive="+buttonId);
		idx=_getButtonIndex(buttonId);
		//alert("setTabActive="+buttonId+"==="+idx);
		this.__raiseEvent=raiseEvent;
		tabView.selectTab(idx);
	}
	
	this.setContent=function (tabId,contentId) {
		var idx=-1;
		var cnt=document.getElementById(__container+":"+tabId);
		var _divContent=document.getElementById(contentId);
		cnt.appendChild(_divContent);
	}
	function _setButtonActive(buttonId) {
		var idx=-1;
		alert("buttonId="+buttonId+" __currentButton="+__currentButton);
		if(buttonId!=__currentButton) {
			if(__currentButton!='undefined' && __currentButton!=null && __currentButton!=0) {
				idx=_getButtonIndex(__prefix+":"+__currentButton);
				tabView.selectTab(idx);
			}
			__currentButton=buttonId;
			//__tabToolbarObj.setTabActive(__prefix+":"+buttonId,flag);
			idx=_getButtonIndex(__prefix+":"+__currentButton);
			tabView.deselectTab(idx);
		}
	}
	this.setButtonVisiable=function(buttonId,flag) {
		var idx=-1;
		idx=_getButtonIndex(__prefix+":"+buttonId);
		if(flag==true) {
			tabView.selectTab(idx);
		}
		else {
			tabView.deselectTab(idx);
		}
	}
	
	this.setButtonDisable=function(buttonId,flag) {
		if(flag==true) {
			//__tabToolbarObj.enableTab(__prefix+":"+buttonId);
		}
		else {
			//__tabToolbarObj.disableTab(__prefix+":"+buttonId);
		}
	}
	function _onButtonClick(_buttonId) {
		var _tabId;
		__currentButton=_buttonId;
		_setButtonActive(_buttonId);
		//_tabId=__prefix+":"+buttonId;
		//__tabToolbarObj.hideTab(_tabId);
		if(__handler['onClick'] != 'undefined' && __handler['onClick'] != null) {
			__handler['onClick'](__currentButton);
		}
	}
	this.setButtonActive=_setButtonActive;
	this.ButtonClick=_onButtonClick;
	
	this.show=function() {
		var tabs=tabView.get('tabs');
		alert('tabs='+tabs.length);
	}
}

//*****************************************************************************************************
ImageToolbar= function (toolbarId,imagePath,visibleFlag){
	var __toolbarId=toolbarId;
	var __visibleFlag=visibleFlag;
	var __imagePath=imagePath;
	var __currentButton=null;
	var __images=[];
	var __handler=[];
	var __items=[];
	if(__visibleFlag=='undefined') __visibleFlag=true;
	//alert('__visibleFlag='+__visibleFlag);
	this.addToolbarButton=function(buttonId,img,selectedImg) {
		var toolbar=document.getElementById(__toolbarId);
		//alert(toolbar);
		
		__images[buttonId]=[];
		__images[buttonId][0]=img;
		__images[buttonId][1]=selectedImg;
		var oImg=document.createElement("img"); 
		oImg.setAttribute('id',__toolbarId+buttonId);
		oImg.setAttribute('src', __imagePath+'/images/'+__images[buttonId][0]);
		//oImg.setAttribute('style', 'margin: 4px 20px 4px 0px;');//=trbl
		
		oImg.style.display='inline';
		oImg.style.margin='3px';
		//oImg.setAttribute('style', 'margin: 4px 20px 4px 0px;');//=trbl
		oImg.setAttribute('alt', 'na'); 
		//oImg.setAttribute('height', '2px'); 
		//oImg.setAttribute('width', '1px'); 
		oImg.onclick=function() { _onButtonClick(buttonId); };
		__items[buttonId]=oImg;
		toolbar.appendChild(oImg);
	}
	this.clearAll=function() {
		var toolbar=document.getElementById(__toolbarId);
		toolbar.innerHTML="";
		__currentButton=null;
		__images=[];
		//__handler=[];
		__items=[];
	}
	
	this.attachEvent=function(evtName,evtFunc) {
		__handler[evtName]=evtFunc;
	}
	this.setButtonActive=function(buttonId,flag) {
		var _button;
		if(__currentButton!='undefined' && __currentButton!=null && __currentButton!=0) {
			_button=document.getElementById(__toolbarId+__currentButton);
			if(__visibleFlag==true)
				_button.setAttribute('src', __imagePath+'/images/'+__images[__currentButton][0]);
			else
				_button.style.display='inline';
		}
		if(flag) {
			__currentButton=buttonId;
			_button=document.getElementById(__toolbarId+__currentButton);
			if(__visibleFlag==true)
				_button.setAttribute('src', __imagePath+'/images/'+__images[__currentButton][1]);
			else
				_button.style.display='none';
		}
	}
	this.setButtonVisiable=function(buttonId,flag) {
		var _button;
		_button=document.getElementById(__toolbarId+buttonId);
		if(flag==true) {
			_button.style.display='inline';
		}
		else {
			_button.style.display='none';
		}
	}
	function _onButtonClick(_buttonId) {
		var _button;
		if(__currentButton!='undefined' && __currentButton!=null) {
			_button=document.getElementById(__toolbarId+__currentButton);
			if(__visibleFlag==true)
				_button.setAttribute('src', __imagePath+'/images/'+__images[__currentButton][0]); 
			else
				_button.style.display='inline';
		}
		__currentButton=_buttonId;
		_button=document.getElementById(__toolbarId+__currentButton);
		if(_button!='undefined' && _button!=null) {
			if(__visibleFlag==true)
				_button.setAttribute('src', __imagePath+'/images/'+__images[__currentButton][1]); 
			else
				_button.style.display='none';
			if(__handler['onClick']!='undefined' && __handler['onClick']!=null) {
				__handler['onClick'](__currentButton);
			}
		}
		else {
			alert('not found='+_buttonId);
		}
		
	}		
	this.ButtonClick=_onButtonClick;
};


NormalToolbar= function (toolbarId){
	var __toolbarId=toolbarId;
	var __currentButton=null;
	var __handler=[];
	var __items=[];
	this.addToolbarButton=function(buttonId,buttonText) {
		var toolbar=document.getElementById(__toolbarId);
		//alert(toolbar);
		
		var oBtn= document.createElement('input');
		oBtn.setAttribute('type','button');
		oBtn.setAttribute('id',__toolbarId+buttonId);
		oBtn.setAttribute('value',buttonText);
		oBtn.style.margin='3px';
		//btn.setAttribute('height', '24px'); 
		//btn.setAttribute('width', '126px');
		oBtn.onclick=function() { _onButtonClick(buttonId); };
		__items[buttonId]={ control:oBtn,type:'button' };
		toolbar.appendChild(oBtn);
	}
	this.clearAll=function() {
		var toolbar=document.getElementById(__toolbarId);
		toolbar.innerHTML="";
		__currentButton=null;
		__images=[];
		//__handler=[];
		__items=[];
	}
	
	this.attachEvent=function(evtName,evtFunc) {
		__handler[evtName]=evtFunc;
	}
	this.setButtonActive=function(buttonId,flag) {
		var _button;
		if(__currentButton!='undefined' && __currentButton!=null && __currentButton!=0) {
			_button=document.getElementById(__toolbarId+__currentButton);	
			_button.disabled=false; 
		}
		if(flag) {
			
			__currentButton=buttonId;
			_button=document.getElementById(__toolbarId+__currentButton);
			_button.disabled=true; 
		}
	}
	this.setButtonVisiable=function(buttonId,flag) {
		var _button;
		_button=document.getElementById(__toolbarId+buttonId);
		if(flag==true) {
			_button.style.display='inline';
		}
		else {
			_button.style.display='none';
		}
	}
	this.setButtonDisable=function(buttonId,flag) {
		var _button;
		_button=document.getElementById(__toolbarId+buttonId);
		if(flag==true) {
			_button.disabled=true;
		}
		else {
			_button.disabled=false; 
		}
	}
	function _onButtonClick(_buttonId) {
		var _button;
		if(__currentButton!='undefined' && __currentButton!=null) {
			_button=document.getElementById(__toolbarId+__currentButton);
			_button.disabled=false;  
		}
		__currentButton=_buttonId;
		_button=document.getElementById(__toolbarId+__currentButton);
		if(_button!='undefined' && _button!=null) {
			_button.disabled=true;  
			if(__handler['onClick'] != 'undefined' && __handler['onClick']!=null) {
				__handler['onClick'](__currentButton);
			}
		}
		else {
			alert('not found='+__toolbarId+_buttonId);
		}
	}
	this.ButtonClick=_onButtonClick;
};

DBToolbar= function (toolbarId){
	var __toolbarId=toolbarId;
	var __currentButton=null;
	var __handler=[];
	var __items=[];
	this.getMode=function() {
		return __currentButton;
	}
	this.setButtons=function(buttonNew,buttonEdit,buttonCancel,buttonSave,buttonDelete,buttonClose) {
		this.addToolbarButton("new", "Thêm mới");
		this.addToolbarButton("edit", "Sửa đổi");
		this.addToolbarButton("cancel", "Hủy bỏ");
		this.addToolbarButton("save", "Ghi lại");
		this.addToolbarButton("delete", "Xóa bỏ");
		this.addToolbarButton("close", "Đóng");
		if(!buttonNew) {
			this.setButtonVisiable("new", false);
		}
		if(!buttonEdit) {
			this.setButtonVisiable("edit", false);
		}
		if(!buttonCancel) {
			this.setButtonVisiable("cancel", false);
		}
		if(!buttonSave) {
			this.setButtonVisiable("save", false);
		}
		if(!buttonDelete) {
			this.setButtonVisiable("delete", false);
		}
		if(!buttonClose) {
			this.setButtonVisiable("close", false);
		}
		this.setMode('disable');
	}
	this.addToolbarButton=function(buttonId,buttonText) {
		var toolbar=document.getElementById(__toolbarId);
		//alert(toolbar);
		
		var oBtn= document.createElement('input');
		oBtn.setAttribute('type','button');
		oBtn.setAttribute('id',__toolbarId+buttonId);
		oBtn.setAttribute('class','uiButton '+buttonId);
		oBtn.setAttribute('value',buttonText);
		oBtn.style.margin='3px';
		//btn.setAttribute('height', '24px'); 
		//btn.setAttribute('width', '126px');
		oBtn.onclick=function() { _onButtonClick(buttonId); };
		__items[buttonId]={ control:oBtn,type:'button' };
		toolbar.appendChild(oBtn);
	}
	this.attachEvent=function(evtMode,evtFunc) {
		__handler[evtMode]=evtFunc;
	}
	this.setButtonActive=function(buttonId,flag) {
		var _button;
		if(__currentButton!='undefined' && __currentButton!=null && __currentButton!=0) {
			_button=document.getElementById(__toolbarId+__currentButton);	
			_button.disabled=false; 
		}
		if(flag) {
			
			__currentButton=buttonId;
			_button=document.getElementById(__toolbarId+__currentButton);
			_button.disabled=true; 
		}
	}
	this.setButtonVisiable=function(buttonId,flag) {
		var _button;
		_button=document.getElementById(__toolbarId+buttonId);
		if(flag==true) {
			_button.style.display='inline';
		}
		else {
			_button.style.display='none';
		}
	}
	function setButtonDisable(buttonId,flag) {
		var _button;
		_button=document.getElementById(__toolbarId+buttonId);
		if(flag==true) {
			_button.disabled=true;
		}
		else {
			_button.disabled=false; 
		}
	}
	function _setMode(_mode) {
		if(_mode=='disable') {
			setButtonDisable('new', true);
			setButtonDisable('edit', true);
			setButtonDisable('delete',true);
			setButtonDisable('close', true);			
			
			setButtonDisable('cancel',true);
			setButtonDisable('save',true);
		}
		else if(_mode=='enable') {
			setButtonDisable('new', false);
			setButtonDisable('edit', false);
			setButtonDisable('delete', false);
			setButtonDisable('close', false);

			setButtonDisable('cancel',true);
			setButtonDisable('save',true);
		}
		else {
			__currentButton=_mode;
			if(__currentButton=='new'|| __currentButton=='edit'|| __currentButton=='close') {
				setButtonDisable('new', true);
				setButtonDisable('edit', true);
				setButtonDisable('delete', true);
				setButtonDisable('close', true);
				
				setButtonDisable('cancel',false);
				setButtonDisable('save',false);
			}
			else if(__currentButton=='save'|| __currentButton=='cancel') {
				setButtonDisable('new', false);
				setButtonDisable('edit', false);
				setButtonDisable('delete', false);
				setButtonDisable('close', false);
				
				setButtonDisable('cancel',true);
				setButtonDisable('save',true);
			}
		}
	}
	function _onButtonClick(_buttonId) {
		var _button;
		if(__currentButton!='undefined' && __currentButton!=null) {
			_button=document.getElementById(__toolbarId+__currentButton);
			_button.disabled=false;  
		}
		__currentButton=_buttonId;
		_setMode(_buttonId);
		_button=document.getElementById(__toolbarId+__currentButton);
		if(_button!='undefined' && _button!=null) {
			_button.disabled=true;  
			if(__handler[__currentButton] != 'undefined' && __handler[__currentButton]!=null) {
				__handler[__currentButton](__currentButton);
			}
		}
		else {
			alert('not found='+__toolbarId+_buttonId);
		}
	}
	this.setMode=_setMode;
	this.ButtonClick=_onButtonClick;
};
//*****************************************************************************************************

function enablePagingGrid(grid,id,sql) {
	var colNum=grid.getColumnsNum();
	var pagingContainer="pagingContainer_"+id;
	var ftr="<div id='"+pagingContainer+"' name='"+pagingContainer+"'></div>";
	for(var i=1;i<colNum;i++) {
		ftr+=",#cspan";
	}
	grid.attachFooter(ftr);
	
	var ctlPaging = new PagingDiv();

	ctlPaging.attachObject(pagingContainer,id,grid,sql);
	listPaging.push(ctlPaging);
}

function transformJson(ar) {
	var new_ar=[];
	for(i=0;i<ar.length;i++) {
		new_ar[i]=[];
		var obj={};
		for(j=0;j<ar[i].length;j++) {
			obj['C'+j]=ar[i][j];
		}
		new_ar[i]=obj;
	}
	return new_ar
}

function buildConfig(ftrInfo,cycleType) {
	var _ftrInfo=ftrInfo;
	_ftrInfo=replaceAll(_ftrInfo,'{#stat_count}','{ROW_COUNT}');
	_ftrInfo=replaceAll(_ftrInfo,'{#stat_total}','{SUM}');
	//alert('_ftrInfo='+_ftrInfo);
	var _ftr=_ftrInfo.split(',');
	//Tổng cộng {#stat_count},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total},{#stat_total}
	var _config = {
			selectionMode:"single",
			currencyOptions:{ prefix: "", decimalPlaces: 0, decimalSeparator: ".", thousandsSeparator: ","},
			MSG_EMPTY: 			"No data found!",
			MSG_LOADING: 		"Loading data ...",
			tfooter :  {
				fixed:		true
			}     
		};
	if(cycleType==1) {
		_config.formatRow=function(elTr, oRecord) { 
				var x=oRecord.getData('C0');
				
	            var y=null;
	            try {
	            	y=Date.parseDate(x,'d/m/Y');
	            	if(y==null) {
	            		try {
			            	y=Date.parseDate(x,'Y/m/d');
			            	
			            }catch(e1) {
			            	y=null;
			            }
	            	}
	            }catch(e) {
	            	y=null;
	            }
	            if(y!=null) {
	            	if(y.getDay()==0) {
	            		Dom.setAttribute(elTr,"style","color:red;");
	            	}
	            	else if(y.getDate()==1) {
	            		Dom.setAttribute(elTr,"style","color:blue;");
	            	}
	            	//Dom.addClass(elTr, 'mark'); 
	            	//elTr.style="color:red;";
	            	//__mygrid.setRowTextStyle(id,"color:red;");
	        	}
	            
				return true; 
			};  
	}
	_config.tfooter.col_keys=[];
	var j=0;
	for(var i=0;i<_ftr.length;i++) {
		if(i==0) {
			_config.tfooter.heading={colspan:2,label:_ftr[i], className:'align-center'};
			var ck={};
			ck.key="C"+i;
			ck.calc="{BLANK}";
			_config.tfooter.col_keys[j]=ck;
		}
		else {
			var ck={};
			if(_ftr[i]!='') {
				ck.key="C"+i;
				ck.calc=_ftr[i];
				_config.tfooter.col_keys[j]=ck;
			}
			else {
				ck.key="C"+i;
				ck.calc="{BLANK}";
				_config.tfooter.col_keys[j]=ck;
			}
			j++;
		}
	}
	return _config;
}
function buildGridHeaderV5(hdrInfo,hdrAttr) {
	//hdrInfo=Ngày,Thành tiền (đồng),#cspan,#cspan,Tổng số thẻ nạp,Thẻ 5000,#cspan,Thẻ 10000,#cspan,Thẻ 20000
	var ATTRIB_WIDTH=0;
	var ATTRIB_ALIGN=1;
	var ATTRIB_TYPE=2;
	var ATTRIB_SORT=3;
	var ATTRIB_FORMAT=4;
	var ATTRIB_SLIT=5;
	var data=hdrAttr.split(";");
	var dataAlign=data[ATTRIB_ALIGN].split(',');
	var dataType=data[ATTRIB_SORT].split(',');
	var dataFmt=data[ATTRIB_FORMAT].split(',');
	var _splitAt=parseInt(data[ATTRIB_SLIT]);
	var colsWidth=data[ATTRIB_WIDTH].split(',');
	
	var arHdr = hdrInfo.split("!");
	var MR=arHdr.length-1;
	var colInfo;
	var hdr=[];
	for(var i=MR;i>=0;i--) {
		var ar = arHdr[i].split(",");
		hdr[i]=[];
		
		for(var j=0;j<ar.length;j++) {
			
			if(i==MR) {
				
				//hdr[i][j]={key:""+j, formatter:YAHOO.widget.DataTable.formatNumber,sortable:true, resizeable:true,label:"<center>"+ar[j]+"</center>",width:parseInt(colsWidth[j])};
				colInfo={sortable:true, resizeable:true};
				colInfo.label="<center>"+ar[j]+"</center>";
				colInfo.key="C"+j;
				colInfo.className="align-"+dataAlign[j];
				if(dataType[j]=='int') {
					if(dataFmt[j]=='')
						colInfo.formatter=YAHOO.widget.DataTable.formatNumber;
				}
				else if(dataType[j]=='str')
					colInfo.formatter=YAHOO.widget.DataTable.formatString;
				else if(dataType[j]=='date_custom')
					colInfo.formatter=YAHOO.widget.DataTable.formatDate;
				else 
					colInfo.formatter=YAHOO.widget.DataTable.formatNumber;
				colInfo.width=parseInt(colsWidth[j]);
				hdr[i][j]=colInfo;
			}
			else {
				if(ar[j]!='#cspan') {
					var m=0;
					for(var n=j+1;n<ar.length && ar[n]=='#cspan';n++) {
						hdr[i][n]=null;
						m++;
					}
					if(m==0) {
						//hdr[i][j]={key:"TONG_CUOCGOI_DI", formatter:YAHOO.widget.DataTable.formatNumber, sortable:true, resizeable:true,label:"<center>Tổng số<br>cuộc gọi đi</center>",width:80};
						colInfo={sortable:true, resizeable:true};
						colInfo.label="<center>"+ar[j]+"</center>";
						colInfo.key="C"+j;
						colInfo.className="align-"+dataAlign[j];
						if(dataType[j]=='int')
							colInfo.formatter=YAHOO.widget.DataTable.formatNumber;
						else if(dataType[j]=='str')
							colInfo.formatter=YAHOO.widget.DataTable.formatString;
						else if(dataType[j]=='date_custom')
							colInfo.formatter=YAHOO.widget.DataTable.formatDate;
						else 
							colInfo.formatter=YAHOO.widget.DataTable.formatNumber;
						colInfo.width=parseInt(colsWidth[j]);
						hdr[i][j]=colInfo;
					}
					else {
						//merge column
						//hdr[i][j]={label:"<p align=left>SỐ LIỆU LƯU LƯỢNG CUỘC GỌI <b><font color='blue'>GIỮA VINAPHONE VÀ TAM ĐẠI GIA</font></b> THEO THÁNG NĂM<b> 2011 </b></p>"};
						colInfo={};
						//alert('ar[j]='+ar[j]);
						colInfo.label="<center>"+ar[j]+"</center>";
						colInfo.children=[];
						hdr[i][j]=colInfo;
						for(var n=0;n<=m;n++) {
							//alert('hdr['+i+','+j+','+n+'][j+n]=');
							if(hdr[i+1][j+n]!=null) {
								hdr[i][j].children[hdr[i][j].children.length]=hdr[i+1][j+n];
							}
						}
					}
				}
				else {
					//ar[j]=='#cspan' -->ignore
					
				}
			}
		}
	}
	var k=0;
	var hdrDef=[];
	for(var j=0;j<hdr[0].length;j++) {
		if(hdr[0][j]!=null) {
			hdrDef[k]=hdr[0][j];
			k++;
		}
	}
	return hdrDef;
}

function buildGridHeader(mygrid,hdrInfo,hdrAttr) {
	//hdrInfo=Ngày,Thành tiền (đồng),#cspan,#cspan,Tổng số thẻ nạp,Thẻ 5000,#cspan,Thẻ 10000,#cspan,Thẻ 20000
	var ATTRIB_WIDTH=0;
	var ATTRIB_ALIGN=1;
	var ATTRIB_TYPE=2;
	var ATTRIB_SORT=3;
	var ATTRIB_FORMAT=4;
	var ATTRIB_SLIT=5;
	
	var arHdr = hdrInfo.split("!");
	var ar = arHdr[0].split(",");
	var arAlign = [];
	for(var ii = 0;ii<ar.length;ii++) {
		arAlign[ii] = "text-align:center;";
	}
	//alert('arHdr[0]='+arHdr[0]);
	mygrid.setHeader(arHdr[0],null,arAlign);
	for(var j = 1;j<arHdr.length;j++) {
		mygrid.attachHeader(arHdr[j],arAlign);
	}
	if(hdrAttr!=undefined && hdrAttr!=null) {
			var data = hdrAttr.split(";");
			var dataType=data[ATTRIB_SORT].split(',');
			var dataFmt=data[ATTRIB_FORMAT].split(',');
			var _splitAt=parseInt(data[ATTRIB_SLIT]);
		mygrid.setInitWidths(data[ATTRIB_WIDTH]);
		mygrid.setColAlign(data[ATTRIB_ALIGN]);
		//alert("data[ATTRIB_WIDTH]="+data[ATTRIB_WIDTH]);
		//alert("data[ATTRIB_TYPE]="+data[ATTRIB_TYPE]);
		mygrid.setColTypes(data[ATTRIB_TYPE]);
		mygrid.setColSorting(data[ATTRIB_SORT]);
		//mygrid.setColumnMinWidth(50, 0);
		for(var idx=0;idx<dataType.length;idx++) {
			if(dataType[idx]=='int') {
				//mygrid.setNumberFormat("0,000.00",idx);
				mygrid.setNumberFormat("0,000"+dataFmt[idx],idx,".",","); 
			}
		}
		if(_splitAt>0) {
			try {
				//mygrid.splitAt(_splitAt);
			}
			catch(er) {
			}
		}
	}
}
function buildGridHeader_Type1(grid,hdrInfo) {
	var ATTRIB_WIDTH=0;
	var ATTRIB_ALIGN=1;
	var ATTRIB_TYPE=2;
	var ATTRIB_SORT=3;
	var ATTRIB_FORMAT=4;
	var ATTRIB_SLIT=5;
	var arInfoAttr=hdrInfo.split('@');
	var hdrAttr=null;
	if(arInfoAttr.length==2) {
		hdrAttr=arInfoAttr[1];
	} 
	var arHdr = arInfoAttr[0].split(";");
	var ar = arHdr[0].split(",");
	var arAlign = [];
	
	for(var ii = 0;ii<ar.length;ii++) {
		arAlign[ii] = "text-align:center;";
	}
	grid.setHeader(arHdr[0],null,arAlign);
	for(var j = 1;j<arHdr.length;j++) {
		grid.attachHeader(arHdr[j],arAlign);
	}
	var data = new Array();
	//field1,field2,fied3@77,112,112;left,left,right;ro,ro,ro;str,str,int
	if(arInfoAttr.length==1) {
		var wd=(100 / ar.length)+'';
		for(var ii = 0;ii<ar.length;ii++) {
			data[ATTRIB_WIDTH]=wd;
			data[ATTRIB_ALIGN]="center";
			data[ATTRIB_TYPE]="ro";
			data[ATTRIB_SORT]="str";
		}
	} 
	else {
		data = hdrAttr.split(";");
	}
	
	//var _splitAt=parseInt(data[ATTRIB_SLIT]);
	if(arInfoAttr.length==1) {
		grid.setInitWidthsP(data[ATTRIB_WIDTH]);
	}	
	else {
		grid.setInitWidthsP(data[ATTRIB_WIDTH]);
	}
	grid.setColAlign(data[ATTRIB_ALIGN]);
	grid.setColTypes(data[ATTRIB_TYPE]);
	grid.setColSorting(data[ATTRIB_SORT]);
	grid.setColumnMinWidth(50, 0);
	//grid.attachFooter(ftrInfo);
}
function buildGridHeader_Type2(grid,hdrInfo) {
	//hdrInfo=field1,field2,fied3@77,112,112;left,left,right;ro,ro,ro;str,str,int
	var ATTRIB_WIDTH=0;
	var ATTRIB_ALIGN=1;
	var ATTRIB_TYPE=2;
	var ATTRIB_SORT=3;
	var ATTRIB_FORMAT=4;
	var ATTRIB_SLIT=5;
	var arInfoAttr=hdrInfo.split('@');
	var hdrAttr=null;
	if(arInfoAttr.length==2) {
		hdrAttr=arInfoAttr[1];
	} 
	var arHdr = arInfoAttr[0].split(";");
	var ar = arHdr[0].split(",");
	var arAlign = [];
	for(var ii = 0;ii<ar.length;ii++) {
		arAlign[ii] = "text-align:left;";
	}
	
	grid.setHeader(arHdr[0],null,arAlign);
	for(var j = 1;j<arHdr.length;j++) {
		grid.attachHeader(arHdr[j],arAlign);
	}
	
	var data = new Array();
	//field1,field2,fied3@77,112,112;left,left,right;ro,ro,ro;str,str,int
	if(arInfoAttr.length==1) {
		var wd=(100 / ar.length)+'';
		for(var ii = 0;ii<ar.length;ii++) {
			data[ATTRIB_WIDTH]=wd;
			data[ATTRIB_ALIGN]="center";
			data[ATTRIB_TYPE]="ro";
			data[ATTRIB_SORT]="str";
		}
	} 
	else {
		data = hdrAttr.split(";");
	}
	
	//var _splitAt=parseInt(data[ATTRIB_SLIT]);
	if(arInfoAttr.length==1) {
		grid.setInitWidthsP(data[ATTRIB_WIDTH]);
	}	
	else {
		grid.setInitWidthsP(data[ATTRIB_WIDTH]);
	}
	grid.setColAlign(data[ATTRIB_ALIGN]);
	grid.setColTypes(data[ATTRIB_TYPE]);
	grid.setColSorting(data[ATTRIB_SORT]);
	grid.setColumnMinWidth(50, 0);
	//grid.attachFooter(ftrInfo);
	
}

function setPageSQL(divid,sql)
{
	for (var i=0;i<listPaging.length;i++)
	{
		if(listPaging[i].id==divid)
		{
			listPaging[i].grid_sql=sql;
		}
	}
}
function showPage(divid,number)
{
	for (var i=0;i<listPaging.length;i++)
	{
		if(listPaging[i].id==divid)
		{
			if(number==1)
			{
				listPaging[i].allrow= jsonrpc.AjaxJson.getOneValue("select count(1) from ("+listPaging[i].grid_sql+")");
			}
			if(parseInt(number)>=parseInt(listPaging[i].frompage)+parseInt(listPaging[i].pagecount)) //new side
			{
				listPaging[i].frompage=parseInt(number);
				setInnerById(listPaging[i].parent,listPaging[i].Complie());
			}	
			else if (parseInt(number)<listPaging[i].frompage)
			{
				listPaging[i].frompage=parseInt(listPaging[i].frompage-listPaging[i].pagecount);
				setInnerById(listPaging[i].parent,listPaging[i].Complie());
			}
			else
			{
				
				var fromrow=(parseInt(number)-1)*listPaging[i].rowcount+1;
				var torow=parseInt(number)*listPaging[i].rowcount;
				//alert('grid_object1');
				listPaging[i].loadPagingGrid(fromrow,torow);
				listPaging[i].currentpage=number;
				setInnerById(listPaging[i].parent,listPaging[i].Complie());
			}
		}
	}
}
//******************************************************************************************************
var lstobj=new Array();
var listPaging=new Array();
//******************************************************************************************************
function PagingDiv(){
	this.id="";
	this.parent="";
	this.pages=new Array();
	this.body="";
	this.width="";
	this.frompage=1;
	this.pagecount=10;	
	this.rowcount=15;
	this.allrow=0;
	this.currentpage=1;
	this.grid_sql="";
	this.grid_object=null;
}

PagingDiv.prototype.Complie=function()
{
	var result="";
	result='<br><div class="custom_pline" style="width: '+this.width+'">	<div style="CLEAR: both">';
	var maxpage=parseInt(this.allrow/this.rowcount);
	if((this.allrow%this.rowcount)>0) 
		maxpage+=2;
	var topage=this.pagecount+this.frompage;
	if(topage>maxpage)
		topage=maxpage;
	if(this.frompage>1)
		result+='<div class="custom_page" pgnum="'+(this.frompage-1)+'" onclick="alert(this);showPage(\''+this.id+'\','+(this.frompage-1)+');"><div>←</div></div>';
	for(var i=this.frompage;i<topage;i++)
		{
		  if(i!=this.currentpage)
			  result+='<div class="custom_page" pgnum="'+i+'" onclick="alert(this);showPage(\''+this.id+'\','+i+');"><div style="WIDTH: 15px">'+i+'</div></div>';
		  else
			  
			result+='<div class="custom_page custom_page_active" pgnum="'+i+'" onclick="alert(this);showPage(\''+this.id+'\','+i+');"><div style="WIDTH: 15px" class="custom_page_active">'+i+'</div></div>';
		}
	if(maxpage>this.frompage+this.pagecount)
		result+='<div class="custom_page" pgnum="'+(this.pagecount+this.frompage)+'" onclick="alert(this);showPage(\''+this.id+'\','+(this.pagecount+this.frompage)+');"><div>→</div></div>';
	result+='<div class="custom_pager_info">	<div>		Từ dòng '+((this.currentpage-1)*this.rowcount+1)+' tới dòng '+Math.min(this.allrow,(this.currentpage*this.rowcount))+'| Tổng số: '+(maxpage-1)+' trang/'+this.allrow+' bản ghi</div></div>';
	return result;
}

PagingDiv.prototype.attachObject=function(pid,id,grid,sql)
{
	this.parent=pid;
	this.id=id;
	this.grid_object=grid;
	this.grid_sql=sql;
	document.getElementById(this.parent).innerHTML = this.Complie();
	
	//this.showMsg.apply(pid);
}
PagingDiv.prototype.showMsg=function(a) {
	alert('msg='+a);
}
function showPage(divid,number)
{
	for (var i=0;i<listPaging.length;i++)
	{
		if(listPaging[i].id==divid)
		{
			if(number==1)
			{
				listPaging[i].allrow= jsonrpc.AjaxJson.getOneValue("select count(1) from ("+listPaging[i].grid_sql+")");
			}
			if(parseInt(number)>=parseInt(listPaging[i].frompage)+parseInt(listPaging[i].pagecount)) //new side
			{
				listPaging[i].frompage=parseInt(number);
				setInnerById(listPaging[i].parent,listPaging[i].Complie());
			}	
			else if (parseInt(number)<listPaging[i].frompage)
			{
				listPaging[i].frompage=parseInt(listPaging[i].frompage-listPaging[i].pagecount);
				setInnerById(listPaging[i].parent,listPaging[i].Complie());
			}
			else
			{
				
				var fromrow=(parseInt(number)-1)*listPaging[i].rowcount+1;
				var torow=parseInt(number)*listPaging[i].rowcount;
				//alert('grid_object1');
				listPaging[i].loadPagingGrid(fromrow,torow);
				listPaging[i].currentpage=number;
				setInnerById(listPaging[i].parent,listPaging[i].Complie());
			}
		}
	}
}
PagingDiv.prototype.loadPagingGrid=function(fromrow,torow)
{	
	var sql="select * from (select 0,rownum stt,x.* from("+this.grid_sql+") x) y where y.stt between "+fromrow+" and "+torow+"";
	var data=jsonrpc.AjaxJson.ajaxExecuteQuery(sql);
	this.grid_object.clearAll();
	
	this.grid_object.parse(data,'jsarray');
}
//******************************************************************************************************
function Header(){
	this.body="";
	this.id="";
}
function Form(){
	// Nothing to do here.
	this.id="";
	this.name="";
	this.styleclass="";
	this.method="";
	this.action="";	
	this.body="";
}
function TableGroup(){
	// Chứa các fieldset.
	this.id="";
	this.name="";		
	this.box=new Array();		
}
function GroupBox()
{
	// Fieldset chứa các div.
	this.id="";
	this.width=200;
	this.height=200;
	this.body="";
}

function Div(){
	// Div chứa các trường nhập liệu.
	this.id="";
	this.name="";
	this.styleclass="";
	this.style="";		
	this.body="";
	this.width="100%";
	this.height="100%";
}

function Label(){
	this.id="";
	this.body="";	
	this.desc=null;
}
function Span(){
	this.body="";	
	this.styleclass="";
	this.id="";
}
function Hidden(){		
	this.id="";
	this.name="";
	this.styleclass="";	
	this.value="";		
}
function TextArea(){
	this.id="";
	this.name="";
	this.styleclass="";	
	this.value="";
	this.notnull=0;	
	this.disible=false;
}
function TextBox(){
	// Nothing to do here.
	this.id="";
	this.name="";
	this.type="text";//"checkbox";
	this.label=null;		
	this.styleclass="textfield";
	this.style="";
	this.onclick="";
	this.onmouseover="";	
	this.onmousemove="";
	this.onkeyup="";
	this.onkeypress="";
	this.onblur="";
	this.value="";	
	this.notnull=0;	
	this.disible=false;
	this.note="";
	}

function SelectBox(){
	// Nothing to do here.
	this.id="";
	this.name="";		
	this.label=null;
	this.value="";
	this.onclick="";
	this.onchange="";	
	this.styleclass="selectfield";
	this.lookup_sql="";
	this.style="";
	this.body="";
	this.notnull=0;
	this.disible=false;
	this.note="";
	this.multiple="";
	}
function Button()
{
	this.id="";
	this.name="";		
	this.label="";
	this.value="";
	this.onclick="";
	this.styleclass="button";	
	this.disible=false;
}
Hidden.prototype.Complie=function(){
	
	return '<input type="hidden" id="'+this.id+'" name="'+this.name+'" value="'+this.value+'"/>';
}
TextArea.prototype.Complie=function(){
	return '<textarea id="'+this.id+'" name="'+this.name+'" value="'+this.value+'"></textarea>';
}
Button.prototype.Complie=function(){
	return '<input id="'+this.id+'" type="button" class="'+this.styleclass+'" onclick="'+this.onclick+'" value="'+this.label+'"/>';
}
Span.prototype.Complie=function(){
	return '<span id="'+this.id+'" class="'+this.styleclass+'">'+this.body+'</span>'; 
}
Header.prototype.Complie=function(){
	return "<h1 id='"+this.id+"'>"+this.body+"</h1>"; 
}
Label.prototype.Complie=function(){
	var result="";	
	if (this.desc!=null)
		this.body+=this.desc.Complie();
	result+='<label>'+this.body+'</label>'; 
	return result;
}

TextBox.prototype.Complie=function()
{
	var result="";
	if (this.label!=null)
		result+=this.label.Complie();
	result+='<input type="'+this.type+'" name="'+this.name+'" id="'+this.id+'" class="'+this.styleclass+'" onkeyup="'+this.onkeyup+'" onblur="'+this.onblur+'" onkeypress="'+this.onkeypress+'" />';
	return result;
}

SelectBox.prototype.Complie=function()
{
	var result="";
	if (this.label!=null)
		result+=this.label.Complie();
	
	if(this.lookup_sql!=""&&this.lookup_sql!=null)
	{
		//this.lookup_sql=replaceParam(this.lookup_sql);
		var cbodata=jsonrpc.AjaxJson.ajaxExecuteQuery(this.lookup_sql);
		this.body+='<option value="-1">--Chọn--</option>';
		if (cbodata!=null)
		{
			for(var i=0;i<cbodata.length;i++)
			{
				if (cbodata[i][0]==parseInt(this.value))
					this.body+='<option selected value="'+cbodata[i][0]+'">'+cbodata[i][1]+'</option>';
				else
					this.body+='<option value="'+cbodata[i][0]+'">'+cbodata[i][1]+'</option>';
			}
		}
		
			
	}

	result+='<select class="'+this.styleclass+'" name="'+this.name+'" id="'+this.id+'" '+this.multiple+' onchange="'+this.onchange+'">'+this.body+'</select>';
	return result;
}
GroupBox.prototype.Complie=function()
{
	if(this.body!="")
	{
		var result='<fieldset name="'+this.id+'" style="height: '+this.height+'px; width:'+this.width+'px">'+this.body+'</fieldset>';
		return result;
	}
	else
		return "";
}
TableGroup.prototype.Complie=function()
{
	var result='<table style="width:100%"><tr>';
	if (this.box!=null)
		for(var i=0;i<this.box.length;i++)
		{		
			result+='<td width="250">'+this.box[i].Complie()+'</td>';
		}
	result+='</tr></table>';
	return result;
}


Div.prototype.Complie=function()
{
	var result="<div id='"+this.id+"' width='"+this.width+"' height='"+this.height+"' name='"+this.name+"'  class='"+this.styleclass+"'>";
	result+=this.body;
	result+="</div>";
	//alert('result='+result);
	return result;
}
GroupBox.prototype.add=function(v_obj)
{
this.body=this.body+v_obj.Complie();
}

Div.prototype.add=function(v_form)
{
	this.body=this.body+v_form.Complie();
}


Form.prototype.add=function(v_div)
{	
	this.body=this.body+v_div.Complie();
}



function Blank() {
	this.id="";
}
Blank.prototype.Complie=function() {
	return "";
}
function TableEx(cols){
	this.id="";
	this.name="";
	this.columns=cols.split(",");
	this.items=new Array();		
}
TableEx.prototype.Complie=function()
{
	var result='<table style="width:100%"><tr>';
	//var wd=(100 / this.columns)+'%';
	var j=0;
	var i=0;
	if (this.items!=null) {
		for(i = 0;i<this.items.length;i++)
		{		
			if(this.items[i]==null) {
				result+='<td width="'+this.columns[j]+'"></td>';
			}
			else {
				result+='<td width="'+this.columns[j]+'">'+this.items[i].Complie()+'</td>';
			}
			if( j == this.columns.length-1 ) {
				result+='</tr><tr>';
				j=0;
			}
			else {
				j++;
			}
			
		}
		for(i=j;i<this.columns.length-1;i++) {
			result+='<td width="'+this.columns[i]+'"></td>';
		}
	}
	result+='</tr></table>';
	return result;
}
function DatePicker(){
	// Nothing to do here.
	this.id="";
	this.name="";
	this.type="date";//"checkbox";
	this.label=null;		
	this.styleclass="textfield";
	this.style="";
	this.onclick="";
	this.onmouseover="";	
	this.onmousemove="";
	this.onkeyup="";
	this.onkeypress="";
	this.onblur="";
	this.value="";	
	this.notnull=0;	
	this.disible=false;
	this.note="";
	}
DatePicker.prototype.Complie=function()
{
	var result="";
	if (this.label!=null)
		result+=this.label.Complie();
	if(this.type=="date") {
		result+='<input type="text" name="'+this.name+'" id="'+this.id+'" class="'+this.styleclass+'" />';
		result+="<img src='../common/script/jsdatetime/Image/cal.gif' onclick=\"NewCssCal('"+ this.id +"','ddMMyyyy','dropdown',true,'24',true)\"/>";
	}
	else { //=daterange
		result+='<table><tr"><td><input type="text" name="'+this.name+'" id="'+this.id+'" class="'+this.styleclass+'" />';
		result+="<img src='../common/script/jsdatetime/Image/cal.gif' onclick=\"NewCssCal('"+ this.id +"','ddMMyyyy','dropdown',true,'24',true)\"/>";
		result+='</td></tr><tr><td><input type="text" name="'+this.name+'" id="to'+this.id+'" class="'+this.styleclass+'" />';
		result+="<img src='../common/script/jsdatetime/Image/cal.gif' onclick=\"NewCssCal('to"+ this.id +"','ddMMyyyy','dropdown',true,'24',true)\"/></td></tr></table>";
	}
	return result;
}

//*********************************************************************************************************

function createInput(type,id,value) {
    //Create an input type dynamically.
    var element = document.createElement("input");
    //Assign different attributes to the element.
    element.setAttribute("type", type);
    element.setAttribute("id", id);
    element.setAttribute("name", id);
    element.setAttribute("value", value);
    element.style.width = "100px"; 
    return element;
}
function createSelect(id,dbname,sql,def){
	var sel 	= document.createElement('select');
	sel.name 	= id;
	sel.id 		= id;
	var sData, j = 0;
	if(sql != ""){
		sData 	= jsonrpc.AjaxJson.ajaxExecuteQuery(dbname,sql);
		if(sData != null){
			for(var i = 0; i < sData.length; i++){
				
				sel.options[i] = new Option(sData[i][1], sData[i][0]);
				if(def==sData[i][0]) {
					sel.options[i].selected=true;
				}
			}
		}
	}
	return sel;
}
function createDiv(parentObj,id,height) {
	var newdiv = document.createElement('div'); 
	newdiv.setAttribute('id', id); 
	if (height) { 
		newdiv.style.height = height; 
		newdiv.setAttribute('style','height:'+height+'px;'); 
	} 
	parentObj.appendChild(newdiv);
	return newdiv;
}

function insertRow(tableID) {
    var table = document.getElementById(tableID);
    var row=document.createElement("tr");
    table.tBodies[0].appendChild(row);
}
function insertCell(tableID,c,r,ctlID) {
    var table = document.getElementById(tableID);
    var row = table.tBodies[0].rows[r];
    var cell=document.createElement("td");
    cell.appendChild(ctlID);
    row.appendChild(cell);
}

function deleteRows(tableID) {
	var tab = document.getElementById(tableID);
	for(var i = tab.rows.length; i > 0;i--)
	{
		tab.deleteRow(i -1);
	}
}	
	
createTable=function(container,tableID,className){
	var root=document.getElementById(container);
	var tab = document.getElementById(tableID);
	if(tab==undefined || tab==null) {
		tab=document.createElement('table');
		tab.name=tableID;
		tab.id=tableID;
		tab.className=className;
		var tbo=document.createElement('tbody');
		tab.appendChild(tbo);
		root.appendChild(tab);
	}
	else {
		deleteRows(tableID);
	}
}
attachControl=function(tableID,c,r,ctlID) {
	var table = document.getElementById(tableID);
	var cell=table.rows[r].cells[c];
	cell.appendChild(ctlID);
}
TabToolbar= function (tabToolbarObj,tabToolbarId,prefix){
	var __tabToolbarObj=tabToolbarObj;
	var __toolbarId=tabToolbarId;
	var __prefix=prefix;
	var __currentButton=null;
	var __handler=[];
	var __items=[];
	var __tabs=[];
	this.addToolbarButton=function(buttonId,buttonText) {
		__tabToolbarObj.addTab(__prefix+":"+buttonId,buttonText,"180px");
		__items[__items.length]=buttonId;
	}
	this.addToolbarTab=function(buttonId,buttonText,width) {
		__tabToolbarObj.addTab(buttonId,buttonText,width,0);
		__tabs[__tabs.length]=buttonId;
	}
	this.clearAllTab=function() {
		for(var i=0;i<__tabs.length;i++) {
			__tabToolbarObj.removeTab(__tabs[i]);
		}
		__tabs=[];
	}
	this.clearAllButton=function() {
		for(var i=0;i<__items.length;i++) {
			__tabToolbarObj.removeTab(__prefix+":"+__items[i]);
		}
		__currentButton=null;
		__items=[];
	}
	
	this.attachEvent=function(evtName,evtFunc) {
		__handler[evtName]=evtFunc;
	}
	this.bindEvents=function() {
		__tabToolbarObj.attachEvent("onSelect",function (_tabId) {
			if(_tabId.indexOf(__prefix+":")>=0) {
				
				var pl=__prefix.length+1;
				_buttonId=_tabId.substring(pl);
				_setButtonActive(_buttonId);
				//__currentButton=_buttonId;
				//__tabToolbarObj.hideTab(_tabId);
				if(__handler['onClick'] != 'undefined' && __handler['onClick'] != null) {
					__handler['onClick'](__currentButton);
				}
			}
			else {
				if(__handler['onSelect'] != 'undefined' && __handler['onSelect']!=null) {
					__handler['onSelect'](_tabId);
				}
			}
			return true;
		});
	}
	
	function _setButtonActive(buttonId) {
		if(__currentButton!='undefined' && __currentButton!=null && __currentButton!=0) {
			__tabToolbarObj.showTab(__prefix+":"+__currentButton);
		}
		__currentButton=buttonId;
		//__tabToolbarObj.setTabActive(__prefix+":"+buttonId,flag);
		__tabToolbarObj.hideTab(__prefix+":"+buttonId);
	}
	this.setButtonVisiable=function(buttonId,flag) {
		if(flag==true) {
			__tabToolbarObj.showTab(__prefix+":"+buttonId);
		}
		else {
			__tabToolbarObj.hideTab(__prefix+":"+buttonId);
		}
	}
	
	this.setButtonDisable=function(buttonId,flag) {
		if(flag==true) {
			__tabToolbarObj.enableTab(__prefix+":"+buttonId);
		}
		else {
			__tabToolbarObj.disableTab(__prefix+":"+buttonId);
		}
	}
	function _onButtonClick(_buttonId) {
		var _tabId;
		__currentButton=_buttonId;
		_setButtonActive(_buttonId);
		//_tabId=__prefix+":"+buttonId;
		//__tabToolbarObj.hideTab(_tabId);
		if(__handler['onClick'] != 'undefined' && __handler['onClick'] != null) {
			__handler['onClick'](__currentButton);
		}
	}
	this.setButtonActive=_setButtonActive;
	this.ButtonClick=_onButtonClick;
};