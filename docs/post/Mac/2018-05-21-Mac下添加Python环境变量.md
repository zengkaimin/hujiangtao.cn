---
title: Mac下添加Python环境变量
date: 2018-05-21
description: Mac下添加Python的系统环境变量
---

# Mac下添加Python环境变量

## 目录

[[toc]]

## bash添加Python环境变量

- 新建或编辑bash_profile文件

```bash
$ vim ~/.bash_profile
```

- 添加如下内容

<!-- ```bash
# ~/.bash_profile

# 添加自定义pip安装包路径，本pip路径请选择性保留
# export PIP2_PATH=/usr/local/lib/python2.7/site-packages

#PYTHONPATH=:::::::::::::::::

export CC=gcc
export CXX=g++

# module模块目录，本路径请自行更换
DIYIDAN_PATH="/Users/jiangtao.work/Documents/diyidan/module/"

export DYD_USER=${DIYIDAN_PATH}diyidan-user
export DYD_PAY=${DIYIDAN_PATH}diyidan-pay
export DYD_SHOP=${DIYIDAN_PATH}diyidan-shop
export DYD_ADMIN=${DIYIDAN_PATH}diyidan-admin
export DYD_POST=${DIYIDAN_PATH}diyidan-post
export DYD_CHAT=${DIYIDAN_PATH}diyidan-chat
export DYD_GAME=${DIYIDAN_PATH}diyidan-game
export DYD_ACTIVITY=${DIYIDAN_PATH}diyidan-activity
export DYD_CONTENT_CHECK=${DIYIDAN_PATH}diyidan-content-check
export DYD_SEARCH=${DIYIDAN_PATH}diyidan-search
export DYD_MULTIMEDIA=${DIYIDAN_PATH}diyidan-multimedia
export DYD_STATISTICAL=${DIYIDAN_PATH}diyidan-statistical
export DYD_QUEUE=${DIYIDAN_PATH}diyidan-queue
export DYD_SYSTEM=${DIYIDAN_PATH}diyidan-system
export DYD_GATEWAY=${DIYIDAN_PATH}diyidan-gateway
export DYD_HUADU=${DIYIDAN_PATH}diyidan-huadu
export DYD_GAME_MASTER=${DIYIDAN_PATH}diyidan-game-masters
export DYD_GAME_MASTER=${DIYIDAN_PATH}diyidan-game-masters
export DYD_GAME_MASTER=${DIYIDAN_PATH}diyidan-game-masters

PYTHONPATH=${PYTHONPATH}:$DYD_USER:$DYD_PAY:$DYD_SHOP:$DYD_ADMIN:$DYD_POST:$DYD_CHAT:$DYD_GAME:$DYD_ACTIVITY:$DYD_CONTENT_CHECK:$DYD_SEARCH:$DYD_MULTIMEDIA:$DYD_STATISTICAL:$DYD_QUEUE:$DYD_SYSTEM:$DYD_GATEWAY:$DYD_HUADU:$DYD_GAME_MASTER:$PIP2_PATH

export PYTHONPATH

``` -->

```bash
# ~/.bash_profile

# 添加自定义pip安装包路径，本pip路径请选择性保留
# export PIP2_PATH=/usr/local/lib/python2.7/site-packages

#PYTHONPATH=:::::::::::::::::

export CC=gcc
export CXX=g++

# module模块目录，本路径请自行更换
MODULE_PATH="/Users/jiangtao.work/Documents/jiangtao/module/"

export MODULE_USER=${MODULE_PATH}module-user
export MODULE_ADMIN=${MODULE_PATH}module-admin
export MODULE_POST=${MODULE_PATH}module-post
export MODULE_SEARCH=${MODULE_PATH}module-search
export MODULE_SYSTEM=${MODULE_PATH}module-system
export MODULE_GATEWAY=${MODULE_PATH}module-gateway

PYTHONPATH=${PYTHONPATH}:$MODULE_USER:$MODULE_ADMIN:$MODULE_POST:$MODULE_SEARCH:$MODULE_SYSTEM:$MODULE_GATEWAY:$PIP2_PATH

export PYTHONPATH

```

- 保存退出并使配置生效

```bash
$ source ~/.bash_profile
```

## 查看pip路径

```bash
$ pip -V
pip 10.0.1 from /usr/local/lib/python2.7/site-packages/pip (python 2.7)
$ pip2 -V
pip 10.0.1 from /usr/local/lib/python2.7/site-packages/pip (python 2.7)
$ pip2.7 -V
pip 10.0.1 from /usr/local/lib/python2.7/site-packages/pip (python 2.7)
```

## 使用pth文件添加环境变量

在site-packages/ 增加路径，一劳永逸、简单暴力

- 添加pth文件

```bash
$ vim /usr/local/lib/python2.7/site-packages/test.pth
```

- 添加要增加的环境变量路径

```
/test/
/tmp/
/Users/jiangtao.work/Documents/jiangtao/module/
```

## Renference

- [将文件夹加入到sys.path #解决方案 - cookbook](http://python3-cookbook.readthedocs.io/zh_CN/latest/c10/p09_add_directories_to_sys_path.html)
