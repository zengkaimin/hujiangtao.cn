---
title: Python-Tornado服务器后台跨域设置示例
date: 2018-04-09
description: Python-Tornado服务器后台跨域设置示例|Python Tornado CSRF|CORS|cross domain|跨域
permalink: /:regular
---

# Python-Tornado服务器后台跨域设置示例

<!--# 简介
Python-Tornado服务器后台跨域设置的一个示例-->

## 目录

[[toc]]

在BaseWebsiteHandler中重写tornado.web.RequestHandler时候，在initialize方法中添加如下代码：

## 允许所有域的请求

```python
# TODO 上线前的测试用，上线时移除或修改

# 设置允许请求的方法
self.set_header('Access-Control-Allow-Methods', 'POST, DELETE, PUT, GET, OPTIONS')

# Tornado获取请求'origin'的方法
origin = self.request.headers.get('Origin', '')

# 设置允许的'origin'，只设置'*'时某些特定情况下会失败故最好优先获取请求的域加入允许组中
self.set_header('Access-Control-Allow-Origin', origin or '*')

# 设置是否允许客户端携带证书式访问。通过对 Credentials 参数的设置，就可以保持跨域 Ajax 时的 Cookie
self.set_header('Access-Control-Allow-Credentials', 'true')

self.set_header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, client_id, uuid, Authorization'
)
```

## 允许指定域的请求

```python
# TODO 上线前的测试用，上线时移除或修改

allow_origin = [
            'http://127.0.0.1:3000',  # me
            'http://192.168.2.97:3000',  # test
            'http://192.168.2.97'  # nginx
        ]

# 设置允许请求的方法
self.set_header('Access-Control-Allow-Methods', 'POST, DELETE, PUT, GET, OPTIONS')

# Tornado获取请求'origin'的方法
origin = self.request.headers.get('Origin', '')

# 设置允许的'origin'
if origin in allow_origin:
    self.set_header('Access-Control-Allow-Origin', origin)

# 设置是否允许客户端携带证书式访问。通过对 Credentials 参数的设置，就可以保持跨域 Ajax 时的 Cookie
self.set_header('Access-Control-Allow-Credentials', 'true')

self.set_header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, client_id, uuid, Authorization'
)
```
