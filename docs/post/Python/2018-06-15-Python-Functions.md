---
title: Python 工具类
date: 2018-06-15
description: 撰写Python的一些常用工具类，方便code时直接使用
---

# Python 工具类

<!--# 简介
撰写Python的一些常用工具类，方便code时直接使用-->

## 目录

[[toc]]

## function timer

有时候，我们在写完Python代码之后需要对了解自己代码的性能，这方面说起来就仁者见仁了，常用的
代码性能测试的方法很多，但一般作为接口或者脚本我们最关心的是方法的执行时间。
那么测量方法的耗时就是一个不可避免的问题，Python中有装饰器可以方便的方法的耗时，
以下是其中一种实现，其中代码可以直接拿来使用

```python
# do_time.py
# -*- coding: utf-8 -*-
# -*- author: Jiangtao -*-


from logging import warning
from functools import wraps
from time import time


def do_time(method):
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        start_time = time()
        try:
            return method(self, *args, **kwargs)
        finally:
            spend = round(1000 * (time() - start_time), 3)
            warning('方法: {_class}.{func}, 消耗: {spend} ms'.format(
                    _class=self.__class__.__name__, func=method.__name__, spend=spend))

    return wrapper

```

使用方法：

```python
# do_print.py
# -*- coding: utf-8 -*-
# -*- author: Jiangtao -*-


from do_time import do_time


@do_time
def do_print():
    for x in range(1000):
        print x
    return

```
