/*
 * huydq 0988565117 huydqyb@yahoo + gmail
 * created date: 04/01/2013

 */

/*
 * thực hiện việc validate các control trên form
 */
(function(window, document, undefined) {    
    var defaults = {
        messages: {
            required: '%s cannot be blank.',
            trim_required: '%s cannot be blank or cotain "space" only.',
            datetime: 'The value of %s not valid date format (DD/MM/YYYY).',
            matches: 'The value of %s not match with %s.',
            valid_email: 'The value of %s not valid email.',
            valid_emails: 'The value of %s not valid emails',
            min_length: 'The value of %s must contain at least %s characters.',
            max_length: 'The value of %s must less than %s characters.',
            exact_length: 'The value of %s must contain exactly %s characters.',
            greater_than: 'The value of %s must be a number and greater than %s.',
            less_than: 'The value of %s must be a number and less than %s.',
            alpha: 'The value of %s must contain Alphabet only.',
            alpha_numeric: 'The value of %s must contain Alphabet and Numberic only.',
            alpha_dash: 'The value of %s must containt Alphabet, "_" or "/".',            
            numeric: 'The value of %s must be a number.',
            integer: 'The value of %s must be a integer.',
            decimal: 'The value of %s must be a decimal.',
            is_natural: 'The value of %s must be a unsigned integer.',
            is_natural_no_zero: 'The value of %s must be a unsigned integer and greater than zero.',
            valid_ip: 'The value of %s not valid IP.',
            valid_base64: 'The value of %s not valid base64 type.',
            moneyFormat: 'The value of %s not valid currency format.',
        },
        callback: function (errors, event, func) {
	        var SELECTOR_ERRORS = '';
	        //event = event || window.event;
	        //event = event.target || event.srcElement;
	        if (errors.length > 0) {
	            for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
	                SELECTOR_ERRORS += errors[i].message + '\n\r';
	            }
	        }
	        if (SELECTOR_ERRORS) {
	            alert(SELECTOR_ERRORS);
	            return;
	        }
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
        for ( var j =0; j < regionidandfields.length; j++)
    	{  
        	
        	regionid = regionidandfields[j].region;
        	fields = regionidandfields[j].fields;
        	
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
                var source = this.messages[method] || defaults.messages[method],
                    message = 'Lỗi xảy ra với trường giá trị ' + field.display + '.';

                if (source) {
                    message = source.replace('%s', field.display);

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