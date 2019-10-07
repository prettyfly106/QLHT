[

{	
	"id":"100","icon":"icon-user","text":"Hệ thống","hlink":"#","options":"0"
	,"children":[
	             	{"id":"101","icon":"icon-cog","text":"Đăng xuất","hlink":"/hPortal/login/login.jsp","options":"0"},
	             	{"id":"102","icon":"icon-cog","text":"Đổi mật khẩu","hlink":"/hPortal/main/manager.jsp?func=../admin/changePassword","options":"0"},
	             	{"id":"1103","icon":"icon-cog","text":"Quản lý NSD","hlink":"/hPortal/main/manager.jsp?func=../dynform/ListMgrEx&amp;table=L019","options":"1"}
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
	 	{"id":"306","icon":"icon-cog","text":"Tra cứu hồ sơ KCB","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/examList","options":"0"}
	 ]
},
{	
	"id":"400","icon":"icon-briefcase","text":"Báo cáo","hlink":"#","options":"0"
	,"children":[
	    {"id":"401","icon":"icon-bar-chart","text":"Biều đồ tổng hợp","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/dashboard","options":"0"},
     	{"id":"402","icon":"icon-cog","text":"Báo cáo thống kê","hlink":"/hPortal/report/viewReport.jsp","options":"1"},
     	{"id":"403","icon":"icon-bar-chart","text":"Biểu đồ thống kê","hlink":"/hPortal/main/manager.jsp?func=../chart/ChartMgr&chartId=CHART008&period=yyyy","options":"1"},
     	{"id":"404","icon":"icon-cog","text":"Thống kê dữ liệu tiếp nhận","hlink":"/hPortal/main/manager.jsp?func=../dynform/FindMgrEx&amp;table=F001","options":"0"},
	 	{"id":"405","icon":"icon-cog","text":"Tra cứu hồ sơ phê duyệt","hlink":"/hPortal/main/manager.jsp?func=../dynform/FindMgrEx&table=F002","options":"0"},
	 	{"id":"406","icon":"icon-cog","text":"Thống kê số lượng hồ sơ trên cổng","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/statistic","options":"0"},
	 	{"id":"407","icon":"icon-cog","text":"Thống kê tình hình ánh xạ danh mục","hlink":"/hPortal/main/manager.jsp?func=../dynform/FindMgrEx&amp;table=F017","options":"0"}
     ]
},
{	
	"id":"500","icon":"icon-cog","text":"Ánh xạ danh mục","hlink":"#","options":"0,0"
	,"children":[
	             	{"id":"501","icon":"icon-cog","text":"Upload file danh mục","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/uploadExcelSYT","options":"0,0"},
	             	{"id":"502","icon":"icon-cog","text":"Ánh xạ danh mục dịch vụ","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/serviceMapSYT","options":"0,0"},
	             	{"id":"503","icon":"icon-cog","text":"Ánh xạ danh mục thuốc","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/drugMapSYT","options":"0,0"},
	             	{"id":"504","icon":"icon-cog","text":"Ánh xạ danh mục vật tư y tế","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/materialMapSYT","options":"0,0"}
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
     	{"id":"611","icon":"icon-cog","text":"Quản lý DM Cơ cở KCB","hlink":"/hPortal/main/manager.jsp?func=../dynform/ListMgrEx&table=L001","options":"0"}
     ]
}

]