[

{	
	"id":"100","icon":"icon-user","text":"System","hlink":"#","options":"0"
	,"children":[
	             	{"id":"101","icon":"icon-cog","text":"Logout","hlink":"/hPortal/login/login.jsp","options":"0"},
	             	{"id":"102","icon":"icon-cog","text":"Change password","hlink":"/hPortal/main/manager.jsp?func=../admin/changePassword","options":"0"},
	             	{"id":"1103","icon":"icon-cog","text":"User management","hlink":"/hPortal/main/manager.jsp?func=../dynform/ListMgrEx&amp;table=L019","options":"1"}
	             ]
},
{	
	"id":"200","icon":"icon-book","text":"Records","hlink":"#","options":"0,0"
	,"children":[
	             	{"id":"201","icon":"icon-cog","text":"Hospitalization register input","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/registerKCB","options":"1"},
     	{"id":"202","icon":"icon-cog","text":"Medical records input","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/HoSoKCB","options":"1"},
     	{"id":"203","icon":"icon-cog","text":"Referral input","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/manageGCT","options":"1"},
     	{"id":"204","icon":"icon-cog","text":"Validation period management","hlink":"/hPortal/main/manager.jsp?func=../dynform/ListMgrEx&amp;table=L003","options":"1"},
     	{"id":"205","icon":"icon-cog","text":"Medical records downloaded","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/downloadKCB","options":"1"},
     	{"id":"206","icon":"icon-cog","text":"Medical records file upload","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/approve","options":"1"},
	    {"id":"208","icon":"icon-cog","text":"Approval files 3360 upload","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/approveExt","options":"0"},
	    {"id":"207","icon":"icon-cog","text":"Monthly report upload","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/inputParams","options":"0"},
	    {"id":"209","icon":"icon-cog","text":"Validate XML structure","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/validateXML","options":"0"},
	    {"id":"210","icon":"icon-cog","text":"Medical records input (according to list from medical health clinic)","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/HoSoKCB_BV","options":"0"}
	             ]
},
{	
	"id":"300","icon":"icon-list-alt","text":"Interconnection","hlink":"#","options":"0"
	,"children":[
	 	{"id":"301","icon":"icon-cog","text":"Insurance card abuse check","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/registerCheck","options":"0"},
	 	{"id":"302","icon":"icon-cog","text":"Outgoing referral list","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/transferList&amp;type=1","options":"0"},
	 	{"id":"303","icon":"icon-cog","text":"Incoming referral list","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/transferList&amp;type=2","options":"0"},
	 	{"id":"304","icon":"icon-cog","text":"Insurance card information search","hlink":"/hPortal/main/manager.jsp?func=../dynform/ListMgrEx&table=L018","options":"0"},
	 	{"id":"305","icon":"icon-cog","text":"Hospitalization register information search","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/registerList","options":"0"},
	 	{"id":"306","icon":"icon-cog","text":"Medical records search","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/examList","options":"0"},
	 	{"id":"307","icon":"icon-cog","text":"Medicine reservation","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/drugReserve","options":"0"},
	 	{"id":"308","icon":"icon-cog","text":"Medicine reservation approve ","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/drugApprove","options":"0"},
	 	{"id":"308","icon":"icon-cog","text":"Medicine reservation search","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/drugReserveSrc","options":"0"}
	 ]
},
{	
	"id":"400","icon":"icon-briefcase","text":"Report","hlink":"#","options":"0"
	,"children":[
	    {"id":"401","icon":"icon-bar-chart","text":"General chart","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/dashboard","options":"0"},
     	{"id":"402","icon":"icon-cog","text":"Statistical report","hlink":"/hPortal/report/viewReport.jsp","options":"1"},
     	{"id":"403","icon":"icon-bar-chart","text":"Statistical chart","hlink":"/hPortal/main/manager.jsp?func=../chart/ChartMgr&chartId=CHART008&period=yyyy","options":"1"},
     	
     	{"id":"404","icon":"icon-cog","text":"Hospitalization data statistic","hlink":"/hPortal/main/manager.jsp?func=../dynform/FindMgrEx&amp;table=F001","options":"0"},
	 	{"id":"405","icon":"icon-cog","text":"Approval records search","hlink":"/hPortal/main/manager.jsp?func=../dynform/FindMgrEx&table=F002","options":"0"}
     ]
},
{	
	"id":"500","icon":"icon-cog","text":"List mapping","hlink":"#","options":"0"
	,"children":[
     	{"id":"501","icon":"icon-cog","text":"List files upload","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/uploadExcel","options":"0"},
     	{"id":"502","icon":"icon-cog","text":"Technical service map","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/serviceMap","options":"0"},
     	{"id":"503","icon":"icon-cog","text":"Medicine map","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/drugMap","options":"0"},
     	{"id":"504","icon":"icon-cog","text":"Medical equipment map","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/materialMap","options":"0"},
     	{"id":"505","icon":"icon-cog","text":"Download mapped files","hlink":"/hPortal/main/manager.jsp?func=../MiniHIS/downloadMapFile","options":"0"}
     ]
}
]