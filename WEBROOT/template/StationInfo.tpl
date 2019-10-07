<span class="fa fa-times fa-lg info-close" id="btnClose"></span>
<div class="panel panel-default sm">
	<div class="panel-heading"  data-i18n="title">THÔNG TIN NHÀ TRẠM</div>
    <div class="panel-body">
        <ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
	        <li role="presentation" class="active"><a href="#mainInfo" data-toggle="tab" data-i18n="main_info"></a></li>
	        <li role="presentation" id="tDevice"><a href="#deviceInfo" data-toggle="tab" data-i18n="device_info"></a></li>
	        <li role="presentation" id="tDCDevice"><a href="#DCDeviceInfo" data-toggle="tab" data-i18n="dc_device_info"></a></li>
	        <li role="presentation" id="tAccessory"><a href="#AccessoryInfo" data-toggle="tab" data-i18n="accessory_info"></a></li>
	        <li role="presentation" id="tODF"><a href="#odfInfo" data-toggle="tab" data-i18n="odf_info"></a></li>
	    </ul>
        <div class="form-group tab active" id="mainInfo">
        	<input type="hidden" id="txtSTATION_ID">
            <div class="col-xs-3 control-label" data-i18n="type">Loại nhà trạm</div>
            <div class="col-xs-9">
        	<select id="cboSTATIONTYPE_ID" name="cboSTATIONTYPE_ID" class="form-control input-sm select2"></select>
        	</div>
            <div class="col-xs-3 control-label" data-i18n="owner">Đơn vị quản lý</div>
            <div class="col-xs-9">
        	<select id="cboOWNER_ID" name="cboOWNER_ID" class="form-control input-sm select2"></select>
        	</div>       
            <div class="col-xs-3 control-label required" data-i18n="code">Mã nhà trạm</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtSTATION_CODE" name="txtCABLETYPE_CODE" title="">
            </div>
            <div class="col-xs-3 control-label required" data-i18n="name">Tên nhà trạm</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtSTATION_NAME" name="txtCABLETYPE_NAME" title="" >
            </div>        
            <div class="col-xs-3 control-label required" data-i18n="address">Địa chỉ</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtSTATION_ADDRESS" name="txtSTATION_ADDRESS" title="">
            </div>
            <div class="col-xs-3 control-label " data-i18n="note">Ghi chú</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtNOTE" name="txtNOTE" title="">
            </div>
            <div class="col-xs-3 control-label" data-i18n="start_year">Năm sử dụng</div>
            <div class="col-xs-3"><input class="form-control input-sm" id="txtSTART_YEAR" name="txtSTART_YEAR" title="" >
            </div>    
            <div class="col-xs-3 control-label" data-i18n="phone">Đt liên hệ</div>
            <div class="col-xs-3"><input class="form-control input-sm" id="txtCONTACT_PHONE" name="txtCONTACT_PHONE" title="" >
            </div>       
            <div class="col-xs-3 control-label" data-i18n="locality">Thuộc vùng</div>
            <div class="col-xs-9">
        	<select id="cboLOCALITY_ID" name="cboLOCALITY_ID" class="form-control input-sm select2"></select>
        	</div>
            <div class="col-xs-3 control-label" data-i18n="city">Tỉnh/TP</div>
            <div class="col-xs-9">
            <input type="hidden" id="txtCITY_NAME">
        	<select id="cboCITY_CODE" name="cboCITY_CODE" class="form-control input-sm select2"></select>
        	</div>        
            <div class="col-xs-3 control-label" data-i18n="district">Quận/Huyện</div>
            <div class="col-xs-9">
            <input type="hidden" id="txtDISTRICT_NAME">
        	<select id="cboDISTRICT_CODE" name="cboDISTRICT_CODE" class="form-control input-sm select2"></select>
        	</div>
            <div class="col-xs-3 control-label" data-i18n="wards">Phường/xã</div>
            <div class="col-xs-9">
            <input type="hidden" id="txtWARDS_NAME">
        	<select id="cboWARDS_CODE" name="cboWARDS_CODE" class="form-control input-sm select2"></select>
        	</div>
        	<div class="col-xs-3 control-label" data-i18n="centre">TT VT</div>
            <div class="col-xs-9">            
        	<select id="cboCENTRE_ID" name="cboCENTRE_ID" class="form-control input-sm select2"></select>
        	</div>       
            <div class="col-xs-2 control-label" data-i18n="lat">Vĩ độ</div>
            <div class="col-xs-4"><input class="form-control input-sm" id="txtLATITUDE" name="txtLATITUDE" title="">
            </div>
            <div class="col-xs-2 control-label" data-i18n="lng">Kinh độ</div>
            <div class="col-xs-4"><input class="form-control input-sm" id="txtLONGITUDE" name="txtLONGITUDE" title="" >
            </div>
            <div class="col-xs-6 text-left">            	
            	<button class="btn btn-primary btn-sm" id="btnGeoCode" data-i18n="geocode"></button>            	
            	<button class="btn btn-primary btn-sm" id="btnConnectManager" data-i18n="connect"></button>
            </div>
            <div class="col-xs-6 text-right">            	
            	<button class="btn btn-primary btn-sm" id="btnSave" data-i18n="save"></button>
            	<button class="btn btn-danger btn-sm" id="btnDelete" data-i18n="delete"></button>
            	<button class="btn btn-default btn-sm" id="btnCancel" data-i18n="cancel"></button>
            </div>            
        </div>
        <div class="form-group tab" id="deviceInfo">
        	<input type="hidden" id="txtDEVICE_ID">
        	<div class="col-xs-3 control-label" data-i18n="device_type_group">Nhóm loại TB</div>
            <div class="col-xs-9">
        	<select id="cboDEVICETYPE_GROUP_ID" name="cboDEVICETYPE_GROUP_ID" class="form-control input-sm select2" style="width:100%;"></select>
        	</div>
        	<div class="col-xs-3 control-label" data-i18n="device_type">Nhóm loại TB</div>
            <div class="col-xs-9">
        	<select id="cboDEVICETYPE_ID" name="cboDEVICETYPE_ID" class="form-control input-sm select2" style="width:100%;"></select>
        	</div>
        	<div class="col-xs-3 control-label required" data-i18n="manufacture">Nhà sản xuất</div>
            <div class="col-xs-9">
            <select id="cboMANUFACTURE_ID" name="cboMANUFACTURE_ID" class="form-control input-sm select2" style="width:100%;"></select>        	
        	</div>             
        	<div class="col-xs-3 control-label required" data-i18n="inf_device">Chủng loại TB</div>
            <div class="col-xs-9">
            <select id="cboINF_DEVICE_ID" name="cboINF_DEVICE_ID" class="form-control input-sm select2" style="width:100%;"></select>        	
        	</div>
        	<div class="col-xs-3 control-label required" data-i18n="device_code">Mã TB</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtDEVICE_CODE" name="txtDEVICE_CODE" title="">
            </div>            
        	<div class="col-xs-3 control-label required" data-i18n="device_class">Cấp TB</div>
            <div class="col-xs-9">
        	<input class="form-control input-sm" id="txtSUBCLASS" name="txtSUBCLASS" title="" >
        	</div>        	
        	<div class="col-xs-2 control-label  required">Serial</div>
            <div class="col-xs-4" style="width:38%"><input class="form-control input-sm" id="txtSERIAL" name="txtSERIAL" title="">
            </div>
            <div class="col-xs-2 control-label required "  style="width:13%">IP</div>
            <div class="col-xs-4" style="width:32%"><input class="form-control input-sm" id="txtIP_ADDRESS" name="txtIP_ADDRESS" title="" >
            </div>
            <div class="col-xs-2 control-label  required" data-i18n="start_date">Ngày SD</div>
            <div class="col-xs-4"  style="width:38%">
            	<div class="input-group">								  
				  <input class="form-control input-sm" id="txtSTART_DATE" name="txtSTART_DATE" title="" >
				  <span class="btn input-group-addon datepicker-sm glyphicon glyphicon-calendar" type="sCal"  onclick="NewCssCal('txtSTART_DATE','ddMMyyyy','dropdown',true,'24',true)"></span>
				</div>            
            </div>
            <div class="col-xs-6 text-left" >
            	<button class="btn btn-primary btn-sm" id="btnDeviceDetail" data-i18n="detail"></button>
            	<button class="btn btn-primary btn-sm" id="btnDeviceSetup" data-i18n="setup"></button>            	
            </div>
            <div class="col-xs-6 text-right"  >
            	<button class="btn btn-default btn-sm" id="btnNewDevice" data-i18n="add_new"></button>
            	<button class="btn btn-primary btn-sm" id="btnSaveDevice" data-i18n="save"></button>
            	<button class="btn btn-danger btn-sm" style="display:none;" id="btnDeleteDevice" data-i18n="delete"></button>
            </div>
             <div class="col-xs-12">
            	<table id="grdDevice"></table><div id="pager_grdDevice"></div>
          	</div>
        </div>
        <div class="form-group tab" id="DCDeviceInfo">
        	<input type="hidden" id="dc_txtDC_DEVICE_ID">
        	<div class="col-xs-4 control-label" data-i18n="device_type_group">Nhóm loại TB</div>
            <div class="col-xs-8">
        	<select id="dc_cboDC_DEVICE_GROUP_ID" name="dc_cboDC_DEVICE_GROUP_ID" class="form-control input-sm select2" style="width:100%;"></select>
        	</div>
        	<div class="col-xs-4 control-label required" data-i18n="device_code">Mã thiết bị</div>
            <div class="col-xs-8">
        	<input class="form-control input-sm" id="dc_txtDC_DEVICE_CODE" name="dc_txtDC_DEVICE_CODE" title="" >
        	</div>
        	<div class="col-xs-4 control-label " data-i18n="manufacture">Nhà sản xuất</div>
            <div class="col-xs-8">
        	<input class="form-control input-sm" id="dc_txtMANUFACTURE" name="txtMANUFACTURE" title="" >
        	</div>        	
            <div class="col-xs-4 control-label  " id="lSerial">Serial</div>
            <div class="col-xs-8"  id="iSerial"><input class="form-control input-sm" id="dc_txtSERIAL" name="dc_txtSERIAL" title="">
            </div> 
        	<div class="col-xs-2 control-label  " data-i18n="start_date" style="width:15%">Ngày SD</div>
            <div class="col-xs-4"  style="width:35%">
            	<div class="input-group">								  
				  <input class="form-control input-sm" id="dc_txtSTART_DATE" name="dc_txtSTART_DATE" title="" style="font-size:11.5px;" >
				  <span class="btn input-group-addon datepicker-sm glyphicon glyphicon-calendar" type="sCal"  onclick="NewCssCal('dc_txtSTART_DATE','ddMMyyyy','dropdown',true,'24',true)"></span>
				</div>            
            </div>  
            <div class="col-xs-2 control-label  "   id="lCapacity" style="width:15%">Công suất</div>
            <div class="col-xs-4"  style="width:35%" id="iCapacity"><input class="form-control input-sm" id="dc_txtCAPACITY" name="dc_txtCAPACITY" title="">
            </div>
             <div class="col-xs-2 control-label  "  style="width:15%" id="lQuanlity">Số lượng</div>
            <div class="col-xs-4"   style="width:35%" id="iQuanlity">
            	<input class="form-control input-sm" id="dc_txtQUANTITY" name="dc_txtQUANTITY" title="">
            	<select id="dc_cboQUANTITY" name="dc_cboQUANTITY" class="form-control input-sm select2" style="width:100%;"></select>
            </div> 
             <div class="col-xs-2 control-label  "  style="width:15%" data-i18n="tension" id="lTension">Điện áp</div>
            <div class="col-xs-4"  style="width:35%" id="iTension"><input class="form-control input-sm" id="dc_txtTENSION" name="dc_txtTENSION" title="">
            </div>                   	
            <div class="col-xs-12 text-right"  >
            	<button class="btn btn-default btn-sm" id="btnNewDCDevice" data-i18n="add_new"></button>
            	<button class="btn btn-primary btn-sm" id="btnSaveDCDevice" data-i18n="save"></button>
            	<button class="btn btn-danger btn-sm" style="display:none;" id="btnDeleteDCDevice" data-i18n="delete"></button>
            </div>
             <div class="col-xs-12">
            	<table id="grdDCDevice"></table><div id="pager_grdDCDevice"></div>
          	</div>
        </div>
        <div class="form-group tab" id="AccessoryInfo">        	
        	<div class="col-xs-6 control-label">
        		<input type="checkbox" style="margin-bottom:5px !important;height:20px !important;" id="chkDOOR_SENSOR" > <span data-i18n="door_sensor"></span>
        	</div>
        	<div class="col-xs-6 control-label">
        		<input type="checkbox" style="margin-bottom:5px !important;height:20px !important;" id="chkSMOKE_SENSOR" > <span data-i18n="smoke_sensor"></span>
        	</div>
        	<div class="col-xs-6 control-label">
        		<input type="checkbox" style="margin-bottom:5px !important;height:20px !important;" id="chkFIRE_SENSOR" > <span data-i18n="fire_sensor"></span>
        	</div>
        	<div class="col-xs-6 control-label">
        		<input type="checkbox" style="margin-bottom:5px !important;height:20px !important;" id="chkCAPTURED_CAMERA" > <span data-i18n="captured_camera"></span>
        	</div>
        	<div class="col-xs-6 control-label">
        		<input type="checkbox" style="margin-bottom:5px !important;height:20px !important;" id="THERMOMETER" > <span data-i18n="thermometer"></span>
        	</div>
        	<div class="col-xs-6 control-label">
        		<input type="checkbox" style="margin-bottom:5px !important;height:20px !important;" id="FAN" > <span data-i18n="fan"></span>
        	</div>                 	
            <div class="col-xs-12 text-right"  >            	
            	<button class="btn btn-primary btn-sm" id="btnSaveAccessory" data-i18n="save"></button>            	
            </div>
                         
        </div>
        <div class="form-group tab" id="odfInfo">
        	<input type="hidden" id="odf_txtODF_INDOOR_ID">        	
        	<div class="col-xs-3 control-label required" data-i18n="odf_code">Mã ODF</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="odf_txtODF_INDOOR_CODE" name="txtODF_INDOOR_CODE" title="">
            </div>
            <div class="col-xs-3 control-label  required" data-i18n="start_date">Ngày SD</div>
            <div class="col-xs-4">
            	<div class="input-group">								  
				  <input class="form-control input-sm" id="odf_txtSTART_DATE" name="txtSTART_DATE" title="" >
				  <span class="btn input-group-addon datepicker-sm glyphicon glyphicon-calendar" type="sCal"  onclick="NewCssCal('odf_txtSTART_DATE','ddMMyyyy','dropdown',true,'24',true)"></span>
				</div>            
            </div>            
        	<div class="col-xs-2 control-label  required" data-i18n="capacity">Dung lượng</div>
            <div class="col-xs-2"><input class="form-control input-sm" id="odf_txtCAPACITY" name="txtCAPACITY" title="">
            </div>
            <div class="col-xs-12 text-right">
            	<button class="btn btn-default btn-sm" id="btnNewODF" data-i18n="add_new"></button>
            	<button class="btn btn-primary btn-sm" id="btnSaveODF" data-i18n="save"></button>
            	<button class="btn btn-danger btn-sm" style="display:none;" id="btnDeleteODF" data-i18n="delete"></button>
            </div>
             <div class="col-xs-12">
            	<table id="grdODF"></table><div id="pager_grdODF"></div>
          	</div>
        </div>
    </div>