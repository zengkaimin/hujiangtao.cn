---
title: Python项目生成requirements
date: 2017-11-24
description: Python项目生成requirements
sidebarDepth: 0
---

# Python项目生成requirements.txt

1. virtualenv环境

> 直接在项目目录下使用：pip freeze > requirements.txt

2. 非virtualenv环境

> 如果没有使用virtualenv，使用工具pipreqs

这个工具的好处是可以通过对项目目录的扫描，自动发现使用了那些类库，自动生成依赖清单。缺点是可能会有些偏差，需要检查并自己调整下。

> 安装# pip install pipreqs

> 项目目录下执行: pipreqs ./

执行完毕则自动在当前目录生成requirements.txt文件。

> 使用requirement.txt

pip install -r requirements.txt
