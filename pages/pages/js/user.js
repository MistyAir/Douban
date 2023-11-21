function genderbar() {
    var chart = echarts.init(document.getElementById("user-bar-chart"))
    $.ajax({
        url: "/user/gender",
        method: "GET",
        success: (response) => {
            var pieoption = {
                title: {
                    text: 'B站用户性别比例',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['男', '女', '未知']
                },
                calculable: true,
                series: [{
                    name: '性别',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [{
                            value: response["male"],
                            name: '男'
                        },
                        {
                            value: response["female"],
                            name: '女'
                        },
                        {
                            value: response["secret"],
                            name: '未知'
                        },
                    ]
                }]
            };
            chart.setOption(pieoption)
            $(window).resize(chart.resize)
        }
    })
}

function levelchart() {
    var barChart = echarts.init(document.getElementById("level-bar-chart"));
    var baroption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {
            data: ['前一万注册用户', '前十万注册用户', '所有用户']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['level.1', 'level.2', 'level.3', 'level.4', 'level.5', 'level.6']
        },
        series: [{
                name: '前一万注册用户',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 302, 301, 334, 390, 330]
            },
            {
                name: '前十万注册用户',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230]
            },
            {
                name: '所有用户',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330]
            }
        ]
    };
    $.ajax({
        url: "/user/level?id_range=0,10000",
        success: (response) => {
            baroption["series"][0]["data"] = [response["1"], response["2"], response["3"], response["4"], response["5"], response["6"]]
            barChart.setOption(baroption);
        }
    })
    $.ajax({
        url: "/user/level?id_range=0,100000",
        success: (response) => {
            baroption["series"][1]["data"] = [response["1"], response["2"], response["3"], response["4"], response["5"], response["6"]]
            barChart.setOption(baroption);
        }
    })
    $.ajax({
        url: "/user/level",
        success: (response) => {
            baroption["series"][2]["data"] = [response["1"], response["2"], response["3"], response["4"], response["5"], response["6"]]
            barChart.setOption(baroption);
        }
    })
    barChart.setOption(baroption);

    window.onresize = barChart.resize;
}

function wordcloud() {
    var div = document.getElementById("canvas-div");
    var canvas = document.getElementById("canvas");
    canvas.height = div.offsetHeight;
    canvas.width = div.offsetWidth-40;
    $.ajax({
        url: "/user/sign",
        method: "GET",
        success: (response) => {
            var wordFreqData = []
            for (let key in response) {
                wordFreqData.push([key, response[key]])
            }
            // console.log(wordFreqData)
            var canvas = document.getElementById('canvas');
            var options = eval({
                "list": wordFreqData, //或者[['各位观众',45],['词云', 21],['来啦!!!',13]],只要格式满足这样都可以  
                "gridSize": 50, // 密集程度 数字越小越密集   
                "weightFactor": 0.015, // 字体大小=原始大小*weightFactor   
                "maxFontSize": 80, //最大字号
                "minFontSize": 14, //最小字号 
                "fontWeight": 'normal', //字体粗细    
                "fontFamily": 'Helvetica Neue, serif', // 字体   
                "color": 'random-light', // 字体颜色 'random-dark' 或者 'random-light'   
                // "backgroundColor": '#111', // 背景颜色  
                "rotateRatio": 0.6 // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
            });
            //生成
            WordCloud(canvas, options);
            $(window).resize(canvas.resize)
        }
    })
}

$(genderbar())
$(levelchart())
$(wordcloud())