function durationChart(id){
    var barChart = echarts.init(document.getElementById(id));
    var baroption = {
        title : {
            show: false,
            text: 'b站视频时长分布'
        },
        calculable : true,
        grid:{
            x:50,
            y:30,
            x2:40,
            y2:24
        },
        xAxis : [
            {
                type : 'category',
                data : ['0-10s','10-100s','100-1000s','>1000s']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'时长',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
            },
        ]
    };
    barChart.setOption(baroption);
    $.ajax({
        url: "/video/duration?to=10",
        method: "GET",
        success: (response1) => {
                    baroption['series'][0]['data'][0] = response1['count']
                    barChart.setOption(baroption);
                }
    })
    $.ajax({
        url: "/video/duration?to=100",
        method: "GET",
        success: (response1) => {
            $.ajax({
                url: "/video/duration?to=10",
                method: "GET",
                success: (response2) => {
                    baroption['series'][0]['data'][1] = response1['count'] - response2['count']
                    barChart.setOption(baroption);
                }
                })
            }
    })
    $.ajax({
        url: "/video/duration?to=1000",
        method: "GET",
        success: (response1) => {
            $.ajax({
                url: "/video/duration?to=100",
                method: "GET",
                success: (response2) => {
                    baroption['series'][0]['data'][2] = response1['count'] - response2['count']
                    barChart.setOption(baroption);
                }
                })
            }
    })
    $.ajax({
        url: "/video/duration?to=100000",
        method: "GET",
        success: (response1) => {
            $.ajax({
                url: "/video/duration?to=1000",
                method: "GET",
                success: (response2) => {
                    baroption['series'][0]['data'][3] = response1['count'] - response2['count']
                    barChart.setOption(baroption);
                }
                })
            }
    })


    window.onresize = barChart.resize;
}

function durationanddanmaku(id) {
    var pieChart = echarts.init(document.getElementById(id));
    var pieoption = {
        title : {
            show: false,
            text: '视频时长与弹幕数',
        },
        tooltip : {
            trigger: 'axis',
            showDelay : 0,
            axisPointer:{
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 1
                }
            }
        },
        grid:{
            x:70,
            y:30,
            x2:40,
            y2:24
        },
        xAxis : [
            {
                type : 'value',
                scale:true,
                axisLabel : {
                    formatter: '{value} 秒'
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                scale:true,
                axisLabel : {
                    formatter: '{value} 条'
                }
            }
        ],
        series : [
            {
                type:'scatter',
                tooltip : {
                    trigger: 'item',
                    formatter : function (params) {
                        if (params.value.length > 1) {
                            return 'AV' + params.value[2] + ' :<br/>'
                               + params.value[3] + '<br/>'
                               + params.value[0] + '秒 <br/>'
                               + params.value[1] + '条弹幕';
                        }
                        else {
                            return params.seriesName + ' :<br/>'
                               + params.name + ' : '
                               + params.value + '赞 ';
                        }
                    }
                },
                data: [
                ],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
        ]
    };

    $.ajax({
        url: "/video/durationanddanmaku",
        success: (response) => {
            data = []
            for (let i of response) {
                data.push([i['duration'], i['danmaku'], i['aid'], i['title']])
            }
            pieoption['series'][0]['data'] = data
            pieChart.setOption(pieoption);
            $(window).resize(pieChart.resize);
        }
    })
}

function regionpie() {
    var scatterChart = echarts.init(document.getElementById("echarts-scatter-chart"));
    var scatteroption = {
        title : {
            show: false,
            text: '各分区视频数量及其比例',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['动画','番剧','国创','音乐','舞蹈','游戏','知识','数码','汽车','生活','美食','动物','鬼畜','时尚','娱乐']
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
                name:'分区',
                type:'pie',
                radius : '80%',
                center: ['50%', '60%'],
                data:[
                ]
            }
        ]
    };
    $.ajax({
        url: '/video/distribution',
        success: (response) => {
            for (let k in response) {
                scatteroption['series'][0]['data'].push({name: k, value: response[k]})
            }
            scatterChart.setOption(scatteroption);
        }
    })
    $(window).resize(scatterChart.resize);
}

function durationandfavorite(id) {
    var pieChart = echarts.init(document.getElementById(id));
    var pieoption = {
        title : {
            show: false,
            text: '视频时长与收藏数',
        },
        tooltip : {
            trigger: 'axis',
            showDelay : 0,
            axisPointer:{
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 1
                }
            }
        },
        grid:{
            x:70,
            y:30,
            x2:40,
            y2:24
        },
        xAxis : [
            {
                type : 'value',
                scale:true,
                axisLabel : {
                    formatter: '{value} 秒'
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                scale:true,
                axisLabel : {
                    formatter: '{value} 次'
                }
            }
        ],
        series : [
            {
                type:'scatter',
                tooltip : {
                    trigger: 'item',
                    formatter : function (params) {
                        if (params.value.length > 1) {
                            return 'AV' + params.value[2] + ' :<br/>'
                               + params.value[3] + '<br/>'
                               + params.value[0] + '秒 <br/>'
                               + params.value[1] + '次';
                        }
                        else {
                            return params.seriesName + ' :<br/>'
                               + params.name + ' : '
                               + params.value + '赞 ';
                        }
                    }
                },
                data: [
                ],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
        ]
    };

    $.ajax({
        url: "/video/durationandfavorite",
        success: (response) => {
            data = []
            for (let i of response) {
                data.push([i['duration'], i['favorite'], i['aid'], i['title']])
            }
            pieoption['series'][0]['data'] = data
            pieChart.setOption(pieoption);
            $(window).resize(pieChart.resize);
        }
    })
}

$(durationChart("echarts-bar-chart"))
$(durationanddanmaku("echarts-pie-chart"))
$(regionpie())
$(durationandfavorite("echarts-k-chart"))
