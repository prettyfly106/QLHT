
//*****************************************************************************************************



DBToolbar= function (toolbarId,_lang){
	var __toolbarId=toolbarId;
	var __lang=_lang;
	var __currentButton=null;
	var __handler=[];
	var __items=[];
	
	this.getMode=function() {
		return __currentButton;
	}
	this.setButtons=function(buttonNew,buttonEdit,buttonCancel,buttonSave,buttonDelete,buttonClose) {
		if(__lang=='en') {
			this.addToolbarButton("NEW", "Add New");
			this.addToolbarButton("EDIT", "Edit");
			this.addToolbarButton("CANCEL", "Cancel");
			this.addToolbarButton("SAVE", "Save");
			this.addToolbarButton("DELETE", "Delete");
			this.addToolbarButton("CLOSE", "Close");
		}
		else {
			this.addToolbarButton("NEW", "Thêm mới");
			this.addToolbarButton("EDIT", "Sửa đổi");
			this.addToolbarButton("CANCEL", "Hủy bỏ");
			this.addToolbarButton("SAVE", "Ghi");
			this.addToolbarButton("DELETE", "Xóa");
			this.addToolbarButton("CLOSE", "Đóng");
		}
		if(!buttonNew) {
			this.setButtonVisiable("NEW", false);
		}
		if(!buttonEdit) {
			this.setButtonVisiable("EDIT", false);
		}
		if(!buttonCancel) {
			this.setButtonVisiable("CANCEL", false);
		}
		if(!buttonSave) {
			this.setButtonVisiable("SAVE", false);
		}
		if(!buttonDelete) {
			this.setButtonVisiable("DELETE", false);
		}
		if(!buttonClose) {
			this.setButtonVisiable("CLOSE", false);
		}
		this.setMode('DISABLE');
	}
	
	this.addToolbarButton=function(buttonId,buttonText, buttonClass) {
		var toolbar=document.getElementById(__toolbarId);
		//alert(toolbar);
		var oBtn= document.createElement('input');
		oBtn.setAttribute('type','button');
		oBtn.setAttribute('id',__toolbarId+buttonId);
		if (buttonClass) {
			oBtn.setAttribute('class','btn '+ buttonClass + ' '+buttonId);
		}
		else {
			oBtn.setAttribute('class','btn btn-primary '+buttonId);
		}
		oBtn.setAttribute('style','min-width:100px;');
		oBtn.setAttribute('value',buttonText);
		//oBtn.style.margin='3px';
		//btn.setAttribute('height', '24px'); 
		//btn.setAttribute('width', '126px');
		oBtn.onclick=function() {
			_onButtonClick(buttonId); 
		};
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
	
	//NamNT thêm hàm
	function setButtonEnable(buttonId,flag) {
		setButtonDisable(buttonId, !flag);
	}

	//NamNT thêm hàm
	
	
	function _setMode(_mode) {
		if(_mode=='DISABLE') {
			setButtonDisable('NEW', true);
			setButtonDisable('EDIT', true);
			setButtonDisable('DELETE',true);
			setButtonDisable('CLOSE', true);			
			
			setButtonDisable('CANCEL',true);
			setButtonDisable('SAVE',true);
		}
		else if(_mode=='ENABLE') {
			setButtonDisable('NEW', false);
			setButtonDisable('EDIT', false);
			setButtonDisable('DELETE', false);
			setButtonDisable('CLOSE', false);

			setButtonDisable('CANCEL',true);
			setButtonDisable('SAVE',true);
		}		
		else {
			__currentButton=_mode;
			
			if(__currentButton=='NEW'|| __currentButton=='EDIT'|| __currentButton=='CLOSE') {
				setButtonDisable('NEW', true);
				setButtonDisable('EDIT', true);
				setButtonDisable('DELETE', true);
				setButtonDisable('CLOSE', true);
				
				setButtonDisable('CANCEL',false);
				setButtonDisable('SAVE',false);
			}
			else if(__currentButton=='SAVE'|| __currentButton=='CANCEL') {
				setButtonDisable('NEW', false);
				setButtonDisable('EDIT', false);
				setButtonDisable('DELETE', false);
				setButtonDisable('CLOSE', false);
				
				setButtonDisable('CANCEL',true);
				setButtonDisable('SAVE',true);
			}
		}
	}
	function _onButtonClick(_buttonId) {
		console.log('_onButtonClick='+_buttonId);
		var _button;
		if(__currentButton!='undefined' && __currentButton!=null) {
			_button=document.getElementById(__toolbarId+__currentButton);
			_button.disabled=false;  
		}
		//__currentButton=_buttonId;
		var _success=true;
		// NamNT kết thúc sửa
		_button=document.getElementById(__toolbarId+_buttonId);
		if(_button!='undefined' && _button!=null) {
			_button.disabled=true;  
			if(__handler[_buttonId] != 'undefined' && __handler[_buttonId]!=null) {
				_success=__handler[_buttonId](_buttonId);
			}
		}
		else {
			alert('not found='+__toolbarId+_buttonId);
		}
		console.log('_success='+_success);
		if(_success) {
			__currentButton=_buttonId;
			_setMode(_buttonId);
		}
		else {
			_setMode(__currentButton);
		}
	}
	this.setMode=_setMode;
	//NamNT Thêm
	this.ButtonClick=_onButtonClick;
	//NamNT nâng cấp hàm SetMode (Set Button Enable)
	this.setButtonsEnable = function(newMode, editMode, cancelMode, saveMode, deleteMode, closeMode) {		
		setButtonDisable('NEW', !newMode);
		setButtonDisable('EDIT', !editMode);
		setButtonDisable('CANCEL',!cancelMode);
		setButtonDisable('SAVE', !saveMode);
		setButtonDisable('DELETE',!deleteMode);
		setButtonDisable('CLOSE',!closeMode);
	}
};
//*****************************************************************************************************
