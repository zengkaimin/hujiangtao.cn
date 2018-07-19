---
title: High Performance MySQL
date: 2018-04-19
description: 一些MySQL优化案例和心得
---

# MySQL优化

<!--# 简介
MySQL优化案例-->

## 目录

[[toc]]

## Base

- SQL语句的语法顺序

```
FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> UNION -> ORDER BY
```

## 查询

- [使用MySQL 5.7虚拟列提高查询效率](https://yq.aliyun.com/articles/495586?spm=a2c4e.11153940.bloghomeflow.28.632c291adDwIsb)

    ```
    使用MySQL5.7的虚拟列时候，需要先创建需要的虚拟列并在该虚拟列创建相应的索引，该索引等同于正常字段的索引，属于普通index。对比一个等同的覆盖索引，虚拟列的索引大小明显要小很多。相比较而言，覆盖索引的查询时间会更短，但是对应的索引大小要大一些，虚拟列的查询时间会比覆盖索引长一些，属于空间换时间，但是对应的索引大小会小一些，属于时间换空间。
    ```

- [MySQL索引原理及慢查询优化](https://tech.meituan.com/mysql-index.html)
- [图解 SQL 里的各种 JOIN](https://mazhuang.org/2017/09/11/joins-in-sql/#left-join)
