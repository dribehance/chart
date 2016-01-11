(function($) {
    var chart_1 = function(options) {
        this.chart = $(".chart-1");
        this.options = $.extend({}, {
            oldest_year: "2014",
            oldest_month: "0",
            oldest_day: "1"
        }, options);
        this.init();
    }
    chart_1.prototype.init = function() {
        this.label = this.chart.find(".labels span:first-child");
        this.tab = this.chart.find(".figure-tab span:first-child");
        this.label.addClass("active");
        this.tab.addClass("active");
        this.generate();
        this.initEvent();
        this.chart.find(".container").highcharts(this.options);
        this.highchart = this.chart.find(".container").highcharts();
    }
    chart_1.prototype.initEvent = function() {
        var self = this;
        // label change 
        this.chart.find(".labels span").click(function() {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            self.label = $(this);
            // self.draw();
            self.updateSeries();
        });
        // tab change
        this.chart.find(".figure-tab span").click(function(e) {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            self.tab = $(this);
            // self.draw();
            self.generate();
            self.updateAxis();
        });
        this.chart.find(".figure-pagination").click(function(e) {
            if ($(e.target).attr("class") == "next") {
                self.next()
            }
            if ($(e.target).attr("class") == "prev") {
                self.prev()
            }
        })
    };
    chart_1.prototype.updateSeries = function() {
        var self = this;
        // 风速
        this.highchart.series[0].update({
            data: self.randomSeries()
        });
        // 功率
        this.highchart.series[1].update({
            data: self.randomSeries()
        })
    }
    chart_1.prototype.updateAxis = function() {
        var monthCategories = [];
        for (var i = 1; i < getMonthDays(this.current_date.getFullYear(), this.current_date.getMonth()) + 1; i++) {
            monthCategories.push(i + "号");
        }
        if (this.tab.attr("data-string") == "week") {
            this.highchart.xAxis[0].update({
                categories: ['周一', '周二', '周四', '周四', '周五', '周六', '周天']
            })
        }
        if (this.tab.attr("data-string") == "month") {
            this.highchart.xAxis[0].update({
                categories: monthCategories
            })
        }
        if (this.tab.attr("data-string") == "year") {
            this.highchart.xAxis[0].update({
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            })
        }
        this.updateSeries();
    }
    chart_1.prototype.generate = function() {
        this.chart.find(".figure-pagination").html("")
        switch (this.tab.attr("data-string")) {
            case "year":
                this.generateYear();
                break;
            case "month":
                this.generateMonth();
                break;
            case "week":
                this.generateWeek();
                break;
            default:
                ;
        }
        this.chart.find(".figure-pagination").append(this.prev_btn);
        this.chart.find(".figure-pagination").append(this.current_btn);
        this.chart.find(".figure-pagination").append(this.next_btn);
    };
    chart_1.prototype.next = function() {
        var page, nowaday = new Date();
        if (this.tab.attr("data-string") == "year") {
            this.current_date.setYear(this.current_date.getFullYear() + 1);
            this.current_date = this.current_date > nowaday ? nowaday : this.current_date;
            page = this.current_date.getFullYear() + "年";
        }
        if (this.tab.attr("data-string") == "month") {
            this.current_date.setMonth(this.current_date.getMonth() + 1);
            this.current_date = this.current_date > nowaday ? nowaday : this.current_date;
            var month = parseInt(this.current_date.getMonth()) + 1;
            page = this.current_date.getFullYear() + "年" + month + "月";
        }
        if (this.tab.attr("data-string") == "week") {
            this.current_date.setDate(this.current_date.getDate() + 7);
            this.current_date = this.current_date > nowaday ? nowaday : this.current_date;
            page = this.current_date.getFullYear() + "年第" + getWeekNumber(this.current_date) + "周";
        }
        if (this.current_date == nowaday) {
            alert("没有数据啦");
            return
        }
        this.updatePage(page);
        this.updateAxis();
    }
    chart_1.prototype.prev = function() {
        var page, oldest_time = new Date(this.options.oldest_year, this.options.oldest_month, this.options.oldest_day);
        if (this.tab.attr("data-string") == "year") {
            this.current_date.setYear(this.current_date.getFullYear() - 1);
            this.current_date = this.current_date < oldest_time ? oldest_time : this.current_date;
            page = this.current_date.getFullYear() + "年";
        }
        if (this.tab.attr("data-string") == "month") {
            this.current_date.setMonth(this.current_date.getMonth() - 1);
            this.current_date = this.current_date < oldest_time ? oldest_time : this.current_date;
            var month = parseInt(this.current_date.getMonth()) + 1;
            page = this.current_date.getFullYear() + "年" + month + "月";
        }
        if (this.tab.attr("data-string") == "week") {
            this.current_date.setDate(this.current_date.getDate() - 7);
            this.current_date = this.current_date < oldest_time ? oldest_time : this.current_date;
            page = this.current_date.getFullYear() + "年第" + getWeekNumber(this.current_date) + "周";
        }
        if (this.current_date == oldest_time) {
            alert("没有数据啦");
            return
        }
        this.updatePage(page);
        this.updateAxis();
    }
    chart_1.prototype.generateYear = function() {
        this.current_date = new Date();
        this.prev_btn = $("<span class='prev'>上一年</span>");
        this.next_btn = $("<span class='next'>下一年</span>");
        this.current_btn = $("<span class='current'></span>");
        this.updatePage(this.current_date.getFullYear() + "年");
    }
    chart_1.prototype.generateMonth = function() {
        this.current_date = new Date();
        this.prev_btn = $("<span class='prev'>上一月</span>");
        this.next_btn = $("<span class='next'>下一月</span>");
        this.current_btn = $("<span class='current'></span>");
        var month = parseInt(this.current_date.getMonth()) + 1;
        this.updatePage(this.current_date.getFullYear() + "年" + month + "月");
    }
    chart_1.prototype.generateWeek = function() {
        this.current_date = new Date();
        this.prev_btn = $("<span class='prev'>上一周</span>");
        this.next_btn = $("<span class='next'>下一周</span>");
        this.current_btn = $("<span class='current'></span>");
        this.updatePage(this.current_date.getFullYear() + "年第" + getWeekNumber(this.current_date) + "周");
    }
    chart_1.prototype.updatePage = function(page) {
        this.current_btn = $("<span class='current'>" + page + "</span>");
        this.chart.find(".figure-pagination .current").html(page)
    };
    chart_1.prototype.randomSeries = function() {
        var length, randomSeries = [];
        if (this.tab.attr("data-string") == "week") length = 7;
        if (this.tab.attr("data-string") == "month") length = getMonthDays(this.current_date.getFullYear(),this.current_date.getMonth());
        if (this.tab.attr("data-string") == "year") length = 12;
        for (var i = 0; i < length; i++) {
            randomSeries.push(Math.random() * 100)
        }
        return randomSeries;
    }

    function getWeekNumber(date) {
        var now = date,
            year = now.getFullYear(),
            month = now.getMonth(),
            days = now.getDate();
        //那一天是那一年中的第多少天
        for (var i = 0; i < month; i++) {
            days += getMonthDays(year, i);
        }

        //那一年第一天是星期几
        var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

        var week = null;
        if (yearFirstDay == 1) {
            week = Math.ceil(days / yearFirstDay);
        } else {
            days -= (7 - yearFirstDay + 1);
            week = Math.ceil(days / 7) + 1;
        }

        return week;
    }

    function isLeapYear(year) {
        return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    }

    function getMonthDays(year, month) {
        return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
    }
    window.chart_1 = chart_1;
})($, window);
