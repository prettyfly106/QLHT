opt['T001'] = {
    	_title:['Units List','Administrative Unit Management'],
    	_mode:'',
    	_param:sys_par,
        _filter: [
        ],
        _tableName: 'DM_DVHC',
        _keyField: 'MA_SO',
        "_gridHeader":"ID,MA_SO,0,0,t,l;Administrative Code,MA_DVHC,50,0,f,l;Abbreviations,VIETTAT_DVHC,80,0,f,l;Administrative Name,TEN_DVHC,100,0,f,l",
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
            {name: 'txtMA_DVHC', display: 'Administrative code', rules: 'required'},
            {name: 'txtVIETTAT_DVHC', display: 'Abbreviations', rules: 'required'},
            {name: 'TEN_DVHC', display: 'Administrative Name', rules: 'required'},
            {name: 'cboLOAI_DVHC', display: 'Unit type', rules: 'required'},
            {name: 'cboTRANG_THAI', display: 'Status', rules: 'required'},
            {name: 'cboMA_CHA', display: 'Parents Category', rules: 'required'}
        ],
        _template: "DM_DVHC"
    };
/*
opt['Property'] = {
    		_title:'Quản lý thuộc tính',
    		_mode:'',
    		_param:sys_par,
            _filter: [
                ['cboCONTEXTID', 'select id,name from MDR_ADMINISTEREDITEM WHERE ADMINISTEREDITEMTYPE=1', '', 'N'],
                ['cboREGISTRATION_ID', 'select id,name from MDR_REGISTRATION a where contextid=[0] [S2] order by name', 'cboCONTEXTID', 'Y']
            ],
            _tableName: 'MDR_ADMINISTEREDITEM',
            _keyField: 'ID',
            _gridHeader: '#master_checkbox,Mã số,ID,Tên thuộc tính,Loại,Kiểu dữ liệu,Kích thước,Độ chính xác@3,8,0,32,15,15,12,15;center,center,left,left,left,left,left,left;ch,ro,ro,ro,ro,ro,ro,ro;int,int,int,str,str,str,str,int,int',
            _gridSQL: "select 0,a.ITEM_UID,A.ID,A.NAME,b.name item_type,(CASE WHEN a.item_type=2 THEN COALESCE(e.NAME,c.datatypename) ELSE d.name END) data_type,a.de_precision,a.vd_decimalplace from (((MDR_ADMINISTEREDITEM a LEFT JOIN MDR_ITEMTYPE b on a.item_type=b.id) LEFT JOIN MDR_DATATYPE C on a.vd_datatypeid=c.id) LEFT JOIN MDR_ADMINISTEREDITEM d ON a.ref_id=d.id) LEFT JOIN MDR_ADMINISTEREDITEM e ON a.DE_VALUEDOMAINID=e.id where a.ADMINISTEREDITEMTYPE=6 and a.registration_id=[1] and a.parent_id=[A] ORDER BY a.ITEM_UID",
            _comboList: [
                ["cboITEM_TYPE", "SELECT id, name FROM MDR_ITEMTYPE where id in (2,3)","","","",cboITEM_TYPE_change],
                ["cboVD_DATATYPEID", "SELECT id, datatypename FROM MDR_DATATYPE","","",""],
                ["cboPARENT_ID", "SELECT id, name FROM MDR_ADMINISTEREDITEM WHERE id =[0]","", "0","Gốc"],
                ["cboREF_ID", "SELECT id, name FROM MDR_ADMINISTEREDITEM WHERE ADMINISTEREDITEMTYPE=5 and item_type=1","", "0",""],
            ],
            _data: [
    			['N', 'cbo', 'CONTEXTID', 'E',''],
    			['N', 'cbo', 'REGISTRATION_ID', 'E',''],
                ['N', 'cbo', 'ID', 'E',''],
                ['S', 'txt', 'NAME', 'E',''],
                ['S', 'txt', 'ITEM_UID', 'E',''],
                ['N', 'cbo', 'ITEM_TYPE', 'E',''],
                ['N', 'cbo', 'REF_ID', 'E',''],
                ['N', 'cbo', 'VD_DATATYPEID', 'E',''],
                ['N', 'txt', 'DE_PRECISION', 'E',''],
                ['N', 'txt', 'VD_DECIMALPLACE', 'E',''],
                ['N', 'cbo', 'PARENT_ID', 'E',''],
                ['S', 'txt', 'DE_TECHNICALNAME', 'E',''],
                ['S', 'txt', 'DEFINITION', 'E',''],
                ['S', 'txt', 'VD_FORMAT', 'E',''],
                ['N', 'non', 'ADMINISTEREDITEMTYPE', 'E','6']
            ],
            _formSQL: 'SELECT ID,NAME,ITEM_UID,ITEM_TYPE,REF_ID,PARENT_ID,DE_TECHNICALNAME,DEFINITION,VD_DATATYPEID,DE_PRECISION,VD_DECIMALPLACE,VD_FORMAT FROM MDR_ADMINISTEREDITEM a where a.ID=[0]',
            _onSave:function (_mode,_id,_obj) {
            	console.log("_onSave _mode="+_mode+" _id="+_id);
            	var rt=jsonrpc.AjaxJson.ajaxCALL_MYSQL_SP_I("{?=call fnc_save_item(?,?,?)}",_mode+"$6$"+_id,"S,I,I");
            },
            _onDelete:function (_id) {
            	console.log("_onDelete _id="+_id);
            	var rt=jsonrpc.AjaxJson.ajaxCALL_MYSQL_SP_I("{?=call fnc_delete_item(?,?)}","6$"+_id,"I,I");
            },
            _updateSQL: [],
            _deleteSQL: [],
            _treeSQL: "ID$PARENT_ID$NAME$MDR_ADMINISTEREDITEM$ADMINISTEREDITEMTYPE=5 and PARENT_ID=0 and REGISTRATION_ID=[1]$ and ADMINISTEREDITEMTYPE=5",
			_customButton:[{
								id:'btnEnum',
								text:'Giá trị cho phép',
								func:function() {
									console.log('customButton');	
									
								}
							}
			               ],
            valid_ar: [
                {name: 'txtNAME', display: 'Tên thực thể', rules: 'required'},
                {name: 'txtITEM_UID', display: 'Mã số', rules: 'required'},
                {name: 'cboITEM_TYPE', display: 'Loại', rules: 'required'},
                {name: 'cboPARENT_ID', display: 'Hạng mục cha', rules: 'required'},
                {name: 'txtDE_TECHNICALNAME', display: 'Tên kỹ thuật', rules: 'required'},
                {name: 'txtDEFINITION', display: 'Định nghĩa', rules: 'required'}
            ],
            _template: "Property"
    };
    opt['PropertyView'] = {
    		_title:'Xem phần tử dữ liệu',
    		_mode:'view',
    		_param:sys_par,
            _filter: [
                ['cboCONTEXTID', 'select id,name from MDR_ADMINISTEREDITEM WHERE ADMINISTEREDITEMTYPE=1', '', 'N'],
                ['cboREGISTRATION_ID', 'select id,name from MDR_REGISTRATION a where contextid=[0] order by name', 'cboCONTEXTID', 'Y']
            ],
            _tableName: 'MDR_ADMINISTEREDITEM',
            _keyField: 'ID',
            _gridHeader: '#master_checkbox,Mã số,ID,Tên thuộc tính,Loại,Kiểu dữ liệu,Kích thước,Độ chính xác@3,8,0,32,15,20,10,10;left,left,left,left,left,left,left,left;ch,ro,ro,ro,ro,ro,ro,ro;int,int,int,str,str,str,str,int,int',
            _gridSQL: "select 0,a.ITEM_UID,A.ID,A.NAME,b.name item_type,(CASE WHEN a.item_type=2 THEN COALESCE(e.NAME,c.datatypename) ELSE d.name END) data_type,a.de_precision,a.vd_decimalplace from (((MDR_ADMINISTEREDITEM a LEFT JOIN MDR_ITEMTYPE b on a.item_type=b.id) LEFT JOIN MDR_DATATYPE C on a.vd_datatypeid=c.id) LEFT JOIN MDR_ADMINISTEREDITEM d ON a.ref_id=d.id) LEFT JOIN MDR_ADMINISTEREDITEM e ON a.DE_VALUEDOMAINID=e.id where a.ADMINISTEREDITEMTYPE=6 and a.registration_id=[1] and a.parent_id=[A] ORDER BY a.ITEM_UID",
            _comboList: [
                ["cboITEM_TYPE", "SELECT id, name FROM MDR_ITEMTYPE where id in (2,3)","","","",cboITEM_TYPE_change],
                ["cboVD_DATATYPEID", "SELECT id, datatypename FROM MDR_DATATYPE","","",""],
                ["cboPARENT_ID", "SELECT id, name FROM MDR_ADMINISTEREDITEM WHERE id =[0]","", "0","Gốc"],
                ["cboREF_ID", "SELECT id, name FROM MDR_ADMINISTEREDITEM WHERE ADMINISTEREDITEMTYPE=5 and item_type=1","", "0",""],
            ],
            _data: [
    			['N', 'cbo', 'CONTEXTID', 'E',''],
    			['N', 'cbo', 'REGISTRATION_ID', 'E',''],
                ['N', 'cbo', 'ID', 'E',''],
                ['S', 'txt', 'NAME', 'E',''],
                ['S', 'txt', 'ITEM_UID', 'R',''],
                ['N', 'cbo', 'ITEM_TYPE', 'E',''],
                ['N', 'cbo', 'REF_ID', 'E',''],
                ['N', 'cbo', 'VD_DATATYPEID', 'E',''],
                ['N', 'txt', 'DE_PRECISION', 'E',''],
                ['N', 'txt', 'VD_DECIMALPLACE', 'E',''],
                ['N', 'cbo', 'PARENT_ID', 'E',''],
                ['S', 'txt', 'DE_TECHNICALNAME', 'E',''],
                ['S', 'txt', 'DEFINITION', 'E',''],
                ['S', 'txt', 'VD_FORMAT', 'E',''],
                ['N', 'non', 'ADMINISTEREDITEMTYPE', 'E','6']
            ],
            _formSQL: 'SELECT ID,NAME,ITEM_UID,ITEM_TYPE,REF_ID,PARENT_ID,DE_TECHNICALNAME,DEFINITION,VD_DATATYPEID,DE_PRECISION,VD_DECIMALPLACE,VD_FORMAT FROM MDR_ADMINISTEREDITEM a where a.ID=[0]',
            _onSave:function (_mode,_id,_obj) {
            	//console.log("_onSave _mode="+_mode+" _id="+_id);
            	//var rt=jsonrpc.AjaxJson.ajaxCALL_MYSQL_SP_I("{?=call fnc_save_item(?,?,?)}",_mode+"$6$"+_id,"S,I,I");
            },
            _onDelete:function (_id) {
            	//console.log("_onDelete _id="+_id);
            	//var rt=jsonrpc.AjaxJson.ajaxCALL_MYSQL_SP_I("{?=call fnc_delete_item(?,?)}","6$"+_id,"I,I");
            },
            _updateSQL: [],
            _deleteSQL: [],
            _treeSQL: "ID$PARENT_ID$NAME$MDR_ADMINISTEREDITEM$ADMINISTEREDITEMTYPE=5 and PARENT_ID=0 and REGISTRATION_ID=[1]$ and ADMINISTEREDITEMTYPE=5",
			_customButton:[
			               ],
            valid_ar: [
                {name: 'txtNAME', display: 'Tên thực thể', rules: 'required'},
                {name: 'txtITEM_UID', display: 'Mã số', rules: 'required'},
                {name: 'cboITEM_TYPE', display: 'Loại', rules: 'required'},
                {name: 'cboPARENT_ID', display: 'Hạng mục cha', rules: 'required'},
                {name: 'txtDE_TECHNICALNAME', display: 'Tên kỹ thuật', rules: 'required'},
                {name: 'txtDEFINITION', display: 'Định nghĩa', rules: 'required'}
            ],
            _template: "Property"
    };
    opt['ObjectClass'] = {
    	_title:'Quản lý lớp đối tượng',
    	_mode:'',
    	_param:sys_par,
        _filter: [
            ['cboCONTEXTID', 'select id,name from MDR_ADMINISTEREDITEM WHERE ADMINISTEREDITEMTYPE=1', '', 'N'],
            ['cboREGISTRATION_ID', 'select id,name from MDR_REGISTRATION a where contextid=[0] [S2] order by name', 'cboCONTEXTID', 'Y']
        ],
        _tableName: 'MDR_ADMINISTEREDITEM',
        _keyField: 'ID',
        _gridHeader: '#master_checkbox,Mã số,ID,Tên thực thể,Tên kỹ thuật,Định nghĩa,Loại@3,8,0,32,15,32,10;left,left,left,left,left,left,left;ch,ro,ro,ro,ro,ro,ro;int,int,int,str,str,str,int,int',
        _gridSQL: "select 0,a.ITEM_UID,A.ID,A.NAME,A.de_TECHNICALNAME,A.DEFINITION,B.NAME ITEM_TYPE from MDR_ADMINISTEREDITEM a LEFT JOIN MDR_ITEMTYPE b on a.item_type=b.id where a.registration_id=[1] and a.parent_id=[A] ORDER BY a.ITEM_UID",
        _comboList: [
            ["cboITEM_TYPE", "SELECT id, name FROM MDR_ITEMTYPE where id=1","","",""],
            ["cboPARENT_ID", "SELECT id, name FROM MDR_ADMINISTEREDITEM WHERE id =[0]", "","0","Gốc"]
        ],
        _data: [
			['N', 'cbo', 'CONTEXTID', 'E',''],
			['N', 'cbo', 'REGISTRATION_ID', 'E',''],
            ['N', 'cbo', 'ID', 'E',''],
            ['S', 'txt', 'NAME', 'E',''],
            ['S', 'txt', 'ITEM_UID', 'E',''],
            ['N', 'cbo', 'ITEM_TYPE', 'E',''],
            ['N', 'cbo', 'PARENT_ID', 'E',''],
            ['S', 'txt', 'DE_TECHNICALNAME', 'E',''],
            ['S', 'txt', 'DEFINITION', 'E',''],
            ['N', 'non', 'ADMINISTEREDITEMTYPE', 'E','5']
        ],
        _formSQL: 'SELECT CONTEXTID,REGISTRATION_ID,ID,NAME,ITEM_UID,ITEM_TYPE,PARENT_ID,DE_TECHNICALNAME,DEFINITION FROM MDR_ADMINISTEREDITEM a where a.ID=[0]',
        _onSave:function (_mode,_id,_obj) {
        	console.log("_onSave _mode="+_mode+" _id="+_id);
        	var rt=jsonrpc.AjaxJson.ajaxCALL_MYSQL_SP_I("{?=call fnc_save_item(?,?,?)}",_mode+"$5$"+_id,"S,I,I");
        },
        _onDelete:function (_id) {
        	console.log("_onDelete _id="+_id);
        	var rt=jsonrpc.AjaxJson.ajaxCALL_MYSQL_SP_I("{?=call fnc_delete_item(?,?)}","5$"+_id,"I,I");
        },
        _updateSQL: [],
        _deleteSQL: ['delete from MDR_ADMINISTEREDITEM WHERE ID =[0]'],
        _treeSQL: "ID$PARENT_ID$NAME$MDR_ADMINISTEREDITEM$ADMINISTEREDITEMTYPE=5 and PARENT_ID=0 and REGISTRATION_ID=[1]$ and ADMINISTEREDITEMTYPE=5",
        _customButton:[],
        valid_ar: [
            {name: 'txtNAME', display: 'Tên thực thể', rules: 'required'},
            {name: 'txtITEM_UID', display: 'Mã số', rules: 'required'},
            {name: 'cboITEM_TYPE', display: 'Loại', rules: 'required'},
            {name: 'cboPARENT_ID', display: 'Hạng mục cha', rules: 'required'},
            {name: 'txtDE_TECHNICALNAME', display: 'Tên kỹ thuật', rules: 'required'},
            {name: 'txtDEFINITION', display: 'Định nghĩa', rules: 'required'}
        ],
        _template: "ObjectClass"
    };
*/