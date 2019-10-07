
var chartConfig = {
		CHART001 : {
			_type:"column",
			_sql_par:[1],
			_sql:[
			      "SELECT a.ma_tinh ma_dv,t.ten_tinh ten_dv,a.so_ngay_dtri from (SELECT ma_tinh,NVL(ROUND (avg(so_ngay_dtri), 2), 0) so_ngay_dtri FROM pt_bhyt_tonghop a,dm_coso_kcb bv where a.ma_cskcb = bv.ma_bv(+) and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') GROUP BY bv.ma_tinh) A,dm_tinh t where a.ma_tinh = t.ma_so(+)"
			      ,"SELECT a.ma_cskcb ma_dv,bv.ten_bv ten_dv,a.so_ngay_dtri from (SELECT ma_cskcb,NVL(ROUND (avg(so_ngay_dtri), 2), 0) so_ngay_dtri FROM pt_bhyt_tonghop a WHERE exists (select 1 from dm_coso_kcb b where b.ma_bv=a.ma_cskcb and b.ma_tinh=[S3]) and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') GROUP BY ma_cskcb) A,dm_coso_kcb bv where a.ma_cskcb = bv.ma_bv(+)"
			      ,"SELECT a.ma_cskcb ma_dv,bv.ten_bv ten_dv,a.so_ngay_dtri from (SELECT ma_cskcb,NVL(ROUND (avg(so_ngay_dtri), 2), 0) so_ngay_dtri FROM pt_bhyt_tonghop a WHERE a.ma_cskcb='[S0]' and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') GROUP BY ma_cskcb) A,dm_coso_kcb bv where a.ma_cskcb = bv.ma_bv(+)"
			     ],
			_catName:"TEN_DV",
			_serieName:["Average days of treatment"],
			_value:["SO_NGAY_DTRI"],
			_opt : {
				 title: {
			            text: "TREATMENT DAILY STATISTICS",	           
		        },
		        subtitle: {
		            text: 'Source: vnpthis.vn'
		        },
		        yAxis: {
		            title: {
		                text: "Day"
		            }
		        },
		        plotOptions: {
		            series: {		              
		                dataLabels: {
		                    enabled: true,		                    
		                    formatter : function() {
		                    	if (this.y != Math.round(this.y)) {		                    		
		                    		return Highcharts.numberFormat(this.y,2);		                    		
		                    	}
		                    	return this.y;
		                    }
		                }
		            },
		            column: {		              
		                dataLabels: {
		                    enabled: true,		                    
		                    formatter : function() {
		                    	if (this.y != Math.round(this.y)) {		                    		
		                    		return Highcharts.numberFormat(this.y,2);		                    		
		                    	}
		                    	return this.y;
		                    }
		                }
		            }
		        },

		        tooltip: {
		        	headerFormat: '',		           
		            footerFormat: '',
		            pointFormatter : function() {
                    	if (this.y != Math.round(this.y)) {		                    		
                    		return '<span style="color:'+this.color+'">'+this.name+'</span>: <b>'+Highcharts.numberFormat(this.y,2)+'</b><br/>';	                    		
                    	}
                    	return '<span style="color:'+this.color+'">'+this.name+'</span>: <b>'+Highcharts.numberFormat(this.y,0)+'</b><br/>';
                    }
		        }
			}
		},
		CHART002 : {
			_type:"column",
			_sql_par:[1],
			_sql:[
			 "select b.*,tntt.ten ten_tainan from (select ma_tai_nan,sum(cnt) tong_soca, SUM (DECODE (ket_qua_dtri, 5, cnt, 0)) tong_tuvong,SUM (CASE WHEN gioi_tinh = 1 AND ket_qua_dtri = 5 THEN cnt ELSE 0 END) nam_tuvong,SUM (CASE WHEN gioi_tinh = 2 AND ket_qua_dtri = 5 THEN cnt ELSE 0 END) nu_tuvong,SUM (DECODE (gioi_tinh, 1, cnt, 0)) nam_soca,SUM (DECODE (gioi_tinh, 2, cnt, 0)) nu_soca from (select ma_cskcb,ma_tai_nan,gioi_tinh,ket_qua_dtri,count(*) cnt from pt_bhyt_tonghop a where to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') AND (GIOI_TINH =1 OR GIOI_TINH =2) group by ma_cskcb,ma_tai_nan,gioi_tinh,ket_qua_dtri ) a group by ma_tai_nan) b,dm_tainan_thuongtich tntt where b.ma_tai_nan=tntt.ma(+)",
			 "select b.*,tntt.ten ten_tainan from (select ma_tai_nan,sum(cnt) tong_soca, SUM (DECODE (ket_qua_dtri, 5, cnt, 0)) tong_tuvong,SUM (CASE WHEN gioi_tinh = 1 AND ket_qua_dtri = 5 THEN cnt ELSE 0 END) nam_tuvong,SUM (CASE WHEN gioi_tinh = 2 AND ket_qua_dtri = 5 THEN cnt ELSE 0 END) nu_tuvong,SUM (DECODE (gioi_tinh, 1, cnt, 0)) nam_soca,SUM (DECODE (gioi_tinh, 2, cnt, 0)) nu_soca from (select ma_cskcb,ma_tai_nan,gioi_tinh,ket_qua_dtri,count(*) cnt from pt_bhyt_tonghop a where exists (select 1 from dm_coso_kcb b where b.ma_bv=a.ma_cskcb and b.ma_tinh=[S3]) AND (GIOI_TINH =1 OR GIOI_TINH =2) and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') group by ma_cskcb,ma_tai_nan,gioi_tinh,ket_qua_dtri ) a group by ma_tai_nan) b,dm_tainan_thuongtich tntt where b.ma_tai_nan=tntt.ma(+)",
			 "select b.*,tntt.ten ten_tainan from (select ma_tai_nan,sum(cnt) tong_soca, SUM (DECODE (ket_qua_dtri, 5, cnt, 0)) tong_tuvong,SUM (CASE WHEN gioi_tinh = 1 AND ket_qua_dtri = 5 THEN cnt ELSE 0 END) nam_tuvong,SUM (CASE WHEN gioi_tinh = 2 AND ket_qua_dtri = 5 THEN cnt ELSE 0 END) nu_tuvong,SUM (DECODE (gioi_tinh, 1, cnt, 0)) nam_soca,SUM (DECODE (gioi_tinh, 2, cnt, 0)) nu_soca from (select ma_cskcb,ma_tai_nan,gioi_tinh,ket_qua_dtri,count(*) cnt from pt_bhyt_tonghop a where a.ma_cskcb='[S0]' AND (GIOI_TINH =1 OR GIOI_TINH =2) and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') group by ma_cskcb,ma_tai_nan,gioi_tinh,ket_qua_dtri ) a group by ma_tai_nan) b,dm_tainan_thuongtich tntt where b.ma_tai_nan=tntt.ma(+)",
			 ],
			_catName:"TEN_TAINAN",
			_serieName:["Male, sections","Male, mortality","Female, sections","Male, death","Total section","Total death"],
			_value:["NAM_SOCA","NAM_TUVONG","NU_SOCA","NU_TUVONG","TONG_SOCA","TONG_TUVONG"],			
			_decimalNumber:2,
			_opt : {
				 title: {
			            text: "ACCIDENTAL INJURY STATISTICS",	           
		        },
		        subtitle: {
		            text: 'Source: vnpthis.vn'
		        },
		        yAxis: {
		            title: {
		                text: "Section"
		            }
		        },
		        legend: {
		        	enabled:true,
		            align: 'center',
		            verticalAlign: 'bottom',
		            layout: 'horizontal',
		            x: 0,
		            y: 0,
	                borderWidth: 0,
	                itemStyle: {
	                    fontSize: '.8em'
	                }
		        }
			}
		},
		CHART003 : {
			_type:"column",
			_sql_par:[1],
			_sql:[
			      "select dm.name loai_kcb, sum(decode(a.ma_khuvuc,'K1',1,0)) K1,sum(decode(a.ma_khuvuc,'K2',1,0)) K2,sum(decode(a.ma_khuvuc,'K3',1,0)) K3  from (select (case when ma_loai_kcb=1 then 1 when ma_loai_kcb=2 then 4 when tinh_trang_rv =2 then 3  when ma_lydo_vvien =2 then 2 end) loai_kcb , ma_khuvuc from pt_bhyt_tonghop a where to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]')) a, DM_LOAI_KB dm where a.loai_kcb(+) = dm.code  group by dm.name,dm.code  order by dm.code",
			      "select dm.name loai_kcb, sum(decode(a.ma_khuvuc,'K1',1,0)) K1,sum(decode(a.ma_khuvuc,'K2',1,0)) K2,sum(decode(a.ma_khuvuc,'K3',1,0)) K3  from (select (case when ma_loai_kcb=1 then 1 when ma_loai_kcb=2 then 4 when tinh_trang_rv =2 then 3  when ma_lydo_vvien =2 then 2 end) loai_kcb , ma_khuvuc from pt_bhyt_tonghop a where exists (select 1 from dm_coso_kcb b where b.ma_bv=a.ma_cskcb and b.ma_tinh=[S3]) and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]')) a, DM_LOAI_KB dm where a.loai_kcb(+) = dm.code  group by dm.name,dm.code  order by dm.code",
			      "select dm.name loai_kcb, sum(decode(a.ma_khuvuc,'K1',1,0)) K1,sum(decode(a.ma_khuvuc,'K2',1,0)) K2,sum(decode(a.ma_khuvuc,'K3',1,0)) K3  from (select (case when ma_loai_kcb=1 then 1 when ma_loai_kcb=2 then 4 when tinh_trang_rv =2 then 3  when ma_lydo_vvien =2 then 2 end) loai_kcb , ma_khuvuc from pt_bhyt_tonghop a where ma_cskcb='[S0]' and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]')) a, DM_LOAI_KB dm where a.loai_kcb(+) = dm.code  group by dm.name,dm.code  order by dm.code",
			      ],
			_catName:"LOAI_KCB",
			_serieName:["K1","K2","K3"],
			_value:["K1","K2","K3"],			
			_decimalNumber:2,
			_opt : {
				 title: {
			            text: "HEALTHCARE ACTIVITIES BY INDIVIDUALS STATISTICS",	           
		        },
		        subtitle: {
		            text: 'Source: vnpthis.vn'
		        },
		        yAxis: {
		            title: {
		                text: "Turn"
		            }
		        },
		        legend: {
		        	enabled:true,
		            align: 'center',
		            verticalAlign: 'bottom',
		            layout: 'horizontal',
		            x: 0,
		            y: 0,
	                borderWidth: 0,
	                itemStyle: {
	                    fontSize: '.8em'
	                }
		        }
			}
		},
		CHART004 : {
			_type:"pie",
			_sql_par:[1],
//			_sql:"select b.vviet TENBENH, a.ma_benh MABENH,count(a.ma_benh) SOLUONG from pt_bhyt_chitietthuoc a, dm_icd b where a.ma_benh = b.cicd10 group by  b.vviet,a.ma_benh having count(a.ma_benh) >2000 order by a.ma_benh ",
			_sql:[
			      "select * from (select  b.vviet TENBENH, a.lansudung_theobenh SOLUONG from(select a.ma_benh, count(a.ma_thuoc) lansudung_theobenh from pt_bhyt_tonghop b, pt_bhyt_chitietthuoc a where B.LK_ID = A.LK_ID and to_char(b.NGAY_RA,'[S4]') = to_char(sysdate,'[S4]')  group by a.ma_benh) a,  dm_icd b where a.ma_benh = b.cicd10   order by  a.lansudung_theobenh desc) where  rownum <=30",
			      "select * from (select  b.vviet TENBENH, a.lansudung_theobenh SOLUONG from(select a.ma_benh, count(a.ma_thuoc) lansudung_theobenh from pt_bhyt_tonghop b, pt_bhyt_chitietthuoc a , dm_coso_kcb c where B.LK_ID = A.LK_ID and b.ma_cskcb=c.ma_bv and c.ma_tinh=[S3] and to_char(b.NGAY_RA,'[S4]') = to_char(sysdate,'[S4]')   group by a.ma_benh) a,  dm_icd b where a.ma_benh = b.cicd10  order by  a.lansudung_theobenh desc where  rownum <=30",
			      "select * from (select  b.vviet TENBENH, a.lansudung_theobenh SOLUONG from(select a.ma_benh, count(a.ma_thuoc) lansudung_theobenh from pt_bhyt_tonghop b, pt_bhyt_chitietthuoc a where B.LK_ID = A.LK_ID and to_char(b.NGAY_RA,'[S4]') = to_char(sysdate,'[S4]') and b.ma_cskcb = '[S0]' group by a.ma_benh) a,dm_icd b where a.ma_benh = b.cicd10  order by  a.lansudung_theobenh desc ) where rownum <=30"
			      ],
			_catName:"Rate",
			_serieName:["K1","K2","K3"],
			_value:["TENBENH","SOLUONG"],			
			_decimalNumber:2,
			_opt : {
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
		            type: 'pie'
		        },
		        title: {
		        	align : "center",
		            text: 'MEDICINE USING CLASSIFIED BY PHARMACOLOGICAL EFFECTS',
		            style: {
		                //color: '#FF00FF',
		                fontWeight: 'bold',
		                //fontSize: '1em'		                
		            }		            
		        },
		        subtitle: {
		            text: 'Source: vnpthis.vn'
		        },
		        legend: {
		            align: 'right',
		            verticalAlign: 'top',
		            layout: 'vertical',
		            x: 0,
		            y: 20,	                            
		            labelFormat: '{name} {y:.,2f} (lượt) ',
		            borderWidth: 1,
		            itemStyle: {
		                fontSize: '.8em'
		            }
		        },
		        tooltip: {
		            pointFormat: '<b>{point.percentage:.2f} %</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.percentage:.2f}%',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                },
		                showInLegend: true
		            }
		        },
		        series: []
		    	}
		},
		CHART005 : {
			_type:"line",
			_sql_par:[1],
			_sql:[
			      "select nvl(tngt,0) TAI_NAN_GIAO_THONG,nvl(tnld,0) TAI_NAN_LAO_DONG,nvl(tndn,0) TAI_NAN_DUOI_NUOC,nvl(BONG,0) BONG,nvl(blxd,0) BAO_LUC_XUNG_DOT,nvl(TU_TU,0) TU_TU,nvl(ndcl,0) NGO_DOC_CAC_LOAI,nvl(KHAC,0) KHAC from (select b.MA, SOLUONG  from ( select  A.MA_TAI_NAN,a.NGAY_RA, A.KET_QUA_DTRI, a.MA_CSKCB, count(a.MA_TAI_NAN) SOLUONG from pt_bhyt_tonghop a where a.MA_TAI_NAN != 0 and a.ket_qua_dtri = 5 and to_char(a.NGAY_RA,'[S4]')=to_char(sysdate,'[S4]') group by  A.MA_TAI_NAN,a.NGAY_RA,a.ket_qua_dtri, a.MA_CSKCB) a, dm_tainan_thuongtich b,dm_coso_kcb c   where a.MA_TAI_NAN = b.MA order by a.NGAY_RA desc ) PIVOT (SUM(SOLUONG) FOR(MA) IN ('1' tngt,'2' tnld,'3' tndn,'4' BONG,'5' blxd,'6' TU_TU,'7' ndcl,'8' KHAC))",
			      "select nvl(tngt,0) TAI_NAN_GIAO_THONG,nvl(tnld,0) TAI_NAN_LAO_DONG,nvl(tndn,0) TAI_NAN_DUOI_NUOC,nvl(BONG,0) BONG,nvl(blxd,0) BAO_LUC_XUNG_DOT,nvl(TU_TU,0) TU_TU,nvl(ndcl,0) NGO_DOC_CAC_LOAI,nvl(KHAC,0) KHAC from (select b.MA, SOLUONG  from ( select  A.MA_TAI_NAN,a.NGAY_RA, A.KET_QUA_DTRI, a.MA_CSKCB, count(a.MA_TAI_NAN) SOLUONG from pt_bhyt_tonghop a where a.MA_TAI_NAN != 0 and a.ket_qua_dtri = 5 and to_char(a.NGAY_RA,'[S4]')=to_char(sysdate,'[S4]') group by  A.MA_TAI_NAN,a.NGAY_RA,a.ket_qua_dtri, a.MA_CSKCB) a, dm_tainan_thuongtich b,dm_coso_kcb c   where a.MA_TAI_NAN = b.MA and A.MA_CSKCB=c.ma_bv and c.ma_tinh = [S3] order by a.NGAY_RA desc ) PIVOT (SUM(SOLUONG) FOR(MA) IN ('1' tngt,'2' tnld,'3' tndn,'4' BONG,'5' blxd,'6' TU_TU,'7' ndcl,'8' KHAC))",
			      "select nvl(tngt,0) TAI_NAN_GIAO_THONG,nvl(tnld,0) TAI_NAN_LAO_DONG,nvl(tndn,0) TAI_NAN_DUOI_NUOC,nvl(BONG,0) BONG,nvl(blxd,0) BAO_LUC_XUNG_DOT,nvl(TU_TU,0) TU_TU,nvl(ndcl,0) NGO_DOC_CAC_LOAI,nvl(KHAC,0) KHAC from (select b.MA, SOLUONG  from ( select  A.MA_TAI_NAN,a.NGAY_RA, A.KET_QUA_DTRI, count(a.MA_TAI_NAN) SOLUONG from pt_bhyt_tonghop a where a.MA_TAI_NAN != 0 and a.ket_qua_dtri = 5 and to_char(a.NGAY_RA,'[S4]')=to_char(sysdate,'[S4]') and A.MA_CSKCB = '[S0]' group by  A.MA_TAI_NAN,a.NGAY_RA,a.ket_qua_dtri  ) a, dm_tainan_thuongtich b   where a.MA_TAI_NAN = b.MA order by a.NGAY_RA desc )  PIVOT (SUM(SOLUONG) FOR(MA) IN ('1' tngt,'2' tnld,'3' tndn,'4' BONG,'5' blxd,'6' TU_TU,'7' ndcl,'8' KHAC))" 
			      ],
			_catName:["Death"],
			_serieName:["Traffic accidents","Industrial accidents","Underwater accident","Burning","Violent conflict","Suicide","Poisoning types","Other"],
			_value:["TAI_NAN_GIAO_THONG","TAI_NAN_LAO_DONG","TAI_NAN_DUOI_NUOC","BONG","BAO_LUC_XUNG_DOT","TU_TU","NGO_DOC_CAC_LOAI","KHAC"],			
			_decimalNumber:2,
			_opt : {

		        chart: {
		            type: 'line'
		        },
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: 'Source: vnpthis.vn'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0,
		            enabled:false
		        },
		        xAxis: {
		            categories: [], //['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
		            tickmarkPlacement: 'on',
		            title: {
		                enabled: false
		            }
		        },
		        yAxis: {
		            title: {
		                text: 'Total'
		            },
		            labels: {
		                formatter: function () {
		                    return this.value;
		                }
		            }
		        },
		        tooltip: {
		            shared: true,
		            valueSuffix: ' section'
		        },
		        plotOptions: {
		            area: {
		                stacking: 'normal',
		                lineColor: '#666666',
		                lineWidth: 1,
		                marker: {
		                    lineWidth: 1,
		                    lineColor: '#666666'
		                }
		            }
		        },
		        series: []		    
			}
		},
		CHART006 : {
			_type:"column",
			_sql_par:[],
			_sql:[
			      "SELECT T.TEN_TINH TEN_DV,a.* from (select MA_TINH,COUNT(*) SO_CSKCB, SUM(DECODE(a.TT_TRIENKHAI,0,1,0)) CHUA_TRIEN_KHAI, SUM(DECODE(a.TT_TRIENKHAI,1,1,0)) THU_NGHIEM, SUM(DECODE(a.TT_TRIENKHAI,2,1,0)) CHINH_THUC FROM DM_COSO_KCB a group by a.MA_TINH) a,DM_TINH T WHERE a.MA_TINH=T.MA_SO(+)",
			      "SELECT T.TEN TEN_DV,a.* from (select MA_TUYEN_BV,COUNT(*) SO_CSKCB, SUM(DECODE(a.TT_TRIENKHAI,0,1,0)) CHUA_TRIEN_KHAI, SUM(DECODE(a.TT_TRIENKHAI,1,1,0)) THU_NGHIEM, SUM(DECODE(a.TT_TRIENKHAI,2,1,0)) CHINH_THUC FROM DM_COSO_KCB a group by a.MA_TUYEN_BV) a,DM_TUYEN_BV T WHERE a.MA_TUYEN_BV=T.MA_SO(+)",
			      "SELECT T.TEN TEN_DV,a.* from (select MA_TUYEN_BV,COUNT(*) SO_CSKCB, SUM(DECODE(a.TT_TRIENKHAI,0,1,0)) CHUA_TRIEN_KHAI, SUM(DECODE(a.TT_TRIENKHAI,1,1,0)) THU_NGHIEM, SUM(DECODE(a.TT_TRIENKHAI,2,1,0)) CHINH_THUC FROM DM_COSO_KCB a group by a.MA_TUYEN_BV) a,DM_TUYEN_BV T WHERE a.MA_TUYEN_BV=T.MA_SO(+)"
			      ],
			_catName:"TEN_TINH",
			_serieName:["Number of Hospital","Not implemented", "Test implementation", "Official implementation"],
			_value:["SO_CSKCB","CHUA_TRIEN_KHAI","THU_NGHIEM","CHINH_THUC"],			
			_decimalNumber:2,
			_opt : {
				 title: {
			            text: "REPORT ON THE IMPLEMENTATION",	           
		        },
		        subtitle: {
		            text: 'Source: vnpthis.vn'
		        },
		        yAxis: {
		            title: {
		                text: "Hospital No."
		            }
		        },
		        xAxis: {		           
		            labels: {
		                style: {		                   
		                    fontSize:'8.5px'
		                }
		            }
		        },
		        plotOptions: {
	                column: {
	                    pointPadding: 0,
	                    borderWidth: 0
	                }
	            },
		        legend: {
		        	enabled:true,
		            align: 'center',
		            verticalAlign: 'bottom',
		            layout: 'horizontal',
		            x: 0,
		            y: 0,
	                borderWidth: 0,
	                itemStyle: {
	                    fontSize: '.8em'
	                }
		        }
			}
		},
		CHART007 : {
			_type:"column",
			_sql_par:[1],
			_sql:[
			      "select a.*,b.ten_khoa from (select a.ma_khoa,sum(decode(ma_loai_kcb,1,1,0))/1000 kb, sum(decode(ma_loai_kcb,3,1,0))/1000 nt, sum(decode(ma_loai_kcb,2,1,0))/1000 ngt from pt_bhyt_tonghop a WHERE to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') group by a.ma_khoa) a,dm_khoa b where a.ma_khoa = b.ma_khoa(+) order by b.ma_khoa",
			      ,"select a.*,b.ten_khoa from (select a.ma_khoa,sum(decode(ma_loai_kcb,1,1,0))/1000 kb, sum(decode(ma_loai_kcb,3,1,0))/1000 nt, sum(decode(ma_loai_kcb,2,1,0))/1000 ngt from pt_bhyt_tonghop a WHERE exists (select 1 from dm_coso_kcb b where b.ma_bv=a.ma_cskcb and b.ma_tinh=[S3]) and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') group by a.ma_khoa) a,dm_khoa b where a.ma_khoa = b.ma_khoa(+) order by b.ma_khoa",
			      ,"select a.*,b.ten_khoa from (select a.ma_khoa,sum(decode(ma_loai_kcb,1,1,0))/1000 kb, sum(decode(ma_loai_kcb,3,1,0))/1000 nt, sum(decode(ma_loai_kcb,2,1,0))/1000 ngt from pt_bhyt_tonghop a WHERE a.ma_cskcb='[S0]') and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') group by a.ma_khoa) a,dm_khoa b where a.ma_khoa = b.ma_khoa(+) order by b.ma_khoa"
			     ],
			_catName:"TEN_KHOA",
			_serieName:["Examination","In hospital","Out of Hospital"],
			_value:["KB","NT","NGT"],
			_opt : {
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'HEALTHCARE ACTIVITIES BY SPECIALTY STATISTICS'
		        },
		        subtitle: {
		            text: 'Source: vnpthis.vn'
		        },
				credits: {
						  enabled: false
						},
		        xAxis: {
		            categories: [],
		            crosshair: true
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: "Section"
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.1f} nghìn lượt</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
		        },
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            }
		        },		

		        series: []
		    }
		},
		CHART008 : {
			_type:"column",
			_sql_par:[1],
			_sql:[
			      "SELECT a.ma_tinh ma_dv,t.ten_tinh ten_dv,a.so_luot,a.so_tien from (SELECT ma_tinh,count(*) so_luot,sum(t_tongchi)/1000000 so_tien FROM pt_bhyt_tonghop a,dm_coso_kcb bv where a.ma_cskcb = bv.ma_bv(+) and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') GROUP BY bv.ma_tinh) A,dm_tinh t where a.ma_tinh = t.ma_so(+)"
			      ,"SELECT a.ma_cskcb ma_dv,bv.ten_bv ten_dv,a.so_luot,a.so_tien from (SELECT ma_cskcb,count(*) so_luot,sum(t_tongchi)/1000000 so_tien FROM pt_bhyt_tonghop a WHERE exists (select 1 from dm_coso_kcb b where b.ma_bv=a.ma_cskcb and b.ma_tinh=[S3]) and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') GROUP BY ma_cskcb) A,dm_coso_kcb bv where a.ma_cskcb = bv.ma_bv(+)"
			      ,"SELECT a.ma_cskcb ma_dv,bv.ten_bv ten_dv,a.so_luot,a.so_tien from (SELECT ma_cskcb,count(*) so_luot,sum(t_tongchi)/1000000 so_tien FROM pt_bhyt_tonghop a WHERE a.ma_cskcb='[S0]' and to_char(a.ngay_vao,'[S4]')=to_char(sysdate,'[S4]') GROUP BY ma_cskcb) A,dm_coso_kcb bv where a.ma_cskcb = bv.ma_bv(+)"
			     ],
			_catName:"TEN_DV",
			_serieName:["Turn","Money"],
			_value:["SO_LUOT","SO_TIEN"],
			_opt : {
				 title: {
			            text: "AGGREGATE REPORT OF HEALTHCARE PROFILES",	           
		        },
		        subtitle: {
		            text: 'Source: vnpthis.vn'
		        },
		        yAxis: [{ // Primary yAxis
		            
		            title: {
		                text: 'Turn',
		                style: {
		                    color: Highcharts.getOptions().colors[2]
		                }
		            }

		        }, { // Secondary yAxis
		            gridLineWidth: 0,
		            title: {
		                text: 'Money',
		                style: {
		                    color: Highcharts.getOptions().colors[0]
		                }
		            }
		            ,opposite: true
		        }],
		        plotOptions: {
		            series: {		              
		                dataLabels: {
		                    enabled: true,		                    
		                    formatter : function() {
		                    	if (this.y != Math.round(this.y)) {		                    		
		                    		return Highcharts.numberFormat(this.y,2);		                    		
		                    	}
		                    	return this.y;
		                    }
		                }
		            },
		            column: {		              
		                dataLabels: {
		                    enabled: true,		                    
		                    formatter : function() {
		                    	if (this.y != Math.round(this.y)) {		                    		
		                    		return Highcharts.numberFormat(this.y,2);		                    		
		                    	}
		                    	return this.y;
		                    }
		                }
		            }
		        },
		        legend: {
		        	enabled:true,
		            align: 'center',
		            verticalAlign: 'bottom',
		            layout: 'horizontal',
		            x: 0,
		            y: 0,
	                borderWidth: 0,
	                itemStyle: {
	                    fontSize: '.8em'
	                }
		        },
		        tooltip: {
		        	headerFormat: '',		           
		            footerFormat: '',
		            pointFormatter : function() {
                    	if (this.y != Math.round(this.y)) {		                    		
                    		return '<span style="color:'+this.color+'">'+this.name+'</span>: <b>'+Highcharts.numberFormat(this.y,2)+'</b><br/>';	                    		
                    	}
                    	return '<span style="color:'+this.color+'">'+this.name+'</span>: <b>'+Highcharts.numberFormat(this.y,0)+'</b><br/>';
                    }
		        }
			}
		},
	};

function CChartMgr(_chartId) {
	var _param=session_par;
	var _chartConfig = chartConfig[_chartId];
	//var _chartConfig = cfg;
	var _type = _chartConfig._type;
	var _opt = _chartConfig._opt;
	var _sql_par = [-1];//_chartConfig._sql_par;
	//console.log('_chartConfig._sql='+_chartConfig._sql);
	var _sql = _chartConfig._sql;
	var _catName = _chartConfig._catName;
	var _serieName = _chartConfig._serieName;	
	var _value = _chartConfig._value;
	var _decimalNumber = _chartConfig._decimalNumber;
	var flagLoading = false;
	var that=this;
	this.buildChart=doLoad;
	function setSysParam(_par_ar) {
		var v_par=_par_ar;
		for(var i1=0;i1<_param.length;i1++) {
			console.log('_param['+i1+']='+_param[i1]);
			v_par.push({"name":"[S"+i1+"]","value":_param[i1]});
		}
		return v_par;
	}
	function doLoad() {		 
		Highcharts.setOptions(chartOptions);

		if(_type=='column') {
			var data_ar=[];
			var _userType=_param[2];
			if(_userType==3|| _userType==2|| _userType==1) {
				_sql=_chartConfig._sql[0];
			}
			else if(_userType==4){
				_sql=_chartConfig._sql[1];
			}
			else if(_userType==5){
				_sql=_chartConfig._sql[2];
			}
			//_sql=_chartConfig._sql;
			console.log('_sql='+_sql);
			_sql_par=[];
			_sql_par=setSysParam(_sql_par);
			data_ar = jsonrpc.AjaxJson.ajaxExecuteQueryO(_sql,_sql_par);		
			 jsonData=$.parseJSON(data_ar);
			 console.log('jsonData : ',jsonData);
			 if (jsonData != null) {
				 _series=[];		 
				 var cat_ar=[];
				 if (_type == 'column') {
					 if (typeof _catName == 'object') {
						 cat_ar = _catName;
					 }
					 var series = [];
					 for(var i1=0;i1<jsonData.length;i1++) {
						 var _cat = jsonData[i1][_catName];
						 if (typeof _catName != 'object') {
							 cat_ar.push(_cat);
						 }			 
						 if (typeof _value == 'object') {
							 for (i=0;i<_value.length; i++) {					 
								 var _data = parseFloat(jsonData[i1][_value[i]]);					 
								 if (!_series[i]) {
									 _series.push({name:_serieName[i], data:[{name:_cat, y: _data}]});
								 }
								 else {
									 _series[i].data.push({name:_cat, y: _data});
								 }
							 }							 
						 }			 
						 //var data_y=parseFloat(jsonData[i1][_value]);
					 }			 
					 //_series.push({name: 'Ngày', data : data_ar}); 		
					 buildColumnChart("divChart",cat_ar,_opt);
					 setChartSeries("divChart",_series);
				 }
			 }
		}
		else if(_type=='pie') {
			
			var _userType=_param[2];
			if(_userType==3|| _userType==2|| _userType==1) {
				_sql=_chartConfig._sql[0];
			}
			else if(_userType==4){
				_sql=_chartConfig._sql[1];
			}
			else if(_userType==5){
				_sql=_chartConfig._sql[2];
			}
			var sql_par=[];
			sql_par=setSysParam(sql_par);
			data_ar = jsonrpc.AjaxJson.ajaxExecuteQueryO(_sql,sql_par);
			 jsonData=JSON.parse(data_ar);
			 console.log(JSON.stringify(jsonData));		 
			 var _data_1=[];		 
			 for(var i1=0;i1<jsonData.length;i1++) {
				 _data_1.push({name: jsonData[i1][_value[0]],y: parseInt(jsonData[i1][_value[1]])});
			 }
			 var _series=[{
	            name: _catName,
	            colorByPoint: true,
	            data: _data_1
	        }];
			 console.log(JSON.stringify(_series));
			 buildPieChart("divChart",_opt);
			 setChartSeries("divChart",_series);
		}
		else if(_type=='line') {
			var _userType=_param[2];
			if(_userType==3|| _userType==2|| _userType==1) {
				_sql=_chartConfig._sql[0];
			}
			else if(_userType==4){
				_sql=_chartConfig._sql[1];
			}
			else if(_userType==5){
				_sql=_chartConfig._sql[2];
			}
			var sql_par=[];
			sql_par=setSysParam(sql_par);
			var _sql_ar=[];
			data_ar = jsonrpc.AjaxJson.ajaxExecuteQueryO(_sql,sql_par);
			 jsonData=JSON.parse(data_ar);
			 //console.log(JSON.stringify(jsonData));		 
			 var _data_1=[];		 
			 var _name="";
			 var _data_y=[];
			 for(var i=0;i<jsonData.length;i++) {			 
				 _name = _catName[i];
				 for(j=0;j<_value.length;j++) {
					 _data_y.push(parseFloat(jsonData[i][_value[j]]));
				 }
				 _data_1.push({name: _name,data: _data_y});
				 _data_y=[];
			 }
//			 console.log(JSON.stringify(_data_1));		 
			 buildLineChart("divChart",_serieName,_opt);
			 setChartSeries("divChart",_data_1);
		}
		//$("text[text-anchor='end']:contains('Highcharts.com')").css("display","none");
	
	}
}
