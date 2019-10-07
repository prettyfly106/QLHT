<span class="fa fa-times fa-lg info-close" target="deviceDetail"></span>
<div class="panel panel-default sm">
	<div class="panel-heading"  data-i18n="title">CÀI ĐẶT THIẾT BỊ</div>
    <div class="panel-body" >    	     
        <div class="form-group" id="slotInfo">
        	<input type="hidden" id="txtCARD_ID">
        	<div calss="col-xs-12 control-label"  style="padding-left:10px;">Slot #<span id="txtSLOT_INDEX"></span></div>
        	<div class="col-xs-3 control-label " data-i18n="card">Loại card</div>
            <div class="col-xs-9"><select class="form-control input-sm" id="cboINF_CARD_ID" name="cboINF_CARD_ID" title=""></select>
            </div>            
        	<div class="col-xs-3 control-label " data-i18n="code">Mã Card</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtCARD_CODE" name="txtCARD_CODE" title="">
            </div>
            <div class="col-xs-3 control-label " data-i18n="code">Serial</div>
            <div class="col-xs-9"><input class="form-control input-sm" id="txtCARD_SERIAL" name="txtCARD_SERIAL" title="">
            </div> 
            <div class="col-xs-12 text-right">				
            	<button class="btn btn-primary btn-sm" id="btnSaveCard" data-i18n="save">Lưu</button>            	            	
            </div> 
            <div class="col-xs-12">
            	<table id="grdCardList"></table><div id="pager_grdCardList"></div>
          	</div>                         
                          
        </div>
    </div>
</div>