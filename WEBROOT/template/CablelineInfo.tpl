<span class="fa fa-times fa-lg info-close" id="btnClose"></span>
<div class="panel panel-default sm">
	<div class="panel-heading"  data-i18n="title">THÔNG TIN CÁP</div>
    <div class="panel-body">     
        <div class="form-group" id="mainInfo">
        	<input type="hidden" id="txtCABLELINE_ID">
        	<div class="col-xs-3 control-label" data-i18n="type_group">Nhóm loại cáp</div>
            <div class="col-xs-9">
        	<select id="cboCABLETYPE_GROUP_ID" name="cboCABLETYPE_GROUP_ID" class="form-control input-sm select2" style="width:100%;"></select>
        	</div>
        	<div class="col-xs-3 control-label" data-i18n="type">Loại Cáp</div>
            <div class="col-xs-9">
        	<select id="cboCABLETYPE_ID" name="cboCABLETYPE_ID" class="form-control input-sm select2"></select>
        	</div>        	
        	<div class="col-xs-3 control-label required" data-i18n="code">Mã Cáp</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtCABLELINE_CODE" name="txtCABLELINE_CODE" title="">
            </div>
            <div class="col-xs-3 control-label  required" data-i18n="description">Mô tả</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtDESCRIPTION" name="txtDESCRIPTION" title="">
            </div>            
        	<div class="col-xs-3 control-label  required" data-i18n="capacity">Dung lượng</div>
            <div class="col-xs-3">
            	<select id="cboCAPACITY" name="cboCAPACITY" class="form-control input-sm" style="width:100%;"></select>
            </div>
            <div class="col-xs-3 control-label required" data-i18n="distance">Khoảng cách</div>
            <div class="col-xs-3"><input class="form-control input-sm" id="txtDISTANCE" name="txtDISTANCE" title="">
            </div>
            <div class="col-xs-12">
            	<table id="grdCableline"></table><div id="pager_grdCableline"></div>
          	</div>            
            <div class="col-xs-12 text-right">            	
            	<button class="btn btn-primary btn-sm" id="btnSave" data-i18n="save"></button>
            	<button class="btn btn-danger btn-sm" id="btnDelete" data-i18n="delete"></button>
            	<button class="btn btn-default btn-sm" id="btnCancel" data-i18n="cancel"></button>
            </div>            
        </div>        
    </div>
</div>