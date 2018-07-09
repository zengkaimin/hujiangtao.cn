---
title: Nginx反向代理supervisor日志
date: 2018-07-09
description: Nginx反向代理supervisor日志
---

# Nginx反向代理supervisor日志

<!--# 简介
Nginx反向代理supervisor日志-->

## 目录

[[toc]]

## 简介

> Supervisor输出的日志在web端可通过ip:9001查看，但是有时候又不想把supervisor的服务暴露出去，这个时候就需要Nginx走反向代理，只把supervisor的输出日志暴露外部查看

但是使用Nginx一般的反向代理配置是完不成这个功能的。

## 分析

- 一般配置如下：

```shell
# 一般的反向代理配置无外乎如下两种，一种比较简单，一种使用较为普遍
server {
    listen       8001;
    server_name  localhost 192.168.2.60;

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }

    # proxy pass web & cms
    location /web {
        #deny all;
        # http://127.0.0.1:9001/logtail/local-web
        #rewrite ^ http://127.0.0.1:9001/logtail/local-web;
        proxy_pass   http://127.0.0.1:9001/logtail/local-web;
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
    location /cms {
        proxy_pass http://127.0.0.1:9001/logtail/local-cms;
    }

    # deny access to all others
    location / {
        deny  all;
    }
}
```

但是以上配置是不成功的，主要原因在与Nginx默认的http协议为http 1.0，其中http 1.0与1.1最大的区别在于1.0 是不支持keep-alive的，但是supervisor的输出日志是需要keep-alive，所以需要启用http 1.1，同时要支持keep-alive。

- 修改后的配置如下：

```shell
server {
    listen       8001;
    server_name  localhost 192.168.2.60;

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }

    # proxy pass web & cms
    location /web {
        #deny all;
        # http://127.0.0.1:9001/logtail/local-web
        #rewrite ^ http://127.0.0.1:9001/logtail/local-web;
        proxy_pass   http://127.0.0.1:9001/logtail/local-web;
        # http 1.0不支持keep-alive, 1.1支持
        proxy_http_version 1.1;
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        # 保持keep-alive
        proxy_set_header   Connection       "";
    }
    location /cms {
        proxy_pass http://127.0.0.1:9001/logtail/local-cms;
        proxy_http_version  1.1;
        proxy_set_header   Connection    "";
    }

    # deny access to all others
    location / {
        deny  all;
    }
}
```

## Reference

- [Nginx系列5之让Nginx支持HTTP1.1](http://www.cnblogs.com/liaojiafa/p/6130390.html)

```
Nginx系列5之让Nginx支持HTTP1.1

nginx在反向代理HTTP协议的时候，默认使用的是HTTP1.0去向后端服务器获取响应的内容后在返回给客户端。 HTTP1.0和HTTP1.1的一个不同之处就是，HTTP1.0不支持HTTP keep-alive。nginx在后端服务器请求时使用了HTTP1.0同时使用HTTP Header的Connection：Close通知后端服务器主动关闭连接。这样会导致任何一个客户端的请求都在后端服务器上产生了一个TIME-WAIT状态的连接。所以我们需要在Nginx上启用HTTP1.1的向后端发送请求，同时支持Keep-alive。
配置HTTP1.1
http{
''' 省去其他的配置
    upstream www{
        keepalive 50; # 必须配置，建议50-100之间
        '''
    }
    server {
    '''省去其他的配置
        location / {
        proxy_http_version 1.1; # 后端配置支持HTTP1.1，必须配
        proxy_set_header Connection "";   # 后端配置支持HTTP1.1 ,必须配置。
        }
    '''

    }
'''
}
我们增加三个参数keepalive 50，proxy_http_version 1.1 , proxy_set_header Connection 来配置。
```

- [nginx配置http为1.0到1.1，主要是为了长连接有效 - CSDN](https://blog.csdn.net/gxl0805/article/details/24263443)
- [ngx_http_upstream_module.html#keepalive - Nginx](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#keepalive)
