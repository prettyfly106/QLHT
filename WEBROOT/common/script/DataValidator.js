/*
 * huydq 0988565117 huydqyb@yahoo + gmail
 * created date: 04/01/2013

 */

/*
 * thực hiện việc validate các control trên form
 */
(function(window, document, undefined) {
	var valid_msg={
	    'vn': {
	    	valmsg_warning: 'Cảnh báo',
	    	valmsg_required: '%s không được để trống.',
	    	valmsg_trim_required: '%s không được để trống hoặc chỉ bao gồm các dấu cách.',
	    	valmsg_datetime: 'Giá trị %s định dạng ngày tháng không hợp lệ (DD/MM/YYYY).',
	    	valmsg_matches: 'Giá trị %s không khớp với giá trị %s.',
	    	valmsg_valid_email: 'Giá trị %s phải chứa giá trị địa chỉ email hợp lệ.',
	    	valmsg_valid_emails: 'Giá trị %s phải chứa tất cả giá trị địa chỉ email hợp lệ.',
	    	valmsg_min_length: 'Giá trị %s phải chứa giá trị là chuỗi tối thiểu %s ký tự.',
	    	valmsg_max_length: 'Giá trị %s phải chứa giá trị là chuỗi tối đa %s ký tự.',
	    	valmsg_exact_length: 'Giá trị %s phải là chuỗi chứa chính xác %s ký tự.',
	    	valmsg_greater_than: 'Giá trị %s phải chứa giá trị là số và lớn hơn %s.',
	    	valmsg_less_than: 'Giá trị %s phải chứa giá trị là số và nhỏ hơn %s.',
	    	valmsg_alpha: 'Giá trị %s chỉ chứa các ký tự chữ cái.',
	    	valmsg_alpha_numeric: 'Giá trị %s phải chứa các ký tự chữ số.',
	    	valmsg_alpha_dash: 'Giá trị %s phải chứa giá trị là ký tự, gạch dưới _ hoặc gạch chéo /.',            
	    	valmsg_numeric: 'Giá trị %s phải là số.',
	    	valmsg_integer: 'Giá trị %s phải là số nguyên.',
	    	valmsg_decimal: 'Giá trị %s phải là số thập phân.',
	    	valmsg_is_natural: 'Giá trị %s là số nguyên dương.',
	    	valmsg_is_natural_no_zero: 'Giá trị %s phải là số lớn hơn 0.',
	    	valmsg_valid_ip: 'Giá trị %s phải chứa giá trị kiểu IP.',
	    	valmsg_valid_base64: 'Giá trị %s phải chứa giá trị kiểu base64.',
	    	valmsg_moneyFormat: 'Giá trị %s phải chứa giá trị là số.',
        },
		'en': {
			valmsg_warning: 'Warning',
			valmsg_required: '%s cannot be blank.',
			valmsg_trim_required: '%s cannot be blank or cotain "space" only.',
			valmsg_datetime: 'The value of %s not valid date format (DD/MM/YYYY).',
			valmsg_matches: 'The value of %s not match with %s.',
			valmsg_valid_email: 'The value of %s not valid email.',
			valmsg_valid_emails: 'The value of %s not valid emails',
			valmsg_min_length: 'The value of %s must contain at least %s characters.',
			valmsg_max_length: 'The value of %s must less than %s characters.',
			valmsg_exact_length: 'The value of %s must contain exactly %s characters.',
			valmsg_greater_than: 'The value of %s must be a number and greater than %s.',
			valmsg_less_than: 'The value of %s must be a number and less than %s.',
			valmsg_alpha: 'The value of %s must contain Alphabet only.',
			valmsg_alpha_numeric: 'The value of %s must contain Alphabet and Numberic only.',
			valmsg_alpha_dash: 'The value of %s must containt Alphabet, "_" or "/".',            
			valmsg_numeric: 'The value of %s must be a number.',
			valmsg_integer: 'The value of %s must be a integer.',
			valmsg_decimal: 'The value of %s must be a decimal.',
			valmsg_is_natural: 'The value of %s must be a unsigned integer.',
			valmsg_is_natural_no_zero: 'The value of %s must be a unsigned integer and greater than zero.',
			valmsg_valid_ip: 'The value of %s not valid IP.',
			valmsg_valid_base64: 'The value of %s not valid base64 type.',
			valmsg_moneyFormat: 'The value of %s not valid currency format.',
        }
	};
    var defaults = {
        messages: {
            required: '%s không được để trống.',
            trim_required: '%s không được để trống hoặc chỉ bao gồm các dấu cách.',
            datetime: 'Giá trị %s định dạng ngày tháng không hợp lệ (DD/MM/YYYY).',
            matches: 'Giá trị %s không khớp với giá trị %s.',
            valid_email: 'Giá trị %s phải chứa giá trị địa chỉ email hợp lệ.',
            valid_emails: 'Giá trị %s phải chứa tất cả giá trị địa chỉ email hợp lệ.',
            min_length: 'Giá trị %s phải chứa giá trị là chuỗi tối thiểu %s ký tự.',
            max_length: 'Giá trị %s phải chứa giá trị là chuỗi tối đa %s ký tự.',
            exact_length: 'Giá trị %s phải là chuỗi chứa chính xác %s ký tự.',
            greater_than: 'Giá trị %s phải chứa giá trị là số và lớn hơn %s.',
            less_than: 'Giá trị %s phải chứa giá trị là số và nhỏ hơn %s.',
            alpha: 'Giá trị %s chỉ chứa các ký tự chữ cái.',
            alpha_numeric: 'Giá trị %s phải chứa các ký tự chữ số.',
            alpha_dash: 'Giá trị %s phải chứa giá trị là ký tự, gạch dưới _ hoặc gạch chéo /.',            
            numeric: 'Giá trị %s phải là số.',
            integer: 'Giá trị %s phải là số nguyên.',
            decimal: 'Giá trị %s phải là số thập phân.',
            is_natural: 'Giá trị %s là số nguyên dương.',
            is_natural_no_zero: 'Giá trị %s phải là số lớn hơn 0.',
            valid_ip: 'Giá trị %s phải chứa giá trị kiểu IP.',
            valid_base64: 'Giá trị %s phải chứa giá trị kiểu base64.',
            moneyFormat: 'Giá trị %s phải chứa giá trị là số.',
        },
        callback: function (errors, event, func) {
	        var SELECTOR_ERRORS = '';
	        //event = event || window.event;
	        //event = event.target || event.srcElement;
	        if (errors.length > 0) {
	            for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
	                SELECTOR_ERRORS+=String.format("<li>{0}</li>",errors[i].message);
	                var _err=errors[i];
	        		var $err=$('#'+_err.id);
	        		if(i==0) $err.focus();	        	
	        		$err.animateCss("shake");//css("background-color","yellow");
	        		$err.attr('title',_err.message);
	            }
	        }
	        if (SELECTOR_ERRORS.length>0) {
	            //alert(SELECTOR_ERRORS);
	        	SELECTOR_ERRORS = String.format("<ul style='padding-left:20px;'>{0}</ul>",SELECTOR_ERRORS);
	        	$.toaster({
	        		title : $.i18n("valmsg_warning"),
	        		priority : 'warning',
	        		message: SELECTOR_ERRORS,	        		
	        		settings : { timeout: 5000 }});
	            return;
	        }
	        /*
	         for(var i1=0;i1<this.errors.length;i1++) {
        		var _err=this.errors[i1];
        		var $err=$('#'+_err.id);
        		$.toaster({ title : $.i18n("warning"), priority : 'warning', message : _err.message, settings : { timeout: 3000}});
        		$err.css("background-color","yellow");
        		$err.attr('title',_err.message);
        		$err.focus();
        	}
	         */
	        eval(func);
	    }
    };

    /*
     * Định nghĩa các loại validate sử dụng
     */

    var ruleRegex = /^(.+)\[(.+)\]$/,
    	datetimeRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/,
        numericRegex = /^[0-9]+$/,
        integerRegex = /^\-?[0-9]+$/,
        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i,
        alphaRegex = /^[a-z]+$/i,
        alphaNumericRegex = /^[a-z0-9]+$/i,
        alphaDashRegex = /^[a-z0-9_-]+$/i,
        naturalRegex = /^[0-9]+$/i,
        naturalNoZeroRegex = /^[1-9][0-9]*$/i,
        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex = /[^a-zA-Z0-9\/\+=]/i,
        moneyNumber = /^([0-9.]+)$/,
        dash = '$';

    /*
     * Đối tượng để thực hiện validate 1 vùng theo regionid:
     *
     * @param regionid - String - Id của thẻ bao vùng cần kiểm tra validate (i.e. <div id="myRegion"></div>)
     * @param fields - Array - [{
     *     name: name của các control cần validate (i.e. <input name="myField" />)
     *     display: 'Field Name'
     *     rules: required|matches[password_confirm]
     * }]
     * @buttonids - Array - [{Id của các button thực hiện kiểm tra validate}]
     * @param callback - Function - Hàm thực thi callback sau khi thực hiện việc validate.
     *     @argument errors - Mảng các control không tuân thủ đúng validate
     *     @argument event - Sự kiện event
     */

    //var DataValidator = function(regionid, fields, buttonids, callback) {
    var DataValidator = function(regionidandfields,callback) {
        this.callback = callback || defaults.callback;
        this.errors = [];
        this.fields = {};
        this.messages = {};
        this.handlers = {};
        this.form = {};
        _self=this;
        var _regionidandfields=[];
        $.i18n().load(valid_msg);
        if(typeof regionidandfields ==='string') {
        	console.log('new version');
	        var region_ar=regionidandfields.split(",");
	        for ( var j =0; j < region_ar.length; j++)
	    	{  
	        	regionid = region_ar[j];
	    	    if ((regionid == null) || (regionid.length == 0)) {
	    	    	_container =  $(document);
	    	    }
	    	    else {
	    	    	_container =  $('#' + regionid);
	    	    }
	    	    var ctl_ar=[];
	    	    ctl_ar=$(document).find("[id='txtUSER_NAME']");
	    	    //console.log('xxxxtl_ar id.length='+ctl_ar.length);
	    	    ctl_ar=$(document).find('[valrule]');
	    	    //console.log('xxxxtl_ar valrule.length='+ctl_ar.length);
	    	    ctl_ar=_container.find("[valrule]");
	    	    var _fields=[];
	    	    //console.log('ctl_ar.length='+ctl_ar.length);
	    	    for(var i=0;i<ctl_ar.length;i++) {
	    	    	var ctl=ctl_ar[i];
	    	    	var fld=new Object();
	    	    	fld.name=ctl.id;
	    	    	var _tmp=$(ctl).attr("valrule");
	    	    	var _tmp_ar=_tmp.split(",");
	    	    	fld.display=_tmp_ar[0];
	    	    	fld.rules=_tmp_ar[1];
	    	    	_fields.push(fld);
	    	    }
	        	//fields = _fields;
	        	var r_f=new Object();
	        	r_f.region=regionid;
	        	r_f.fields=_fields;
	        	_regionidandfields.push(r_f);
	    	}
        }
        else {
        	_regionidandfields=regionidandfields;
        }
        
        for ( var j =0; j < _regionidandfields.length; j++)
    	{  
        	
        	regionid = _regionidandfields[j].region;
        	fields = _regionidandfields[j].fields;
        	
            this.form[regionid] =  document.querySelector("#" + regionid);          
        
            for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
                var field = fields[i];
              
                if (!field.name || !field.rules) {
                    continue;
                } 
               
                	
               this.fields[regionid + dash + field.name + dash + field.rules] = {
                    name: field.name,
                    display: field.display || field.name,
                    rules: field.rules,
                    id: null,
                    type: null,
                    value: null,
                    checked: null
                }
            }          
    	}
    };

   
    /*
     * @public
     * Chuỗi message cho mỗi rules
     */

    DataValidator.prototype.setMessage = function(rule, message) {
        this.messages[rule] = message;
        return this;
    };

    /*
     * @public
     * Registers a callback for a custom rule (i.e. callback_username_check)
     */

    DataValidator.prototype.registerCallback = function(name, handler) {
        if (name && typeof name === 'string' && handler && typeof handler === 'function') {
            this.handlers[name] = handler;
        }
        return this;
    };

    /*
     * @private
     * Thực hiện việc validate khi button được click.
     */
    DataValidator.prototype.validateForm = function() {
    	this.errors = [];
        
        for (var key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
            	key2 = key.split(dash);
            	
                var field = this.fields[key] || {},
                    element = this.form[key2[0]].querySelector("#" + field.name);              
               
                if (element && element !== undefined) {
                    field.id = element.id;
                    field.type = element.type;
                    field.value = element.value;
                    field.checked = element.checked;
                    this._validateField(field);
                }

            }
        }

        if (typeof this.callback === 'function') {
            this.callback(this.errors, null,null);
        }
        if (this.errors.length > 0) {
        	//id: field.id,
            //name: field.name,
            //message: message
        	
        	return false;
        }

        return true;
    }
    
    /*
     * @private
     * Thực hiện việc validate mỗi field theo rule đưa ra
     */

    DataValidator.prototype._validateField = function(field) {
    	
         	
    	if (field.id == null) return;
        var rules = field.rules.split('|');

        /*
         * Nếu giá trị là null hoặc không cần yêu cầu bắt buộc, return
         */
        
       
        if (field.rules.indexOf('required') === -1 && (!field.value || field.value === '' || field.value === undefined)) {
            return;
        }
       
        /*
         * Xử lý phương thức validate theo từng rule
         */

        for (var i = 0, ruleLength = rules.length; i < ruleLength; i++) {
            var method = rules[i],
                param = null,
                failed = false;

            /*
             * Nếu rule có biến số (i.e. matches[param]) tách biến
             */

            if (parts = ruleRegex.exec(method)) {
                method = parts[1];
                param = parts[2];
            }

            /*
             * Nếu hook có định nghĩa, thực thi để tìm lỗi
             */
           
            if (typeof this._hooks[method] === 'function') {
            	
                if (!this._hooks[method].apply(this, [field, param])) {
                    failed = true;
                }
            } else if (method.substring(0, 9) === 'callback_') {               
                method = method.substring(9, method.length);

                if (typeof this.handlers[method] === 'function') {
                    if (this.handlers[method].apply(this, [field.value]) === false) {
                        failed = true;
                    }
                }
            }
          
            /*
             * Nếu hook fail, thêm lỗi vào mảng
             */

            if (failed) {
                // Đảm bảo có message cho rule vi phạm
                //var source = this.messages[method] || defaults.messages[method];
            	var source = $.i18n("valmsg_"+method);
                message = 'Lỗi xảy ra với trường giá trị ' + field.display + '.';

                if (source) {
                    message = source.replace('%s', '<b>' + field.display + '</b>');

                    if (param) {
                        message = message.replace('%s', (this.fields[param]) ? this.fields[param].display : param);
                    }
                }
                
                this.errors.push({
                    id: field.id,
                    name: field.name,
                    message: message 
                });
               
                break;
            }
        }
    };

    /*
     * @private
     * all of the validation hooks rules
     */

    DataValidator.prototype._hooks = {
        required: function(field) {       	
        		
        	
            var value = field.value;

            if (field.type === 'checkbox') {
                return (field.checked === true);
            }
            
            return (value !== null && value !== '');
        },
        trim_required: function(field) {       	
        		
        	
            var value = field.value;

            if (field.type === 'checkbox') {
                return (field.checked === true);
            }
            
            return (value !== null && value.trim() !== '');
        },
       
        datetime: function(field) {
        	 return datetimeRegex.test(field.value);
        },
        
        matches: function(field, matchName) {
            if (el = this.form.querySelector("#" + matchName)) {
                return field.value === el.value;
            }

            return false;
        },

        valid_email: function(field) {
            return emailRegex.test(field.value);
        },

        valid_emails: function(field) {
            var result = field.value.split(",");
            
            for (var i = 0; i < result.length; i++) {
                if (!emailRegex.test(result[i])) {
                    return false;
                }
            }
            
            return true;
        },

        min_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length >= parseInt(length, 10));
        },

        max_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length <= parseInt(length, 10));
        },

        exact_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }
            
            return (field.value.length === parseInt(length, 10));
        },

        greater_than: function(field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) > parseFloat(param));
        },

        less_than: function(field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) < parseFloat(param));
        },

        alpha: function(field) {
            return (alphaRegex.test(field.value));
        },

        alpha_numeric: function(field) {
            return (alphaNumericRegex.test(field.value));
        },

        alpha_dash: function(field) {
            return (alphaDashRegex.test(field.value));
        },

        numeric: function(field) {
            return (decimalRegex.test(field.value));
        },

        integer: function(field) {
            return (integerRegex.test(field.value));
        },

        decimal: function(field) {
            return (decimalRegex.test(field.value));
        },

        is_natural: function(field) {
            return (naturalRegex.test(field.value));
        },

        is_natural_no_zero: function(field) {
            return (naturalNoZeroRegex.test(field.value));
        },

        valid_ip: function(field) {
            return (ipRegex.test(field.value));
        },

        valid_base64: function(field) {
            return (base64Regex.test(field.value));
        }
        ,
        moneyFormat: function(field) {    
        	if (moneyNumber.test(field.value))
        		return (numericRegex.test(parseNumber(field.value)));
            return moneyNumber.test(field.value);
        }
    };

    window.DataValidator = DataValidator;

})(window, document);