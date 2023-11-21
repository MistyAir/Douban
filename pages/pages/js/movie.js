
function typepie() {
    var scatterChart = echarts.init(document.getElementById("echarts-bar-chart"));
    var scatteroption = {
        title : {
            show: false,
            text: 'distribution of movies by country',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left', 
            data:[]
        },
        // calculable : true,
        series : [
            {
                itemStyle : {
                    normal : {
                               label : {
                                         show : false
                                        },
                               labelLine : {
                                             show : false
                                            }
                               }
                },
                name:'type',
                type:'pie',
                radius : '80%',
                center: ['50%', '60%'],
                data:[

                ]
            }
        ]
    };
    $.ajax({
        url: '/movie/distribution_by_type',
        success: (response) => {
            for (let k in response) {
                scatteroption['series'][0]['data'].push({name: k, value: response[k]})
                scatteroption['legend']['data'].push(k)
            }
            scatterChart.setOption(scatteroption);
        }
    })
    $(window).resize(scatterChart.resize);
}

function regionpie() {
    var scatterChart = echarts.init(document.getElementById("echarts-scatter-chart"));
    var scatteroption = {
        title : {
            show: false,
            text: 'distribution of movies by country',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left', 
            data:[]
        },
        // calculable : true,
        series : [
            {
                itemStyle : {
                    normal : {
                               label : {
                                         show : false
                                        },
                               labelLine : {
                                             show : false
                                            }
                               }
                },
                name:'country',
                type:'pie',
                radius : '80%',
                center: ['50%', '60%'],
                data:[

                ]
            }
        ]
    };
    $.ajax({
        url: '/movie/distribution_by_country',
        success: (response) => {
            for (let k in response) {
                scatteroption['series'][0]['data'].push({name: k, value: response[k]})
                scatteroption['legend']['data'].push(k)
            }
            scatterChart.setOption(scatteroption);
        }
    })
    $(window).resize(scatterChart.resize);
}
$(regionpie())
$(typepie())