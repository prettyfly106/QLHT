[

{	
	"id":"100","icon":"icon-user","text":"Hệ thống","hlink":"#","options":"0,0"
	,"children":[
	             	{"id":"101","icon":"icon-cog","text":"Đăng xuất","hlink":"/hPortal/login/login.jsp","options":"0,0"},
	             	{"id":"102","icon":"icon-cog","text":"Đổi mật khẩu","hlink":"/hPortal/main/manager.jsp?func=../admin/changePassword","options":"0,0"}
	             	
	             ]
},
{	
	"id":"200","icon":"icon-book","text":"Hồ sơ","hlink":"#","options":"0,0"
	,"children":[
	             	{"id":"201","icon":"icon-cog","text":"Nhập đăng ký KCB","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/registerKCB","options":"0,1"},
	             	{"id":"202","icon":"icon-cog","text":"Nhập hồ sơ KCB","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/HoSoKCB","options":"0,1"},
	             	{"id":"203","icon":"icon-cog","text":"Nhập Giấy chuyển tuyến","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/manageGCT","options":"0,1"},
	             	{"id":"204","icon":"icon-cog","text":"Quản lý kỳ giám định","hlink":"/hPortal/main/manager.jsp?func=../dynform/ListMgrEx&amp;table=L003","options":"0,1"},
	             	{"id":"205","icon":"icon-cog","text":"Trích xuất hồ sơ KCB","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/downloadKCB","options":"0"},
	             	{"id":"206","icon":"icon-cog","text":"Upload file hồ sơ phê duyệt","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/approve","options":"0"},
	             	{"id":"208","icon":"icon-cog","text":"Upload file hồ sơ 3360","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/approveExt","options":"0"},
	             	{"id":"207","icon":"icon-cog","text":"Upload báo cáo tháng","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/inputParams","options":"0"},
	             	{"id":"209","icon":"icon-cog","text":"Kiểm tra cấu trúc XML","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/validateXML","options":"0"},
	             	{"id":"210","icon":"icon-cog","text":"Nhập hồ sơ KCB (Theo danh mục của CSKCB)","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/HoSoKCB_BV","options":"0"},
	             	{"id":"211","icon":"icon-cog","text":"Ánh xạ hồ hơ theo danh mục BYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/recordMap","options":"0"},
	             	{"id":"212","icon":"icon-cog","text":"Số hồ sơ đã nhập","hlink":"/hPortal/main/manager.jsp?func=../dynform/FindMgrEx&amp;table=F015","options":"0"},
	             	{"id":"213","icon":"icon-cog","text":"Thống kê hồ sơ đã nhập","hlink":"/hPortal/main/manager.jsp?func=../dynform/FindMgrEx&amp;table=F016","options":"0"}
	             ]
},
{	
	"id":"300","icon":"icon-list-alt","text":"Liên thông","hlink":"#","options":"0"
	,"children":[
	 	{"id":"301","icon":"icon-cog","text":"Kiểm tra lạm dụng thẻ BHYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/registerCheck","options":"0"},
	 	{"id":"302","icon":"icon-cog","text":"Danh sách bệnh nhân chuyển tuyến đi","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/transferList&amp;type=1","options":"0"},
	 	{"id":"303","icon":"icon-cog","text":"Danh sách bệnh nhân chuyển tuyến đến","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/transferList&amp;type=2","options":"0"},
	 	{"id":"304","icon":"icon-cog","text":"Tra cứu thông tin thẻ BHYT","hlink":"/hPortal/main/manager.jsp?func=../dynform/ListMgrEx&table=L018","options":"0"},
	 	{"id":"305","icon":"icon-cog","text":"Tra cứu thông tin đăng ký KCB","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/registerList","options":"0"},
	 	{"id":"306","icon":"icon-cog","text":"Tra cứu hồ sơ KCB","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/examList","options":"0"},
	 	{"id":"307","icon":"icon-cog","text":"Nhập dự trù thuốc","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/drugReserve","options":"0"},
	 	{"id":"308","icon":"icon-cog","text":"Duyệt dự trù thuốc","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/drugApprove","options":"0"},
	 	{"id":"308","icon":"icon-cog","text":"Tra cứu phiếu dự trù thuốc","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/drugReserveSrc","options":"0"}
	 ]
},
{	
	"id":"400","icon":"icon-briefcase","text":"Báo cáo","hlink":"#","options":"0"
	,"children":[
	    {"id":"401","icon":"icon-bar-chart","text":"Biều đồ tổng hợp","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/dashboard","options":"0"},
     	{"id":"402","icon":"icon-cog","text":"Báo cáo thống kê","hlink":"/hPortal/report/viewReport.jsp","options":"1"},
     	{"id":"403","icon":"icon-bar-chart","text":"Biểu đồ thống kê","hlink":"/hPortal/main/manager.jsp?func=../chart/ChartMgr&chartId=CHART008&period=yyyy","options":"1"},
     	{"id":"404","icon":"icon-cog","text":"Thống kê dữ liệu tiếp nhận","hlink":"/hPortal/main/manager.jsp?func=../dynform/FindMgrEx&amp;table=F001","options":"0"}
     ]
},
{	
	"id":"500","icon":"icon-cog","text":"Ánh xạ danh mục SYT","hlink":"#","options":"0,0"
	,"children":[
	             	{"id":"501","icon":"icon-cog","text":"Upload file danh mục SYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/uploadExcelCSYT","options":"0,0"},
	             	{"id":"502","icon":"icon-cog","text":"Ánh xạ danh mục dịch vụ SYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/serviceMapCSYT","options":"0,0"},
	             	{"id":"503","icon":"icon-cog","text":"Ánh xạ danh mục thuốc SYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/drugMapCSYT","options":"0,0"},
	             	{"id":"504","icon":"icon-cog","text":"Ánh xạ danh mục vật tư y tế SYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/materialMapCSYT","options":"0,0"}
	             ]
},
{	
	"id":"500","icon":"icon-cog","text":"Ánh xạ danh mục BYT","hlink":"#","options":"0,0"
	,"children":[
	             	{"id":"501","icon":"icon-cog","text":"Upload file danh mục BYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/uploadExcel","options":"0,0"},
	             	{"id":"502","icon":"icon-cog","text":"Ánh xạ danh mục dịch vụ BYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/serviceMap","options":"0,0"},
	             	{"id":"503","icon":"icon-cog","text":"Ánh xạ danh mục thuốc BYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/drugMap","options":"0,0"},
	             	{"id":"504","icon":"icon-cog","text":"Ánh xạ danh mục vật tư y tế BYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/materialMap","options":"0,0"},
	             	{"id":"505","icon":"icon-cog","text":"Download danh mục ánh xạ BYT","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/downloadMapFile","options":"0,0"}
	             ]
},
{	
	"id":"600","icon":"icon-cog","text":"Quản lý danh mục","hlink":"#","options":"0"
	,"children":[
     	{"id":"602","icon":"icon-cog","text":"1.Danh mục DVKT","hlink":"/hPortal/main/manager.jsp?func=../DMDC/serviceMgr","options":"0"},
     	{"id":"603","icon":"icon-cog","text":"2.Danh mục Thuốc tân dược","hlink":"/hPortal/main/manager.jsp?func=../DMDC/drugMgr","options":"0"},
     	{"id":"604","icon":"icon-cog","text":"3.1.Danh mục Chế phẩm thuốc YHCT","hlink":"/hPortal/main/manager.jsp?func=../DMDC/byt_dm_cptyhct","options":"0"},
     	{"id":"605","icon":"icon-cog","text":"3.2.Danh mục Vị thuốc YHCT","hlink":"/hPortal/main/manager.jsp?func=../DMDC/byt_dm_vtyhct","options":"0"},
     	{"id":"606","icon":"icon-cog","text":"4.Danh mục Bệnh YHCT","hlink":"/hPortal/main/manager.jsp?func=../DMDC/byt_dm_benhyhct","options":"0"},
     	{"id":"607","icon":"icon-cog","text":"5.Danh mục Vật tư y tế","hlink":"/hPortal/main/manager.jsp?func=../DMDC/materialMgr","options":"0"},
     	{"id":"608","icon":"icon-cog","text":"6.Danh mục Máu và chế phẩm máu","hlink":"/hPortal/main/manager.jsp?func=../DMDC/byt_dm_mau","options":"0"},
     	{"id":"609","icon":"icon-cog","text":"7.Danh mục Bệnh theo ICD10","hlink":"/hPortal/main/manager.jsp?func=../DMDC/byt_dm_icd","options":"0"},
     	{"id":"610","icon":"icon-cog","text":"8.Danh mục Cơ sở KCB","hlink":"/hPortal/main/manager.jsp?func=../DMDC/byt_dm_cskcb","options":"0"},
     	{"id":"611","icon":"icon-cog","text":"Tra cứu ICD9","hlink":"/hPortal/main/manager.jsp?func=../ICD/ICD9","options":"0"},
     	{"id":"612","icon":"icon-cog","text":"Tra cứu ICD10","hlink":"/hPortal/main/manager.jsp?func=../ICD/ICD10","options":"0"}
     ]
}
]