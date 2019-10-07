function bootstrapTreeObject(_container) {
	var __container=_container;
	var __prefixLengh=__container.length+6;
	var __handler=[];
	var __treeObj=$('#'+__container);
	var __userData=[];
	console.log('this.__container='+__container);
	console.log('__treeObj='+__treeObj);
	__treeObj.attr('class', 'tree well');
	
	var _attachEvent=function(funcName,func) {
		__handler[funcName]=func;
	}
	var _parse=function(_data){
		console.log('_parse __treeObj='+__treeObj);
		__treeObj.append('<ul><li id="'+__container+'_item_0"><span class="label label-default" ><i class="glyphicon glyphicon-minus-sign"></i>&nbsp;Gốc</span></li></ul>');
		
		for(var i=0;i<_data.length;i++) {
			var obj={};
			obj.id=_data[i][1];
			obj.parent_id=_data[i][0];
			obj.name=_data[i][2];
			obj.data=[];
			for(var j=3;j<_data[i].length;j++) {
				obj.data[j-3]=_data[i][j];
			}
			__userData[obj.id]=obj;
			console.log('obj.i='+i);
			//__treeObj.html("hello");
			
			
			//if(obj.parent_id==0) {
			//	console.log('obj.parent_id='+obj.parent_id);
			//	__treeObj.append('<ul><li id="'+__container+'_item_'+obj.id+'"><span class="label label-default" ><i class="icon-folder-open"></i>'+obj.name+'</span></li></ul>');
			//}
			//else {
				console.log('obj.parent_id='+obj.parent_id+' obj.id='+obj.id+' obj.name='+obj.name);
				var parentItem=__treeObj.find('#'+__container+'_item_'+obj.parent_id);
				console.log('parentItem='+parentItem.attr('id'));
				if(parentItem.length>0) {
					parentUL=parentItem.children('ul');
					console.log('parentUL.length='+parentUL.length);
					if(parentUL.length==0) {
						parentItem.append("<ul></ul>");
						parentItem.find('span > i').removeClass('glyphicon glyphicon-info-sign').addClass('glyphicon glyphicon-minus-sign');
						//parentItem.addClass('icon-plus-sign').removeClass('icon-leaf');
					}
					parentUL=parentItem.children('ul');
					parentUL.append('<li id="'+__container+'_item_'+obj.id+'"><span class="label label-default" ><i class="glyphicon glyphicon-info-sign"></i>&nbsp;'+obj.name+'</span></li>');
				}
			//}
		}
		
		
	}
	var _bind=function (){
		$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
		$('.tree li.parent_li > span > i').off();
	    $('.tree li.parent_li > span > i').on('click', function (e) {
	    	//alert('xxxxx');
	        var children = $(this).parent('span').parent('li.parent_li').find(' > ul > li');
	        if (children.is(":visible")) {
	            children.hide('fast');
	            $(this).parent('span').attr('title', 'Expand this branch').find(' > i').removeClass('glyphicon glyphicon-minus-sign').addClass('glyphicon glyphicon-plus-sign');
	        } else {
	            children.show('fast');
	            $(this).parent('span').attr('title', 'Collapse this branch').find(' > i').removeClass('glyphicon glyphicon-plus-sign').addClass('glyphicon glyphicon-minus-sign');
	        }
	        e.stopPropagation();
	    });
	    //$('.tree li.parent_li > span').on('click', function (e) {
	   // 	alert('xxxxx');
	    //    e.stopPropagation();
	    //});
	    $('.tree li').off();
	    $('.tree li').on('click', function (e) {
	    	//alert('item click '+this.id);
	    	var newId=this.id;
	    	newId=newId.substring(__prefixLengh);
	    	//alert('item click '+newId);
	    	if(__handler['click']!=undefined) {
	    		__handler['click'](newId);
	    	}
	        e.stopPropagation();
	    });
	}
	var _addItem=function(_parent,_id,_name){
		var obj={};
		obj.id=_id;
		obj.parent_id=_parent;
		obj.name=_name;
		var parentItem=__treeObj.find('#'+__container+'_item_'+obj.parent_id);
		console.log('parentItem='+parentItem.attr('id'));
		if(parentItem!=undefined) {
			parentUL=parentItem.find('ul');
			console.log('parentUL.length='+parentUL.length);
			if(parentUL.length==0) {
				parentItem.append("<ul></ul>");
				parentItem.find('span > i').removeClass('glyphicon glyphicon-info-sign').addClass('glyphicon glyphicon-minus-sign');
				//parentItem.addClass('icon-plus-sign').removeClass('icon-leaf');
			}
			parentUL=parentItem.find('ul');
			parentUL.append('<li id="'+__container+'_item_'+obj.id+'"><span class="label label-default" ><i class="glyphicon glyphicon-info-sign"></i>&nbsp;'+obj.name+'</span></li>');
		}
	}
	var _removeItem=function(_id){
		var item=__treeObj.find('#'+__container+'_item_'+_id);
		console.log('item='+item.attr('id'));
		if(item!=undefined) {
			item.remove();
		}
	}
	var _clearAll=function(){
		var item=__treeObj.html('');
	}
	this.setUserData=function(id,value) {
		var obj=__userData[id];
		obj=obj||{};
		obj.userdata=value;
		__userData[id]=obj;
	}
	this.getUserData=function(id) {
		return __userData[id];
	}
	this.clearAll=_clearAll;
	this.removeItem=_removeItem;
	this.addItem=_addItem;
	this.bind=_bind;
	this.parse=_parse;
	this.attachEvent=_attachEvent;
}