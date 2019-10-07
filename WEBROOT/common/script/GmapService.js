var service = new google.maps.DirectionsService();
var sqlGetStation = "SELECT STATION_ID, STATION_CODE, STATION_NAME, STATION_ADDRESS, LATITUDE, LONGITUDE FROM STATIONS WHERE STATUS>0 AND LATITUDE>=[0] AND LONGITUDE>=[1] AND LATITUDE<=[2] AND LONGITUDE<=[3]";
var sqlGetPole = "SELECT POLE_ID, POLE_CODE,POLE_NAME, LATITUDE,LONGITUDE FROM POLES WHERE STATUS>0 AND LATITUDE>=[0] AND LONGITUDE>=[1] AND LATITUDE<=[2] AND LONGITUDE<=[3]";
var sqlGetManhole = "SELECT MANHOLE_ID, MANHOLE_CODE,MANHOLE_NAME, MANHOLE_ADDRESS, LATITUDE, LONGITUDE FROM MANHOLES WHERE STATUS>0 AND LATITUDE>=[0] AND LONGITUDE>=[1] AND LATITUDE<=[2] AND LONGITUDE<=[3]";
var sqlGetCableline = "SELECT a.cableline_id, a.capacity, b.node_id, b.node_type, b.longitude, b.latitude FROM cablelines a, cableline_detail b WHERE a.cableline_id = b.cableline_id AND status = 1 AND EXISTS (SELECT 1 FROM cableline_detail WHERE (TO_NUMBER(latitude) BETWEEN [0] AND [2]) AND (TO_NUMBER(longitude) BETWEEN [1] AND [3]) AND cableline_id = b.cableline_id) ORDER BY a.cableline_id, b.node_index";
var sqlGetJoint = "SELECT JOINT_ID, JOINT_CODE, ADDRESS, LATITUDE,LONGITUDE FROM JOINTS WHERE STATUS>0 AND LATITUDE>=[0] AND LONGITUDE>=[1] AND LATITUDE<=[2] AND LONGITUDE<=[3]";
var sqlGetCableNode = "SELECT NODE_ID, NODE_TYPE,LATITUDE,LONGITUDE FROM CABLELINE_DETAIL WHERE CABLELINE_ID=[0] ORDER BY NODE_INDEX";
var sqlGetCablelineOverNode = "SELECT CABLELINE_ID, NODE_INDEX FROM CABLELINE_DETAIL WHERE NODE_ID = [0] AND NODE_TYPE=[1]";
var sqlInsertCableNode = "INSERT INTO CABLELINE_DETAIL (CABLELINE_ID, NODE_INDEX, NODE_ID, NODE_TYPE, LATITUDE, LONGITUDE) VALUES ([0], [1], [2], [3],'[4]', '[5]')";

var STATTION = 0;
var POLE = 1;
getNodeIndex
var MANHOLE = 2;
var MANTLE = 3;

var mapId = "gmap3";
var _map;

var infoType = [ "StationInfo", "PoleInfo", "ManholeInfo", "JointInfo",
		"CablelineInfo" ];
var listCtl = [ "stations", "poles", "manholes", "joints", "cablelines" ];
var listType = [ "station", "pole", "manhole", "joint", "cableline" ];
var prefix = [ "station_", "pole_", "manhole_", "joint_", "cable_" ]

var menu = new Gmap3Menu($("#" + mapId)), stationMenu = new Gmap3Menu($("#"
		+ mapId)), cableMenu = new Gmap3Menu($("#" + mapId)), routeMenu = new Gmap3Menu(
		$("#" + mapId)), vertexMenu = new Gmap3Menu($("#" + mapId)), currentLatLng, current, current_event, 
current_cable_over, current_line, current_joint_cable, isDrawingLine = false, stations = {};
var stationClusterer = null; 
var lastEvent = null;
poles = {};
manholes = {};
cablelines = {};
joints = {};
cablecolors = {
	"2" : {
		"CAPACITY" : "2",
		"COLOR" : "#7FFFD4",
		"NOTE" : "2FO"
	},
	"4" : {
		"CAPACITY" : "4",
		"COLOR" : "#00FFFF",
		"NOTE" : "4FO"
	},
	"8" : {
		"CAPACITY" : "8",
		"COLOR" : "#00FFFF",
		"NOTE" : "8FO"
	},
	"12" : {
		"CAPACITY" : "12",
		"COLOR" : "#FFD700",
		"NOTE" : "12FO"
	},
	"24" : {
		"CAPACITY" : "24",
		"COLOR" : "#FF8C00",
		"NOTE" : "24FO"
	},
	"48" : {
		"CAPACITY" : "48",
		"COLOR" : "#ADFF2F",
		"NOTE" : "48FO"
	},
	"96" : {
		"CAPACITY" : "96",
		"COLOR" : "#0000CD",
		"NOTE" : "96FO"
	}
};
marker_icon = [ "../common/img/gmap/station24x24.png",
		"../common/img/gmap/pole24x24.png",
		"../common/img/gmap/manhole24x24.png",
		"../common/img/gmap/joint24x24.png",
		"../common/img/gmap/cableline24x24.png" ];
marker_icon_32 = [ "../common/img/gmap/station32x32.png",
		"../common/img/gmap/pole32x32.png",
		"../common/img/gmap/manhole32x32.png",
		"../common/img/gmap/joint32x32.png",
		"../common/img/gmap/cableline32x32.png" ];
marker_icon_48 = [ "../common/img/gmap/station48x48.png",
		"../common/img/gmap/pole48x48.png",
		"../common/img/gmap/manhole48x48.png",
		"../common/img/gmap/joint48x48.png",
		"../common/img/gmap/cableline48x48.png" ];

polyline_opts = {
	editable : false,
	strokeOpacity : 1.0
}

node_icon = {
	path : google.maps.SymbolPath.CIRCLE,
	scale : 4,
	strokeWeight : 1,
	fillColor : '#FFFFFF',
	fillOpacity : 1
};

var infowindow = new google.maps.InfoWindow();

joint_icon = new google.maps.MarkerImage(marker_icon[4], new google.maps.Size(
		24, 24), new google.maps.Point(0, 0), new google.maps.Point(12, 12));

var geocoder = new google.maps.Geocoder();

if (typeof (Number.prototype.toRad) === "undefined") {
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	}
}

function fireIfLastEvent(cb,delay)
{	
    if (lastEvent.getTime() + delay <= new Date().getTime())
    {
        cb();
    }
}
function scheduleDelayedCallback(cb,delay)
{
	if (!delay) delay = 100;
    lastEvent = new Date();
    setTimeout(function() {
    	fireIfLastEvent(cb,delay);
    }, delay);    
}

function findNodeIndex(drop_pt, path_pts) {
	distance = 999999999999999;// Stores the distances of each pt on the path
								// from the marker point
	distance_keys = new Array();// Stores the key of point on the path that
								// corresponds to a distance
	var padded_points = new Array();
	$.each(path_pts, function(key, pt) {
		var current_point = pt;
		var next_point = path_pts[key + 1];

		// Check if we're on the last point
		if (typeof next_point !== 'undefined') {

			// Get a 10th of the difference in latitude
			var lat_incr = (next_point.lat() - current_point.lat()) / 10;

			// Get a 10th of the difference in longitude
			var lng_incr = (next_point.lng() - current_point.lng()) / 10;

			// Add the current point to the new padded_points array
			padded_points.push({
				lat : current_point.lat(),
				lng : current_point.lng()
			});

			// Now add 10 points at lat_incr & lng_incr intervals between
			// current and next points
			// We add this to the new padded_points array
			for (var i = 1; i <= 9; i++) {
				padded_points.push({
					lat : current_point.lat() + (i * lat_incr),
					lng : current_point.lng() + (i * lng_incr)
				});
			}
		}
	});

	// For each point on the path
	$.each(padded_points, function(key, path_pt) {
		// Find the distance in a linear crows-flight line between the marker
		// point and the current path point
		var R = 6371; // km
		var dLat = (path_pt.lat - drop_pt.lat()).toRad();
		var dLon = (path_pt.lng - drop_pt.lng()).toRad();
		var lat1 = drop_pt.lat().toRad();
		var lat2 = path_pt.lat.toRad();

		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2)
				* Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		// Store the distances and the key of the pt that matches that distance
		if (d < distance) {
			distance = d;
		}
		distance_keys[d] = key;

	});
	return (typeof path_pts[distance_keys[distance] + 1] === 'undefined') ? distance_keys[distance]
			: distance_keys[distance] + 1;
}

function saveCableNodes(cable, nodes) {	
	var rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("{?=call LOG_CABLE_NODE(?2L,?3S)}",
			[ cable.id, user_id ].join("$"));
	if (rt > 0) {
		var n=[];
		$.each(nodes, function(i, v) {
			var lat, lng;
			var node_id = 0;
			var type = 0;
			if (v.type != null) {
				node_id = v.id.substr(v.id.indexOf('_') + 1);
				type = v.type;
			}
			n.push({id:node_id,type:type});
			lat = v.getPosition().lat();
			lng = v.getPosition().lng();
			var sql_par = RSUtil.buildParam("", [ cable.id, i, node_id, type,
					lat, lng ]);
			jsonrpc.AjaxJson.execute(sqlInsertCableNode, sql_par);
		})
		cable.nodes=n;
	}
}

function getCableNodes(cable) {
	var cable_id = cable.id;
	var sql_par = RSUtil.buildParam("", [ cable_id ]);
	var rt = jsonrpc.AjaxJson.ajaxExecuteQueryO(sqlGetCableNode, sql_par);
	var data = $.parseJSON(rt);
	var nodes = [];
	//var n=[];
	$.each(data, function(i, v) {
		var latlng = new google.maps.LatLng(v.LATITUDE, v.LONGITUDE);
		if (v.NODE_ID == 0) {
			var mk = addMarker({
				latLng : [ v.LATITUDE, v.LONGITUDE],
				id : guid(),
				options : {
					draggable : true
				}
			}, null);			
			mk.type = null;
			nodes.push(mk);
			//n.push({id:mk.id,type:mk.type});
		} else {
			var mk = $("#" + mapId).gmap3({
				get : {
					id : prefix[v.NODE_TYPE] + v.NODE_ID
				}
			});			
			if (!mk) {				
				mk = addMarker({
					id : prefix[v.NODE_TYPE] + v.NODE_ID,
					latLng : latlng,
					options : {
						draggable : false
					}
				}, v.NODE_TYPE);
				mk.id=v.NODE_ID;
			}			
			nodes.push(mk);
			//n.push({id:mk.id,type:mk.type});
		}
	});
	//cable.nodes = n;
	return nodes;
}

function getNodeIndex(id) {
	for (i = 0; i < current_line.length; i++) {
		var node = current_line[i];
		if (node.id == id) {
			return i;
		}
	}
	return null;
}

function nodeChange(node) {
	if (current_joint_cable) {
		var index = node.idx;
		var path = current_joint_cable.getPath();
		path.setAt(index, node.getPosition());
	} else if (current && current_line) {
		var index = current_line.indexOf(node);
		var path = current.getPath();
		path.setAt(index, node.getPosition());
	}
}

function reDrawCable(cable, cable_id) {
	if (!cable)
		return;
	if (!cable_id) {
		cable_id = cable.id;
	}
	var sql_par = RSUtil.buildParam("", [ cable_id ]);
	var rt = jsonrpc.AjaxJson.ajaxExecuteQueryO(sqlGetCableNode, sql_par);
	var data = $.parseJSON(rt);
	var path = [];
	$.each(data, function(i, v) {
		path.push(new google.maps.LatLng(v.LATITUDE, v.LONGITUDE));
	});
	cable.setPath(path);
}

function reDrawCables(node, nodeDeleted) {	
	var node_id = node.id;
	node_id = node_id.substr(node_id.indexOf('_') + 1);
	var node_type = node.type;
	var latlng = node.getPosition();	
	if (!current_cable_over) {
		var sql_par = RSUtil.buildParam("", [ node_id, node_type ]);
		rt = jsonrpc.AjaxJson.ajaxExecuteQueryO(sqlGetCablelineOverNode,
				sql_par);
		current_cable_over = $.parseJSON(rt);
	}	
	if (current_cable_over && current_cable_over.length > 0) {		
		$.each(current_cable_over, function(idx, v) {			
			var cable = $("#" + mapId).gmap3({
				get : {
					id : "cable_" + v.CABLELINE_ID
				}
			});			
			if (cable) {
				var path = cable.getPath();
				var nodes = cable.nodes;				
				if (nodes && nodes.length > 0) {
					for (i = 0; i < nodes.length; i++) {						
						if (nodes[i].id == node_id
								&& nodes[i].type == node_type) {
							if (nodeDeleted) {
								path.removeAt(i);
								nodes.splice(i, 1);
							} else {
								path.setAt(i, latlng);
							}
							break;
						}
					}
				}

			}
		});
	}

}

function markerClusterer() {
	stationClusterer = new MarkerClusterer(_map, $.map(stations, function(value, index) {
	    return value;
	}), {gridSize:50, maxZoom:15, styles:[{textColor:'white', height:32, width:32, url:'../common/img/gmap/clusterer/s1.png'},{textColor:'white', height:48, width:48, url:'../common/img/gmap/clusterer/s2.png'}]});
}

function getStations(map) {
	if (!map) {
		map = _map;
	}
	var bounds = map.getBounds();
	var ne = bounds.getNorthEast();
	var sw = bounds.getSouthWest();
	var sql_par = RSUtil.buildParam("", [ sw.lat(), sw.lng(), ne.lat(),
			ne.lng() ]);
	jsonrpc.AjaxJson.ajaxExecuteQueryO(sqlGetStation, sql_par, function(rt) {
		var data = $.parseJSON(rt);
		if (data && data.length > 0) {
			var stations_values = [];
			var stations_info = [];
			$.each(data, function(idx, marker) {
				if (!stations[marker.STATION_ID]) {
					stations_values.push({
						latLng : [ marker.LATITUDE, marker.LONGITUDE ],
						id : "station_" + marker.STATION_ID
					});
					stations_info.push({
						code: marker.STATION_CODE,
						name: marker.STATION_NAME,
						address: marker.STATION_ADDRESS
					});
				}
			});
			if (stations_values.length > 0) {
				var _marker = {
					values : stations_values,
					options : {
						draggable : false
					}
				};
				addMarker(_marker, 0);
				$.each(stations_values, function(i, v) {
					var mk = $("#" + mapId).gmap3({
						get : {
							id : v.id
						}
					});
					mk.id = v.id;
					mk.type = 0;
					mk.info=stations_info[i];
					stations[v.id.substr(8)] = mk;
				});
				markerClusterer();
			}					
		}
	});
}

function getPoles(map) {
	if (!map) {
		map = _map;
	}
	var bounds = map.getBounds();
	var ne = bounds.getNorthEast();
	var sw = bounds.getSouthWest();
	var sql_par = RSUtil.buildParam("", [ sw.lat(), sw.lng(), ne.lat(),
			ne.lng() ]);
	jsonrpc.AjaxJson.ajaxExecuteQueryO(sqlGetPole, sql_par, function(rt) {
		var data = $.parseJSON(rt);
		if (data && data.length > 0) {
			var poles_values = [];
			var poles_info = [];
			$.each(data, function(idx, marker) {
				if (!poles[marker.POLE_ID]) {
					poles_values.push({
						latLng : [ marker.LATITUDE, marker.LONGITUDE ],
						id : "pole_" + marker.POLE_ID
					});
					poles_info.push({
						code: marker.POLE_CODE,
						name: marker.POLE_NAME,
						address: marker.ADDRESS
					});
				}
			});
			if (poles_values.length > 0) {
				var _marker = {
					values : poles_values,
					options : {
						draggable : false
					}
				};

				addMarker(_marker, 1);
				$.each(poles_values, function(i, v) {
					var mk = $("#" + mapId).gmap3({
						get : {
							id : v.id
						}
					});
					mk.id = v.id;
					mk.type = 1;
					mk.info=poles_info[i];
					poles[v.id.substr(5)] = mk;
				});
			}
		}
	});
}

function getManholes(map) {
	if (!map) {
		map = _map;
	}
	var bounds = map.getBounds();
	var ne = bounds.getNorthEast();
	var sw = bounds.getSouthWest();
	var sql_par = RSUtil.buildParam("", [ sw.lat(), sw.lng(), ne.lat(),
			ne.lng() ]);
	jsonrpc.AjaxJson.ajaxExecuteQueryO(sqlGetManhole, sql_par, function(rt) {
		var data = $.parseJSON(rt);
		if (data && data.length > 0) {
			var manholes_values = [];
			var manholes_info = [];
			$.each(data, function(idx, marker) {
				if (!manholes[marker.MANHOLE_ID]) {
					manholes_values.push({
						latLng : [ marker.LATITUDE, marker.LONGITUDE ],
						id : "manhole_" + marker.MANHOLE_ID
					});
					manholes_info.push({
						code: marker.MANHOLE_CODE,
						name: marker.MANHOLE_NAME,
						address: marker.MANHOLE_ADDRESS
					});
				}
			});
			if (manholes_values.length > 0) {
				var _marker = {
					values : manholes_values,
					options : {
						draggable : false
					}
				};

				addMarker(_marker, 2);
				$.each(manholes_values, function(i, v) {
					var mk = $("#" + mapId).gmap3({
						get : {
							id : v.id
						}
					});
					mk.id = v.id;
					mk.type = 2;
					mk.info=manholes_info[i];
					manholes[v.id.substr(8)] = mk;

				});
			}
		}
	});
}

function getCablelines(map) {
	if (!map) {
		map = _map;
	}
	var bounds = map.getBounds();
	var ne = bounds.getNorthEast();
	var sw = bounds.getSouthWest();
	var sql_par = RSUtil.buildParam("", [ sw.lat(), sw.lng(), ne.lat(),
			ne.lng() ]);
	// jsonrpc.AjaxJson.ajaxCALL_SP_O("{?=CALL
	// GET_CABLELINES_IN_ZONE(?2S,?3S,?4S,?5S)}",[sw.lat(),sw.lng(),ne.lat(),ne.lng()].join("$"),
	// [],function(rt) {
	jsonrpc.AjaxJson.ajaxExecuteQueryO(sqlGetCableline, sql_par, function(rt) {
		var data = $.parseJSON(rt);
		if (data && data.length > 0) {
			var cableline_id = 0;
			var capacity = 0;
			var path = [];
			var nodes = [];
			for (i = 0; i < data.length; i++) {
				var v = data[i];
				if (!cablelines[v.CABLELINE_ID]) {
					if (v.CABLELINE_ID != cableline_id) {
						if (cableline_id != 0) {
							var cable = createCable(capacity, cableline_id,
									path);
							cable.nodes = nodes;
							cablelines[cable.id] = cable;
							cableline_id = v.CABLELINE_ID;
							capacity = v.CAPACITY;
							path = [];
							nodes = [];
						} else {
							cableline_id = v.CABLELINE_ID;
							capacity = v.CAPACITY;
						}
					}
					path.push(new google.maps.LatLng(v.LATITUDE, v.LONGITUDE));
					nodes.push({
						id : v.NODE_ID,
						type : v.NODE_TYPE
					});

				}
			}
			;
			if (cableline_id != 0 && !cablelines[cableline_id]) {
				var cable = createCable(capacity, cableline_id, path);
				cable.id = cableline_id;
				cable.nodes = nodes;
				cablelines[cable.id] = cable;
			}

		}
	});
}

function getJoints(map) {
	if (!map) {
		map = _map;
	}
	var bounds = map.getBounds();
	var ne = bounds.getNorthEast();
	var sw = bounds.getSouthWest();
	var sql_par = RSUtil.buildParam("", [ sw.lat(), sw.lng(), ne.lat(),
			ne.lng() ]);
	jsonrpc.AjaxJson.ajaxExecuteQueryO(sqlGetJoint, sql_par, function(rt) {
		var data = $.parseJSON(rt);
		if (data && data.length > 0) {
			var joints_values = [];
			var joints_info = [];
			$.each(data, function(idx, marker) {
				if (!joints[marker.JOINT_ID]) {
					joints_values.push({
						latLng : [ marker.LATITUDE, marker.LONGITUDE ],
						id : "joint_" + marker.JOINT_ID
					});
					joints_info.push({
						code: marker.JOINT_CODE,						
						address: marker.ADDRESS
					});
				}
			});
			if (joints_values.length > 0) {
				var _marker = {
					values : joints_values,
					options : {
						draggable : false
					}
				};

				addMarker(_marker, 3);
				$.each(joints_values, function(i, v) {
					var mk = $("#" + mapId).gmap3({
						get : {
							id : v.id
						}
					});
					mk.id = v.id;
					mk.type = 3;
					mk.info = joints_info[i];
					joints[v.id.substr(6)] = mk;
				});
			}
		}
	});
}

function getDistanceByAPI(path) {
	var distance = google.maps.geometry.spherical.computeLength(path);
	// console.log("Độ dài: ", distance);
	return distance;
}

var rad = function(x) {
	return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(p2.lat() - p1.lat());
	var dLong = rad(p2.lng() - p1.lng());
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat()))
			* Math.cos(rad(p2.lat())) * Math.sin(dLong / 2)
			* Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d; // returns the distance in meter
};

function getPathDistance(arr_path) {
	if (arr_path.length < 2)
		return;
	var distance = 0;
	for (i = 0; i < arr_path.length - 1; i++) {
		distance += getDistance(arr_path[i], arr_path[i + 1]);
	}
	// console.log(distance);
	return distance;
};

function getRoute(from, to, cb) {
	var request = {
		origin : from,
		destination : to,
		travelMode : google.maps.DirectionsTravelMode.TRANSIT
	};
	service.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			cb(result.routes[0].overview_path);
		} else {
			cb(null);
		}
	});
}

function createCable(capacity, cable_id, path) {
	var _polyline = {
		id : 'cable_' + cable_id,
		options : polyline_opts
	};
	var color = '#FF0000';
	if (cablecolors[capacity]) {
		color = cablecolors[capacity].COLOR;
	}
	if ($.isArray(path)) {
		_polyline.options.path = path;
	}	
	_polyline.options.strokeColor = color;
	_polyline.options.strokeWeight = 2;
	_polyline.events = {
		rightclick : function(polyline, event, context) {
			if (event.vertex == undefined) {
				if (!current) {
					current_event = event;
					routeMenu.open(event, null, polyline);
				}
			} else {
				vertexMenu.open(event, null, {
					path : polyline.getPath(),
					vertex : event.vertex
				});
			}

		},
		/*dblclick : function(polyline, event, context) {
			home.editCable(polyline);
		},*/
		mouseover : function(polyline, event, context) {			
			if (polyline != current) {				
				polyline.setOptions({
					strokeWeight : 5
				});
			}
		},
		mouseout : function(polyline, event, context) {
			polyline.setOptions({
				strokeWeight : 2
			});
		}
	};
	$("#" + mapId).gmap3({
		polyline : _polyline
	});
	var cable = $("#" + mapId).gmap3({
		get : {
			id : _polyline.id
		}
	});
	cable.capacity = capacity;
	cable.type=4;
	cable.id = cable_id;
	if (!$.isArray(path)) {
		cable.setPath(path);
	}
	return cable;
}

function showPolylineDistance(polyline) {
	google.maps.event.addListener(polyline, "dragend", function() {
		getPathDistance(polyline.getPath().getArray());
	});
	google.maps.event.addListener(polyline.getPath(), "insert_at", function() {
		getPathDistance(polyline.getPath().getArray());
	});
	google.maps.event.addListener(polyline.getPath(), "remove_at", function() {
		getPathDistance(polyline.getPath().getArray());
	});
	google.maps.event.addListener(polyline.getPath(), "set_at", function() {
		getPathDistance(polyline.getPath().getArray());
	});
}

function replaceMarker(marker,marker_id) {
	marker.setMap(null);
	mk= addMarker({
		latLng: marker.getPosition(),
		id:marker_id,
		options : {
			draggable : true
		}
	}, marker.type);
	mk.id = marker_id;
	if (marker.idx) mk.idx=marker.idx;	
	return mk;
}


function addMarker(_marker, type) {
	var __marker = {};
	var marker_id;
	if (_marker) {
		marker_id = _marker.id;
		__marker = _marker;
	} else {
		marker_id = guid();
		__marker = {
			latLng : current_event.latLng,
			id : marker_id,
			options : {
				crossOnDrag: false,
				draggable : true
			}
		};
	}
	;
	var _icon;
	if (type != null) {
		var pos = 12;
		if (type == 0)
			pos = 24;
		else if (type == 1)
			pos = 6;
		var _icon = new google.maps.MarkerImage(marker_icon[type],
				new google.maps.Size(24, 24), new google.maps.Point(0, 0),
				new google.maps.Point(12, pos));
	} else {
		_icon = node_icon;
	}

	__marker.options.icon = _icon;
	__marker.events = {
		click : function(marker, event, context) {
			if (current && isDrawingLine) {
				var path = current.getPath();
				// path.push(marker.getPosition());
				path.setAt(path.getLength() - 1, marker.getPosition());
				current_line.push(marker);
				current.nodes.push({id:marker.id,type:marker.type});
				home.bindCableGrid();
				if (type == 0 || type == 3) {
					home.endDrawingCable(true);
				}
			}
		},
		mouseover : function(marker) {			
			if (marker.info) {
				var info = '';
				if (marker.info.code) {
					info = String.format('<b>Mã</b>: {0}</br>',marker.info.code);
				}
				if (marker.info.name) {
					info += String.format('<b>Tên</b>: {0}</br>',marker.info.name);
				}
				if (marker.info.code) {
					info += String.format('<b>Địa chỉ</b>: {0}',marker.info.address);
				}
				infowindow.setContent(info);
				infowindow.open(_map, marker);
			}
			
		},
		mouseout : function() {
			infowindow.close();
		},
		mousemove : function(map, event) {
			if (current && isDrawingLine) {
				var path = current.getPath();
				if (path.getLength() == current_line.length) {
					path.push(event.latLng);
				} else {
					path.setAt(path.getLength() - 1, event.latLng);
				}
			}
			return true;
		},
		rightclick : function(marker, event, context) {
			current_event = event;
			if (current_line && typeof current_line == 'object') {
				var nodeIdx = current_line.indexOf(marker);// getNodeIndex(context.id);
				if (nodeIdx > 0) {					
					if (marker.type != null) {
						cableMenu.open(event, {"pickCable":{"cl":"hide"}}, {
							nodeType : type,
							idx : nodeIdx
						});
					} else {
						vertexMenu.open(event, {"addVertex":{"cl":"hide"}}, nodeIdx);
					}

				}
				else if (nodeIdx<0 && marker.type!=0 && marker.type!=3) {
					cableMenu.open(event,{"removeCable":{"cl":"hide"}},marker);
				}
			} else if (type == 0) {
				stationMenu.open(event, null, {
					station : marker,
					station_id : context.id
				});
			}
		},
		dblclick : function(marker, event, context) {
			if (current && currentLatLng) {
				current.setPosition(currentLatLng);
				reDrawCables(current);
				current.setDraggable(false);
			}
			home.editInfo(marker, context.id, infoType[type]);
		},
		drag : function(marker, event) {
			if (marker.type != null) {
				if (marker.id)
					reDrawCables(marker);
				else
					nodeChange(marker);
				$("#txtLATITUDE").val(event.latLng.lat());
				$("#txtLONGITUDE").val(event.latLng.lng());
			} else {
				nodeChange(marker);
			}

		},
		dragstart : function() {
			draging = true;
		},
		dragend : function(marker, event, context) {
			draging = false;
			if (current && current_line) {
				home.bindCableGrid();
			}				
		}
	};
	$("#" + mapId).gmap3({
		marker : __marker
	});
	var mk = $("#" + mapId).gmap3({
		get : {
			id : marker_id
		}
	});
	if (mk) {
		mk.type = type;		
		return mk;
	}
};
