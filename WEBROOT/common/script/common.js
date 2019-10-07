var templateModel = "<div class='modal fade' role='dialog'>" +
			"<div class='modal-dialog'>" +
			"    <div class='modal-content'>" +
			"	      <div class='modal-header'>" +
			"	        <button type='button' class='close' data-dismiss='modal'>&times;</button>" +
			"	        <h4 class='modal-title'>Modal Header</h4>" +
			"	      </div>" +
			"	      <div class='modal-body'>" +
			"	      </div>" +
			"	      <div class='modal-footer'>" +
			"	        <button type='button' class='btn btn-default' data-dismiss='modal'>Đóng</button>" +
			"	      </div>" +
			"	  </div>" +
			"</div>" +
			"</div>";

function closeModal(modalId) {
	$('#'+modalId).modal('toggle');
}


function guid() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + s4() + s4() +  s4() + s4() + s4() + s4();
	}


/*String.format = function() {
    
    var theString = arguments[0];
   
    for (var i = 1; i < arguments.length; i++) {      
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }    
    return theString;
}*/

function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
	if (url.endsWith("#")) {
		url = url.substring(0,url.length-1);
	}
    var urlparts= url.split('?');   
    if (urlparts.length>=2) {
    	var pars= urlparts[1].split(/[&;]/g);
    	for (i=0; i<parameter.length; i ++) {
	        var prefix= encodeURIComponent(parameter[i])+'=';
	        
	
	        //reverse iteration as may be destructive
	        for (var j= pars.length; j-- > 0;) {    
	            //idiom for string.startsWith
	            if (pars[j].lastIndexOf(prefix, 0) !== -1) {  
	                pars.splice(j, 1);
	            }
	        }
    	}
        url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
    } else {
        return url;
    }
}


function loadOptions(combo,opts)
{
	//opts=@1@text1@$2@text2@$3@text3@
	if(opts!=null && opts.length>2) {
		opts=opts.substring(1,opts.length-1);
		var arr_opt = opts.split("@");
		combo.length=Math.floor(arr_opt.length/2); 
		var count = 0;
		for (var i = 0; i < arr_opt.length; i=i+2)
		{
			combo.options[count] = new Option();
			if(arr_opt[i].length>1) {
				var selected=arr_opt[i].substring(0,1);
				if(selected=="$") {
					//combo.selectedIndex=count;
					combo.options[count].selected = true;
					cbSel=count;
					arr_opt[i]=arr_opt[i].substring(1);
				}
			}
			combo.options[count].value = arr_opt[i];
			combo.options[count].text = arr_opt[i+1];
			count=count+1;
		}
	}
}
function loadOptionsV2(combo,opts)
{
	if(opts!=null && opts.length>2) {
		opts=opts.substring(1,opts.length-1);
		var arr_opt = opts.split("@");
		var count = 0;
		var cbOpt="";
		var cbSel;
		
		for (var i = 0; i < arr_opt.length; i=i+2)
		{
			//combo.options[count] = new Option();
			
			if(arr_opt[i].length>1) {
				var selected=arr_opt[i].substring(0,1);
				if(selected=="$") {
					//combo.selectedIndex=count;
					cbSel=count;
					arr_opt[i]=arr_opt[i].substring(1);
				}
			}
			//combo.options[count].value = arr_opt[i];
			//combo.options[count].text = arr_opt[i+1];
			cbOpt += "<option value='"+arr_opt[i]+"'>"+arr_opt[i+1]+"</option>";
			count=count+1;
		}
		combo.innerHTML=cbOpt;
	}
}
function ajaxLoadList(data) {
  	var cc=data.length;
  	for(var i=0;i<cc;i=i+2) {
  		document.getElementById(data[i]).options.length=0;
		loadOptions(document.getElementById(data[i]),data[i+1]);
	}
}
function UTF8_TO_NOSIGN(txtcodau)
{
      var charactors = new Array;
      var result = "";
      charactors[0]=['a','á','à','ạ','ả','ã','â','ă','ấ','ầ','ậ','ẩ','ẫ','ắ','ằ','ặ','ẳ','ẵ'];
      charactors[1]=['A','Á','À','Ạ','Ả','Ã','Â','Ă','Ấ','Ầ','Ậ','Ẩ','Ẫ','Ắ','Ằ','Ặ','Ẳ','Ẵ'];
      charactors[2]=['e','é','è','ẹ','ẻ','ẽ','ê','ế','ề','ệ','ể','ễ','e','e','e','e','e','e'];
      charactors[3]=['E','É','È','Ẹ','Ẻ','Ẽ','Ê','Ế','Ề','Ệ','Ể','Ễ','E','E','E','E','E','E'];
      charactors[4]=['o','ó','ò','ọ','ỏ','õ','ô','ố','ồ','ộ','ổ','ỗ','ơ','ớ','ờ','ợ','ở','ỡ'];
      charactors[5]=['O','Ó','Ò','Ọ','Ỏ','Õ','Ô','Ố','Ồ','Ộ','Ổ','Ỗ','Ơ','Ớ','Ờ','Ợ','Ở','Ỡ'];
      charactors[6]=['u','ú','ù','ụ','ủ','ũ','ư','ứ','ừ','ự','ử','ữ','u','u','u','u','u','u'];
      charactors[7]=['U','Ú','Ù','Ụ','Ủ','Ũ','Ư','Ứ','Ừ','Ự','Ử','Ữ','U','U','U','U','U','U'];
      charactors[8]=['i','í','ì','ị','ỉ','ĩ','i','i','i','i','i','i','i','i','i','i','i','i'];
      charactors[9]=['I','Í','Ì','Ị','Ỉ','Ĩ','I','I','I','I','I','I','I','I','I','I','I','I'];
      charactors[10]=['d','đ','d','d','d','d','d','d','d','d','d','d','d','d','d','d','d','d'];
      charactors[11]=['D','Đ','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D','D'];
      charactors[12]=['y','ý','ỳ','ỵ','ỷ','ỹ','y','y','y','y','y','y','y','y','y','y','y','y'];
      charactors[13]=['Y','Ỳ','Ỵ','Ỷ','Ỹ','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y'];

      for (k=0;k<13;k++) {
          for(j=0;j<17;j++)
          {
            txtcodau= txtcodau.replace(charactors[k][j],charactors[k][0]);
          }
      }
     return txtcodau;
   }

function openModal(modalID, url, headerText, modelSize, width, height) {
	iframeId = "myIframe";
	//$("body").append(templateModel);	
	if ($("#" + modalID).length == 0) {
		var $domModal = $($.parseHTML(templateModel));		
		$domModal.attr("id", modalID);
		//console.log($domModal.html());
		$("body").append($domModal);
	}
	$modal = $("#" + modalID + " > div");
	$modal.attr("class","");
	$modal.addClass("modal-dialog modal-"+modelSize);
	$modal.find("div[class='modal-header']").html(headerText);
	$modal.find("div[class='modal-body']").empty().append("<iframe id='"+iframeId+"' src='" + url + "' width='"+ width +"' height='"+ height +"' frameBorder='0'></iframe>");	
	$("#" + modalID).modal('show');
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

function hexTostr(_hex)
{
    var hex  = _hex;
    var array=[];
    for (var i = 0; i < hex.length; i += 2){
        var cc= parseInt(hex.substr(i, 2), 16);
		array.push(cc);
    }
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}

function download(data, strFileName, strMimeType) {
	
	var self = window, // this script is only for browsers anyway...
		u = "application/octet-stream", // this default mime also triggers iframe downloads
		m = strMimeType || u, 
		x = data,
		D = document,
		a = D.createElement("a"),
		z = function(a){return String(a);},
		
		
		B = self.Blob || self.MozBlob || self.WebKitBlob || z,
		BB = self.MSBlobBuilder || self.WebKitBlobBuilder || self.BlobBuilder,
		fn = strFileName || "download",
		blob, 
		b,
		ua,
		fr;

	//if(typeof B.bind === 'function' ){ B=B.bind(self); }
	
	if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
		x=[x, m];
		m=x[0];
		x=x[1]; 
	}
	
	
	
	//go ahead and download dataURLs right away
	if(String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)){
		return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
			navigator.msSaveBlob(d2b(x), fn) : 
			saver(x) ; // everyone else can save dataURLs un-processed
	}//end if dataURL passed?
	
	try{
	
		blob = x instanceof B ? 
			x : 
			new B([x], {type: m}) ;
	}catch(y){
		if(BB){
			b = new BB();
			b.append([x]);
			blob = b.getBlob(m); // the blob
		}
		
	}
	
	
	
	function d2b(u) {
		var p= u.split(/[:;,]/),
		t= p[1],
		dec= p[2] == "base64" ? atob : decodeURIComponent,
		bin= dec(p.pop()),
		mx= bin.length,
		i= 0,
		uia= new Uint8Array(mx);

		for(i;i<mx;++i) uia[i]= bin.charCodeAt(i);

		return new B([uia], {type: t});
	 }
	  
	function saver(url, winMode){
		
		
		if ('download' in a) { //html5 A[download] 			
			a.href = url;
			a.setAttribute("download", fn);
			a.innerHTML = "downloading...";
			D.body.appendChild(a);
			setTimeout(function() {
				a.click();
				D.body.removeChild(a);
				if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(a.href);}, 250 );}
			}, 66);
			return true;
		}
		
		//do iframe dataURL download (old ch+FF):
		var f = D.createElement("iframe");
		D.body.appendChild(f);
		if(!winMode){ // force a mime that will download:
			url="data:"+url.replace(/^data:([\w\/\-\+]+)/, u);
		}
		 
	
		f.src = url;
		setTimeout(function(){ D.body.removeChild(f); }, 333);
		
	}//end saver 
		

	if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
		return navigator.msSaveBlob(blob, fn);
	} 	
	
	if(self.URL){ // simple fast and modern way using Blob and URL:
		saver(self.URL.createObjectURL(blob), true);
	}else{
		// handle non-Blob()+non-URL browsers:
		if(typeof blob === "string" || blob.constructor===z ){
			try{
				return saver( "data:" +  m   + ";base64,"  +  self.btoa(blob)  ); 
			}catch(y){
				return saver( "data:" +  m   + "," + encodeURIComponent(blob)  ); 
			}
		}
		
		// Blob but not URL:
		fr=new FileReader();
		fr.onload=function(e){
			saver(this.result); 
		};
		fr.readAsDataURL(blob);
	}	
	return true;
} 

$(document).ready(function() {
	$("input[validator='positive']").on("change", function(e) {
		 if ($(this).val()<0) $(this).val(0);
	});
	$("input[type='number']").attr("pattern","^(0|[1-9][0-9]*)$");	
			
});

