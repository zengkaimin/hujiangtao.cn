---
title: MySQL 使用注意事项
date: 2018-07-09
description: MySQL的一些常见注意事项
---

# MySQL 使用注意事项

<!--# 简介
MySQL的一些常见注意事项-->

## 目录

[[toc]]

## mysql强制索引和禁止某个索引

```
主键 primary_key(id)
一般索引 index_1(c1)
联合索引 index_1_2_3(c1, c2, c3)
```

- 强制使用索引: `force index` (索引名或者主键primary_key)

```sql
select * from table force index(primary_key) limit 2;(强制使用主键)
select * from table force index(index_1) limit 2;(强制使用索引"index_1")
select * from table force index(primary_key,index_1) limit 2;(强制使用索引"primary_key和index_1")
select * from table force index(primary_key,index_1_2_3) limit 2;(强制使用索引"primary_key和index_1_2_3")
```

- 禁止某个索引: `ignore index` (索引名或者主键primary_key)

```sql
select * from table ignore index(primary_key) limit 2;(禁止使用主键)
select * from table ignore index(index_1) limit 2;(禁止使用索引"index_1")
select * from table ignore index(primary_key,index_1) limit 2;(禁止使用索引"primary_key,index_1")
```

## Reference

- [MYSQL强制使用索引和禁止使用索引 - CSDN](https://blog.csdn.net/richard_rufeng/article/details/8835775)
