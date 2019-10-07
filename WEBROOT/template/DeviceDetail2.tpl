<span class="fa fa-times fa-lg info-close" target="deviceDetail"></span>
<div class="panel panel-default sm">
	<div class="panel-heading"  data-i18n="title">CHI TIẾT THIẾT BỊ</div>
    <div class="panel-body" >
    	<ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
	        <li role="presentation" class="active"><a href="#slotInfo" data-toggle="tab" data-i18n="slot_list">Danh sách Slot</a></li>
	        <li role="presentation" id="tDevice"><a href="#cardInfo" data-toggle="tab" data-i18n="card_list">Danh sách Card</a></li>
	        <li role="presentation" id="tODF"><a href="#portInfo" data-toggle="tab" data-i18n="port_list">Danh sách Port</a></li>
	    </ul>      
        <div class="form-group tab active" id="slotInfo">
        	<input type="hidden" id="txtSLOT_ID"> 
            <div class="col-xs-3 control-label required" data-i18n="code">Mã Slot</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtSLOT_CODE" name="txtSLOT_CODE" title="">
            </div>                         
            <div class="col-xs-12 text-right">
				<button class="btn btn-default btn-sm" id="btnAddSlot" target="deviceDetail" data-i18n="add_new">Thêm mới</button>
            	<button class="btn btn-primary btn-sm" id="btnSaveSlot" data-i18n="save">Lưu</button>
            	<button class="btn btn-danger btn-sm" id="btnDeleteSlot" data-i18n="delete">Xóa</button>            	
            </div>
            <div class="col-xs-12">
            	<table id="grdSlotList"></table><div id="pager_grdSlotList"></div>
          	</div>    
        </div>
        <div class="form-group tab" id="cardInfo">
        	<input type="hidden" id="txtCARD_ID">
        	<div class="col-xs-3 control-label required" data-i18n="slot">Slot</div>
            <div class="col-xs-9"><select id="cboSLOT_ID" name="cboSLOT_ID" class="form-control input-sm"></select>
            </div> 
            <div class="col-xs-3 control-label required" data-i18n="code">Mã Card</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtCARD_CODE" name="txtCARD_CODE" title="">
            </div>                         
            <div class="col-xs-12 text-right">
				<button class="btn btn-default btn-sm" id="btnAddCard" target="deviceDetail" data-i18n="add_new">Thêm mới</button>
            	<button class="btn btn-primary btn-sm" id="btnSaveCard" data-i18n="save">Lưu</button>
            	<button class="btn btn-danger btn-sm" id="btnDeleteCard" data-i18n="delete">Xóa</button>            	
            </div>
            <div class="col-xs-12">
            	<table id="grdCardList"></table><div id="pager_grdCardList"></div>
          	</div>
        </div>
        <div class="form-group tab" id="portInfo">
        	<input type="hidden" id="txtPORT_ID"> 
        	<div class="col-xs-3 control-label required" data-i18n="slot">Slot</div>
            <div class="col-xs-9"><select id="cboSLOT_ID1" name="cboSLOT_ID1" class="form-control input-sm"></select>
            </div> 
            <div class="col-xs-3 control-label required" data-i18n="slot">Card</div>
            <div class="col-xs-9"><select id="cboCARD_ID" name="cboCARD_ID" class="form-control input-sm"></select>
            </div>
            <div class="col-xs-3 control-label required" data-i18n="code">Mã Port</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtPORT_CODE" name="txtPORT_CODE" title="">
            </div>
            <div class="col-xs-3 control-label required" data-i18n="name">Trạng thái</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtPORT_STATUS" name="txtPORT_STATUS" title="" >
            </div>             
            <div class="col-xs-12 text-right">            	
            	<button class="btn btn-primary btn-sm" id="btnSavePort" data-i18n="save">Lưu</button>
            	<button class="btn btn-danger btn-sm" id="btnDeletePort" data-i18n="delete">Xóa</button>
            	<button class="btn btn-default btn-sm" id="btnCancelPort" target="deviceDetail" data-i18n="cancel">Bỏ qua</button>
            </div>
            <div class="col-xs-12">
            	<table id="grdPortList"></table><div id="pager_grdPortList"></div>
          	</div> 
        </div>        
    </div>
</div>