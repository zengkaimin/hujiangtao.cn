---
title: Python-Script-Demo
author: Jiangtao
date: 2018-06-27
description: Demos for Python script
---

<!--# 简介
Python同步脚本的demo和异步脚本的demo-->

# Python-Script-Demo

我们编写Python脚本一般会有同步和异步两种方式，
下面是这两种方式的一种实现。

## 目录

[[toc]]

## python_script_demo_sync

同步脚本

- python_script_demo_sync.py

```python
# -*- coding: utf-8 -*-
# -*- author: Jiangtao -*-


import logging
import traceback

from time import sleep
from datetime import datetime


class Demo(object):

    """A demo for python script"""

    def __init__(self):
        pass

    def __do_send_async_request(self):
        """function to send async request"""
        pass
        return True

    def get(self):
        """function for get data"""
        self.__do_send_async_request()
        pass
        print 'get data complete.'
        return True

    def set(self):
        """function for set data"""
        pass
        print 'set data complete.'

    def run(self):
        """the only entry function to run this demo"""
        self.get()
        self.set()


def main():
    """entry function to start this script"""
    demo = Demo()
    while 1:
        try:
            logging.info('start@%s' % datetime.now())
            demo.run()
            logging.info('end@%s' % datetime.now())
        except Exception, e:
            logging.info(traceback.format_exc())
            sleep(1)
        finally:
            sleep(10)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    try:
        main()
    except KeyboardInterrupt, e:
        logging.info("KeyboardInterrupt")
    except Exception, e:
        logging.info(traceback.format_exc())
        sleep(1)

```

## python_script_demo_async

异步脚本

- python_script_demo_async.py

```python
# -*- coding: utf-8 -*-
# -*- author: Jiangtao -*-


import logging
import traceback
import tornado

from time import sleep
from datetime import datetime

from tornado import ioloop
from tornado import gen


class Demo(object):

    """A demo for python script"""

    def __init__(self):
        pass

    @gen.coroutine
    def __do_send_sync_request(self):
        """function to send sync request"""
        pass
        gen.Return(True)

    @gen.coroutine
    def get(self):
        """function for get data"""
        yield self.__do_send_sync_request()
        pass
        print 'get data complete.'
        gen.Return(True)

    def set(self):
        """function for set data"""
        pass
        print 'set data complete.'

    @gen.coroutine
    def run(self):
        """the only entry function to run this demo"""
        yield self.get()
        self.set()


@gen.coroutine
def main():
    """entry function to start this script"""
    demo = Demo()
    while 1:
        try:
            logging.info('start@%s' % datetime.now())
            yield demo.run()
            logging.info('end@%s' % datetime.now())
        except Exception, e:
            logging.info(traceback.format_exc())
            sleep(1)
        finally:
            sleep(10)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    try:
        tornado.ioloop.IOLoop.instance().run_sync(main)
    except KeyboardInterrupt, e:
        logging.info("KeyboardInterrupt")
    except Exception, e:
        logging.info(traceback.format_exc())
        sleep(1)

```

## 启动方式

```bash
$ python python_script_demo_sync.py
$ python python_script_demo_async.py
```

## Renference

- [Tornado Web Server - Docs of Tornado](http://www.tornadoweb.org/en/stable/ioloop.html#tornado.ioloop.IOLoop.run_sync)
- [Tornado Web 服务器 - 官方中文文档](http://tornado-zh-cn.readthedocs.io/zh_CN/latest/ioloop.html#tornado.ioloop.IOLoop.run_sync)
