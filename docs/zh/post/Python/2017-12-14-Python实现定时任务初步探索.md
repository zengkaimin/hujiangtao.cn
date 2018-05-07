---
title: Python实现定时任务的初步探索
date: 2017-12-14
description: Python实现定时任务的初步探索
---

# Python实现定时任务的初步探索

通过sleep来控制定时执行任务，可设置固定时间、固定间隔来执行特定任务

```python
# -*- coding: utf-8 -*-
# -*- author: Jiangtao -*-

import logging
import traceback

from time import sleep
from datetime import datetime

class Job(object):

    def timing_run(self, job, timing, set_hour):
        is_running = True

        logging.getLogger().setLevel(logging.DEBUG)
        while is_running:
            try:
                sleep(self.get_sleep_seconds(set_hour))  # 定时制定
                job()
            except KeyboardInterrupt, e:
                logging.info('KeyboardInterrupt')
                is_running = False
            except Exception, e:
                logging.info(traceback.format_exc())
                sleep(1)
            finally:
                logging.info('done@%s' %datetime.now())
                sleep(timing)
                # is_running = False

    def get_sleep_seconds(self, set_hour):

        """返回距离设定的时间点需要的秒数"""

        current_hour = datetime.now().hour
        delta_hour = set_hour - current_hour
        if delta_hour < 0:
            delta_hour += 24

        sleep_seconds = 3600 * delta_hour

        return sleep_seconds

```

执行参考：

```python
timing_run(job=self.sync_zone_stats, timing=DateConstant.ONE_DAY_SECONDS, set_hour=12)
```
