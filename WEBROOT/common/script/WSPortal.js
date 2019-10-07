var dateFormat = function () {
	this.masks = {
			"default":      "ddd mmm dd yyyy HH:MM:ss",
			shortDate:      "m/d/yy",
			mediumDate:     "mmm d, yyyy",
			longDate:       "mmmm d, yyyy",
			fullDate:       "dddd, mmmm d, yyyy",
			shortTime:      "h:MM TT",
			mediumTime:     "h:MM:ss TT",
			longTime:       "h:MM:ss TT Z",
			isoDate:        "yyyy-mm-dd",
			isoTime:        "HH:MM:ss",
			isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
			isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
		};
	this.i18n = {
			dayNames: [
				"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
				"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
				"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			]
		};
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = this;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

WSPortal =function(_uuid,_url,_usr,_pwd) {
	if(_uuid==undefined) _uuid="thu@nnc";
	this.uuid=_uuid;
	this.usr=_usr;
	this.pwd=_pwd;
	if(!_url)
		this.serviceURL="http://congdulieuyte.vn/hPortal/services/WSPortal";
	else
		this.serviceURL=_url;
	console.log("WSPortal="+this.serviceURL);
	//alert(this.serviceURL);
};
WSPortal.prototype.generateUUID=function(_jsonData,_cb) {
	var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}
WSPortal.prototype.callWS=function(_jsonData,_cb) {
	var _self=this;
	console.log('uuid:'+_jsonData.uuid);
	if (!_jsonData.uuid) _jsonData.uuid = this.uuid;
	//var _jsonData={url:'http://localhost:8080/hPortal/services/WSPortal',method:'guiTTNV',params: { _usr: '82007', _pwd: '123a@', xmlData: 'Here is a test'}};
	if (!_jsonData.uuid) _jsonData.uuid = this.uuid;
	var _url='http://localhost:8080/hPortal/services/WSPortal';
	if(!_jsonData.url) _jsonData.url=_self.serviceURL;
	//var _data=JSON.stringify(_jsonData); 
	console.log('url:'+_jsonData.url);
	
	$.soap({
    	url: _jsonData.url,
    	method: _jsonData.method,
    	appendMethodToURL:false,
    	async:true,
    	data: _jsonData.params,
    	headers: {'Access-Control-Allow-Origin': '*'},
    	success: function (soapResponse) {
    	    // do stuff with soapResponse
    	    //soapResponse.toJSON();soapResponse.toString();soapResponse.toXML(); -->to get JSON,string,XML DOM
    		var xml=$.parseXML(soapResponse.toString()).firstChild.firstChild;
    		//console.log("xml="+$(xml).text());
    		var xmldom=$.parseXML($(xml).text()).firstChild;
    		//var str=dom2json(xmldom);
    		//console.log("str="+str);
    		var jo=$.xml2json(xmldom);
    		console.log("xml.jo="+JSON.stringify(jo));
    		_cb(jo);
    		//console.log("xml.Transaction_Date="+JSON.stringify($(xml).find("Transaction_Date")));
    		
    	},
    	error: function (SOAPResponse) {
    	    // show error
    		var jo={Error:{Error_Number:'1',Error_Message:SOAPResponse.toString()}};
    		_cb(jo);
    	}
    	});
	//alert("syncCall()="+rt);
};
/*
var _jsonData={url:'http://localhost:8081/hPortal/services/WSPortal',method:'kt_lamdungthe',params: { _usr: '82007', _pwd: '123a@', xmlData: '<Data><Header>	<Message_Version>1.0</Message_Version>	<Sender_Code>CSYT_82007</Sender_Code>	<Sender_Name>Benh vien Bach Mai</Sender_Name>	<Transaction_Type>M0010</Transaction_Type>	<Transaction_Name>Web Service</Transaction_Name>	<Transaction_Date>2015-09-22</Transaction_Date>	<Transaction_ID>294aed32-30de-456a-9d6c-1b4b72ffafc0</Transaction_ID>	<Request_ID>0f70aa67-aa0f-4c58-ab3b-d7428dfdb07d</Request_ID></Header><Body>	<KT_LDT><MA_THE>HT2960100100430</MA_THE></KT_LDT></Body><Security><Signature>eWApKlLnIo+pLmgvrDDzzItIDX+ZvoPe9mirI9+</Signature></Security></Data>'}};
callWS(_jsonData,function(_rt) {
	console.log("callWS._rt="+JSON.stringify(_rt));
});
*/
WSPortal.prototype.kt_lamdungthe=function(_mathe,_cb) {
	//alert("begin syncCall()=");
	var _xml_body='<KT_LDT><MA_THE>'+_mathe+'</MA_THE></KT_LDT>';
	var _transId=this.generateUUID();
	var _transDate=dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss");
	var _transType='M0010';
	var _xml='<Data><Header><Message_Version>1.0</Message_Version><Sender_Code>'+this.usr+'</Sender_Code><Sender_Name>'+this.usr+'</Sender_Name><Transaction_Type>'+_transType+'</Transaction_Type><Transaction_Name>Web Service</Transaction_Name><Transaction_Date>'+_transDate+'</Transaction_Date><Transaction_ID>'+_transId+'</Transaction_ID><Request_ID></Request_ID></Header><Body>'+_xml_body+'</Body><Security><Signature></Signature></Security></Data>';
	
	var _jsonData={
		 	"method":"kt_lamdungthe",
		 	"params":{
		 		"_usr": this.usr,
		 		"_pwd": this.pwd,
		 		"xmlData":_xml
		 	}
		 };
	this.callWS(_jsonData,_cb);
	
};

WSPortal.prototype.tc_ls_KCB=function(_mathe,_cb) {
	//alert("begin syncCall()=");
	var _xml_body='<TC_LSKCB><MA_THE>'+_mathe+'</MA_THE></TC_LSKCB>';
	var _transId=this.generateUUID();
	var _transDate=dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss");
	var _transType='M0006';
	var _xml='<Data><Header><Message_Version>1.0</Message_Version><Sender_Code>'+this.usr+'</Sender_Code><Sender_Name>'+this.usr+'</Sender_Name><Transaction_Type>'+_transType+'</Transaction_Type><Transaction_Name>Web Service</Transaction_Name><Transaction_Date>'+_transDate+'</Transaction_Date><Transaction_ID>'+_transId+'</Transaction_ID><Request_ID></Request_ID></Header><Body>'+_xml_body+'</Body><Security><Signature></Signature></Security></Data>';
	
	var _jsonData={
		 	"method":"tc_ls_KCB",
		 	"params":{
		 		"_usr": this.usr,
		 		"_pwd": this.pwd,
		 		"xmlData":_xml
		 	}
		 };
	this.callWS(_jsonData,_cb);
	
};

WSPortal.prototype.theBHYT=function(_mathe,_cb) {
	//alert("begin syncCall()=");
	var _xml_body='<TC_TT_THE><MA_THE>'+_mathe+'</MA_THE></TC_TT_THE>';
	var _transId=this.generateUUID();
	var _transDate=dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss");
	var _transType='M0004';
	var _xml='<Data><Header><Message_Version>1.0</Message_Version><Sender_Code>'+this.usr+'</Sender_Code><Sender_Name>'+this.usr+'</Sender_Name><Transaction_Type>'+_transType+'</Transaction_Type><Transaction_Name>Web Service</Transaction_Name><Transaction_Date>'+_transDate+'</Transaction_Date><Transaction_ID>'+_transId+'</Transaction_ID><Request_ID></Request_ID></Header><Body>'+_xml_body+'</Body><Security><Signature></Signature></Security></Data>';
	
	var _jsonData={
		 	"method":"tc_tt_theBHYT",
		 	"params":{
		 		"_usr": this.usr,
		 		"_pwd": this.pwd,
		 		"xmlData":_xml
		 	}
		 };
	this.callWS(_jsonData,_cb);
	
};

WSPortal.prototype.guiTTNV=function(_malk,_mabv,_mathe,_makcbbd,_hoten,_ngaysinh,_namsinh,_gioitinh,_diachi,_tungay,_denngay,_matinhquanhuyen,_ngaygiovao,_ngaydu5nam,_manoichuyenden,_lydodenkham,_tinhtrangvaovien,_sokhambenh,_sodienthoailh,_nguoilienhe,_makhuvuc,_cb) {

	var _xml_body='<CHECKIN>'+
		'<MA_LK>'+_malk+'</MA_LK>'+
		'<MABENHVIEN>'+_mabv+'</MABENHVIEN>'+
		'<MA_THE>'+_mathe+'</MA_THE>'+
		'<MA_KCBBD>'+_makcbbd+'</MA_KCBBD>'+
		'<HO_TEN>'+_hoten+'</HO_TEN>'+
		'<NGAY_SINH>'+_ngaysinh+'</NGAY_SINH>'+
		'<NAM_SINH>'+_namsinh+'</NAM_SINH>'+
		'<GIOI_TINH>'+_gioitinh+'</GIOI_TINH>'+
		'<DIA_CHI>'+_diachi+'</DIA_CHI>'+
		'<TU_NGAY>'+_tungay+'</TU_NGAY>'+
		'<DEN_NGAY>'+_denngay+'</DEN_NGAY>'+
		'<MATINHQUANHUYEN>'+_matinhquanhuyen+'</MATINHQUANHUYEN>'+
		'<NGAYGIOVAO>'+_ngaygiovao+'</NGAYGIOVAO>'+
		'<NGAYDU5NAM>'+_ngaydu5nam+'</NGAYDU5NAM>'+
		'<MA_NOICHUYENDEN>'+_manoichuyenden+'</MA_NOICHUYENDEN>'+
		'<LYDODENKHAM>'+_lydodenkham+'</LYDODENKHAM>'+
		'<TINHTRANGVAOVIEN>'+_tinhtrangvaovien+'</TINHTRANGVAOVIEN>'+
		'<SOKHAMBENH>'+_sokhambenh+'</SOKHAMBENH>'+
		'<SODIENTHOAI_LH>'+_sodienthoailh+'</SODIENTHOAI_LH>'+
		'<NGUOILIENHE>'+_nguoilienhe+'</NGUOILIENHE>'+
		'<MA_KHUVUC>'+_makhuvuc+'</MA_KHUVUC>'+
	  '</CHECKIN>';
	
	var _transId=this.generateUUID();
	var _transDate=dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss");
	var _transType='M0004';
	var _xml='<Data><Header><Message_Version>1.0</Message_Version><Sender_Code>'+this.usr+'</Sender_Code><Sender_Name>'+this.usr+'</Sender_Name><Transaction_Type>'+_transType+'</Transaction_Type><Transaction_Name>Web Service</Transaction_Name><Transaction_Date>'+_transDate+'</Transaction_Date><Transaction_ID>'+_transId+'</Transaction_ID><Request_ID></Request_ID></Header><Body>'+_xml_body+'</Body><Security><Signature></Signature></Security></Data>';
	
	var _jsonData={
		 	"method":"guiTTNV",
		 	"params":{
		 		"_usr": this.usr,
		 		"_pwd": this.pwd,
		 		"xmlData":_xml
		 	}
		 };
	this.callWS(_jsonData,_cb);
	
};


/**/