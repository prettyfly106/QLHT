function CSideBar(_menuId) {
	var that=this;	
	this.menuId=_menuId;	
	this.buildMenu=function (menu_ar,options) {
		var _html=buildMenu(menu_ar,1,options);
		$('#'+that.menuId).html(_html);
		var fullUrl      = window.location.href;
		var portalUrl = fullUrl.substring(fullUrl.indexOf("/hPortal"), fullUrl.length);
		var $obj = $('a[href$="'+portalUrl+'"]').parent();
		$obj.addClass("current-page");
		var $ulTag = $obj.parent();
		$ulTag.removeAttr("style");
		var $liTag = $ulTag.parent();
		$liTag.addClass("active");
	}
	this.loadMenu=function(_userType,lang) {
		var _lang = "";
		if (lang && lang != "") {
			_lang= "_" + lang;
		}
		var _url="/hPortal/common/script/menu/sb_"+_userType+_lang+".js";
		$.getJSON(_url, function(json) {
		    var _html=buildMenu(json,1);
		    //console.log(that.menuId,_html);
		    $('#'+that.menuId).html(_html);
		    console.log($('#'+that.menuId));
		    /**/
		    var fullUrl      = window.location.href;
			var portalUrl = fullUrl.substring(fullUrl.indexOf("/hPortal"), fullUrl.length);
			var $obj = $('a[href$="'+portalUrl+'"]').parent();
			$obj.addClass("current-page");
			var $ulTag = $obj.parent();
			$ulTag.removeAttr("style");
			var $liTag = $ulTag.parent();
			$liTag.addClass("active");
			
		});
		
	}
	
	function buildMenu(menu_ar,menuType,options) {
		var className='sb-nav side_menu';
		var _html='';
		var _icon,_text,_hlink;
		_icon = "icon";
		_text = "text";
		_hlink = "hlink";
		var _second_level = "";				
		if (menuType == 2) {
			_second_level = 'nav-second-level collapse';
		}
		if(options!=undefined) {
			_icon = options.icon || "icon";
			_text = options.text || "text";
			_hlink = options.hlink || "hlink";
		}
		/*_html += '<ul class="nav '+_second_level+' in" aria-expanded="true">';		
		for(var i1=0;i1<menu_ar.length;i1++) {
			var item=menu_ar[i1];			
			if(item.children!=undefined && item.children.length>0) {
				_html+='<li id="'+item.id+'"><a class="dropdown" href="'+item[_hlink]+'" style="color:white;"><i class="'+item[_icon]+'"></i> '+item[_text]+' <b class="caret"></b></a>';
				_html+=buildMenu(item.children,2,options);
			}
			else {
				_html+='<li id="'+item.id+'"><a href="'+item[_hlink]+'"  style="color:white;"><i class="'+item[_icon]+'"></i> '+item[_text]+'</a>';
			}
			_html+='</li>';
		}
		_html += '</ul>';*/
		_html += '<ul class="collapsible" data-collapsible="accordion" style="margin:0 !important; border:none !important;">';		
		for(var i1=0;i1<menu_ar.length;i1++) {			
			var active = (menuType == 1 && i1==0) ? "active" : "";
			var item=menu_ar[i1];			
			if(item.children!=undefined && item.children.length>0) {
				_html+='<li class="'+active+'" id="'+item.id+'"><div class="collapsible-header '+active+'" style="background: linear-gradient(#3C89D2, #1966AD), #428bca;"><a href="'+item[_hlink]+'" style="color:white;"><i class="'+item[_icon]+'"></i> '+item[_text]+' <b class="caret"></b></a></div>';
				_html+='<div class="collapsible-body" >' +  buildMenu(item.children,2,options) + '</div>';
			}
			else {
				_html+='<li id="'+item.id+'"><div class="collapsible-header" style="background: #428bca !important;"><a href="'+item[_hlink]+'"  style="color:white;"><i class="'+item[_icon]+'"></i> '+item[_text]+'</a></div>';
			}
			_html+='</li>';
		}
		_html += '</ul>';
		/*var _icon,_text,_hlink;
		_icon = "icon";
		_text = "text";
		_hlink = "hlink";
		if(options!=undefined) {
			_icon = options.icon || "icon";
			_text = options.text || "text";
			_hlink = options.hlink || "hlink";
		}
		console.log('_icon='+_icon+' _text='+_text+' _hlink='+_hlink);
		//var menu_ar=[];
		var classActive= "";
		//var _id = "";
		//menu_ar=[{"id":"1","icon":"icon-cog","text":"Hệ thống","hlink":"","options":"0,0","children":[]}];
		var className='sb-nav side_menu';
		var _html='';
		_html='<ul class="'+className+'">';
		if(menuType==2) {
			className="sb-nav child_menu";
			_html='<ul class="sb-nav child_menu" style="display: none;">';
		}
		//var _active="active";
		for(var i1=0;i1<menu_ar.length;i1++) {
			var item=menu_ar[i1];
			if(item.children!=undefined && item.children.length>0) {
				_html+='<li><a><i class="'+item[_icon]+'"></i> '+item[_text]+' <span class="fa fa-chevron-down"></span></a>';
				//_active="";
				_html+=buildMenu(item.children,2,options);
			}
			else {
				_html+='<li><a href="'+item[_hlink]+'"><i class="'+item[_icon]+'"></i> '+item[_text]+'</a></li>';
			}
			_html+='</li>';
		}
		_html+='</ul>';*/		
		return _html;
		
	}
	
	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};
	
}
