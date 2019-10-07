<span class="fa fa-times fa-lg info-close" target="connectInfo"></span>
<div class="panel panel-default sm">
	<div class="panel-heading"  data-i18n="title">KẾT NỐI MĂNG XÔNG</div>
    <div class="panel-body">    	 
    	<div style="width:49%;display:inline-block;">
    		<select id="cboFROM" name="cboFROM" class="form-control input-sm"></select>
    	</div>    	
		<div style="width:49%;display:inline-block;" class="pull-right">
    		<select id="cboTO" name="cboTO" class="form-control input-sm"></select>
    	</div>
        <div id="connectInfo">        	
        	<div class="pull-left source-node"  id="cables_in_list" ondrop="getSourceBack(event)" ondragover="allowGetSourceBack(event)"></div>        	
			<div class="pull-left" style="width:118px; overflow:hidden;" id="connector_list">
				<div class="pull-left source-endpoint" id="source_list">
				</div>				
				<div class="pull-right target-endpoint" id="target_list">
				</div>
				<div class="clearfix"></div>
			</div>
        	<div class="pull-right target-node"  id="cables_out_list" ondrop="getTargetBack(event)" ondragover="allowGetTargetBack(event)"></div>
			<div class="clearfix"></div>
        </div>
        <div class="control-group">
        	<div class="pull-left source-range">
        		<input id="txtSourceFrom" type="number" min="1" max="96" class="number-picker"> 
        		<input id="txtSourceTo" type="number" class="number-picker">
        	</div>
        	<div class="connect-button text-center">
        		<button class="btn btn-primary btn-sm" id="btnConnect" data-i18n="connect">Kết nối</button>
        	</div>
        	<div class="pull-right target-range">
        		<input id="txtTargetFrom" type="number" class="number-picker"> 
        		<input id="txtTargetTo" type="number" class="number-picker">
        	</div>
        	<div class="clearfix"></div>
        </div>
        <div class="text-right" style="width:100%;margin-top:5px;">            	
            	<button class="btn btn-primary btn-sm" id="btnSaveConnect" data-i18n="save">Lưu</button>
            	<button class="btn btn-danger btn-sm" id="btnDisconnect" data-i18n="delete">Ngắt kết nối</button>
            	<button class="btn btn-default btn-sm" id="btnCancelConnect" target="connectInfo" data-i18n="cancel">Bỏ qua</button>
            </div>
    </div>
</div>