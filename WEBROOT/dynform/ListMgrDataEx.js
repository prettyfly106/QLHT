opt["L001"]={
		  "_param":[],//session_par,
		  "_filter": [
	                ["cboMA_TINH", "L001.F01", "", "Y","Y"]/*,
	                ["cboMA_HUYEN", "L001.F02", "cboMA_TINH", "Y","Y"]*/
	            ],
	         "_mode":"edit",
			 "_tableName":"DM_COSO_KCB",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Mã bệnh viện,MA_BV,50,0,f,l;Tên bệnh viện,TEN_BV,150,0,f,l;Tuyến BV,TEN_TUYEN,80,0,f,l;Hạng BV,TEN_HANG,80,0,f,l;Gửi BH,GUI_BH,80,0,f,l;Tên gửi BH,TEN_GUI_BH,80,0,f,l;Địa chỉ,DIA_CHI,150,0,f,l;Ghi chú,GHICHU,0,0,t,l",
			 //"_gridHeader":"#master_checkbox,STT,ID,Mã bệnh viện,Tên bệnh viện,Địa chỉ@3,5,0,10,40,42;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridSQL":"L001.G01",
			 "_comboList":[
							["cboTUYEN_BV", "L001.C01","","","",""],
							["cboHANG_BV", "L001.C02","","","",""],
							["cboTT_TRIENKHAI", "L001.C03","","","",""],
							["cboDV_TRIENKHAI", "L001.C04","","","",""],
							["cboLOAI_KY_GD", "L001.C05","","","",""]
						],
			"_data": [
			            ["S","txt","MA_BV","E"],
			            ["S","txt","TEN_BV","E"],
			            ["S","txt","DIA_CHI","E"],
			            ["S","txt","GHICHU","E"],
			            ["N","cbo","TUYEN_BV","E"],
			            ["N","cbo","HANG_BV","E"],
			            ["N","cbo","MA_HUYEN","E"],
			            ["N","cbo","MA_TINH","E"],
			            ["N","cbo","TT_TRIENKHAI","E"],
			            ["N","cbo","DV_TRIENKHAI","E"],
			            ["S","txt","TEN_GUI_BH","E"],
			            ["S","txt","MK_GUI_BH","E"],
			            ["N","cbo","LOAI_KY_GD","E"],
			            ["N","cbo","GUI_BH","E"]
			            ],
			 "_formSQL": "L001.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L001.D01"],
			 _customButton:[
			                {
			                	"id":"btnCreateUser","text":"Tạo người dùng",
			                	"func":function(){
			                		//var ma_bv=
			                		var idx = $("#gridInfo").jqGrid('getGridParam', 'selarrrow');
			                		for(i=0;i<idx.length;i++){
			                		      var row = $("#gridInfo").jqGrid('getRowData', idx[i]);
			                		      var sel_id=row["MA_BV"];//gridInfo.cellById(id,_gridKeyIdx).getValue();
			                		      var rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("L001.P01",sel_id);
			                		}
			                		
			                		//alert("Thông báo btnCreateUser");
			                	}
			                }
			                ],
			 "valid_ar": [ 
				{"name" : "txtTEN_BV","display" : "Tên bệnh viện","rules" : "trim_required"},
				{"name" : "txtMA_BV","display" : "Mã bệnh viện","rules" : "trim_required"}
				],
			 "_template":"CSKCB"
			};
opt["L002"]={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"ADM_USER",
			 "_keyField":"USER_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"USER_ID,USER_ID,0,0,t,l;Tên đăng nhập,USER_NAME,100,0,f,l;Tên hiển thị,FULL_NAME,100,0,f,l;Nhóm NSD,USER_GROUP_NAME,50,0,f,l",
			 "_gridSQL":"L002.G01",
			 "_comboList":[
							["cboCOMPANY_ID", "L002.C01","","","",""],
							["cboUSER_GROUP_ID", "L002.C02","","","",""]
						],
			"_data": [
			            ["S","txt","USER_NAME","E",""],
			            ["S","txt","FULL_NAME","E",""],
			            ["S","txt","USER_PWD","E",""],
			            ["S","cbo","COMPANY_ID","E",""],
			            ["S","cbo","USER_GROUP_ID","E",""],
			            ["S","cbo","USER_LEVEL","E",""],
			            ["S","txt","INSR_USER_NAME","E",""],
			            ["S","txt","INSR_USER_PWD","E",""]
			            ],
			 "_formSQL": "L002.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L002.D01"],
			 "valid_ar": [ 
				{"name" : "txtUSER_NAME","display" : "Tên đăng ký","rules" : "trim_required"},
				{"name" : "txtFULL_NAME","display" : "Tên hiển thị","rules" : "trim_required"},
				{"name" : "cboCOMPANY_ID","display" : "Đơn vị","rules" : "trim_required"},
				{"name" : "txtUSER_PWD","display" : "Mật khẩu","rules" : "trim_required"}
				],
			 "_template":"User"
			};


opt["L003"]={
		  "_param":session_par,
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"PT_KYGIAMDINH",
			 "_keyField":"KY_GD_ID",
			 "_gridHeader":"ID,KY_GD_ID,0,0,t,l;KY_GD_STATUS,KY_GD_STATUS,0,0,t,l;Kỳ giám định,KY_GD_NAME,80,0,f,l;Trạng thái,KY_GD_STATUS_TEXT,80,0,f,l;Từ ngày,BEGIN_DATE,80,0,f,l;Đến ngày,END_DATE,80,0,f,l",
			 "_gridSQL":"L003.G01",
			 "_comboList":[
						],
			"_data": [
			            ["S","txt","KY_GD_NAME","E"],
			            ["N","cbo","KY_GD_TYPE","E"],
			            ["S","txt","KY_GD_VALUE","E"],
			            ["N","cbo","KY_GD_STATUS","E"],
			            ["DT","txt","BEGIN_DATE","E"],
			            ["DT","txt","END_DATE","E"],
			            ["'[S0]'","non","MA_CS_KCB","E"]
			            ],
			 "_formSQL": "L003.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L003.D01"],
			 "_customButton":[
			                {
			                	"id":"btnCreateKGDForChild","text":"Tạo cho CSYT cấp dưới",
			                	"func":function(){
		                			var selectedRowId = $('#gridInfo').jqGrid ('getGridParam', 'selrow');
		                			if(selectedRowId === undefined || selectedRowId == null){
		                				alert("Bạn phải chọn kỳ giám định trước khi khởi tạo.");
		                				return;
		                			}		                			
		                			var sel_id = $('#gridInfo').jqGrid('getCell', selectedRowId, 'KY_GD_STATUS');
		                			if(sel_id == 0){
		                				alert("Bạn phải chọn kỳ giám định đang \"Hoạt động\" khi khởi tạo.");
		                				return;
		                			}		    
		                			sel_id = $('#gridInfo').jqGrid('getCell', selectedRowId, 'KY_GD_ID');
		                			alert(hospital_id + "  "+ sel_id);
		                		     // var sel_id=row["KY_GD_ID"];//gridInfo.cellById(id,_gridKeyIdx).getValue();
		                		    var rt = jsonrpc.AjaxJson.ajaxCALL_SP_I("L003.P01",hospital_id+ "$" +sel_id);
		                		      if(rt != -1){
		                		    	  alert("Cập nhật thành công các kỳ giám định cho CSYT cấp dưới.");
		                		      }else{
		                		    	  alert("Cập nhật không thành công.");
		                		      }
			                	}
			                }
			                ],
			 "valid_ar": [ 
				{"name" : "txtKY_GD_NAME","display" : "Tên kỳ giám định","rules" : "trim_required"},
				{"name" : "cboKY_GD_TYPE","display" : "Loại kỳ giám định","rules" : "trim_required"},
				{"name" : "txtKY_GD_VALUE","display" : "Giá trị","rules" : "trim_required"},
				{"name" : "cboKY_GD_STATUS","display" : "Trạng thái","rules" : "trim_required"},
				{"name" : "txtBEGIN_DATE","display" : "Từ ngày","rules" : "trim_required"},
				{"name" : "txtEND_DATE","display" : "Đến ngày","rules" : "trim_required"}
				],
			 "_template":"KY_GD"
			};
opt["L004"]={
		  "_param":[],
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"DM_KHOA",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Mã khoa,MA_KHOA,80,0,f,l;Tên khoa,TEN_KHOA,200,0,f,l",
			 "_gridSQL":"L004.G01",
			 "_comboList":[
						],
			"_customButton":[
			                {
			                	"id":"btnTest","text":"Test",
			                	"func":function(){
			                		//var ma_bv=
			                		$('#gridInfo').tableExport({type:'excel',escape:'false'});
			                	}
			                }
			                ],
			"_data": [
			            ["S","txt","MA_KHOA","E"],
			            ["S","txt","TEN_KHOA","E"]
			            ],
			 "_formSQL": "L004.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L004.D01"],
			 "valid_ar": [ 
				{"name" : "txtTEN_KHOA","display" : "Tên khoa","rules" : "trim_required"},
				{"name" : "txtMA_KHOA","display" : "Mã khoa","rules" : "trim_required"}
				],
			 "_template":"Khoa"
			};
opt["L005"]={
		  "_param":[],
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"DM_HANG_BV",
			 "_keyField":"MA_SO",
			 "_gridHeader":"Mã hạng,MA_SO,50,0,f,l;Tên hạng BV,TEN,200,0,f,l",
			 "_gridSQL":"L005.G01",
			 "_comboList":[
						],
			"_data": [	["N","txt","MA_SO","E"],
			            ["S","txt","TEN","E"]
			            ],
			 "_formSQL": "L005.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L005.D01"],
			 "valid_ar": [ 
				{"name" : "txtTEN","display" : "Tên hạng bệnh viện","rules" : "trim_required"}
				],
			 "_template":"HangBV"
			};
opt["L006"]={
		  "_param":[],
		  "_filter": [    
	            ],
	         "_mode":"edit",
			 "_tableName":"DM_TUYEN_BV",
			 "_keyField":"MA_SO",
			 "_gridHeader":"Mã tuyến,MA_SO,50,0,f,l;Tên tuyến,TEN,200,0,f,l",
			 "_gridSQL":"L006.G01",
			 "_comboList":[
						],
			"_data": [
			          	["N","txt","MA_SO","E"],
			            ["S","txt","TEN","E"]],
			 "_formSQL": "L006.FR1", 
			 "_insertSQL":[],
			 "_deleteSQL":["L006.D01"],
			 "valid_ar": [ 
				{"name" : "txtTEN","display" : "Tên tuyến BV","rules" : "trim_required"}
				],
			 "_template":"TuyenBV"
			};
opt["L007"]={
		  "_param":[],
		  "_filter": [
	                ["cboMA_TINH", "L007.F01", "", "Y","Y"],
	            ],
	         "_mode":"edit",
			 "_tableName":"DM_HUYEN",
			 "_keyField":"MA_SO",
			 "_gridHeader":"Mã huyện,MA_SO,50,0,f,l;Tên huyện,TEN_HUYEN,200,0,f,l",
			 "_gridSQL":"L007.G01",
			 "_comboList":[
						],
			"_data": [	["N","txt","MA_SO","E"],
			            ["S","txt","TEN_HUYEN","E"],
			            ["N","cbo","MA_TINH","E"]
			            ],
			 "_formSQL": "L007.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L007.D01"],
			 "valid_ar": [ 
				{"name" : "txtTEN_HUYEN","display" : "Tên bệnh viện","rules" : "trim_required"}
				],
			 "_template":"Huyen"
			};
opt["L008"]={
		  "_param":[],
		  "_filter": [		             
	            ],
	         "_mode":"edit",
			 "_tableName":"DM_TINH",
			 "_keyField":"MA_SO",
			 "_gridHeader":"Mã tỉnh,MA_SO,50,0,f,l;Tên tỉnh,TEN_TINH,200,0,f,l",
			 "_gridSQL":"L008.G01",
			 "_comboList":[
						],
			"_data": [	["N","txt","MA_SO","E"],
			            ["S","txt","TEN_TINH","E"]],
			 "_formSQL": "L008.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L008.D01"],
			 "valid_ar": [ 
				{"name" : "txtTEN_TINH","display" : "Tên tỉnh","rules" : "trim_required"}
				],
			 "_template":"Tinh"
			};
opt["L009"]={
		  "_param":[],
		  "_filter":[["txtMA_BENH_ICD_10", "", "", "N","N"],
		             ["txtTEN_BENH_YHHD", "L009.F01", "txtMA_BENH_ICD_10", "N","N"]
		             ],
	         "_mode":"edit",
			 "_tableName":"DM_BENH_YHCT",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Mã bệnh,MA_BENH_ICD_10,20,0,f,l;Tên bệnh,TEN_BENH_YHHD,80,0,f,l;Chứng bệnh,CHUNG_BENH_YHCT,50,0,f,l;Tên giám định,TEN_TH_GIAMDINH,50,0,f,l",
			 "_gridSQL":"L009.G01",
			 "_comboList":[
			               ["cboTUYEN_BV", "L009.C01","","","",""],
							["cboHANG_BV", "L009.C02","","","",""]
			 ],
			"_data": [
			            ["S","txt","MA_BENH_ICD_10","E"],
			            ["S","txt","TEN_BENH_YHHD","E"],
			            ["S","txt","CHUNG_BENH_YHCT","E"],
			            ["S","txt","TEN_TH_GIAMDINH","E"]
			            ],
			 "_formSQL": "L009.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L009.D01"],
			 "valid_ar": [ 
				{"name" : "txtTEN_BENH_YHHD","display" : "Tên bệnh ICD 10","rules" : "trim_required"},
				{"name" : "txtMA_BENH_ICD_10","display" : "Mã bệnh ICD 10","rules" : "trim_required"},
				{"name" : "txtCHUNG_BENH_YHCT","display" : "Chứng bệnh YHCT","rules" : "trim_required"},
				{"name" : "txtTEN_TH_GIAMDINH","display" : "Tên TH giám định","rules" : "trim_required"}
				],
			 "_template":"BENHYHCT"
			};

opt["L010"]={
	  "_param":[],
		 "_filter":[],
		 "_mode":"edit",
		 "_tableName":"DM_CHEPHAM_YHCT",
		 "_keyField":"MA_SO",
		 "_gridHeader":"ID,MA_SO,0,0,t,l;Tên thuốc,TEN_THUOC,100,0,f,l;Hoạt chất,HOAT_CHAT,20,0,f,l;Bào chế,BAO_CHE,20,0,f,l;Đóng gói,DONG_GOI,20,0,f,l;Nguồn gốc,NGUON_GOC,20,0,f,l;Mã thuốc,MA_THUOC,50,0,f,l",
		 "_gridSQL":"L010.G01",
		 "_comboList":[
					],
		"_data": [
		            ["S","txt","MA_SO","E"],
		            ["S","txt","TEN_THUOC","E"],
		            ["S","txt","HOAT_CHAT","E"],
		            ["S","txt","BAO_CHE","E"],
		            ["S","txt","DONG_GOI","E"],
		            ["S","txt","MA_THUOC","E"],
		            ["S","txt","NGUON_GOC","E"],
		            ["S","txt","STT_NHOM_TACDUNG","E"]
		            
		            ],
		 "_formSQL": "L010.FR1",
		 "_insertSQL":[],
		 "_deleteSQL":["L010.D01"],
		 "valid_ar": [ 
			{"name" : "txtMA_SO","display" : "Mã số","rules" : "trim_required"},
			{"name" : "txtTEN_THUOC","display" : "Tên thuốc","rules" : "trim_required"},
			{"name" : "txtHOAT_CHAT","display" : "Hoạt chất","rules" : "trim_required"},
			{"name" : "txtBAO_CHE","display" : "Bào chế","rules" : "trim_required"},
			{"name" : "txtDONG_GOI","display" : "Đóng gói","rules" : "trim_required"},
			{"name" : "txtMA_THUOC","display" : "Mã thuốc","rules" : "trim_required"},
			{"name" : "txtNGUON_GOC","display" : "Nguồn gốc","rules" : "trim_required"}
			],
		 "_template":"MACPTYHCT"
		};
opt["L011"]={
	  "_param":[],
	  "_filter":[],
     "_mode":"edit",
		 "_tableName":"DM_DUONGDUNG",
		 "_keyField":"MA_SO",
		 "_gridHeader":"ID,MA_SO,0,0,t,l;Mã đường dùng,MA_DUONG_DUNG,50,0,f,l;Đường dùng,DUONG_DUNG,150,0,f,l",
		 "_gridSQL":"L011.G01",
		 "_comboList":[],
		"_data": [
		            ["S","txt","MA_SO","E"],
		            ["S","txt","MA_DUONG_DUNG","E"],
		            ["S","txt","DUONG_DUNG","E"]
		            ],
		 "_formSQL": "L011.FR1",
		 "_insertSQL":[],
		 "_deleteSQL":["L011.D01"],
		 "valid_ar": [ 
			{"name" : "txtMA_SO","display" : "Mã số","rules" : "trim_required"},
			{"name" : "txtMA_DUONG_DUNG","display" : "Mã đường dùng","rules" : "trim_required"},
			{"name" : "txtDUONG_DUNG","display" : "Tên đường dùng","rules" : "trim_required"}
			],
		 "_template":"DMDDUNG"
		};
opt["L012"]={
	    "_param":[],
	    "_filter":[
	             ],
	    "_mode":"edit",
	    "_tableName":"DM_NHOM_THEO_CHIPHI",
	    "_keyField":"MA_SO",
	    "_gridHeader":"ID,MA_SO,0,0,t,l;Tên nhóm,TEN_NHOM,150,0,f,l;Ghi chú,GHI_CHU,150,0,f,l",
	    "_gridSQL":"L012.G01",
	    "_comboList":[],
	   "_data": [            
	             ["S","txt","TEN_NHOM","E",""],
	             ["S","txt","GHI_CHU","E",""]
	               ],
	    "_formSQL": "L012.FR1",
	    "_insertSQL":[],
	    "_deleteSQL":["L012.D01"],
	    "valid_ar": [ 
	    {"name" : "txtTEN_NHOM","display" : "Tên nhóm","rules" : "trim_required"}	   
	    ],
	    "_template":"NhomTheoChiPhi"
	   };
opt["L013"]={
  "_param":[],
  "_filter": [
           ],
        "_mode":"edit",
  "_tableName":"DM_DVKT",
  "_keyField":"MA_SO",
  "_gridHeader":"ID,MA_SO,0,0,t,l;Mã dịch vụ,MA_DVKT,60,0,f,l;Mã DVKT T43-50,MA_DVKT_TT43_50,60,0,f,l;Tên DVKT,TEN_DVKT,120,0,f,l;Tên DVKT TT37,TEN_DVKT_TT37,120,0,f,l;Giá T3,GIA_T3,60,0,f,l;Giá T7,GIA_T7,60,0,f,l",
  "_gridSQL":"L013.G01",
  "_comboList":[
     ["cboNHOM_DVKT_ID", "L013.C01","","","","S",{textField : "TEN_NHOM"}]
    ],
 "_data": [
             ["S","txt","NHOM_DVKT_ID","E"],                
             ["S","txt","STT","E"],
             ["S","txt","MA_DVKT","E"],
             ["S","txt","MA_DVKT_TT43_50","E"],
             ["S","txt","TEN_DVKT","E"],
             ["S","txt","LOAI_PTTT","E"],
             ["S","txt","MA_GIA","E"],
             ["S","txt","TEN_DVKT_TT37","E"],
             ["S","txt","GIA_T3","E"],
             ["S","txt","GIA_T7","E"],
             ["S","txt","GHI_CHU","E"]             
             ],
  "_formSQL": "L013.FR1",
  "_insertSQL":[],
  "_deleteSQL":["L013.D01"],
  "valid_ar": [ 
  {"name" : "txtMA_DVKT","display" : "Mã DVKT","rules" : "trim_required"},
  {"name" : "txtTEN_DVKT","display" : "Tên DVKT","rules" : "trim_required"},
  {"name" : "txtMA_DVKT_TT43_50","display" : "Mã DVKT T43 50","rules" : "trim_required"},
  {"name" : "txtTEN_DVKT_TT37","display" : "Tên DVKT TT37","rules" : "trim_required"}
  ],
  "_template":"DVKT"
 };
opt["L014"]={
		  "_param":[],
		  "_filter":[
		            	["cboPROVINCE_ID", "L001.F01", "", "Y","N"],
		            	["cboCOMPANY_TYPE", "L014.F01", "", "Y","Y"]
		          ],
			 "_mode":"edit",
			 "_tableName":"ORG_COMPANY",
			 "_keyField":"COMPANY_ID",
			 "_gridHeader":"ID,COMPANY_ID,0,0,t,l;Tên đơn vị,COMPANY_NAME,100,0,f,l;Mã đơn vị,COMPANY_CODE,100,0,f,l;Loại đơn vị,COMPANY_TYPE_NAME,50,0,f,l",
			 "_gridSQL":"L014.G01",
			 "_comboList":[
			               	["cboHOSPITAL_ID", "L014.C01","","","",""]
						],
			"_data": [
			            ["S","txt","COMPANY_NAME","E",""],
			            ["S","txt","COMPANY_CODE","E",""],
			            ["S","cbo","PROVINCE_ID","E",""],
			            ["S","cbo","HOSPITAL_ID","E",""],
			            ["S","cbo","COMPANY_TYPE","E",""]
			            ],
			 "_formSQL": "L014.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L014.D01"],
			 "valid_ar": [ 
				{"name" : "txtCOMPANY_NAME","display" : "Tên đơn vị","rules" : "trim_required"},
				{"name" : "txtCOMPANY_CODE","display" : "Mã đơn vị","rules" : "trim_required"},
				{"name" : "cboCOMPANY_TYPE","display" : "Loại đơn vị","rules" : "trim_required"}
				],
			 "_template":"Company"
			};
opt["L015"]={
				  "_param":[],
					 "_filter":[
					          ],
					 "_mode":"edit",
					 "_tableName":"ORG_OFFICER_TYPE",
					 "_keyField":"ID",
					 "_gridHeader":"ID,ID,0,0,t,l;Loại nhân viên,NAME,200,0,f,l;Ghi chú,NOTE,100,0,f,l",
					 "_gridSQL":"L015.G01",
					 "_comboList":[
								],
					"_data": [
					            ["S","txt","NAME","E"],
					            ["N","txt","NOTE","E"]
					            ],
					 "_formSQL": "L015.FR1",
					 "_insertSQL":[],
					 "_deleteSQL":["L015.D01"],
					 "valid_ar": [ 
						{"name" : "txtNAME","display" : "Loại nhân viên","rules" : "trim_required"},
						{"name" : "txtNOTE","display" : "Ghi chú","rules" : "trim_required"}
						],
					 "_template":"ORG_OFFICER_TYPE"
					};
opt["L016"]={
		  "_param":[],
			 "_filter":[
			          ],
			 "_mode":"edit",
			 "_tableName":"ADM_USER_GROUP",
			 "_keyField":"USER_GROUP_ID",
			 "_gridHeader":"USER_GROUP_ID,USER_GROUP_ID,0,0,t,l;Tên nhóm NSD,USER_GROUP_NAME,100,0,f,l;Ghi chú,INFO,100,0,f,l",
			 "_gridSQL":"L016.G01",
			 "_comboList":[
						],
			"_data": [
			            ["S","txt","USER_GROUP_NAME","E"]
			            ],
			 "_formSQL": "L016.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L016.D01"],
			 "valid_ar": [ 
				{"name" : "txtUSER_GROUP_NAME","display" : "Tên đơn vị đo","rules" : "trim_required"},
				],
			 "_template":"UserGroup"
			};
opt["L017"]={
		  "_param":[],
		  "_filter": [
	                ["txtFROM_DT", "", "", "Y","N"],
	                ["txtTO_DT", "", "", "Y","N"]
	            ],
			 "_mode":"view",
			 "_tableName":"MDR_LOG",
			 "_keyField":"USER_ID",
			 "_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Hành động,Bảng,Trường khóa,Giá trị,Ngày thực hiện@3,5,0,0,15,15,20,10,20,15;left,left,left,left,left,left,left,left,left,left;ch,ro,ro,ro,ro,ro,ro,ro,ro,ro;int,int,int,str,str,str,str,str,str,str,str",
			 "_gridSQL":"L017.G01",//
			 "_comboList":[
						],
			"_data": [
			            ["S","txt","USER_NAME","E",""],
			            ["S","txt","FULL_NAME","E",""],
			            ["S","txt","USER_PWD","E",""],
			            ["S","cbo","COMPANY_ID","E",""],
			            ["S","cbo","USER_GROUP_ID","E",""],
			            ["S","cbo","USER_LEVEL","E",""]
			            ],
			 "_formSQL": "L017.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":[],
			 "valid_ar": [ 
				],
			 "_template":"Log"
			};
opt["L018"]={
		  "_param":[],
			 "_filter":[
			            ["txtMA_THE", "", "", "Y","N"]
			          ],
			 "_mode":"view",
			 "_tableName":"PT_THEBHYT",
			 "_keyField":"THE_BHYT",
			 "_gridHeader":"Số Thẻ,THE_BHYT,60,0,f,c;Họ tên,HOTEN,100,0,f,l;Ngày sinh,NGAYSINH,60,0,f,c;Giới tính,GIOITINH,40,0,f,c;Địa chỉ,DIACHI,100,0,f,l;Giá trị từ,HANSUDUNG_TUNGAY,60,0,f,c;Giá trị đến,HANSUDUNG_DENNGAY,60,0,f,c",
			 "_gridSQL":"L018.G01",
			 "_comboList":[
						],
			"_data": [
			            ["S","txt","THE_BHYT","E"],
			            ["S","txt","HOTEN","E"],
			            ["S","txt","NGAYSINH","E"],
			            ["S","txt","GIOITINH","E"],
			            ["S","txt","DIACHI","E"],
			            ["S","txt","HANSUDUNG_TUNGAY","E"],
			            ["S","txt","HANSUDUNG_DENNGAY","E"],
			            ["S","txt","MA_NOI_DKKHAM","E"],
			            ["S","txt","NOI_DKKHAM","E"],
			            ["S","txt","MAKHUVUC","E"]
			            ],
			 "_formSQL": "L018.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":[],
			 "valid_ar": [
				],
			 "_template":"THEBHYT"
			};
opt["L019"]={
		  "_param":[],
			 "_filter":[
			            	["cboMA_TINH", "L019.F01", "", "Y","N"],
			            	["cboUSER_GROUP_ID", "L019.F02", "", "Y","Y"],
			          ],
			 "_mode":"edit",
			 "_tableName":"ADM_USER",
			 "_keyField":"USER_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"USER_ID,USER_ID,0,0,t,l;Tên đăng nhập,USER_NAME,100,0,f,l;Tên hiển thị,FULL_NAME,100,0,f,l;Nhóm NSD,USER_GROUP_NAME,50,0,f,l",
			 "_gridSQL":"L019.G01",
			 "_comboList":[
							["cboCOMPANY_ID", "L019.C01","","",""],
							["cboHOSPITAL_ID", "L019.C02","","",""]
						],
			"_data": [
			            ["S","txt","USER_NAME","E",""],
			            ["S","txt","FULL_NAME","E",""],
			            ["S","txt","USER_PWD","E",""],
			            ["S","cbo","COMPANY_ID","E",""],
			            ["S","cbo","HOSPITAL_ID","E",""],
			            ["S","cbo","USER_GROUP_ID","E",""],
			            ["S","cbo","USER_LEVEL","E",""]
			            ],
			 "_formSQL": "L019.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L019.D01"],
			 "valid_ar": [ 
				{"name" : "txtUSER_NAME","display" : "Tên đăng ký","rules" : "trim_required"},
				{"name" : "txtFULL_NAME","display" : "Tên hiển thị","rules" : "trim_required"},
				{"name" : "cboCOMPANY_ID","display" : "Đơn vị","rules" : "trim_required"},
				{"name" : "txtUSER_PWD","display" : "Mật khẩu","rules" : "trim_required"}
				],
			 "_template":"User"
			};
opt["L020"]={
		  "_param":[],
			 "_filter":[
			            	["cboPROGRAM_ID", "SELECT ID,NAME FROM DREPORT.DR_PROGRAM", "", "Y","N"],
			            	["cboGROUP_ID", "SELECT ID,NAME FROM DREPORT.DR_REPORT_GROUP WHERE program_id=[F0]", "cboPROGRAM_ID", "Y","Y"],
			          ],
			 "_mode":"edit",
			 "_tableName":"DREPORT.DR_REPORT",
			 "_keyField":"REPORT_ID",
			 "_gridHeader":"REPORT_ID,REPORT_ID,0,0,t,l;Mã báo cáo,REPORT_CODE,50,0,f,l;Tên báo cáo,REPORT_NAME,100,0,f,l;Tiêu đề,REPORT_HEADER,100,0,f,l",
			 "_gridSQL":"SELECT REPORT_ID,REPORT_NAME,REPORT_CODE,REPORT_HEADER FROM DREPORT.DR_REPORT WHERE GROUP_ID=[F1]",
			 "_comboList":[
							["cboREPORT_TYPE", "SELECT ID,NAME FROM DREPORT.DR_REPORT_TYPE","","",""],
							["cboSTATUS", "SELECT ID,NAME FROM DREPORT.DR_REPORT_STATUS","","",""]
						],
			"_data": [
			            ["S","txt","REPORT_CODE","E",""],
			            ["S","txt","REPORT_NAME","E",""],
			            ["S","txt","REPORT_HEADER","E",""],
			            ["S","txt","REPORT_PATH","E",""],
			            ["S","txt","ALIAS","E",""],
			            ["S","cbo","REPORT_TYPE","E",""],
			            ["S","cbo","STATUS","E",""],
			            ],
			 "_formSQL": "SELECT * FROM DREPORT.DR_REPORT WHERE REPORT_ID=[0]",
			 "_insertSQL":[],
			 "_deleteSQL":["{?=call DREPORT.DEL_REPORT([0])}}"],
			 "valid_ar": [ 
				{"name" : "txtREPORT_CODE","display" : "Mã báo cáo","rules" : "trim_required"},
				{"name" : "txtREPORT_NAME","display" : "Tên báo cáo","rules" : "trim_required"}
				],
			 "_template":"Report"
			};
opt["L021"]={
		  "_param":[],
			 "_filter":[
			            ["cboMODULE_ID", "L021.C01","","Y"]
			          ],
			 "_mode":"edit",
			 "_tableName":"ADM_FUNCTION_GROUP",
			 "_keyField":"FUNCTION_GROUP_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"GROUP_ID,FUNCTION_GROUP_ID,0,0,t,l;Tên Nhóm,FUNCTION_GROUP_NAME,100,0,f,l;Ghi chú,NOTE,100,0,f,l;Module,MODULE_ID,50,0,f,c",
			 "_gridSQL":"L021.G01",
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","FUNCTION_GROUP_NAME","E",""],
			            ["S","txt","NOTE","E",""],
			            ["S","cbo","MODULE_ID","E",""]
			            ],
			 "_formSQL": "L021.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L021.D01"],
			 "valid_ar": [ 
				{"name" : "txtFUNCTION_GROUP_NAME","display" : "Tên nhóm","rules" : "trim_required"}
				],
			 "_template":"FunctionGroup"
			};
opt["L022"]={
		  "_param":[],
			 "_filter":[
			            ["cboFUNC_GROUP_ID", "L022.C01","","Y","Y"]
			          ],
			 "_mode":"edit",
			 "_tableName":"ADM_FUNCTION",
			 "_keyField":"FUNCTION_ID",
			 //"_gridHeader":"#master_checkbox,STT,USER_ID,Tên đăng nhập,Tên hiển thị,Nhóm NSD@3,5,0,22,30,40;left,left,left,left,left,left;ch,ro,ro,ro,ro,ro;int,int,int,str,str,str",
			 "_gridHeader":"FUNCTION_ID,FUNCTION_ID,0,0,t,l;Tên tiếng anh,CAPTION,100,0,f,l;Tên tiếng việt,CAPTION_VN,100,0,f,l;Liên kết,FUNCTION_LINK,150,0,f,l;Nhóm,GROUP_NAME,50,0,f,c",
			 "_gridSQL":"L022.G01",
			 "_comboList":[							
						],
			"_data": [
			            ["S","txt","CAPTION","E",""],
			            ["S","txt","CAPTION_VN","E",""],
			            ["S","txt","FUNCTION_LINK","E",""],
			            ["S","cbo","FUNC_GROUP_ID","E",""],
			            ["S","txt","NOTE","E",""],
			            ["S","txt","ESCAPE","E","/"]
			            ],
			 "_formSQL": "L022.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L022.D01"],
			 "valid_ar": [ 
				{"name" : "txtCAPTION_VN","display" : "Tên chức năng","rules" : "trim_required"},
				{"name" : "txtFUNCTION_LINK","display" : "Liên kết","rules" : "trim_required"}
				],
			 "_template":"Function"
			};
opt["L023"]={
		  "_param":[],
		  "_filter":[
		             ],
	         "_mode":"edit",
			 "_tableName":"DM_TANDUOC",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Số đăng ký,SO_DANG_KY,20,0,f,l;Tên thuốc,TEN_THUOC,80,0,f,l;Đường dùng,DUONG_DUNG,50,0,f,l;Hoạt chất,HOAT_CHAT,50,0,f,l",
			 "_gridSQL":"L023.G01",
			 "_comboList":[
			               ["cboDUONG_DUNG", "L023.C01","","","",""]
			 ],
			"_data": [
			            ["S","txt","SO_DANG_KY","E"],
			            ["S","txt","TEN_THUOC","E"],
			            ["S","txt","MA_HOAT_CHAT","E"],
			            ["S","txt","HOAT_CHAT","E"],			            
			            ["S","txt","HOAT_CHAT_TT40","E"],
			            ["S","cbo","MA_DUONG_DUNG","E"],
			            ["S","txt","HAM_LUONG","E"],
			            ["S","txt","DONG_GOI","E"],
			            ["S","txt","DON_VI_TINH","E"],
			            ["S","txt","DON_GIA","E"],
			            ["S","txt","DON_GIA_TT","E"],
			            ["S","txt","HANG_SX","E"],
			            ["S","txt","NUOC_SX","E"],
			            ["S","txt","GHI_CHU","E"]
			            ],
			 "_formSQL": "L023.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L023.D01"],
			 "valid_ar": [ 
				{"name" : "txtSO_DANG_KY","display" : "Số đăng ký","rules" : "trim_required"},
				{"name" : "txtTEN_THUOC","display" : "Tên thuốc","rules" : "trim_required"}
				],
			 "_template":"THUOC"
			};
opt["L024"]={
		  "_param":[],
		  "_filter":[
		             ["cboPARENT_ID", "L024.F01", "", "Y","N"]
		             ],
	         "_mode":"edit",
			 "_tableName":"DM_VATTU_YTE",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Số thông tư,STT_THONGTU,20,0,f,l;Mã Vật tư,MA_VTYT,80,0,f,l;Tên Vật tư,NHOM_LOAI_VTYT,50,0,f,l;Đơn vị tính,DONVI_TINH,50,0,f,l",
			 "_gridSQL":"L024.G01",
			 "_comboList":[			              
			 ],
			"_data": [
			            ["S","txt","STT_THONGTU","E"],
			            ["S","txt","MA_VTYT","E"],
			            ["S","txt","NHOM_LOAI_VTYT","E"],
			            ["S","txt","DONVI_TINH","E"],
			            ["S","txt","GHI_CHU","E"]
			            ],
			 "_formSQL": "L024.FR1",
			 "_insertSQL":[],
			 "_deleteSQL":["L024.D01"],
			 "valid_ar": [ 
				{"name" : "txtMA_VTYT","display" : "Mã Vật tư","rules" : "trim_required"},
				{"name" : "txtNHOM_LOAI_VTYT","display" : "Tên vật tư","rules" : "trim_required"}
				],
			 "_template":"THUOC"
			};