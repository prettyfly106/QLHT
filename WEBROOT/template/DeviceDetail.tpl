<span class="fa fa-times fa-lg info-close" target="deviceDetail"></span>
<div class="panel panel-default sm">
	<div class="panel-heading"  data-i18n="title">CHI TIẾT THIẾT BỊ</div>
    <div class="panel-body" >    	     
        <div class="form-group tab active" id="portInfo">
        	<input type="hidden" id="txtPORT_ID"> 
            <div class="col-xs-2 control-label" data-i18n="code" >Slot</div>
            <div class="col-xs-4">
				<select id="cboSLOT_INDEX" name="cboSLOT_INDEX" class="form-control input-sm" style="width:100%;"></select>
            </div>
            <div class="col-xs-2 control-label" data-i18n="code" >Card</div>
            <div class="col-xs-4">
				<select id="cboCARD_INDEX" name="cboCARD_INDEX" class="form-control input-sm" style="width:100%;"></select>
            </div>
            <hr />
            <div class="col-xs-2 control-label " data-i18n="code">Mã Port</div>
            <div class="col-xs-4"><input class="form-control input-sm" id="txtPORT_CODE" name="txtPORT_CODE" title="">
            </div>
            <div class="col-xs-2 control-label " data-i18n="code">IP</div>
            <div class="col-xs-4"><input class="form-control input-sm" id="txtPORT_IP" name="txtPORT_IP" title="">
            </div>
            <div class="col-xs-2 control-label " data-i18n="code">Mô tả</div>
            <div class="col-xs-10"><input class="form-control input-sm" id="txtDESCRIPTION" name="txtDESCRIPTION" title="">
            </div>
            <div class="col-xs-2 control-label " data-i18n="code">Ghi chú</div>
            <div class="col-xs-10"><input class="form-control input-sm" id="txtNOTE" name="txtNOTE" title="">
            </div>           
            <div class="col-xs-12 text-right">				
            	<button class="btn btn-primary btn-sm" id="btnSavePort" data-i18n="save">Lưu</button>            	
            </div>
            <div class="col-xs-12">
            	<table id="grdPortList"></table><div id="pager_grdPortList"></div>
          	</div>                         
                         
        </div>
    </div>
</div>