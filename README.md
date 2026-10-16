# holidayConfig.js

判断一个日期是工作日还是节假日（中国内地法定节假日，含调休）。**单文件、零依赖**，直接引入即可：

```html
<script src="holidayConfig.js"></script>
```

## API

```js
var date = new Date();

date.isHoliday();     // 0: 工作日，1: 双休日（非法定节假日），2: 法定节假日
date.holidayName();   // 当天节日名（如 '春节'），非节假日返回 null

date.getWorkday(3);   // 往后推 3 个工作日（正数向后、负数向前；会修改并返回 this）
date.Format('yyyy-MM-dd hh:mm:ss');  // 2006-07-02 08:09:04
```

## 数据说明

- 法定节假日由国务院每年发布，需人工维护仓库内 `HOLIDAYS` / `WORKDAYS` 两张表（按年份分组，键为 `yyyyMMdd`）
- 已收录 **2018—2026 年**，其中 2026 年依据《国务院办公厅关于 2026 年部分节假日安排的通知》（国办发明电〔2025〕5 号）
- 查询为哈希表 O(1) 查找，年份缺失时按普通周末规则处理
- 数据表通过 `window.HOLIDAY_CONFIG` 暴露，便于扩展与测试

## 单文件版说明

本版已移除旧版对 [JSLINQ](http://jslinq.codeplex.com) 的依赖（原 `JSLINQ.js` 与 `独立版/` 目录已删除），并修复旧版数据问题：

1. 2018 年数据漏掉国庆节、误填入 2019 年的日期
2. 2019 年元旦放假日期修正（官方为 2018-12-30 至 2019-01-01）
3. 数据格式由数组扫描改为哈希表，查询从 O(n) 降为 O(1)
