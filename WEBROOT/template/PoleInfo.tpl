<span class="fa fa-times fa-lg info-close" id="btnClose"></span>
<div class="panel panel-default sm">
	<div class="panel-heading"  data-i18n="title">THÔNG TIN CỘT</div>
    <div class="panel-body">      
        <div class="form-group" id="mainInfo">
        	<input type="hidden" id="txtPOLE_ID">
            <div class="col-xs-3 control-label" data-i18n="type">Loại cột</div>
            <div class="col-xs-9">
        	<select id="cboPOLETYPE_ID" name="cboPOLETYPE_ID" class="form-control input-sm select2"></select>
        	</div>
            <div class="col-xs-3 control-label" data-i18n="owner">Đơn vị quản lý</div>
            <div class="col-xs-9">
        	<select id="cboOWNER_ID" name="cboOWNER_ID" class="form-control input-sm select2"></select>
        	</div>       
            <div class="col-xs-3 control-label required" data-i18n="code">Mã cột</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtPOLE_CODE" name="txtCABLETYPE_CODE" title="">
            </div>
            <div class="col-xs-3 control-label required" data-i18n="name">Tên cột</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtPOLE_NAME" name="txtCABLETYPE_NAME" title="" >
            </div>        
            <div class="col-xs-3 control-label required" data-i18n="address">Địa chỉ</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtADDRESS" name="txtADDRESS" title="">
            </div>
            <div class="col-xs-3 control-label " data-i18n="note">Ghi chú</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtNOTE" name="txtNOTE" title="">
            </div>           
            <div class="col-xs-3 control-label" data-i18n="city">Tỉnh/TP</div>
            <div class="col-xs-9">
        	<select id="cboCITY_CODE" name="cboCITY_CODE" class="form-control input-sm select2"></select>
        	</div>
            <div class="col-xs-3 control-label" data-i18n="district">Quận/Huyện</div>
            <div class="col-xs-9">
        	<select id="cboDISTRICT_CODE" name="cboDISTRICT_CODE" class="form-control input-sm select2"></select>
        	</div>
            <div class="col-xs-3 control-label" data-i18n="wards">Phường/xã</div>
            <div class="col-xs-9">
        	<select id="cboWARDS_CODE" name="cboWARDS_CODE" class="form-control input-sm select2"></select>
        	</div>       
            <div class="col-xs-2 control-label" data-i18n="lat">Vĩ độ</div>
            <div class="col-xs-4"><input class="form-control input-sm" id="txtLATITUDE" name="txtLATITUDE" title="">
            </div>
            <div class="col-xs-2 control-label" data-i18n="lng">Kinh độ</div>
            <div class="col-xs-4"><input class="form-control input-sm" id="txtLONGITUDE" name="txtLONGITUDE" title="" >
            </div>
            <div class="col-xs-4 text-left">            	
            	<button class="btn btn-primary btn-sm" id="btnGeoCode" data-i18n="geocode"></button>            	
            </div>
            <div class="col-xs-8 text-right">            	
            	<button class="btn btn-primary btn-sm" id="btnSave" data-i18n="save"></button>
            	<button class="btn btn-danger btn-sm" id="btnDelete" data-i18n="delete"></button>
            	<button class="btn btn-default btn-sm" id="btnCancel" data-i18n="cancel"></button>
            </div>            
        </div>        
    </div>
</div>