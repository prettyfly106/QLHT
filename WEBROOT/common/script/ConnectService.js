var dragging;
var instant = jsPlumb.getInstance({
		Container:"connectInfo",
		Connector:["StateMachine",{ curviness:20 }],			
		Anchors:["Right", "Left"],
		Endpoints : [[ "Dot", { radius:1 } ], [ "Dot", { radius:1 } ]],
		EndpointStyle : {
			fill:"transparent"
		},
		PaintStyle:{stroke:"#000", strokeWidth:2}			
	} );	
	
	/* var common = {
			Container:"connectInfo",
			Connector:["StateMachine",{ curviness:20 }],			
			Anchors:["Right", "Left"],
			Endpoints:["Dot", {radius:1}],
			EndpointStyle : {
				fillStyle:"transparent"
			},
			PaintStyle:{strokeStyle:"#000", lineWidth:2}			
		};
	*/
		
	//instant.importDefaults({Endpoints : [ [ "Dot", { radius:7 } ], [ "Dot", { radius:11 } ] ]}); 
 
	function CreateEndPoint(id, type) {
		var endpoint;
		if (type == 'left') {
			endpoint=$.extend(true, {
				uuid : id
			}, leftEndpoint);
		} else {
			endpoint=$.extend(true, {
				uuid : id
			}, rightEndpoint);
		}		
		jsPlumb.getInstance().addEndpoint(id, null, endpoint);
	}
	
	function disConnect(_source,_target, repaint) {
		var connector;		
		if (_source && typeof _source == 'object') {
			connector = _source;
		}
		else {
			console.log(_target);
			var opt = {};
			if (_source) {
				opt = {source:_source}
			}
			else {
				opt = {target:_target}
			}			
			connector = instant.getConnections(opt)[0];			
		}				
    	if (connector) {		    	
	    	$_source = $('#' + connector.sourceId);
	    	$_target = $('#' + connector.targetId);
	    	$_source.removeClass("end-point").addClass("circle");
	    	$_target.removeClass("end-point").addClass("circle");	    		    	
	    	insertByIndex($_source,$source_list);	    	
	    	insertByIndex($_target,$target_list);	    	
	    	instant.deleteEndpoint(connector.endpoints[0]);		    	
	    	if (repaint) repaintConnector();
    	}
	}
	
	function connect(_source,_target, repaint) {
		if (instant.getConnections({source:_source,target:_target})[0]) return;
		$source = $source_list.find('#'+_source);
		$target = $target_list.find('#'+_target);
		if ($source.length>0 && $target.length>0) {
			$source.removeClass("circle").addClass("end-point");
			$target.removeClass("circle").addClass("end-point");
			var insert_idx = insertByIndex($source,$_source_list);
			$target.insertAt($_target_list,insert_idx);
		    //$_source_list.append($source);
		    //$_target_list.append($target);	    
		    if ($source.offset().top+20-$connector_list.offset().top>$connector_list.outerHeight()) {
		    	$connector_list.scrollTop($source_list.scrollTop()+25);
		    	
	    	}		  
			
		    var conn = {
			    	source:_source,
			    	target:_target
			    	};	    
		    var _connector = instant.connect(conn);	    
		    connector_list.push(conn);
		    if (repaint) repaintConnector();	
		}
	}
	
	function repaintConnector() {		
	    var listOffset = $_source_list.offset().top;
	    var listOuterHeight = $_source_list.outerHeight();
	    $.each(instant.getAllConnections(),function(i,connector) {	    		    	
	    	$source = $('#' + connector.sourceId);	    	
	    	var offset = $source.offset().top;	    	
	    	if (offset>listOffset && offset+20<listOffset + listOuterHeight) {	    		
	    		connector.setVisible(true);
	    		instant.repaint(connector);
	    	}
	    	else{
	    		connector.setVisible(false);
	    		
	    	}
	    });	    
	    instant.repaintEverything();
	}
	
	function allowGetSourceBack(ev) {		
		if (dragging.hasClass("end-point") && dragging.attr("type")=="source") {
			ev.preventDefault();
		}
	}
	
	function allowGetTargetBack(ev) {		
		if (dragging.hasClass("end-point") && dragging.attr("type")=="target") {
			ev.preventDefault();
		}
	}
	
	function getSourceBack(ev) {
		ev.preventDefault();
	    var _source = ev.dataTransfer.getData("drag_id");
	    if (!_source || _source == 'undefined') return;	    
	    var $source = $('#' + _source);
	    if ($source.hasClass("end-point") && $source.attr("type")=="source") {
	    	disConnect(_source,null,true);
	    	
	    }
	}
	
	function getTargetBack(ev) {
		var _target = ev.dataTransfer.getData("drag_id");
	    var $target = $('#' + _target);
	    if ($target.hasClass("end-point") && $target.attr("type")=="target") {
	    	disConnect(null,_target,true);
	    	
	    }
	}
	
	function allowDropSource(ev) {
		var source = $(ev.target);
		if (source==dragging) return;
		if (!source.hasClass("end-point") && dragging.hasClass("circle") && dragging.attr("type")=="target" || dragging.hasClass("end-point") && dragging.attr("type")=="source") {
			ev.preventDefault();
		}	
	}
	
	function allowDropTarget(ev) {		
		var target=$(ev.target);
		if (target==dragging) return;
		if (!target.hasClass("end-point") && dragging.hasClass("circle") && dragging.attr("type")=="source" || dragging.hasClass("end-point") && dragging.attr("type")=="target") {
	    	ev.preventDefault();
		}
	}

	function drag(ev) {
		dragging = $(ev.target);
	    ev.dataTransfer.setData("drag_id", ev.target.id);
	}

	
	function targetConnect(ev) {
		ev.preventDefault();		
	    var _source = ev.dataTransfer.getData("drag_id");
	    var _target =  ev.target.id;	    
	    if (!_source || _source == 'undefined') return;
	    var $source = $('#' + _source);
	    var $target = $(ev.target);
	    if ($source.hasClass("end-point") && $source.attr("type")=="target") {
	    	disConnect(_source,null,true);
	    	
	    }
	    else if ($source.hasClass("circle")){
	    	connect(_source,_target,true);		    
		    
	    }
	}
	
	function sourceConnect(ev) {
		ev.preventDefault();		
	    var _source = ev.target.id;
	    var _target = ev.dataTransfer.getData("drag_id");
	    if (!_target || _target == 'undefined') return;
	    var $source = $(ev.target);
	    var $target = $('#' + _target);
	    if ($target.hasClass("end-point") && $target.attr("type")=="source") {
	    	disConnect(_source,null,true);
	    }
	    else if ($target.hasClass("circle")){
	    	connect(_source,_target,true);
	    }
	    
	}
	
	function insertByIndex($elm, $container, idx) {
		if (!idx) {
			idx = $elm.attr("index");	
		}
		var found_elm = null;
		var found_idx = -1;
		$container.children().each(function(i,e) {			
			var element_index = parseInt($(e).attr("index"));			
			if (element_index>idx) {				
				$elm.insertBefore(e);
				found_idx = i;
				return false;
			}
		});
    	if (found_idx<0) {
    		found_idx = $container.children().length;
    		$container.append($elm);
    	}	    		
    	return found_idx;
	}
	
	function findIndex($container, idx) {		
		var found_elm = null;		
		$container.children().each(function(i,e) {			
			var element_index = parseInt($(e).attr("index"));			
			if (element_index>idx) {
				found_elm=e;
				return false;
			}
		});
		return found_elm;
	};
	