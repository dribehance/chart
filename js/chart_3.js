(function($, window, echarts) {
    var chart_3 = function(options) {
        this.chart = $(".chart-3")
        this.chart31 = $(".chart-31");
        this.chart32 = $(".chart-32");
        this.options = $.extend({}, options);
        this.init();
    }
    chart_3.prototype.init = function() {
        this.label = this.chart.find(".labels span:first-child");
        this.label.addClass("active");
        this.initEvent();
        this.echart31 = echarts.init(this.chart31.find(".container")[0]);
        this.echart31.setOption(this.randomOptions("风速"));
        this.echart32 = echarts.init(this.chart32.find(".container")[0]);
        this.echart32.setOption(this.randomOptions("功率"));
    }
    chart_3.prototype.initEvent = function() {
        var self = this;
        // label change 
        this.chart.find(".labels span").click(function() {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            self.label = $(this);
            self.updateOptions();
        });
    };
    chart_3.prototype.updateOptions = function() {
        this.echart31.setOption(this.randomOptions("风速"));
        this.echart32.setOption(this.randomOptions("功率"));
    }
    chart_3.prototype.randomOptions = function(name) {
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [name]
            },
            calculable: true,
            dataZoom: {
                show: true,
                realtime: true,
                start: 20,
                end: 80
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: function() {
                    var list = [];
                    for (var i = 1; i <= 30; i++) {
                        list.push('2013-03-' + i);
                    }
                    return list;
                }()
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: name,
                type: 'line',
                data: function() {
                    var list = [];
                    for (var i = 1; i <= 30; i++) {
                        list.push(Math.round(Math.random() * 100));
                    }
                    return list;
                }()
            }]
        };
        return option;
    }
    window.chart_3 = chart_3;
})($, window, echarts);
