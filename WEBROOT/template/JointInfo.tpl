<span class="fa fa-times fa-lg info-close" id="btnClose"></span>
<div class="panel panel-default sm">
	<div class="panel-heading"  data-i18n="title">THÔNG TIN MĂNG XÔNG</div>
    <div class="panel-body">        
        <div class="form-group" id="mainInfo">
        	<input type="hidden" id="txtJOINT_ID">                   
            <div class="col-xs-3 control-label required" data-i18n="code">Mã măng xông</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtJOINT_CODE" name="txtCABLETYPE_CODE" title="">
            </div>            
            <div class="col-xs-3 control-label" data-i18n="address">Địa chỉ</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtADDRESS" name="txtADDRESS" title="">
            </div>
            <div class="col-xs-3 control-label " data-i18n="reason">Nguyên nhân</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtREASON" name="txtREASON" title="">
            </div>
            <div class="col-xs-3 control-label " data-i18n="start_date">Ngày SD</div>
            <div class="col-xs-4">
            	<div class="input-group">								  
				  <input class="form-control input-sm required" id="txtSTART_DATE" name="txtSTART_DATE" title="" >
				  <span class="btn input-group-addon datepicker-sm glyphicon glyphicon-calendar" type="sCal"  onclick="NewCssCal('txtSTART_DATE','ddMMyyyy','dropdown',true,'24',true)"></span>
				</div>
            </div>
            <div class="col-xs-3 control-label  required" data-i18n="capacity">Dung lượng</div>
            <div class="col-xs-2"><input class="form-control input-sm" id="txtCAPACITY" name="txtCAPACITY" title="">
            </div>            
            <div class="col-xs-3 control-label " data-i18n="type">Loại Măng xông</div>
            <div class="col-xs-9">  
            	<input type="checkbox" class="input-sm" style="margin-bottom:5px !important;height:20px !important;" id="chkIS_HANG_MANTLE" value="first_checkbox"> <span data-i18n="hang_joint"></span>
            	<input type="checkbox" class="input-sm" style="margin-left:10px;margin-bottom:5px !important;height:20px !important;" id="chkIS_DROP_MANTLE" value="first_checkbox"> <span data-i18n="drop_joint"></span>
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
    </div>        
    </div>