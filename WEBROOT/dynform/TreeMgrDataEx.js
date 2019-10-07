opt['T001'] = {
    	_title:['Danh sách đơn vị','Quản lý đơn vị hành chính'],
    	_mode:'',
    	_param:sys_par,
        _filter: [
        ],
        _tableName: 'DM_DVHC',
        _keyField: 'MA_SO',
        "_gridHeader":"ID,MA_SO,0,0,t,l;Mã hành chính,MA_DVHC,50,0,f,l;Tên viết tắt,VIETTAT_DVHC,80,0,f,l;Tên hành chính,TEN_DVHC,100,0,f,l",
        _gridSQL: "T001.G01",
        _comboList: [
            ["cboLOAI_DVHC", "T001.C01","","",""],
            ["cboMA_CHA", "T001.C02","","",""],
            ["cboTRANG_THAI", "T001.C03","","",""]
        ],
        _data: [
            ['N', 'cbo', 'MA_SO', 'E',''],
            ['S', 'txt', 'MA_DVHC', 'E',''],
            ['S', 'txt', 'VIETTAT_DVHC', 'E',''],
            ['S', 'txt', 'TEN_DVHC', 'E',''],
            ['S', 'cbo', 'MA_CHA', 'E',''],
            ['N', 'cbo', 'LOAI_DVHC', 'E',''],
            ['N', 'cbo', 'TRANG_THAI', 'E','']
        ],
        _formSQL: 'T001.FR1',
        _onSave:function (_mode,_id,_obj) {
        	console.log("_onSave _mode="+_mode+" _id="+_id);
        	//var rt=jsonrpc.AjaxJson.ajaxCALL_MYSQL_SP_I("{?=call fnc_save_item(?,?,?)}",_mode+"$5$"+_id,"S,I,I");
        },
        _onDelete:function (_id) {
        	console.log("_onDelete _id="+_id);
        	//var rt=jsonrpc.AjaxJson.ajaxCALL_MYSQL_SP_I("{?=call fnc_delete_item(?,?)}","5$"+_id,"I,I");
        },
        _updateSQL: [],
        _deleteSQL: ['T001.D01'],
        _treeSQL: "T001.T01",
        _customButton:[],
        valid_ar: [
            {name: 'txtMA_DVHC', display: 'Mã hành chính', rules: 'required'},
            {name: 'txtVIETTAT_DVHC', display: 'Tên viết tắt', rules: 'required'},
            {name: 'TEN_DVHC', display: 'Tên hành chính', rules: 'required'},
            {name: 'cboLOAI_DVHC', display: 'Loại', rules: 'required'},
            {name: 'cboTRANG_THAI', display: 'Trạng thái', rules: 'required'},
            {name: 'cboMA_CHA', display: 'Hạng mục cha', rules: 'required'}
        ],
        _template: "DM_DVHC"
    };
