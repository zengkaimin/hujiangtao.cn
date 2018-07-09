---
title: MySQL 多列联合索引的查询问题
date: 2018-07-09
description: MySQL 多列联合索引的查询问题
---

# MySQL 多列联合索引的查询问题

<!--# 简介
MySQL 多列联合索引的查询问题-->

## 目录

[[toc]]

## 表结构

- 表名 `table_click_event`

- 表结构是这样的

| id  | muid    | os_type | click_time | create_time | update_time |
| -   | -       | -       | -          | -           | -           |
| int | varchar | varchar | int        | timestamp   | timestamp   |

- 联合索引

`index_muid_os_click` (muid, os_type, click_time)

## 四种情况的相关查询

1. ```explain select * from table_click_event where click_time < 1530409837;```

查询执行计划
| id | select_type | table             | type | possible_keys | key  | key_len | ref  | rows    | Extra       |
| -  | -           | -                 | -    | -             | -    | -       | -    | -       | -           |
| 1  | SIMPLE      | table_click_event | ALL  | NULL          | NULL | NULL    | NULL | 8852270 | Using where |

2. ```explain select muid from table_click_event where click_time < 1530409837;```

查询执行计划
| id | select_type | table             | type  | possible_keys | key                 | key_len | ref  | rows    | Extra                    |
| -  | -           | -                 | -     | -             | -                   | -       | -    | -       | -                        |
| 1  | SIMPLE      | table_click_event | index | NULL          | index_muid_os_click | 299     | NULL | 8858278 | Using where; Using index |

3. ```explain select count(*) from table_click_event where click_time < 1530409837;```

查询执行计划
| id | select_type | table             | type  | possible_keys | key                 | key_len | ref  | rows    | Extra                    |
| -  | -           | -                 | -     | -             | -                   | -       | -    | -       | -                        |
| 1  | SIMPLE      | table_click_event | index | NULL          | index_muid_os_click | 299     | NULL | 8858836 | Using where; Using index |

4. ```explain select count(1) from table_click_event where click_time < 1530409837;```

查询执行计划
| id | select_type | table             | type  | possible_keys | key                 | key_len | ref  | rows    | Extra                    |
| -  | -           | -                 | -     | -             | -                   | -       | -    | -       | -                        |
| 1  | SIMPLE      | table_click_event | index | NULL          | index_muid_os_click | 299     | NULL | 8857193 | Using where; Using index |

- 1查询全量查询没问题
- 2查询联合索引不该命中，但实际命中
- 3、4查询统计，联合索引页也被命中

根据索引原则，这里的2、3、4查询正常来说都不应该命中联合索引，为什么会不一样？


## 可能答案

- 数据库mysql实际索引结构
当建立多列联合索引时，实际的索引存储结构如下
聚集索引结构此时为(主键, 记录): (primary_key, row)
联合索引结构此时实际是(索引, 主键): ((c1, c2, c3), primary_key)

- 1查询全量查询，由于索引结构没有保存记录的全部信息，所以跳过索引查询，查询数据库，又由于联合索引的限制无法使用联合索引(c1, c2, c3), 所以会全量查询数据库

- 2查询为检索单独的索引列，由于索引结构(c1, c2, c3)保存了完整的c1, c2, c3字段信息，所以直接会在索引中查找该信息，从而不再查询数据库。
又由于联合索引结构实际上亦可看成一个个索引记录组成的索引表，所以2查询可以认为是```select c1 from ((c1, c2, c3), primary_key) where c3 < 1530409837;```

- 3、4查询实际原理同2查询，但又一些不同，3查询是查询所有表记录的总数，实际上也可以看成是count(1)，从最终结果方面讲3、4查询没有差别，sql执行优化器应该也是如此认为的，
区别应该在于count的数据集的大小(3查询count整条记录，4查询count常量1)。
因为索引记录了完整的数据库记录，所以3、4查询的count实际上在索引中count是一样的效果，所以最终不会再去查询数据库。

- 所以从表现上来说以上2、3、4查询都用到了联合索引，但是实际上只是用到了索引列的结构，而并不是用到了索引的效率。因为索引的目的是加速查询，查询的目的地是数据库，
但是以上查询(索引列、或者count统计)的目的地并不一定指向数据库，所以索引的效率没有体现出来。

- 以上2查询用到索引列的表现的一个最根本的前提是多列联合索引((c1, c2, c3), primary_key)中的索引是完整的数据库字段信息，而不是前缀索引。
也就是说，要满足要在要查询的列上(对应索引列字段信息=对应数据库字段信息)，这样对应的查询才会因为索引中记录了完整的字段信息命中该索引列，而不会再去查询数据库

- 3、4查询只要是在联合索引中有该索引列，而不管是不是前缀索引，都是会命中索引的，因为查询的目的要求该查询结果并不一定需要从数据库中返回。

- sql查询的索引使用主要是与where条件有关，与要查询的对象也是有着微妙的关系的？待考证确认

## Reference

- [index btree hash - MySQL](https://dev.mysql.com/doc/refman/5.5/en/index-btree-hash.html)
- [mysql里创建‘联合索引’的意义？ - Segmentfault](https://segmentfault.com/q/1010000000342176)
- [MySQL 联合索引 (a,b) 的一些困惑 - Ruby China](https://ruby-china.org/topics/27022)
- [mysql的最佳索引攻略 - Mysql设计与优化专题](https://www.kancloud.cn/thinkphp/mysql-design-optimalize/39319)
