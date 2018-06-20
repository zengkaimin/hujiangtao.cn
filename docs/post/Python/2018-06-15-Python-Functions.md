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
(更新后的装饰器，增加了装饰器的可选参数，以便于选择是普通的方法还是类方法)

```python
# do_time.py
# -*- coding: utf-8 -*-
# -*- author: Jiangtao -*-


from logging import warning
from functools import wraps
from time import time


def do_class_time(method):
    """Get the given class function time"""
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


def do_func_time(method):
    """Get the given function time"""
    @wraps(method)
    def wrapper(*args, **kwargs):
        start_time = time()
        try:
            return method(*args, **kwargs)
        finally:
            spend = round(1000 * (time() - start_time), 3)
            warning('方法: {func}, 消耗: {spend} ms'.format(
                    func=method.__name__, spend=spend))

    return wrapper


def do_time(func=True):
    """Default to get function time
    otherwise if func is False then get the class function time.
    :param func: if the method is a class function or a normal function
    """
    return do_func_time if func else do_class_time


@do_time()
def do_print():
    print len([x for x in xrange(10000)])


class A(object):
    @do_time(func=False)
    def do_print(self):
        print len([x for x in xrange(10000)])


if __name__ == '__main__':
    do_print()
    a = A()
    a.do_print()

__all__ = ['do_time']

```

使用方法：

```python
# do_print.py
# -*- coding: utf-8 -*-
# -*- author: Jiangtao -*-


from do_time import do_time


@do_time()
def do_print():
    for x in range(1000):
        print x
    return


class A(object):
    @do_time(func=False)
    def do_print(self):
        print len([x for x in xrange(10000)])

```
