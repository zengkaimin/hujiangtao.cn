---
title: Python 函数缓存器functools.lru_cache
author: Jiangtao
date: 2018-08-03
description: Python 函数缓存器functools.lru_cache
permalink: /:regular
---

<!--# 简介
Python 函数缓存器functools.lru_cache-->

# Python 函数缓存器functools.lru_cache

## 目录

[[toc]]

## 简介

在Python3.2版本之后出现了一个神奇的装饰器
(当然Python2版本中也有对应的实现，可以安装functools32)

> @functools.lru_cache(maxsize=128, typed=False)

The official documents define it as:
`Least-recently-used cache decorator.`

被装饰的函数会缓存最近的最大次数为maxsize次的调用结果，
这在耗时任务或者有周期IO任务的函数处理上尤其有效。

简而言之，该装饰器实现了对函数返回结果的缓存

## 使用

```python
from functools import lru_cache


@lru_cache(maxsize=10)
def print_num(n):
    print(f'I can cache this num after first print {n}')


if __name__ == "__main__":
    for n in range(10):
        print_num(n%3)

```

参数解读

- maxsize: 最多缓存的次数，如果为None，则无限制，设置为2n时，性能最佳
- typed: typed=True（注意，在 functools32 中没有此参数），
则不同参数类型的调用将分别缓存，例如 f(3) 和 f(3.0)。

被 lru_cache 装饰的函数的参数必须是可hash的

> Since a dictionary is used to cache results,
the positional and keyword arguments to the function must be hashable.

被 lru_cache 装饰的函数会有 cache_clear 和 cache_info 两个方法，分别用于清除缓存和查看缓存信息。

官方还提供了另外一个例子，用于缓存静态网页的内容

```python
@lru_cache(maxsize=32)
def get_pep(num):
    'Retrieve text of a Python Enhancement Proposal'
    resource = 'http://www.python.org/dev/peps/pep-%04d/' % num
    try:
        with urllib.request.urlopen(resource) as s:
            return s.read()
    except urllib.error.HTTPError:
        return 'Not Found'
```

## Reference

- [functools - docs.python](https://docs.python.org/3/library/functools.html)
- [Python - lru_cache和singledispatch装饰器 - 知乎](https://zhuanlan.zhihu.com/p/27643991)
- [Python 缓存机制与 functools.lru_cache](http://kuanghy.github.io/2016/04/20/python-cache)
