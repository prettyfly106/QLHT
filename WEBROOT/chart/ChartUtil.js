var chartOptions = {
		lang : {
			decimalPoint: ',',
			thousandsSep: ".",
			downloadJPEG: 'Tải ảnh JPG',
			downloadPNG: 'Tải ảnh PNG',
			downloadPDF: 'Tải file PDF',			
			downloadSVG: 'Tải file SVG',
		},		
	
	}

function buildGaugeChart(chartId,_title,_min,_max,_val){
		var _opt={
		        chart: {
		            type: 'gauge', plotBackgroundColor: null, plotBackgroundImage: null, plotBorderWidth: 0, plotShadow: false
		        },

		        title: {
		            text: ''
		        },

		        pane: {
		            startAngle: -150,
		            endAngle: 150,
		            background: [{
		                backgroundColor: {
		                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                    stops: [ [0, '#FFF'], [1, '#333'] ]
		                },
		                borderWidth: 0,
		                outerRadius: '109%'
		            }, {
		                backgroundColor: {
		                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                    stops: [ [0, '#333'], [1, '#FFF'] ]
		                },
		                borderWidth: 1,
		                outerRadius: '107%'
		            }, {
		                // default background
		            }, {
		                backgroundColor: '#DDD',
		                borderWidth: 0,
		                outerRadius: '105%',
		                innerRadius: '103%'
		            }]
		        },

		        // the value axis
		        yAxis: {
		            min: _min,
		            max: _max,

		            minorTickInterval: 'auto',
		            minorTickWidth: 1,
		            minorTickLength: 10,
		            minorTickPosition: 'inside',
		            minorTickColor: '#666',

		            tickPixelInterval: 30,
		            tickWidth: 2,
		            tickPosition: 'inside',
		            tickLength: 10,
		            tickColor: '#666',
		            labels: {
		                step: 2,
		                rotation: 'auto'
		            },
		            title: {
		                text: ''
		            },
		            plotBands: [{
		                from: _min,
		                to: _max/3,
		                color: '#55BF3B' // green
		            }, {
		                from: _max/3,
		                to: _max*2/3,
		                color: '#DDDF0D' // yellow
		            }, {
		                from: _max*2/3,
		                to: _max,
		                color: '#DF5353' // red
		            }]
		        },

		        series: [{
		            name: _title,
		            data: [0],
		            tooltip: {
		                valueSuffix: ''
		            }
		        }]

		    };
			$('#'+chartId).highcharts(_opt);
			setGaugeChartData(chartId,_val)
		
	}
	
	
	function buildColumnChart(chartId,_category,specOpt){
		var _opt={
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: '',	           
		        },
		        subtitle: {
		            text: 'Nguồn: vnpthis.vn'
		        },
		        credits: {
					  enabled: false
				},
		        xAxis: {
		            //type: 'category',
		            categories:_category,		            
		            crosshair: true
		            //gridLineWidth: 1
		        },
		        yAxis: {
		            title: {
		                text: ''
		            }

		        },
		        legend: {
		            align: 'right',
		            verticalAlign: 'top',
		            layout: 'vertical',
		            x: 0,
		            y: 0,
	                borderWidth: 1,
	                itemStyle: {
	                    fontSize: '.8em'
	                },
	                enabled : false		        
		        },
		        plotOptions: {
		            series: {
		                borderWidth: 0,
		                dataLabels: {
		                    enabled: true,		                    
		                    format: '{point.y:.0f}'
		                }
		            },
		            column: {
		                dataLabels: {
		                    enabled: true,
		                    crop: false,
		                    overflow: 'none'
		                }
		            }
		        },

		        tooltip: {
		            headerFormat: '<span style="font-size:1em; font-weight:bolder;">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0; text-align:right; font-size:.8em"><b>{point.y:.0f}</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
		        },

		        series: []		       
		    };
		if (specOpt) {
			_opt = $.extend(true,{}, _opt, specOpt);
		}
		$('#'+chartId).highcharts(_opt);
		
	}
	
	function buildPieChart(chartId,specOpt){
		var _opt={
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
		            type: 'pie'
		        },
		        title: {
		        	align : "left",
		            text: '',
		            style: {
		                color: '#FF00FF',
		                fontWeight: 'bold',
		                fontSize: '1em'		                
		            }		            
		        },
		        legend: {
		            align: 'right',
		            verticalAlign: 'top',
		            layout: 'vertical',
		            x: 0,
		            y: 0,	                            
		            labelFormat: '{name} {y:.,2f} ',
		            borderWidth: 1,
		            itemStyle: {
		                fontSize: '.8em'
		            }
		        },
		        tooltip: {
		            pointFormat: '{series.name}: <b>{point.y:,.2f}(tr)</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: false
		                },
		                showInLegend: true
		            },series: {
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.percentage:.2f}%'
		                }
		            }
		        },
		        series: []
		    	};
		if (specOpt) {
			_opt = $.extend(true,{}, _opt, specOpt);
		}
			$('#'+chartId).highcharts(_opt);
		
	}
	function buildAreaChart(chartId,_category){
		var _opt={
		        chart: {
		            type: 'area'
		        },
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        legend: {
		        	align: 'right',
		            verticalAlign: 'top',
		            layout: 'vertical',
		            x: 0,
		            y: 0,
	                borderWidth: 1,
	                itemStyle: {
	                    fontSize: '.8em'
	                }
		        },
		        xAxis: {
		            categories: _category, //['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
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
		                    return this.value / 1000;
		                }
		            }
		        },
		        tooltip: {
		            shared: true,
		            valueSuffix: ' triệu'
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
		    };
			$('#'+chartId).highcharts(_opt);
		
	}
	function buildLineChart(chartId,_category,specOpt){
		var _opt={
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
		            borderWidth: 0
		        },
		        xAxis: {
		            categories: _category, //['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
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
		                    return this.value / 1000;
		                }
		            }
		        },
		        tooltip: {
		            shared: true,
		            valueSuffix: ' triệu'
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
		    };
		if (specOpt) {
			_opt = $.extend(true,{}, _opt, specOpt);
		}
			$('#'+chartId).highcharts(_opt);
		
	}
	function setGaugeChartData(chartId,_val) {
		var chart = $('#'+chartId).highcharts();
		chart.series[0].update({data: [_val]});
	}
	function setChartSeries(chartId,_series,decimalNumber) {		
		var chart = $('#'+chartId).highcharts();
        for (var i = 0, len =chart.series.length; i < len; i++) {
            chart.series[0].remove();
        }
        //options.series = series
        for (var i = 0, len =_series.length; i < len; i++) {        	
        	chart.addSeries(_series[i], false);        	
        }
        //chart.addSeries( {name: 'gabul', data: [40]}, false);
		chart.redraw();
	}
