---
title: 修复Homebrew升级mysql版本导致mysql无法启动的问题
date: 2018-08-08
description: 修复Homebrew升级mysql版本导致mysql无法启动的问题
---

# 修复Homebrew升级mysql版本导致mysql无法启动的问题

## 目录

[[toc]]

## 简介

升级其他软件的时候，无意间通过brew升级了所有的软件，
这导致mysql也升级至对应的最新版本`mysql@8.0`，之前的版本是`mysql@5.7`，
但是在升级过程中是没有停止mysql服务的，这就导致了一些问题，
今天连接数据库的时候就出现了一些问题，连接不上

```shell
$ mysql.server start
Starting MySQL
.. ERROR! The server quit without updating PID file (/usr/local/var/mysql/wai.local.pid).
```

搜索了一下，找到了原因和解决方案，如下

## 原因

> 升级之前 mysql 没有正常停止（crash 了），导致mysql数据出错

## 解决方案

既然是因为升级之前没有正常停止mysql，那就在之前的版本重新正常停止对应的服务就好了

> 既然说不支持崩溃后的升级，也就是说在升级之前 mysql 没有正常停止（crash 了）。
那我就在上一个（brew upgrade之前的）版本中正常停止它好咯。

```
The main reason is that the older version `mysql@5.7` not stopped
while you upgrade mysql by homebrew, and something inside mysql data was broken.
So you should reinstall older version mysql and stop the mysql services first.
Then upgrade mysql data by mysql_upgrade to fix the broken data.
Then you can uninstall older version or not, and latest version can be used yet.
```

具体解决方式如下：

```shell
$ brew install mysql@5.7
$ brew services stop mysql && brew services start mysql@5.7
$ brew services stop mysql@5.7 && brew services start mysql
$ mysql_upgrade -u root -p
$ brew uninstall mysql@5.7
```

## Reference

- [brew 升级 mysql 8.0 后不能启动的解决方法 - 不郑不郑](https://blog.notzheng.com/p/brew-mysql-cant-start-solve.html)
- [fix Install MySQL on macOS Sierra - GitHub](https://gist.github.com/nrollr/3f57fc15ded7dddddcc4e82fe137b58e#gistcomment-2672661)
