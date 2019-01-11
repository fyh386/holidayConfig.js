document.write('<script src="/Js/JSLINQ.js" type="text/javascript"></script>');

//法定节假日
var holiday = {
    y2019: [[date = 20190101, mark = '元旦'], [date = 20190102, mark = '元旦'], [date = 20190204, mark = '春节'], [date = 20190205, mark = '春节'], [date = 20190206, mark = '春节'], [date = 20190207, mark = '春节'], [date = 20190208, mark = '春节'], [date = 20190209, mark = '春节'], [date = 20190210, mark = '春节'], [date = 20190405, mark = '清明节'], [date = 20190406, mark = '清明节'], [date = 20190407, mark = '清明节'], [date = 20190501, mark = '劳动节'], [date = 20190607, mark = '端午节'], [date = 20190608, mark = '端午节'], [date = 20190609, mark = '端午节'], [date = 20190913, mark = '中秋节'], [date = 20190914, mark = '中秋节'], [date = 20190915, mark = '中秋节'], [date = 20191001, mark = '国庆节'], [date = 20191002, mark = '国庆节'], [date = 20191003, mark = '国庆节'], [date = 20191004, mark = '国庆节'], [date = 20191005, mark = '国庆节'], [date = 20191006, mark = '国庆节'], [date = 20191007, mark = '国庆节']],
    y2018: [[date = 20180101, mark = '元旦'], [date = 20180215, mark = '春节'], [date = 20180216, mark = '春节'], [date = 20180217, mark = '春节'], [date = 20180218, mark = '春节'], [date = 20180219, mark = '春节'], [date = 20180220, mark = '春节'], [date = 20180221, mark = '春节'], [date = 20180405, mark = '清明节'], [date = 20180406, mark = '清明节'], [date = 20180407, mark = '清明节'], [date = 20180429, mark = '劳动节'], [date = 20180430, mark = '劳动节'], [date = 20180501, mark = '劳动节'], [date = 20180618, mark = '端午节'], [date = 20180924, mark = '中秋节'],  [date = 20191001, mark = '国庆节'], [date = 20191002, mark = '国庆节'], [date = 20191003, mark = '国庆节'], [date = 20191004, mark = '国庆节'], [date = 20191005, mark = '国庆节'], [date = 20191006, mark = '国庆节'], [date = 20191007, mark = '国庆节']],
}

//双休日上班的
var workday = {
    y2019: [[date = 20190202, mark = '春节'], [date = 20190203, mark = '春节'], [date = 20190929, mark = '国庆'], [date = 20191012, mark = '国庆']],
    y2018: [[date = 20180211, mark = '春节'], [date = 20180224, mark = '春节'], [date = 20180408, mark = '清明节'], [date = 20180428, mark = '劳动节'], [date = 20180929, mark = '国庆'], [date = 20180930, mark = '国庆']],
}


/**
 * @method 判断当前时间的节假日类型
 * @returns {int} 0:工作日，1：双休日（不包括法定不休的） ，2：法定节假日
 * @desc 根据目标对象获取运营商
 */

Date.prototype.isHoliday = function () {
    var date = this;
    if (JSLINQ(holiday['y' + date.getFullYear()]).Where(function (item) { return item.date == parseInt(date.Format("yyyyMMdd")); })
    .Select(function (item) { return item }).length >= 1) return 2;

    if (date.getDay() == 6 || date.getDay() == 0) {
        if (JSLINQ(workday['y' + date.getFullYear()]).Where(function (item) { return item.date == parseInt(date.Format("yyyyMMdd"));})
            .Select(function (item) { return item }).length >= 1) { return 0 }
        else { return 1}
    };
    return 0;
}

/**
 * @method
 * @param {int} num 加减工作日 
 * @returns {Date} 最终时间
 * @desc 根据目标对象获取运营商
 */

Date.prototype.getWorkday = function (num) {
    var date = this;
    if (num > 0) {
        for (var i = 0; i < num; i++) {
            date.setDate(date.getDate()+1);
            while (date.isHoliday() != 0) {
                date.setDate(date.getDate()+1);
            }
        }
    } else {
        for (var i = 0; i < Math.abs(num); i++) {
            date.setDate(date.getDate()-1);
            while (date.isHoliday() != 0) {
                date.setDate(date.getDate()-1);
            }
        }
    }
    return date;
}

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}  
