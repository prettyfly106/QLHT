
var chartConfig = {
		CHART001 : {
			_type:"column",
			_sql_par:[1],
			_sql:[
			      "SELECT a.counter_data_1 ma_dv,t.ten_tinh ten_dv, avg(a.counter_1) so_ngay_dtri FROM BI_DATA_STORE_2 A,dm_tinh t where a.COUNTER_DATA_1 = t.ma_so(+)  AND COUNTER_ID=1 AND to_char(a.DATA_DT,'[S4]')=to_char(sysdate,'[S4]') group by a.counter_data_1,t.ten_tinh"
			      ,"SELECT a.hosp_id ma_dv,bv.ten_bv ten_dv, avg(a.counter_1) so_ngay_dtri FROM BI_DATA_STORE_2 A,dm_coso_kcb bv where a.hosp_id = bv.ma_bv(+)  AND COUNTER_ID=1 AND to_char(a.DATA_DT,'[S4]')=to_char(sysdate,'[S4]') and a.counter_data_1 = '[S3]' group by a.hosp_id, bv.ten_bv"
			      ,"SELECT a.hosp_id ma_dv,bv.ten_bv ten_dv, avg(a.counter_1) so_ngay_dtri FROM BI_DATA_STORE_2 A,dm_coso_kcb bv where a.hosp_id = bv.ma_bv(+)  AND COUNTER_ID=1 AND to_char(a.DATA_DT,'[S4]')=to_char(sysdate,'[S4]') and a.hosp_id = '[S3]' group by a.hosp_id, bv.ten_bv"
			     ],
			_catName:"TEN_DV",
			_serieName:["Ngày điều trị trung bình"],
			_value:["SO_NGAY_DTRI"],
			_opt : {
				 title: {
			            text: "BÁO CÁO NGÀY ĐIỀU TRỊ TRUNG BÌNH",	           
		        },
		        yAxis: {
		            title: {
		                text: "Ngày"
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
			 "select tntt.ten ten_tainan, SUM(COUNTER_1) TONG_SOCA, SUM(COUNTER_2) TONG_TUVONG, SUM(DECODE(COUNTER_DATA_3,1,COUNTER_1,0))  NAM_SOCA, SUM(DECODE(COUNTER_DATA_3,1,COUNTER_2,0))  NAM_TUVONG, SUM(DECODE(COUNTER_DATA_3,2,COUNTER_1,0))  NU_SOCA, SUM(DECODE(COUNTER_DATA_3,2,COUNTER_2,0))  NU_TUVONG FROM dm_tainan_thuongtich tntt, BI_DATA_STORE_2 A where tntt.ma = A.COUNTER_DATA_2 AND COUNTER_ID=2 AND to_char(a.DATA_DT,'[S4]')=to_char(sysdate,'[S4]') GROUP BY TNTT.MA,TNTT.ten ORDER BY TNTT.MA",
			 "select tntt.ten ten_tainan, SUM(COUNTER_1) TONG_SOCA, SUM(COUNTER_2) TONG_TUVONG, SUM(DECODE(COUNTER_DATA_3,1,COUNTER_1,0))  NAM_SOCA, SUM(DECODE(COUNTER_DATA_3,1,COUNTER_2,0))  NAM_TUVONG, SUM(DECODE(COUNTER_DATA_3,2,COUNTER_1,0))  NU_SOCA, SUM(DECODE(COUNTER_DATA_3,2,COUNTER_2,0))  NU_TUVONG FROM dm_tainan_thuongtich tntt, BI_DATA_STORE_2 A where tntt.ma = A.COUNTER_DATA_2 AND COUNTER_ID=2 AND to_char(a.DATA_DT,'[S4]')=to_char(sysdate,'[S4]') AND COUNTER_DATA_1 = '[S3]' GROUP BY TNTT.MA,TNTT.ten ORDER BY TNTT.MA",
			 "select tntt.ten ten_tainan, SUM(COUNTER_1) TONG_SOCA, SUM(COUNTER_2) TONG_TUVONG, SUM(DECODE(COUNTER_DATA_3,1,COUNTER_1,0))  NAM_SOCA, SUM(DECODE(COUNTER_DATA_3,1,COUNTER_2,0))  NAM_TUVONG, SUM(DECODE(COUNTER_DATA_3,2,COUNTER_1,0))  NU_SOCA, SUM(DECODE(COUNTER_DATA_3,2,COUNTER_2,0))  NU_TUVONG FROM dm_tainan_thuongtich tntt, BI_DATA_STORE_2 A where tntt.ma = A.COUNTER_DATA_2 AND COUNTER_ID=2 AND to_char(a.DATA_DT,'[S4]')=to_char(sysdate,'[S4]') AND HOSP_ID = '[S3]' GROUP BY TNTT.MA,TNTT.ten ORDER BY TNTT.MA",
			 ],
			_catName:"TEN_TAINAN",
			_serieName:["Nam số ca","Nam tử vong","Nữ số ca","Nữ tử vong","Tổng số ca","Tổng tử vong"],
			_value:["NAM_SOCA","NAM_TUVONG","NU_SOCA","NU_TUVONG","TONG_SOCA","TONG_TUVONG"],			
			_decimalNumber:2,
			_opt : {
				 title: {
			            text: "BÁO CÁO TAI NẠN THƯƠNG TÍCH",	           
		        },
		        yAxis: {
		            title: {
		                text: "Số ca"
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
"select b.NAME loai_kcb,  sum(counter_1) K1,sum(counter_2) K2, sum(counter_3)  K3 from bi_data_store_2 a,DM_LOAI_KB b where counter_id=3 and A.COUNTER_DATA_1 = b.CODE and to_char(a.data_dt,'[S4]')=to_char(sysdate,'[S4]')  group by b.NAME",  
"select b.NAME loai_kcb,  sum(counter_1) K1,sum(counter_2) K2, sum(counter_3)  K3 from bi_data_store_2 a,DM_LOAI_KB b where counter_id=3 and A.COUNTER_DATA_1 = b.CODE  and a.COUNTER_DATA_2 = '[S3]' and to_char(a.data_dt,'[S4]')=to_char(sysdate,'[S4]') group by b.NAME",
"select b.NAME loai_kcb,  sum(counter_1) K1,sum(counter_2) K2, sum(counter_3)  K3 from bi_data_store_2 a,DM_LOAI_KB b where counter_id=3 and A.COUNTER_DATA_1 = b.CODE  and a.HOSP_ID = '[S0]' and to_char(a.data_dt,'[S4]')=to_char(sysdate,'[S4]') group by b.NAME"
			      ],
			_catName:"LOAI_KCB",
			_serieName:["K1","K2","K3"],
			_value:["K1","K2","K3"],			
			_decimalNumber:2,
			_opt : {
				 title: {
			            text: "BÁO CÁO HOẠT ĐỘNG KHÁM BỆNH THEO ĐỐI TƯỢNG SỐNG",	           
		        },
		        yAxis: {
		            title: {
		                text: "Lượt"
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
			      "select * from (select counter_data_1 tenbenh, counter_1 soluong from bi_data_store_2 where counter_id = 4 and to_char(data_dt,'[S4]') = to_char(sysdate,'[S4]') order by counter_1 desc) where rownum <=30",
			      "select * from (select counter_data_1 tenbenh, counter_1 soluong from bi_data_store_2 where counter_2=[S3] and counter_id = 4 and to_char(data_dt,'[S4]') = to_char(sysdate,'[S4]' order by counter_1 desc) where rownum <=30",
			      "select * from (select counter_data_1 tenbenh, counter_1 soluong from bi_data_store_2 where hosp_id = '[S0]' and to_char(data_dt,'[S4]') = to_char(sysdate,'[S4]') and counter_id = 4 order by counter_1 desc) where rownum <=30"			      
			      ],
			_catName:"Tỉ lệ",
			_serieName:["Tên bệnh","Số lượng"],
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
		            text: 'TÌNH HÌNH SỬ DỤNG THUỐC PHÂN LOẠI THEO TÁC DỤNG DƯỢC LÝ',
		            style: {
		                //color: '#FF00FF',
		                fontWeight: 'bold',
		                //fontSize: '1em'		                
		            }		            
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
"select nvl(tngt,0) TAI_NAN_GIAO_THONG,nvl(tnld,0) TAI_NAN_LAO_DONG,nvl(tndn,0) TAI_NAN_DUOI_NUOC,nvl(BONG,0) BONG,nvl(blxd,0) BAO_LUC_XUNG_DOT,nvl(TU_TU,0) TU_TU,nvl(ndcl,0) NGO_DOC_CAC_LOAI,nvl(KHAC,0) KHAC from (select counter_data_1 MA, counter_1 soluong  from bi_data_store_2 where counter_id =5 and to_char(data_dt,'[S4]')=to_char(sysdate,'[S4]')) PIVOT (SUM(SOLUONG) FOR(ma) IN ('1' tngt,'2' tnld,'3' tndn,'4' BONG,'5' blxd,'6' TU_TU,'7' ndcl,'8' KHAC))",
"select nvl(tngt,0) TAI_NAN_GIAO_THONG,nvl(tnld,0) TAI_NAN_LAO_DONG,nvl(tndn,0) TAI_NAN_DUOI_NUOC,nvl(BONG,0) BONG,nvl(blxd,0) BAO_LUC_XUNG_DOT,nvl(TU_TU,0) TU_TU,nvl(ndcl,0) NGO_DOC_CAC_LOAI,nvl(KHAC,0) KHAC from (select counter_data_1 MA, counter_1 soluong  from bi_data_store_2 where counter_id =5 and to_char(data_dt,'[S4]')=to_char(sysdate,'[S4]') and counter_2=[S3])  PIVOT (SUM(SOLUONG) FOR(ma) IN ('1' tngt,'2' tnld,'3' tndn,'4' BONG,'5' blxd,'6' TU_TU,'7' ndcl,'8' KHAC))",
"select nvl(tngt,0) TAI_NAN_GIAO_THONG,nvl(tnld,0) TAI_NAN_LAO_DONG,nvl(tndn,0) TAI_NAN_DUOI_NUOC,nvl(BONG,0) BONG,nvl(blxd,0) BAO_LUC_XUNG_DOT,nvl(TU_TU,0) TU_TU,nvl(ndcl,0) NGO_DOC_CAC_LOAI,nvl(KHAC,0) KHAC from (select counter_data_1 MA, counter_1 soluong  from bi_data_store_2 where counter_id =5 and to_char(data_dt,'[S4]')=to_char(sysdate,'[S4]')  and hosp_id = '[S0]')  PIVOT (SUM(SOLUONG) FOR(ma) IN ('1' tngt,'2' tnld,'3' tndn,'4' BONG,'5' blxd,'6' TU_TU,'7' ndcl,'8' KHAC))" 
			      ],
			_catName:["Tử vong"],
			_serieName:["Tai nạn giao thông","Tai nạn lao động","Tai nạn dưới nước","Bỏng","Bảo lực xung đột","Tự tử","Ngộ độc các loại","Khác"],
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
		            text: ''
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
		                text: 'Tổng'
		            },
		            labels: {
		                formatter: function () {
		                    return this.value;
		                }
		            }
		        },
		        tooltip: {
		            shared: true,
		            valueSuffix: ' ca'
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
			_serieName:["Số Cơ sở KCB","Chưa Triển khai", "Triển khai thử nghiệm", "Triển khai chính thức"],
			_value:["SO_CSKCB","CHUA_TRIEN_KHAI","THU_NGHIEM","CHINH_THUC"],			
			_decimalNumber:2,
			_opt : {
				 title: {
			            text: "BÁO CÁO TÌNH HÌNH TRIỂN KHAI",	           
		        },
		        yAxis: {
		            title: {
		                text: "Số cơ sở"
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
			_serieName:["Khám bệnh","Nội trú","Ngoại trú"],
			_value:["KB","NT","NGT"],
			_opt : {
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'HOẠT ĐỘNG KHÁM BỆNH THEO CHUYÊN KHOA'
		        },
		        subtitle: {
		            text: 'Nguồn: congdulieuyte.vn'
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
		                text: "Lượt"
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
				"SELECT a.hosp_id ma_dv,a.COUNTER_DATA_4 ten_dv,sum(a.COUNTER_1) so_luot,sum(a.COUNTER_2) so_tien from bi_data_store_2 a where a.counter_id=8 and a.COUNTER_DATA_1 = '2' and to_char(a.DATA_DT,'[S4]')=to_char(sysdate,'[S4]') group by a.hosp_id, a.COUNTER_DATA_4"
				,"SELECT a.hosp_id ma_dv,a.COUNTER_DATA_2 ten_dv,sum(a.COUNTER_1) so_luot,sum(a.COUNTER_2) so_tien from bi_data_store_2 a WHERE a.counter_id=8 and a.COUNTER_DATA_1 = '1' and a.COUNTER_DATA_3='[S3]' and to_char(a.DATA_DT,'[S4]')=to_char(sysdate,'[S4]') group by a.hosp_id, a.COUNTER_DATA_2"
				,"SELECT a.hosp_id ma_dv,a.COUNTER_DATA_2 ten_dv,sum(a.COUNTER_1) so_luot,sum(a.COUNTER_2) so_tien from bi_data_store_2 a WHERE a.counter_id=8 and a.COUNTER_DATA_1 = '1' and a.hosp_id='[S0]' and to_char(a.DATA_DT,'[S4]')=to_char(sysdate,'[S4]') group by a.hosp_id, a.COUNTER_DATA_2"
			     ],
			_catName:"TEN_DV",
			_serieName:["Số lượt","Số tiền (tr)"],
			_value:["SO_LUOT","SO_TIEN"],
			_opt : {
				 title: {
			            text: "BÁO CÁO TỔNG HỢP HỒ SƠ KCB",	           
		        },
		        yAxis: [{ // Primary yAxis
		            
		            title: {
		                text: 'Số lượt',
		                style: {
		                    color: Highcharts.getOptions().colors[2]
		                }
		            }

		        }, { // Secondary yAxis
		            gridLineWidth: 0,
		            title: {
		                text: 'Số tiền',
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
		        }/*,
		        tooltip: {
		        	headerFormat: '',		           
		            footerFormat: '',
		            pointFormatter : function() {
                    	if (this.y != Math.round(this.y)) {		                    		
                    		return '<span style="color:'+this.color+'">'+this.name+'</span>: <b>'+Highcharts.numberFormat(this.y,2)+'</b><br/>';	                    		
                    	}
                    	return '<span style="color:'+this.color+'">'+this.name+'</span>: <b>'+Highcharts.numberFormat(this.y,0)+'</b><br/>';
                    }
		        }*/
			}
		},CHART009 : {
			_type:"column",
			_sql_par:[1],
			_sql:[
			      "SELECT T.STT, T.MA_SO MA_TINH, T.TEN_TINH, T.SO_BV, T.T_CHUA_TK, T.T_THU_NGHIEM, T.T_CHINH_THUC, T.T_CHINH_THUC_KHAC, DR.SO_LUOT_KHAM_TB, DR.TONG_CHI FROM ( SELECT ROWNUM STT,Y.* FROM ( SELECT X.TEN_RUT_GON, X. TEN_TINH, X.MA_SO, COUNT(Y.MA_BV) SO_BV, SUM(DECODE(TT_TRIENKHAI,0,1,0)) T_CHUA_TK, SUM(DECODE(TT_TRIENKHAI,1,1,0)) T_THU_NGHIEM, SUM(CASE WHEN TT_TRIENKHAI = 2 AND (DV_TRIENKHAI = 1 OR DV_TRIENKHAI = 2) THEN 1 ELSE 0 END) T_CHINH_THUC, SUM(CASE WHEN TT_TRIENKHAI = 2 AND (DV_TRIENKHAI = 3 OR DV_TRIENKHAI IS NULL) THEN 1 ELSE 0 END) T_CHINH_THUC_KHAC FROM DM_TINH X, DM_COSO_KCB Y WHERE X.MA_SO=Y.MA_TINH AND Y.TUYEN_BV>0 GROUP BY X.TEN_RUT_GON, X. TEN_TINH, X.MA_SO ORDER BY NLSSORT(X.TEN_RUT_GON,'NLS_SORT=vietnamese'))Y ) T, ( SELECT MA_TINH, AVG(SO_LUOT_KHAM) SO_LUOT_KHAM_TB, SUM(TONG_CHI) TONG_CHI FROM DR_TT_TRIENKHAI WHERE TO_CHAR(TO_DATE(NGAY,'YYYYMMDD'),'[S4]')=TO_CHAR(SYSDATE,'[S4]') GROUP BY MA_TINH ) DR WHERE T.MA_SO = DR.MA_TINH ORDER BY NLSSORT(t.TEN_RUT_GON,'NLS_SORT=vietnamese'), T.MA_SO" 
			      ],
			_catName:"TEN_TINH",
			_serieName:["Tổng số CSKCB","VNPT triển khai","ĐV Khác triển khai"],
			_value:["SO_BV","T_CHINH_THUC","T_CHINH_THUC_KHAC"],			
			_decimalNumber:2,
			_opt : {
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'TÌNH HÌNH TRIỂN KHAI CỔNG DỮ LIỆU Y TẾ'
		        },
		        subtitle: {
		            text: 'Nguồn: congdulieuyte.vn'
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
		                text: "Cơ sở"
		            }
		        },
		        
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
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
		        },
		        series: []
		    }
		},
		CHART010 : {
			_type:"column",
			_sql_par:[1],
			_sql:[
			      "SELECT T.TEN_TINH,NVL(ROUND(A.TB_1,2),0) TB_1, NVL(ROUND(A.TB_2,2),0) TB_2,NVL(ROUND(A.TB_3,2),0) TB_3,NVL(ROUND(A.TB_4,2),0) TB_4 FROM DM_TINH T, ( SELECT MA_TINH, TUYEN_BV, SO_LUOT_KHAM FROM DR_TT_TRIENKHAI WHERE TO_CHAR(TO_DATE(NGAY,'YYYYMMDD'),'[S4]')=TO_CHAR(SYSDATE,'[S4]')) PIVOT (AVG(SO_LUOT_KHAM) FOR TUYEN_BV IN (1 TB_1,2 TB_2,3 TB_3,4 TB_4)) A WHERE T.MA_SO = A.MA_TINH ORDER BY NLSSORT(t.TEN_RUT_GON,'NLS_SORT=vietnamese')" 
			      ],
			_catName:"TEN_TINH",
			_serieName:["Tuyến 1 (TW)","Tuyến 2 (Tỉnh)","Tuyến 3 (Huyện)","Tuyến 4 (Xã)"],
			_value:["TB_1","TB_2","TB_3","TB_4"],			
			_decimalNumber:2,
			_opt : {
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'SỐ LƯỢT KHÁM CHỮA BỆNH TRUNG BÌNH'
		        },
		        subtitle: {
		            text: 'Nguồn: congdulieuyte.vn'
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
		                text: "Lượt"
		            }
		        },
		        
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
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
		        },
		        tooltip: {
				 	useHTML: true,
		        	headerFormat: '<b>{point.key}</b><table>',		           
		            footerFormat: '</table >',
		            pointFormatter : function() {             	
	             	return '<tr><td><span style="color:'+this.color+';">'+this.series.name+'</span>:</td><td style="text-align:right;"><b>'+Highcharts.numberFormat(this.y,2)+' lượt</b></td></tr>';
	             }},
		        series: []
		    }
		},
		CHART011 : {
			_type:"column",
			_sql_par:[1],
			_sql:[
			      "SELECT T.TEN_TINH,NVL(ROUND(A.TONG_1,2)/1000000,0) TONG_1, NVL(ROUND(A.TONG_2)/1000000,0) TONG_2,NVL(ROUND(A.TONG_3)/1000000,0) TONG_3,NVL(ROUND(A.TONG_4)/1000000,0) TONG_4 FROM DM_TINH T, ( SELECT MA_TINH, TUYEN_BV, TONG_CHI FROM DR_TT_TRIENKHAI WHERE TO_CHAR(TO_DATE(NGAY,'YYYYMMDD'),'[S4]')=TO_CHAR(SYSDATE,'[S4]')) PIVOT (SUM(TONG_CHI) FOR TUYEN_BV IN (1 TONG_1,2 TONG_2,3 TONG_3,4 TONG_4)) A WHERE T.MA_SO = A.MA_TINH ORDER BY NLSSORT(t.TEN_RUT_GON,'NLS_SORT=vietnamese')" 
			      ],
			_catName:"TEN_TINH",
			_serieName:["Tuyến 1 (TW)","Tuyến 2 (Tỉnh)","Tuyến 3 (Huyện)","Tuyến 4 (Xã)"],
			_value:["TONG_1","TONG_2","TONG_3","TONG_4"],			
			_decimalNumber:2,
			_opt : {
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'TỔNG SỐ TIỀN KHÁM CHỮA BỆNH BHYT'
		        },
		        subtitle: {
		            text: 'Nguồn: congdulieuyte.vn'
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
		                text: "Triệu"
		            }
		        },
		        
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
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
		        },
		        tooltip: {
				 	useHTML: true,
		        	headerFormat: '<b>{point.key}</b><table>',		           
		            footerFormat: '</table >',
		            pointFormatter : function() {             	
	             	return '<tr><td><span style="color:'+this.color+';">'+this.series.name+'</span>:</td><td style="text-align:right;"><b>'+Highcharts.numberFormat(this.y,0)+' triệu</b></td></tr>';
	             }
		        },
		        series: []
		    }
		}
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
	console.log('sql : ', _sql);
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
