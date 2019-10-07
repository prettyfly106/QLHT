<fieldset>
        <legend data-i18n="search">Tìm kiếm</legend>
        <div class="row form-group form-group-sm">
            <div class="col-xs-2 control-label" data-i18n="device_type_group">Nhóm loại TB</div>
            <div class="col-xs-4">
        	<select id="cboDEVICETYPE_GROUP_ID" name="cboDEVICETYPE_GROUP_ID" class="form-control input-sm " style="width:100%;"></select>
        	</div>
        	<div class="col-xs-2 control-label" data-i18n="device_type">Nhóm loại TB</div>
            <div class="col-xs-4">
        	<select id="cboDEVICETYPE_ID" name="cboDEVICETYPE_ID" class="form-control input-sm " style="width:100%;"></select>
        	</div>      
            <div class="col-md-2 control-label" data-i18n="card">Card</div>
            <div class="col-md-4"><select id="cboINF_CARD_ID" name="cboMANUFACTURE_ID" class="form-control input-sm " style="width:100%;"></select>
            </div>
        </div>        
</fieldset>
<fieldset>
        <legend data-i18n="title">QUẢN LÝ CHI TIẾT CARD</legend>
        <div class="row form-group required">
            <div class="col-md-2 control-label" data-i18n="card_index">Thứ tự (index)</div>
            <div class="col-md-4">
            	<input type="number" min=0 class="form-control input-sm" id="txtCARD_INDEX" title="">
            </div>
            <div class="col-md-2 control-label" data-i18n="card_type">Loại giao diện</div>
            <div class="col-md-4"><select id="cboCARD_TYPE_ID" name="cboCARD_TYPE_ID" class="form-control input-sm " style="width:100%;"></select>
            </div>
            <div class="col-md-2 control-label" data-i18n="port_num">Số port</div>
            <div class="col-md-4">
            	<input type="number" min=0 class="form-control input-sm" id="txtPORT_NUM" title="">
            </div>
            <div class="col-md-2 control-label" data-i18n="port_speed">Tốc độ</div>
            <div class="col-md-4"><select id="cboPORT_SPEED_ID" name="cboPORT_SPEED_ID" class="form-control input-sm " style="width:100%;"></select>
            </div>
            <div class="col-md-2 control-label" data-i18n="port_prefix">Prefix (FE/GE)</div>
            <div class="col-md-4">
            	<input type="text" min=0 class="form-control input-sm" id="txtPORT_PREFIX" title="">
            </div>    
        </div>
    </fieldset>