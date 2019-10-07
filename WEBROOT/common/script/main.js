	function initJsCssCommon(){
		//Add style
			loadJsCssFile("../common/css/jquery-ui-1.8.22.custom.css", "css");
			loadJsCssFile("../common/script/dhtmlxSuite/dhtmlxMenu/codebase/skins/dhtmlxmenu_dhx_black.css", "css");
			loadJsCssFile("../common/script/dhtmlxSuite/dhtmlxGrid/codebase/dhtmlxgrid.css", "css");
			loadJsCssFile("../common/script/dhtmlxSuite/dhtmlxGrid/codebase/skins/dhtmlxgrid_dhx_skyblue.css", "css");
			loadJsCssFile("../common/css/banner.css", "css");
			loadJsCssFile("../common/css/uiForm.css", "css");
			//Add javascript
			loadJsCssFile("../common/script/comConstants.js", "js");
			loadJsCssFile("../common/script/comUtilCss.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-tab.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-button.js", "js");
			/*
			loadJsCssFile("../common/script/bootstrap/bootstrap-transition.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-alert.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-modal.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-dropdown.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-scrollspy.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-tab.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-tooltip.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-popover.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-button.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-collapse.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-carousel.js", "js");
			loadJsCssFile("../common/script/bootstrap/bootstrap-typeahead.js", "js");
			
			loadJsCssFile("../common/script/jqwidgets/jqxcore.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxgrid.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxgrid.selection.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxgrid.columnsresize.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxgrid.filter.js", "js");
			
			loadJsCssFile("../common/script/jqwidgets/jqxgrid.sort.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxgrid.pager.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxgrid.grouping.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxbuttons.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxscrollbar.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxdata.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxlistbox.js", "js");
			loadJsCssFile("../common/script/jqwidgets/jqxdropdownlist.js", "js");
			*/
			loadJsCssFile("../common/script/dhtmlxSuite/dhtmlxGrid/codebase/dhtmlxcommon.js", "js");
			loadJsCssFile("../common/script/dhtmlxSuite/dhtmlxGrid/codebase/dhtmlxgrid.js", "js");
			
			loadJsCssFile("../common/script/dhtmlxSuite/dhtmlxGrid/codebase/dhtmlxgridcell.js", "js");
			loadJsCssFile("../common/script/dhtmlxSuite/dhtmlxGrid/codebase/ext/dhtmlxgrid_filter.js", "js");
			loadJsCssFile("../common/script/dhtmlxSuite/dhtmlxMenu/codebase/dhtmlxcommon.js", "js");
			loadJsCssFile("../common/script/dhtmlxSuite/dhtmlxMenu/codebase/dhtmlxmenu.js", "js");
			loadJsCssFile("../common/script/dhtmlxSuite/dhtmlxMenu/codebase/ext/dhtmlxmenu_ext.js", "js");
			loadJsCssFile("../common/script/JSONCommon.js", "js");
			loadJsCssFile("../common/script/jsonrpc.js", "js");			
	}


	function loadJsCssFile(filename, filetype){
		if (filetype=="js"){ //if filename is a external JavaScript file
			var fileref=document.createElement('script')
			fileref.setAttribute("type","text/javascript")
			fileref.setAttribute("src", filename)
		}
		else if (filetype=="css"){ //if filename is an external CSS file
			var fileref=document.createElement("link")
			fileref.setAttribute("rel", "stylesheet")
			fileref.setAttribute("type", "text/css")
			fileref.setAttribute("href", filename)
		}
		if (typeof fileref!="undefined")
			document.getElementsByTagName("head")[0].appendChild(fileref)
	}
	
	function enterNextFocus(i_array,tab)
	{
		var s_keypress ="";
		//alert(tab);
		if(!tab)
		{
			var focus = "#"+ i_array[0];
			//alert(focus);
			$(focus).focus();		
		}
			
		for(i=0; i<i_array.length;i++)
			{
			//if(i_array[0]=="")
				if(i==0)
				{
					s_keypress = "#"+ i_array[i];
					//$(s_keypress).focus();
				}
				else
					s_keypress += ", #"+ i_array[i];
			}	
		$('table').find(s_keypress).keypress(function(e){		
			var id = $(this).attr('id');		
			var key =  e.keyCode ? e.keyCode : e.which;
			if(key == 13)
			{
				var i = 0;
				for(; i<i_array.length;i++)
				{
					if(i_array[i]==id)
					{
						break;
					}
						
				}
				$("#"+i_array[i+1]).focus();
				return false;
			}
		
		});		
		
	}