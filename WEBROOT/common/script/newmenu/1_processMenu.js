
function processMenu(_itemId){ 
	//alert("processMenu="+_itemId);
	var _hlink = menuObject .getUserData(_itemId,'hlink'); 
	var _options = menuObject .getUserData(_itemId,'options'); 
	var _opt_ar=_options.split(':'); 
	var _opts=''; 
	if(_opt_ar[0]=='1') { 
		_opts='fullscreen=yes'; 
	} 
	if(_opt_ar[1]=='1') { 
		window.open(_hlink,'',_opts); 
	} 
	else { 
		window.location=_hlink; 
	} 
} 