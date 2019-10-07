<fieldset>
    <legend data-i18n="search">Tìm kiếm</legend>
    <div class="row form-group form-group-sm">
    	<div class="col-md-2 control-label" data-i18n="user_group">User group</div>
        <div class="col-md-4">
        	<select id="cboUSER_GROUP_ID" name="cboUSER_GROUP_ID" class="form-control input-sm"></select>
        </div>        
        <div class="col-md-2" data-i18n="provice">Provice</div>
        <div class="col-md-4"><select class="form-control input-sm" id="cboCITY_CODE"></select></div>		
        
    </div>
</fieldset>
<fieldset>
    <legend data-i18n="user_manager">QUẢN LÝ NGƯỜI DÙNG</legend>
    <div class="row form-group required">
        <div class="col-md-2 control-label" data-i18n="user_name">Tên đăng nhập</div>
        <div class="col-md-4"><input class="form-control input-sm" id="txtUSER_NAME" name="txtUSER_NAME" valrule="Tên đăng nhập,trim_required" title="">
        </div>
        <div class="col-md-2 control-label"data-i18n="full_name">Tên hiển thị</div>
        <div class="col-md-4"><input class="form-control input-sm" id="txtFULL_NAME" name="txtFULL_NAME" valrule="Tên hiển thị,trim_required" title="" >
        </div>
    </div>
	<div class="row form-group required">
        <div class="col-md-2 control-label" data-i18n="pass_word">Mật khẩu</div>
        <div class="col-md-4"><input type="password" class="form-control input-sm" id="txtUSER_PWD" name="txtUSER_PWD" valrule="Mật khẩu,trim_required" title="">
        </div>
        <div class="col-md-2" data-i18n="centre">Tech Centre</div>
        <div class="col-md-4"><select class="form-control input-sm" id="cboCENTER_ID"></select></div>
        <div class="col-md-2 control-label" data-i18n="user_level">Mức truy cập HT</div>
        <div class="col-md-4">
        	<select id="cboUSER_LEVEL" name="cboUSER_LEVEL" class="form-control input-sm">
				<option value="-1" selected="selected"  data-i18n="pick_level">- Chọn mức truy cập -</option>
				<option value="0">0</option>
				<option value="1">1</option>
				<option value="2">2</option>
			</select>
        </div>
    </div>
</fieldset>