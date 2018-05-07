---
title: 安装supervisor
date: 2017-12-05
description: 安装supervisor
---

# 安装supervisor

## 目录

[[toc]]

## 安装

建议使用 yum 安装

```bash
$ yum install supervisor
```

*不要用`pip install supervisor`，这样不好加入系统服务，不便于启动supervisor服务，也不便于管理supervisor*

## 配置文件

```bash
$ vim /etc/supervisord.conf
```

/etc/supervisord.conf中添加如下：

```
[include]
files = /etc/supervisord.d/*.ini

/etc/supervisord.d/文件夹下添加配置文件（config.ini）:
[program:web]
command=python Server.py
directory=/home/jiangtao/web
autorestart=true
stdout_logfile=/var/log/jiangtao/web.log
loglevel=info
```

## 启动supervisor服务

```bash
$ service supervisord restart
```

**一定不能使用配置文件(supervisord.conf)启动服务，否者会有一些不知名的问题**

## 管理supervisor服务

```bash
$ supervisorctl
> status  查看状态
> start  开启
> restart  重启
> stop  停止
> reload  重载配置并重启所有服务
> update  更新配置并开启新增服务
```
