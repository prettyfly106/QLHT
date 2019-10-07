function main () {
	var isShow;
	that = this;
    $('.icon_menu').click( function () {    	
    	$menu = $('#menuObj');    	
    	if (that.isShow) {    		
    		that.isShow = false;
    		$menu.animateCss("fadeOutRight");
    		$menu.css("display","none");
/*    		setTimeout(function() {    			
    			  			
    	    }, 500);*/
    	}
    	else {    		
    		$menu.css("display","block").removeClass("animate fadeOutRight");
    		$menu.animateCss("fadeInRight");
    		that.isShow = true;
    		return;
    	}
    });   
	$(window).resize(function() {
		var windowsize = $(window).width();
        if (windowsize >= 992) {
        	$('#menuObj').css("display","block");
        }
        else {
        	$('#menuObj').css("display","none");
        	that.isShow = false;
        }
	});
	var lang_title = "English";
	if (lang == "en") {
		lang_title = "Tiếng việt";		
	}
	$("#language-changer").attr("title",lang_title);
// $('body').click( function () {
	//  $('.menu_web').animate({right: '-180px'}, 200);
// });
}
function changeLanguage(currentLanguage) {	
	var freshUrl = removeURLParameter(window.location.href, ["lang"]);
	if (freshUrl.endsWith("#")) {
		freshUrl = freshUrl.substring(0,freshUrl.length-1);
	}
	if (currentLanguage == '') {		
		window.location.href = freshUrl + "&lang=en";
	}
	else {		
		window.location.href = freshUrl + "&lang=vn";
	}
}
$(document).ready(main);
function CMenuMgr(_menuId) {
	var that=this;
	this.menuId=_menuId;
	this.loadMenu=function(_url) {
		//console.log('loadMenu='+_url);
		/*
		var fileref=document.createElement('script')
		fileref.setAttribute("type","text/javascript")
		fileref.setAttribute("src", _url);
		if (typeof fileref!="undefined") {
			document.getElementsByTagName("head")[0].appendChild(fileref);
			console.log('loadMenu found='+_url);
		}
		*/
		$.getJSON(_url, function(json) {
		    //console.log('getJSON'+_url+"="+JSON.stringify(json)); // this will show the info it in firebug console
			
		    var _html=buildMenu(json,1);	
		    //console.log('_html='+_html); 
		    waitUntil(function(){
		        return $('#menuObj').length > 0;
		    }, function(){
		    	$('#menuObj').html(_html);
		    	console.log('#menuObj=loaded');
		    }, function(){
		        console.log("#menuObj not exit");
		    },10,1000);
		    //console.log('#menuObj='+$('#menuObj').html()); 
		});
	}
	function waitUntil(isready, success, error, count, interval){
		console.log('waitUntil count='+count); 
	    if (count === undefined) {
	        count = 300;
	    }
	    if (interval === undefined) {
	        interval = 20;
	    }
	    if (isready()) {
	        success();
	        return;
	    }
	    // The call back isn't ready. We need to wait for it
	    setTimeout(function(){
	        if (!count) {
	            // We have run out of retries
	            if (error !== undefined) {
	                error();
	            }
	        } else {
	            // Try again
	            waitUntil(isready, success, error, count -1, interval);
	        }
	    }, interval);
	}
	function buildMenu(menu_ar,menuType) {
		var _html='';
		//var menu_ar=[];
		//menu_ar=[{"id":"1","icon":"icon-cog","text":"Hệ thống","hlink":"","options":"0,0","children":[]}];
		/*var className='nav navbar-nav navbar-right';
		var liClassName = 'dropdown';
		if(menuType>=2) {
			className="dropdown-menu ";
			liClassName += 'dropdown-submenu';
		}
		_html+='<ul class="'+className+'">';
		var _target='';
		for(var i1=0;i1<menu_ar.length;i1++) {
			var item=menu_ar[i1];
			if(item.options=='1') {
				_target=' target="_blank"';
			}
			if(item.children!=undefined && item.children.length>0) {
				_html+='<li class="'+ liClassName +'" id="'+item.id+'"><a href="'+item.hlink+'" '+_target+' class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="'+item.icon+'"></i> '+item.text+' <b class="caret"></b></a>';
				_html+=buildMenu(item.children,2);
			}
			else {
				_html+='<li id="'+item.id+'"><a href="'+item.hlink+'" '+_target+'><i class="'+item.icon+'"></i> '+item.text+'</a>';
			}
			_html+='</li>';
		}
		_html+='</ul>';*/		
		_html += '<ul style="list-style-type: none;">';
		var _target='';
		for(var i1=0;i1<menu_ar.length;i1++) {
			var item=menu_ar[i1];
			if(item.options=='1') {
				_target=' target="_blank"';
			}
			if(item.children!=undefined && item.children.length>0) {
				_html+='<li id="'+item.id+'"><a href="'+item.hlink+'" '+_target+'"><i class="'+item.icon+'"></i> '+item.text+' <b class="caret"></b></a>';
				_html+=buildMenu(item.children,2);
			}
			else {
				_html+='<li id="'+item.id+'"><a href="'+item.hlink+'" '+_target+'><i class="'+item.icon+'"></i> '+item.text+'</a>';
			}
			_html+='</li>';
		}
		_html += '</ul>';
		return _html;
		
	}
}
