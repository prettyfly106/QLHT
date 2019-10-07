/**
 * class Gmap3Menu
 * display a menu on google maps 
 *  
 * dependencies:
 * gmap3 5.x
 * jquery 1.3+ 
 *
 **/
function Gmap3Menu($div){
  var that = this,
    items = {},
    ts = null,
    namespace = "gmap3-menu";
     
  // create an item using a new closure
  function create(item, params){	  
    var $item = $("<div class='item "+item.cl+"'>"+item.label+"</div>");
    $item
      // bind click on item
      .click(function(){
        if (typeof item.fnc === "function"){
          item.fnc.apply($(this), [params]);
        }
      })
      // manage mouse over coloration
      .hover(
        function(){$(this).addClass("hover");},
        function(){$(this).removeClass("hover");}
      );
    return $item;
  };
   
  function clearTs(){
    if (ts){
      clearTimeout(ts);
      ts = null;
    }
  };
   
  function initTs(t){
    ts = setTimeout(function(){that.close()}, t);
  };
   
  this.add = function(id,label, cl, fnc){	  
	if (!items[id]) {
		items[id] = {			    
			      label:label,
			      fnc:fnc,
			      cl:cl
			    };
	}    
  }
  
  this.edit = function(id,label,cl,fnc) {
	  items[id] = {			    
		      label:label,
		      fnc:fnc,
		      cl:cl
		    };
  }
 
  // close previous and open a new menu 
  this.open = function(event, edited_items, params){
    this.close();
    var offset = {x:0, y:0},
      $menu = $("<div id='"+namespace+"'></div>");       
    // add items in menu    
    var current_item = items;
    if (edited_items) current_item =  $.extend(true,{}, current_item, edited_items);    
    $.each(current_item, function(id, item){    	
      $menu.append(create(item,params));
    });
     
    // manage auto-close menu on mouse hover / out
    $menu.hover(
      function(){clearTs();},
      function(){initTs(3000);}
    );
     
    // change the offset to get the menu visible (#menu width & height must be defined in CSS to use this simple code)
    if (!event.pixel) {
    	var map = $div.gmap3("get");
    	event.pixel = map.getProjection().fromLatLngToPoint(event.latLng);
    }
    if ( event.pixel.y + $menu.height() > $div.height()){
      offset.y = -$menu.height();
    }
    if ( event.pixel.x + $menu.width() > $div.width()){
      offset.x = -$menu.width();
    }
     
    // use menu as overlay
    $div.gmap3({
      overlay:{
        latLng: event.latLng,
        options:{
          content: $menu,
          offset: offset
        },
        tag: namespace
      }
    });
     
    // start auto-close
    initTs(5000);
  }
   
  // close the menu
  this.close = function(){
    clearTs();
    $div.gmap3({clear:{name:"overlay", tag:namespace}});
  }
}