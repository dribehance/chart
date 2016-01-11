(function($) {
    var chart_2 = function(options) {
        this.chart = $(".chart-2");
        this.options = $.extend({}, options);
        this.series_ids = [];
        this.series = {};
        this.init();
    }
    chart_2.prototype.init = function() {
        this.label = this.chart.find(".labels span:first-child");
        this.label.addClass("active");
        this.series_ids.push(this.chart.find(".checkbox-group span:first-child").attr("data-string"))
        this.initEvent();
        this.chart.find(".container").highcharts(this.options);
        this.highchart = this.chart.find(".container").highcharts();
        this.addSeries(this.series_ids[0])
    }
    chart_2.prototype.initEvent = function() {
        var self = this;
        // label change 
        this.chart.find(".radio-group span").click(function(e) {
            if ($(this).hasClass("active")) return;
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            self.label = $(this);
            self.updateAxis();
        });
        this.chart.find(".checkbox-group span").click(function(e) {
            var series_id = $(this).attr("data-string");
            if ($(this).hasClass("active")) {
                if (self.series_ids.length == 1) {
                    return;
                }
                $(this).removeClass("active");
                self.series_ids.splice($.inArray(series_id), 1);
                self.removeSeries(series_id)
            } else {
                $(this).addClass("active");
                self.series_ids.push(series_id);
                self.addSeries(series_id);
            }
        });
    }
    chart_2.prototype.updateAxis = function() {
        var self = this;
        this.highchart.yAxis[0].update({
            title: {
                text: JSON.parse(self.chart.find(".radio-group span.active").attr("data-string")).name + "(" + JSON.parse(self.chart.find(".radio-group span.active").attr("data-string")).unit + ")",
            }
        })
        this.updateSeries();
    }
    chart_2.prototype.updateSeries = function() {
        var self = this;
        $.each(self.series, function(index, s) {
            s.update({
                data:self.randomSeries().data
            })
        })
    }
    chart_2.prototype.addSeries = function(series_id) {
        this.series[series_id] = this.highchart.addSeries(this.randomSeries());
    }
    chart_2.prototype.removeSeries = function(series_id) {
        this.series[series_id].remove();
        delete this.series[series_id];
    }
    chart_2.prototype.randomSeries = function() {
        var randomSeries = [];
        for (var i = 0; i < 12; i++) {
            randomSeries.push(Math.random() * 100)
        }
        return {
            name: '风机' + Math.floor(Math.random() * 1000000000),
            data: randomSeries
        }
    }
    chart_2.prototype.fetch = function() {}
    window.chart_2 = chart_2;
})($, window);
