---
title: Python获取第二天凌晨时间
date: 2018-05-16
description: 在Python中获取第二天凌晨的时间
---

# Python获取第二天凌晨时间

<!--# 简介
在Python中获取第二天凌晨的时间-->

## 目录

[[toc]]

## 代码示例

```python
from time import mktime
from datetime import date, timedelta

tomorrow = date.today() + timedelta(days=1)
tomorrow_zero = mktime(tomorrow.timetuple())  # 时间戳格式

```
