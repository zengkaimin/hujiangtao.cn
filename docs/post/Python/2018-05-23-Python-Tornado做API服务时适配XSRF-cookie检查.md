---
title: Python Tornado做API服务时适配XSRF cookie检查
date: 2018-05-23
description: Python的Tornado框架做API服务供Ajax请求时适配XSRF cookie检查
permalink: /:regular
---

# Python Tornado做API服务时适配XSRF cookie检查

<!--# 简介
Python的Tornado框架做API服务供Ajax请求时适配XSRF cookie检查-->

## 目录

[[toc]]

## 问题简介

在使用Tornado框架做API服务供Ajax请求时，
前端出现```403 Forbidden```错误，
后端日志显示```_xsrf argument missing```

## 问题分析

使用Tornado的时候，配置中有防CSRF攻击的可配置参数```xsrf_cookies```

```python
class RequestHandler(object):

    @gen.coroutine
    def _execute(self, transforms, *args, **kwargs):
        """Other code"""
        settings = {
            "template_path": "templates",
            "static_path": "static",
            "xsrf_cookies": True,
            "cookie_secret": "1233",
        }
        """Other code"""

```

当```xsrf_cookies```参数设置为```True```，
Tornado框架会在接收到```GET,HEAD,OPTIONS```之外的请求时，做```XSRF cookies```检查

```python
# If XSRF cookies are turned on, reject form submissions without
# the proper cookie
if self.request.method not in ("GET", "HEAD", "OPTIONS") and \
        self.application.settings.get("xsrf_cookies"):
    self.check_xsrf_cookie()

```

当检查到请求中没有```_xsrf```参数的时候，就会返回返回一个```403 Forbidden```的错误

```python
class RequestHandler(object):

    """Other fun"""

    def check_xsrf_cookie(self):
        """Verifies that the ``_xsrf`` cookie matches the ``_xsrf`` argument.

        To prevent cross-site request forgery, we set an ``_xsrf``
        cookie and include the same value as a non-cookie
        field with all ``POST`` requests. If the two do not match, we
        reject the form submission as a potential forgery.

        The ``_xsrf`` value may be set as either a form field named ``_xsrf``
        or in a custom HTTP header named ``X-XSRFToken`` or ``X-CSRFToken``
        (the latter is accepted for compatibility with Django).

        See http://en.wikipedia.org/wiki/Cross-site_request_forgery

        Prior to release 1.1.1, this check was ignored if the HTTP header
        ``X-Requested-With: XMLHTTPRequest`` was present.  This exception
        has been shown to be insecure and has been removed.  For more
        information please see
        http://www.djangoproject.com/weblog/2011/feb/08/security/
        http://weblog.rubyonrails.org/2011/2/8/csrf-protection-bypass-in-ruby-on-rails

        .. versionchanged:: 3.2.2
           Added support for cookie version 2.  Both versions 1 and 2 are
           supported.
        """
        token = (self.get_argument("_xsrf", None) or
                 self.request.headers.get("X-Xsrftoken") or
                 self.request.headers.get("X-Csrftoken"))
        if not token:
            raise HTTPError(403, "'_xsrf' argument missing from POST")
        _, token, _ = self._decode_xsrf_token(token)
        _, expected_token, _ = self._get_raw_xsrf_token()
        if not token:
            raise HTTPError(403, "'_xsrf' argument has invalid format")
        if not _time_independent_equals(utf8(token), utf8(expected_token)):
            raise HTTPError(403, "XSRF cookie does not match POST argument")

```

这个错误码有时候返回的猝不及防，不清楚的小伙伴还以为是哪个地方出错了
(虽然就是哪个地方出错了，但是你还真不一定能解决)

然后查了一下资料，发现在早期版本的Tornado中，曾经为Ajax请求适配过，
参考[Ignore XSRF cookie check when X-Requested-With XMLHttpRequest](https://github.com/tornadoweb/tornado/commit/c50d9b8c789eb1914f31bd4dc7adbf1383c8fdb1)，
可以看出，早期的提交中是考虑到这种情况了的，但是查看现在的Tornado源码发现

> 'Prior to release 1.1.1, this check was ignored if the HTTP header
        ``X-Requested-With: XMLHTTPRequest`` was present.  This exception
        has been shown to be insecure and has been removed.'

什么意思呢，就是基于安全考虑，又把这个给去掉了。
这样的话，使用Tornado做服务端渲染肯定不会有问题，
但是一旦使用Tornado做API服务供Ajax请求的时候，问题妥妥的就来了，
前端具体表现为请求结果```403 Forbidden```，
后端日志显示```_xsrf argument missing```

## 解决方案

那么如何解决这个问题呢

关闭```xsrf_cookie```这个参数肯定是能行的通的，但是就失去了```CSRF```这个防范机制了

那么还有其他的方案可行吗？当然有哇，Tornado早起不是给我们上过生动的一课嘛

所以要解决这个问题还是需要从源码上着手比较好吧
(虽然感觉还是只是临时方案，因为所有的Ajax请求暂时都失去了```CSRF```防范机制)

具体做法就是在继承```tornado.web.RequestHandler```的时候，
复写一遍源码中的```check_xsrf_cookie```方法，
使Ajax请求在检查_xsrf参数的时候自动放过，这样就不会触发```403 Forbidden```了。

## 代码示例

```python

import tornado.web


class BaseRequestHandler(tornado.web.RequestHandler):

    def check_xsrf_cookie(self):
        """Adapt for ajax requests, exclude get, head and options"""
        if self.request.headers.get("X-Requested-With") == "XMLHttpRequest":
            return

```

## Renference

- [tornadoweb/tornado:1279 check_xsrf_cookie - GitHub](https://github.com/tornadoweb/tornado/blob/master/tornado/web.py)
- [Ignore XSRF cookie check - GitHub tornadoweb/tornado](https://github.com/tornadoweb/tornado/commit/c50d9b8c789eb1914f31bd4dc7adbf1383c8fdb1)
- [Flaw in CSRF handling - Django](https://www.djangoproject.com/weblog/2011/feb/08/security/)
