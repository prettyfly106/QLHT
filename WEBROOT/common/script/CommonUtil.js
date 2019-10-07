
function openReport(_ctn,_code,_type,_par_ar) {
	var par_data=JSON.stringify(_par_ar);
	var par_str=window.btoa(unescape(encodeURIComponent(par_data))); 
	var _url="../report/parameter/ParamBuilder?code="+ _code+"&filetype="+_type+"&calltype=ajax&reporttype=JasperReport&reportParam="+ par_str;
	if(_ctn=='window') {
		window.open(_url);
	}
	else {
		document.getElementById(_ctn).src = _url;
	}
}
function loadAsync(_src,_cb, _code){
	window.scriptList = window.scriptList || [];	
	if (_code && $.inArray(_code,window.scriptList)>=0) {
		if(_cb !== null) _cb();
		return;
	} 
	else if (!_code && $.inArray(_src,window.scriptList)>=0) {
		if(_cb !== null) _cb();
		return;		
	}	
	var d1 = new $.Deferred();
	var sc = document.createElement('script');
    
    if(_cb !== null){
    	sc.async = true;
    	sc.type = "text/javascript";	
    	sc.src = _src;
        if (sc.readyState) { // IE, incl. IE9
        	sc.onreadystatechange = function() {
                if (sc.readyState == "loaded" || sc.readyState == "complete") {
                	sc.onreadystatechange = null;
                	d1.resolve();
                }
            };
        } else {
        	sc.onload = function() { // Other browsers
        		d1.resolve();
            };
        }
    }
    else {
    	sc.async = false;
    	sc.type = "text/javascript";	
    	sc.src = _src;
    	d1.resolve();
    }
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(sc, s);
    $.when(d1).then(function() {
    	if (_code && $.inArray(_code,window.scriptList)<0) window.scriptList.push(_code);
    	else if (!_code && $.inArray(_src,window.scriptList)<0)window.scriptList.push(_src);
        if(_cb !== null) _cb();
    });
    
}
function loadComboTag(comboid,vlist, rowSel, strShow){
	loadComboOptions(comboid,vlist, rowSel, strShow);
}

// Hàm lấy dữ liệu combo: getComboTags(cbxId, sql, sqlPar, opts, callback)
// cbxId : id hoặc mảng các id của combo
// sql : câu lệnh sql lấy dữ liệu
// sqlPar : mảng params của sql
// opts : các options load Combo
//		opts.groupField : null : không phân nhóm ; Field index/name group 
//		opts.textField: Index/name của cột chứa option Text
//		opts.valueField: Index/name của cột chứa option Value
//		opts.selectedValue: Giá trị selected
//		opts.defaultValue: Giá trị mặc định (Thêm vào đầu danh sách option)
//		opts.defaultText: Text mặc định (Thêm vào đầu danh sách option)
// callback : hàm callback : null/undefined (gọi Sync) ; function : gọi aSync
function getComboTags(cbxId, sql, sqlPar, opts, callback) {
	var _opts = {			
			groupField : null, // OptGroup: null : không phân nhóm ; Field index/name group 
			textField : 1, // Text Field index/name
			valueField : 0, // Value Field index/name
			seletedValue : null, // Selected value  
			defaultValue :null,
			defaultText : null
	}
	if (opts) {
		_opts = $.extend(true,{}, _opts, opts);
	}	
	if (callback && typeof callback=='function') {
		if (typeof _opts.valueField == 'number') {
			jsonrpc.AjaxJson.ajaxExecuteQuery(sql,sqlPar,function(data) {
				var vlist = $.parseJSON(data);			
				loadCombosOptions(cbxId, vlist, _opts)
				callback();
			});
		}
		else if (typeof _opts.valueField == 'string') {
			jsonrpc.AjaxJson.ajaxExecuteQueryO(sql,sqlPar,function(data) {
				var vlist = $.parseJSON(data);			
				loadCombosOptions(cbxId, vlist, _opts);
				callback();
			});
		}
	} else {
		var vlist = [];		
		if (typeof _opts.valueField == 'number') {
			vlist = jsonrpc.AjaxJson.ajaxExecuteQuery(sql,sqlPar);
			loadCombosOptions(cbxId, vlist, _opts);
		}
		else if (typeof _opts.valueField == 'string') {
			vlist = $.parseJSON(jsonrpc.AjaxJson.ajaxExecuteQueryO(sql,sqlPar));			
			loadCombosOptions(cbxId, vlist, _opts);
		}
	}	
}

//Hàm lấy dữ liệu combo: getComboTag(comboid,sql,sqlPar,rowSel,strShow, strVal, callback)
//comboid : id hoặc mảng các id của combo
//sql : câu lệnh sql lấy dữ liệu
//sqlPar : mảng params của sql
//rowSel : giá trị selected option
//strShow : Text của option mặc định (add đầu danh sách option)
//strVal : Value của option mặc định
//callback : hàm callback : null/undefined (gọi Sync) ; function : gọi aSync
/**/
function getComboTag(comboid,sql,sqlPar,rowSel,strShow, strVal, callback)
{	
	if (callback && typeof callback=='function') {
		
		jsonrpc.AjaxJson.ajaxExecuteQuery(sql,sqlPar,function(data) {
			var vlist = $.parseJSON(data);
			if (typeof comboid == 'string') {			
				loadComboOptions(comboid,vlist, rowSel, strShow,strVal);
			}
			else if (typeof comboid == 'object') {
				$.each(comboid, function(i,v) {
					loadComboOptions(v,vlist, rowSel, strShow,strVal);
				})
			}
			
			callback();
			
		});
	}
	else {
		var vlist = jsonrpc.AjaxJson.ajaxExecuteQuery(sql,sqlPar);			
		if (typeof comboid == 'string') {			
			loadComboOptions(comboid,vlist, rowSel, strShow,strVal);
		}
		else if (typeof comboid == 'object') {
			$.each(comboid, function(i,v) {
				loadComboOptions(v,vlist, rowSel, strShow,strVal);
			})
		}
	}
}

function getComboTagEx(comboid,sql,sqlPar,rowSel,defOpt,sqlType,cache,callback)
{	//ComboUtil.getComboTag("cboId","select * from t",[],"",{value:'',text:''},'sql',cbFunc);
	function _loadOptions(combo_id, value, rowSel, _defOpt)
	{
			attribute1 = document.getElementById(combo_id);
			attribute1.length=0;
			var j = 0;
			if(_defOpt.value){
				attribute1.options[0] = new Option();
				attribute1.options[0].value = _defOpt.value;
				attribute1.options[0].text = _defOpt.text;
			}
			for (var i = 0; i < value.length; i++)
			{
				if(value[i].length == 2){
					if(_defOpt.value)
						j = i + 1;
					else j = i;					
					attribute1.options[j] = new Option();
					attribute1.options[j].value = value[i][0];
					attribute1.options[j].text = value[i][1];
					if(value[i][0] == rowSel)
						attribute1.options[j].selected = "selected";
				}

			}
	}
	var vlist;
	defer = $.Deferred();
	if(cache!='') {
		cacheData=$.$.sessionStorage.get(cache);
	}
	if(cacheData) {
		vlist=cacheData;
		defer.resolve(vlist);
	}
	else {
		if(sqlType=='sp') {
			jsonrpc.AjaxJson.ajaxCALL_SP_R(sql,sqlPar,function(data) {
				vlist = $.parseJSON(data);
				defer.resolve(vlist);
			});
		}
		else {
			jsonrpc.AjaxJson.ajaxExecuteQuery(sql,sqlPar,function(data) {
				vlist = $.parseJSON(data);
				defer.resolve(vlist);
			});
		}
	}
	defer.done(function(vlist) {
		_loadOptions(comboid,vlist, rowSel, defOpt);
		if (callback && typeof callback=='function') {
			callback();
		}
	});
}
function loadOption(select, val, text, selected) {	
	if (selected) {
		select.append('<option value="'+val+'" selected="selected">'+text+'</option>');		
	}
	else {		
		select.append('<option value="'+val+'">'+text+'</option>');
	}
}

function loadCombosOptions(comboId, value_arr,opts) {
	var _select;
	if (typeof comboId == 'string') {
		_select = $('#'+comboId);
		loadCbxOptions(_select,value_arr, opts);
	}
	else if (typeof comboId == 'object') {
		$.each(comboId, function(i,v) {
			_select = $('#'+v);
			loadCbxOptions(_select,value_arr, opts);
		});
	};
}

function loadCbxOptions(select, value_ar, opts) {
	if (select.length==0) return;	
	try {		
		select.empty();		
		if (opts.defaultValue != undefined && opts.defaultValue != null) {
			loadOption(select, opts.defaultValue, opts.defaultText, opts.defaultValue == opts.seletedValue);
		}
		if (value_ar.length == 0) return;
		var optionLabel = '';
		var optGroup;
		
		$.each(value_ar, function(i,v) {			
			if (opts.groupField) {
				if (optionLabel != v[opts.groupField]) {
					optionLabel = v[opts.groupField]
					select.append('<optgroup label="'+optionLabel+'"></optgroup>');
					optGroup = select.find("optgroup:last");
				}
				loadOption(optGroup,v[opts.valueField],v[opts.textField],v[opts.valueField] == opts.defaultText);
			}else {
				loadOption(select,v[opts.valueField],v[opts.textField],v[opts.valueField] == opts.defaultText);
			}
			
		});
	}
	catch(e) {
		console.log(e);
	}
}

function loadComboOptions(combo_id, value_ar, rowSel, strShow,strVal)
{
	try {
	var $select = $('#'+combo_id);	
	if(typeof rowSel=='undefined') rowSel='';
	if(typeof strShow=='undefined') strShow='';		
		if ($select.length==0) return;
		$select.empty();
		
		if(strShow != ""){
			if (!strVal) strVal='';
			loadOption($select,strVal,strShow, rowSel == strVal);
		}
		if (value_ar == null) return;		
		for (var i = 0; i < value_ar.length; i++)
		{			
			loadOption($select,value_ar[i][0],value_ar[i][1],value_ar[i][0] == rowSel);
		}		
	}
	catch(e) {
		console.log('error:'+combo_id+'='+e);
	}
}
function getListBox(comboid, sql) {
	var vlist = jsonrpc.AjaxJson.ajaxExecuteQuery(sql);
    loadListBox(comboid, vlist);
}

function loadListBox(combo_id, value) {
    attribute1 = document.getElementById(combo_id);
    attribute1.length = 0;
    for (var i = 0; i < value.length; i++) {
        if (value[i].length == 2) {
            attribute1.options[i] = new Option();
            attribute1.options[i].value = value[i][0];
            attribute1.options[i].text = value[i][1];
        }

    }
}
function getPageSize() {
	var _Width,_Height;
	if(window.innerWidth != null) { 
		_Width=window.innerWidth;
		_Height=window.innerHeight;
	} else { 
		if(document.documentElement && document.documentElement.clientWidth) {
			_Width=document.documentElement.clientWidth;
			_Height=document.documentElement.clientHeight;
		}
		else { 
			if(document.body != null) {
				_Width=document.body.clientWidth;
				_Height=document.body.clientHeight;
			}
			else {
				_Width=0;
				_Height=0;
			}
		}
	}
	//alert('getPageSize='+_Width+','+_Height);
	return [_Width,_Height];
}
function getPagePosition() {
	var _Left,_Top;
	if(typeof window.pageXOffset != 'undefined') {
		_Left=window.pageXOffset;
		_Top=window.pageYOffset;
	} else {
		if(document.documentElement && document.documentElement.scrollLeft) {
			_Left=document.documentElement.scrollLeft;
			_Top=document.documentElement.scrollTop;
		} else {
			if(document.body.scrollLeft) {
				_Left=document.body.scrollLeft; 
				_Top=document.documentElement.scrollTop;
			} else {
				_Left=0;
				_Top=0;
			}
		}
	}
	//alert('getPagePosition='+_Top+','+_Left);
	return [_Top,_Left];
}
function replaceAll (str,token, newToken ) {
    var _token;
    var i = -1;
    var strData=str;
    if(strData==null||typeof strData=='undefined') return "";
    if ( typeof token === "string" ) {
        while((i = strData.indexOf(token, i >= 0 ? i + newToken.length : 0) ) !== -1) {
        	strData = strData.substring( 0, i ) + newToken + strData.substring( i + token.length );
        }
    }
    return strData;
};

String.prototype.replaceAll = function(token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.indexOf(token, i >= 0 ? i + newToken.length : 0) ) !== -1 ) {
                str = str.substring( 0, i ) + newToken + str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
return str;
};

function decode(data, value, revalue) {
    if (data == value) return revalue;
    else return data;
}
function setSelectValue(ddlID, value, change) {
    var ddl = document.getElementById(ddlID);
    for (var i = 0; i < ddl.options.length; i++) {
        if (ddl.options[i].value == value) {
            if (ddl.selectedIndex != i) {
                ddl.selectedIndex = i;
                if (change) {
               	 ddl.onchange();
                    
                }
            }
            //ddl.options[i].selected=true;
            break;
        }
    }
}
function getValueById(id) {
    return document.getElementById(id).value;
}

function setValueById(id, value) {
    document.getElementById(id).value = value;
}

function setInnerById(id, value) {
    document.getElementById(id).innerHTML = value;
}

function getInnerById(id, value) {
    return document.getElementById(id).innerHTML;
}


function setFocusById(id) {
    document.getElementById(id).focus();
}

String.formatData = function(text,arData)
{
	//usage: var s=String.format( "two tokens swapped, two args ({1},{0})<br />",["abc","123"]);
    //check if there are two arguments in the arguments list
    if (arData==null || arData.length==0 )
    {
        //if there are not 2 or more arguments there's nothing to replace
        //just return the original text
        return text;
    }
    //decrement to move to the second argument in the array
    var tokenCount = arData.length;
    for( var token = 0; token < tokenCount; token++ )
    {
        //iterate through the tokens and replace their placeholders from the original text in order
        text = text.replace(new RegExp( "\\{" + token + "\\}", "gi" ),arData[token] );
    }
    return text;
};
String.format = function(text)
{
	//usage: var s=String.format( "two tokens swapped, two args ({1},{0})<br />", "arg1", "arg2" );
    //check if there are two arguments in the arguments list
    if ( arguments.length <= 1 )
    {
        //if there are not 2 or more arguments there's nothing to replace
        //just return the original text
        return text;
    }
    //decrement to move to the second argument in the array
    var tokenCount = arguments.length - 2;
    for( var token = 0; token <= tokenCount; token++ )
    {
        //iterate through the tokens and replace their placeholders from the original text in order
        text = text.replace(new RegExp( "\\{" + token + "\\}", "gi" ),arguments[ token + 1 ] );
    }
    return text;
};

/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

String.prototype.unmask = function() {
	return this.replace(/\D/g,'');
}

function currencyFormat(numbervalue) {	
	try {
		return parseInt(numbervalue).format(0,3,'.');
	}
	catch(e) {		
		return numbervalue;
	}
}

function currencyUnFormat(strNumber) {
	return strNumber.unmask();
}

function formatNumber (number, decimals, dec_point, thousands_sep) {
    // Formats a number with grouped thousands  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/number_format    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival    // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +   improved by: davook
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Jay Klehr
    // +   improved by: Brett Zamir (http://brett-zamir.me)    // +      input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +      input by: Amirouche
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)    // *     example 1: number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: number_format(1234.5678, 2, '.', '');    // *     returns 3: '1234.57'
    // *     example 4: number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: number_format(1000);
    // *     returns 5: '1,000'    // *     example 6: number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: number_format(67000, 5, ',', '.');    // *     returns 8: '67.000,00000'
    // *     example 9: number_format(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: number_format('1.20', 2);
    // *    returns 10: '1.20'    // *    example 11: number_format('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: number_format('1.2000', 3);
    // *    returns 12: '1.200'
    // *    example 13: number_format('1 000,50', 2, '.', ' ');    // *    returns 13: '100 050.00'
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');    }
    return s.join(dec);
}
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
		var dF = dateFormat;

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
var QueryString = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	 
	  var query = window.location.search.substring(1);
	  
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    	// If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = pair[1];
	    	// If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]], pair[1] ];
	      query_string[pair[0]] = arr;
	    	// If third or later entry with this name
	    } else {
	      query_string[pair[0]].push(pair[1]);
	    }
	  } 
	    return query_string;
	} ();
	 
	var subQueryString = function (urlid, divid) {
		  // This function is anonymous, is executed immediately and 
		  // the return value is assigned to QueryString!
		  var query_string = {};		 
		  if (typeof urlid === "undefined")
			  return '';
		  
		  var p = document.querySelector("#" + divid );//'contentdivctr_subs_group1_1');		  
		  var query = null;
		  if ( (p == null) || (p.querySelector('#' + urlid) == null) )
		  {
			  query = document.querySelector('#' + urlid).value;
		  }
		  else
			  query = p.querySelector('#' + urlid).value;
		 
		  var vars = query.split("&");
		  for (var i=0;i<vars.length;i++) {
		    var pair = vars[i].split("=");
		    	// If first entry with this name
		    if (typeof query_string[pair[0]] === "undefined") {
		      query_string[pair[0]] = pair[1];
		    	// If second entry with this name
		    } else if (typeof query_string[pair[0]] === "string") {
		      var arr = [ query_string[pair[0]], pair[1] ];
		      query_string[pair[0]] = arr;
		    	// If third or later entry with this name
		    } else {
		      query_string[pair[0]].push(pair[1]);
		    }
		  } 
		    return query_string;
		} ;
		  
//Lay gia tri bien query control cua 1 URL string: vidu: QueryString.id	
function getSubString(urlstr, control) {
	 var query_string = {};
	 var idx = urlstr.indexOf(control);	
	 if (idx >=0)
	 {
		var query = urlstr.substring(idx);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
		    var pair = vars[i].split("=");
			// If first entry with this name
			if (typeof query_string[pair[0]] === "undefined") {
			  query_string[pair[0]] = pair[1];
				// If second entry with this name
			} else if (typeof query_string[pair[0]] === "string") {
			  var arr = [ query_string[pair[0]], pair[1] ];
			  query_string[pair[0]] = arr;
				// If third or later entry with this name
			    } else {
			      query_string[pair[0]].push(pair[1]);
			    }
		} 
	    return query_string;
	 }
	 return query_string;
}

function openForm(url,width,height,func)
{	
	form=window.open(url, '_blank', 'toolbar=no,location=no,scrollbars=yes,directories=0,status=yes,menubar=no,resizable=yes, copyhistory=no, width='+width+', height='+height+',left=50,top=50');
	form.callbackHandler=func;
	return form;
}

function getDateVNFormated(_pdate,_isFullDate){
	var rdate ;
	if(_pdate == null || _pdate === undefined || _pdate === ''){
		rdate = new Date();		
	}else{
		rdate = _pdate;
	}		
	var datetime = group00(rdate.getDate()) 
	    + "/" + group00((rdate.getMonth()+1)) 
	    + "/" + rdate.getFullYear(); 	    
	    if(_isFullDate != null && _isFullDate === undefined && _isFullDate){
	    	datetime += " "+ group00(rdate.getHours()) + ":" 
		    + group00(rdate.getMinutes()) + ":" 
		    + group00(rdate.getSeconds());
	    }	    
	return datetime;
}
function group00(s)
{
    s = s + '';
    if (s.length === 1) s = '0'+s;
    return s;
}
function bindTextBox_OnKeyPress(srcId,dstId,minLen,_sql,_par, attrs) {
	$("#"+srcId).on("keypress",function(e){
		var keycode = (e.keyCode ? e.keyCode : e.which);			
        if (keycode == '13') {
        	var _code=$(this).val();
			if (_code.length >= minLen) {    				
				if($("#"+dstId).is("select")) {
					var sql_par=RSUtil.buildParam("",[_code]);
					if(_par!=undefined && _par.length>0) {
						sql_par=RSUtil.addParam(sql_par,"P",_par);    						
					}
					else if (srcId == "txtMA_CHIPHI") {
						var ma_khoa = $('#cboMA_KHOA_YL').val();    						
						var loai_cp= $("#cboLOAI_CHIPHI").val();
						sql_par=RSUtil.addParam(sql_par,"P",[ma_khoa]);
						_sql = _sqlCP[loai_cp];
    				}
					if (attrs) {     						
						var data_ar = jsonrpc.AjaxJson.ajaxExecuteQueryO(_sql,sql_par);    					
    					var rows=JSON.parse(data_ar);        					
    					var cbx = document.getElementById(dstId);
    					cbx.options.length = 0;
						$.each(rows, function(idx, row) {								
							cbx.options[idx] = new Option();
							cbx.options[idx].value = row[Object.keys(row)[0]];
							cbx.options[idx].text = row[Object.keys(row)[1]];
							$.each(attrs, function(i, attr){
								if ( row[attr[1]] != null)
									cbx.options[idx].setAttribute(attr[0], row[attr[1]]);
							});								
						});
					}
					else {    						
						ComboUtil.getComboTag(dstId,_sql,sql_par,"",{},"sql");
						//ComboUtil.getComboTag(dstId,_sql,sql_par,""+_code,"","");
					}
				}    				
				else {
					var _name = jsonrpc.AjaxJson.getOneValue(_sql,RSUtil.buildParam("",[_code]));
					//$("#"+dstId).val(_name);	
					if (_name != 'null') {
						$("#"+dstId).val(_name);
					}
					else {
						$("#"+dstId).val();
					}
				}
		 	}
        }
	});
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    },
    insertAt:function(to,index){
        if(! to instanceof jQuery){
            to=$(to);
        };        
        if(index===0){
            $(this).prependTo(to);
        }else{
            $(this).insertAfter(to.children().eq(index-1));
        }
    }
});