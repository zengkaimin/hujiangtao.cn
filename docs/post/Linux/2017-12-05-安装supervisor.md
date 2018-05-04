---
title: 安装supervisor
date: 2017-12-05
description: 安装supervisor
sidebarDepth: 0
---

# 安装supervisor

** 安装的时候要用yum install supervisor **
- 配置：vim /etc/supervisord.conf
- 启动：service supervisord start
- 管理：supervisorctl
*不要用pip install supervisor,这样不好加入系统服务，不便于启动supervisor服务，也不便于管理supervisor*

# 配置文件

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

# 启动supervisor服务

** 一定不能使用配置文件(supervisord.conf)启动服务，否者会有一些不知名的问题 **
> service supervisord restart
