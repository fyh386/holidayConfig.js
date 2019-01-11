# holidayConfig.js
判断日期是工作日还是节假日

该库引用了JSLINQ来方便查询特在此声明
共包含三个方法date.isHoliday();date.getWorkday(num);date.Format(fmt);
由于法定节假日是每年国务院规定的所以需要人工配置一下，目前只配置了2018，2019年的信息

How to use?
var date = new Date();
date.isHoliday();//0:工作日，1：双休日（不包括法定不休的） ，2：法定节假日
date.getWorkday(num);//返回Num个工作日内的时间
date.Format(fmt);//date.Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   date.Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
