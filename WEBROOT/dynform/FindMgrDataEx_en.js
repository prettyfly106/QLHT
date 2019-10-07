var FLT_ID=0;
var FLT_SQL=1;
var FLT_PARENT=2;
var FLT_ISPARAM=3;
var FLT_RELOAD=4;

var CBO_ID=0;
var CBO_SQL=1;
var CBO_PARENT=2;
var CBO_SELVAL=3;
var CBO_DFLTEXT=4;
opt["F001"]={
		  "_param":session_par,
		  "_filter": [
		            //["cboMA_TINH", "select MA_SO,TEN_TINH from DM_TINH", "", "N"],
		            //["cboMA_HUYEN", "select MA_SO,TEN_HUYEN from DM_HUYEN a where MA_TINH=[0] order by TEN_HUYEN", "cboMA_TINH", "Y"]
		            ["txtSEARCH", "", "", "Y"],
	                ["txtFROM_DT", "", "", "Y"],
	                ["txtTO_DT", "", "", "Y"]
	            ],
	         "_onLoad":function() {
	        	 //console.log('onLoad='+moment().startOf('day').format('DD/MM/YYYY HH:mm:ss'));
	        	 $('#txtFROM_DT').val(moment().startOf('day').format('DD/MM/YYYY HH:mm:ss'));
	        	 $('#txtTO_DT').val(moment().endOf('day').format('DD/MM/YYYY HH:mm:ss'));
	         },
			 "_mode":"view",
			 "_tableName":"LOADXML",
			 "_keyField":"FILE_ID",
			 "_gridHeader":"ID,FILE_ID,0,0,t,l;File Name,FILE_NAME,80,0,f,l;File status,FILE_STATUS,50,0,f,l;Loaded Time,LOADED_TIME,50,0,f,l;Update time,UPDATE_TIME,0,0,t,l;Error Msg,ERROR_MSG,200,0,f,l",
			 "_gridSQL":"F001.G01",
			 "_template":"Log"//,
//			 "valid_ar": [ 
//			              {"name" : "txtSEARCH","display" : "Nội dung tìm kiếm","rules" : "trim_required"},
//			              {"name" : "txtFROM_DT","display" : "Giá trị \"Từ ngày\"","rules" : "trim_required|min_length[19]"},
//			              {"name" : "txtTO_DT","display" : "Giá trị \"Đến ngày\"","rules" : "trim_required|min_length[19]"}]	 
			};
opt["F002"]={
		  "_param":session_par,
		  "_filter": [
		            ["cboLOAI_HOSO", "F002.F01", "", "Y","Y","-1","--Tất cả--"],
	                ["cboTRANGTHAI", "F002.F02", "", "Y","Y","-1","--Tất cả--"],
	                ["txtDUYET_TUNGAY", "", "", "Y"],
	                ["txtDUYET_DENNGAY", "", "", "Y"],
	                ["txtLAP_TUNGAY", "", "", "Y"],
	                ["txtLAP_DENNGAY", "", "", "Y"]		            
	                /*,["txtMA_CSKCB", "", "", "Y"],
	                ["txtTEN_CSKCB", "SELECT MA_BV || ': ' || TEN_BV FROM DM_COSO_KCB WHERE MA_BV = '[F0]'", "txtMA_CSKCB", "N"]*/
	            ],
	         "_filterOption" : 1, // Show All if filter Blank/default
	         "_onLoad":function() {
	        	 //console.log('onLoad='+moment().startOf('day').format('DD/MM/YYYY HH:mm:ss'));
	        	 $('#txtDUYET_TUNGAY').val(moment().startOf('day').format('DD/MM/YYYY HH:mm:ss'));
	        	 $('#txtDUYET_DENNGAY').val(moment().endOf('day').format('DD/MM/YYYY HH:mm:ss'));
	        	 /*$('#txtLAP_TUNGAY').val(moment().startOf('day').format('DD/MM/YYYY HH:mm:ss'));
	        	 $('#txtLAP_DENNGAY').val(moment().endOf('day').format('DD/MM/YYYY HH:mm:ss'));*/
	         },
			 "_mode":"view",
			 "_tableName":"PT_BHYT_PHEDUYET",
			 "_keyField":"PHEDUYET_ID",
			 "_gridHeader":"ID,PHEDUYET_ID,0,0,t,l;Record type,TEN_LOAI_HOSO,60,0,f,l;Approver,NGUOIDUYET,80,0,f,l;Approve Date,NGAYDUYET,70,0,f,c;Status,TRANGTHAI,120,0,f,l;Created Date,NGAYLAP,70,0,f,c;Record Count,SOLUONG_HOSO,30,0,f,c;Hospital Code,MA_CSKCB,50,0,t,c",
			 "_gridSQL":"F002.G01",// ('[F6]' IS NULL OR A.MA_CSKCB='[F6]')",
			 "_template":"BHYTPHEDUYET"
			};
opt["F003"]={
		   "_param":[],
			 "_filter":[			        
					/*["txtMA_KHOA", "", "", "Y","cbxMA_KHOA","S"],					
					["txtTEN_KHOA", "", "", "Y","cbxTEN_KHOA","S"]*/
					["txtMA_KHOA", "", "", "Y"],					
					["txtTEN_KHOA", "", "", "Y"]
			          ],
			 "_mode":"view",
			 "_tableName":"DM_KHOA",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Department Code,MA_KHOA,80,0,f,l;Department Name,TEN_KHOA,200,0,f,l",
			 "_gridSQL":"select A.MA_SO,A.MA_KHOA,a.TEN_KHOA from DM_KHOA a WHERE UPPER(A.MA_KHOA) LIKE '%[F0]%' AND UPPER(a.TEN_KHOA) LIKE '%[F1]%'",
			
			 "_template":"Khoa"
			};
opt["F004"]={
		  "_param":[],
		  "_filter": [
	                /*["cboMA_TINH", "select MA_SO,TEN_TINH from DM_TINH", "", "N"],
	                ["cboMA_HUYEN", "select MA_SO,TEN_HUYEN from DM_HUYEN a where MA_TINH=[0] order by TEN_HUYEN", "cboMA_TINH", "Y"],
	                //["cboTUYEN_BV", "SELECT MA_SO,TEN FROM DM_TUYEN_BV","","","Y"],
					//["cboHANG_BV", "SELECT  MA_SO,TEN FROM DM_HANG_BV","","","Y"],
	                ["txtMA_BV", "", "", "Y","cbxMA_BV","S"],					
					["txtTEN_BV", "", "", "Y","cbxTEN_BV","S"],
					["txtDIA_CHI", "", "", "Y","cbxDIA_CHI","S"]*/
	                ["cboMA_TINH", "F004.F01", "", "N"],
	                ["cboMA_HUYEN", "F004.F02", "cboMA_TINH", "Y"],
	                //["cboTUYEN_BV", "SELECT MA_SO,TEN FROM DM_TUYEN_BV","","","Y"],
					//["cboHANG_BV", "SELECT  MA_SO,TEN FROM DM_HANG_BV","","","Y"],
	                ["txtMA_BV", "", "", "Y"],					
					["txtTEN_BV", "", "", "Y"],
					["txtDIA_CHI", "", "", "Y"]
	            ],
	         "_mode":"view",
			 "_tableName":"DM_COSO_KCB",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Hospital Code,MA_BV,50,0,f,l;Hospital Name,TEN_BV,150,0,f,l;Address,DIA_CHI,150,0,f,l;Note,GHICHU,0,0,t,l",
			 "_gridSQL":"F004.G01",			 
			 "_template":"CSKCB"
			};
opt["F005"]={
		  "_param":[],
			 "_filter":[
			            ["txtTEN_HANG_BV", "", "", "Y","cbxTEN_HANG_BV","S"]
			          ],
			 "_mode":"view",
			 "_tableName":"DM_HANG_BV",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Class Name,TEN,200,0,f,l",
			 "_gridSQL":"F005.G01",			 
			 "_template":"HangBV"
			};
opt["F006"]={
		  "_param":[],
		  "_filter": [
	                ["cboMA_TINH", "F006.F01", "", "Y"],
	                ["txtTEN_HUYEN", "", "", "Y"],
	            ],
	         "_mode":"view",
			 "_tableName":"DM_HUYEN",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;District Name,TEN_HUYEN,200,0,f,l",
			 "_gridSQL":"F006.G01",			
			 "_template":"Huyen"
			};
opt["F007"]={
		  "_param":[],
		  "_filter": [
		              ["txtTEN_TINH", "", "", "Y"]	
	            ],
	         "_mode":"view",
			 "_tableName":"DM_TINH",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Provice Name,TEN_TINH,200,0,f,l",
			 "_gridSQL":"F007.G01",			 
			 "_template":"Tinh"
			};
opt["F008"]={
		  "_param":[],
		  "_filter":[["txtTEN_BENH_YHHD", "", "", "Y"],
		             ["txtMA_SO", "", "", "Y"],
		             ["txtCHUNG_BENH_YHCT", "", "", "Y"],
		             ["txtTEN_TH_GIAMDINH", "", "", "Y"]
		             ],
	         "_mode":"view",
			 "_tableName":"DM_BENH_YHCT",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Disease Code,MA_BENH_ICD_10,20,0,f,l;Disease Name,TEN_BENH_YHHD,80,0,f,l;Sympton,CHUNG_BENH_YHCT,50,0,f,l;Appraisal name,TEN_TH_GIAMDINH,50,0,f,l",
			 "_gridSQL":"F008.G01",			 
			 "_template":"BENHYHCT"
			};
opt["F009"]={
		  "_param":[],
			 "_filter":[["txtMA_THUOC", "", "MA_THUOC", "Y"],
			             ["txtTEN_THUOC", "", "TEN_THUOC", "Y"],
			             ["txtHOAT_CHAT", "", "HOAT_CHAT", "Y"],
			             ["txtBAO_CHE", "", "BAO_CHE", "Y"],
			             ["txtDONG_GOI", "", "DONG_GOI", "Y"],			             
			             ["txtNGUON_GOC", "", "NGUON_GOC", "Y"]
			            ],
			 "_filterOption" : "AND",
			 "_mode":"view",
			 "_tableName":"DM_CHEPHAM_YHCT",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Medicine Name,TEN_THUOC,100,0,f,l;Ingredient,HOAT_CHAT,20,0,f,l;Cover,BAO_CHE,20,0,f,l;Package,DONG_GOI,20,0,f,l;Original,NGUON_GOC,20,0,f,l;Medicine code,MA_THUOC,50,0,f,l",
			 "_gridSQL":"F009.G01",			 
			 "_template":"MACPTYHCT"
			};
opt["F010"]={
		  "_param":[],
		  "_filter":[
		             ["txtMA_DUONG_DUNG", "", "MA_DUONG_DUNG", "Y"],
		             ["txtDUONG_DUNG", "", "DUONG_DUNG", "Y"]
		             ],
		  "_filterOption" : "AND",
	     "_mode":"view",
			 "_tableName":"DM_BENH_YHCT",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Using code,MA_DUONG_DUNG,50,0,f,l;Using name,DUONG_DUNG,150,0,f,l",
			 "_gridSQL":"F010.G01",			
			 "_template":"DMDDUNG"
			};
opt["F011"]={
	    "_param":[],
	    "_filter":[["txtTEN_NHOM", "", "TEN_NHOM", "Y"],
		             ["txtGHI_CHU", "", "GHI_CHU", "Y"]
	             ],
	    "_filterOption" : "AND",
	    "_mode":"view",
	    "_tableName":"DM_NHOM_THEO_CHIPHI",
	    "_keyField":"MA_SO",
	    "_gridHeader":"ID,MA_SO,0,0,t,l;Group Name,TEN_NHOM,150,0,f,l;Note,GHI_CHU,150,0,f,l",
	    "_gridSQL":"F011.G01",
	    
	    "_template":"NhomTheoChiPhi"
	   };
opt["F012"]={
		  "_param":[],
		  "_filter": [
					["txtMA_DVKT", "", "MA_DVKT", "Y"],
					["txtMA_KHOA", "", "MA_KHOA", "Y"],
					["txtDANHMUC_KYTHUAT", "", "DANHMUC_KYTHUAT", "Y"]
		           ],
		  "_filterOption" : "AND",
		        "_mode":"view",
		  "_tableName":"DM_DVKT",
		  "_keyField":"MA_SO",
		  "_gridHeader":"ID,MA_SO,0,0,t,l;Service code,MA_DVKT,50,0,f,l;Department Code,MA_KHOA,30,0,f,l;Service Name,DANHMUC_KYTHUAT,120,0,f,l",
		  "_gridSQL":"F012.G01",		 
		  "_template":"DVKT"
		 };
opt["F013"]={
		  "_param":[],
		  "_filter": [ ["txtTEN", "", "TEN", "Y"]  
	            ],
	         "_filterOption" : "AND",
	         "_mode":"view",
			 "_tableName":"DM_TUYEN_BV",
			 "_keyField":"MA_SO",
			 "_gridHeader":"ID,MA_SO,0,0,t,l;Level Name,TEN,200,0,f,l",
			 "_gridSQL":"F013.G01",			
			 "_template":"TuyenBV"
			};
opt["F014"]={
		  "_param":[],
			 "_filter":[
			["txtCOMPANY_NAME", "", "COMPANY_NAME", "Y"],
			["txtADDRESS", "", "ADDRESS", "Y"],
			["cboCOMPANY_TYPE", "F014.F01", "", "Y"]
			],
			 "_mode":"view",
			 "_tableName":"ORG_COMPANY",
			 "_keyField":"COMPANY_ID",
			 "_gridHeader":"STT,IDX,10,0,f,l;Company ID,COMPANY_ID,100,0,f,l;Company Address,ADDRESS,200,0,f,l;Company Type,COMPANY_TYPE_NAME,50,0,f,l",
			 "_gridSQL":"F014.G01",			 
			 "_template":"Company"
			};