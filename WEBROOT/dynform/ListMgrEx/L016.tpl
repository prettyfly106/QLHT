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
            <div class="col-md-2 control-label" data-i18n="manufacture">Nhà sản xuất</div>
            <div class="col-md-4"><select id="cboMANUFACTURE_ID" name="cboMANUFACTURE_ID" class="form-control input-sm " style="width:100%;"></select>
            </div>            
        </div>        
</fieldset>
<fieldset>
        <legend data-i18n="title">QUẢN LÝ DANH MỤC CARD</legend>
        <div class="row form-group required">
            <div class="col-md-2 control-label" data-i18n="type">Loại card</div>
            <div class="col-md-4">
            	<select id="cboINF_CARD_TYPE" name="cboINF_CARD_TYPE" class="form-control input-sm " style="width:100%;">
            		<option value="0">Theo TB (Fixed)</option>
            		<option value="1">Rời (removeable)</option>
            	</select>
            </div>
            <div class="col-md-2 control-label" data-i18n="product_num"></div>
            <div class="col-md-4"><input class="form-control input-sm" id="txtPRODUCT_NUM" title="">
            </div>
            <div class="col-md-2 control-label" data-i18n="compatible">TB Tương thích</div>
            <div class="col-md-4">
            	<select id="cboDEVICE_COMPATIBLE" name="cboDEVICE_COMPATIBLE" multiple class="form-control input-sm " style="width:100%; height:100px !important;">            	
            	</select>
            </div>           
        </div>
    </fieldset>