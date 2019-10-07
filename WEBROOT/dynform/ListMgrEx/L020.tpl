<fieldset>
        <legend data-i18n="search">Tìm kiếm</legend>
        <div class="row form-group">
            <div class="col-xs-2 control-label" data-i18n="transmission">Chặng truyền dẫn</div>
            <div class="col-xs-4">
        	<select id="cboTRANSMISSION_ID" name="cboTRANSMISSION_ID" class="form-control input-sm " style="width:100%;"></select>
        	</div>
        	<div class="col-xs-2 control-label" data-i18n="transmission_type">Loại truyền dẫn</div>
            <div class="col-xs-4">
        	<select id="cboTRANSMISSION_TYPE_ID" name="cboTRANSMISSION_TYPE_ID" class="form-control input-sm " style="width:100%;"></select>
        	</div> 
        </div>        
</fieldset>
<fieldset>
        <legend data-i18n="title">QUẢN LÝ TUYẾN TRUYỀN DẪN</legend>
        <div class="row form-group required">
            <div class="col-md-1 control-label required" data-i18n="route_index">Thứ tự (index)</div>
            <div class="col-md-2">
            	<input type="number" min=0 class="form-control input-sm" id="txtROUTE_INDEX" title="">
            </div>
            <div class="col-md-1 control-label  required" data-i18n="bandwidth">Tốc độ</div>
            <div class="col-md-2"><input type="number" min=0  class="form-control input-sm" id="txtROUTE_CAPACITY" name="txtROUTE_CAPACITY">
            </div>
            <div class="col-md-1 control-label " data-i18n="city">Tỉnh/TP</div>
            <div class="col-md-2"><select id="cboCITY_CODE" name="cboCITY_CODE" class="form-control input-sm select2" style="width:100%;"></select>
            </div>
            <div class="col-md-1 control-label" data-i18n="tech_centre">Trung tâm VT</div>
            <div class="col-md-2"><select id="cboCENTER_ID" name="cboCENTER_ID" class="form-control input-sm " style="width:100%;"></select>
            </div>
            <div class="col-md-6 control-label" data-i18n="route_b">Điểm đầu tuyến</div>
            <div class="col-md-6 control-label" data-i18n="route_e">Điểm cuối tuyến</div>
            <div class="col-md-1 control-label  required" data-i18n="station">Nhà trạm</div>
            <div class="col-md-2"><select id="cboSTATION_ID_B" name="cboSTATION_ID_B" class="form-control input-sm select2" style="width:100%;"></select>
            </div>           
            <div class="col-md-1 control-label  required" data-i18n="device">Thiết bị</div>
            <div class="col-md-2"><select id="cboDEVICE_ID_B" name="cboDEVICE_ID_B" class="form-control input-sm " style="width:100%;"></select>
            </div>
             <div class="col-md-1 control-label  required" data-i18n="station">Nhà trạm</div>
            <div class="col-md-2"><select id="cboSTATION_ID_E" name="cboSTATION_ID_E" class="form-control input-sm select2" style="width:100%;"></select>
            </div>
            <div class="col-md-1 control-label  required" data-i18n="device">Thiết bị</div>
            <div class="col-md-2"><select id="cboDEVICE_ID_E" name="cboDEVICE_ID_E" class="form-control input-sm " style="width:100%;"></select>
            </div>
            <div class="col-md-1 control-label " data-i18n="port_in">Port vào</div>
            <div class="col-md-2"><select id="cboPORT_ID_B_IN" name="cboPORT_ID_B_IN" class="form-control input-sm select2" style="width:100%;"></select>
            </div>            
            <div class="col-md-1 control-label  required" data-i18n="port_out">Port ra</div>
            <div class="col-md-2"><select id="cboPORT_ID_B_OUT" name="cboPORT_ID_B_OUT" class="form-control input-sm select2" style="width:100%;"></select>
            </div>
            <div class="col-md-1 control-label  required" data-i18n="port_in">Port vào</div>
            <div class="col-md-2"><select id="cboPORT_ID_E_IN" name="cboPORT_ID_E_IN" class="form-control input-sm select2" style="width:100%;"></select>
            </div>
            <div class="col-md-1 control-label" data-i18n="port_out">Port ra</div>
            <div class="col-md-2"><select id="cboPORT_ID_E_OUT" name="cboPORT_ID_E_OUT" class="form-control input-sm select2" style="width:100%;"></select>
            </div>             
        </div>
    </fieldset>