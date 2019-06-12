---
title: 清理Python项目中的pyc文件
author: Jiangtao
date: 2019-06-12
description: 清理Python项目中的pyc文件和__pycache__目录
---

<!--# 简介
清理Python项目中的pyc文件和__pycache__目录-->

# 清理Python项目中的pyc文件

## 目录

[[toc]]

## 简介

Sometimes, we need clean all *.pyc files in our current project.
At this time, we can use two single command to clean them up.

```bash
python3 -c "import pathlib; [p.unlink() for p in pathlib.Path('.').rglob('*.py[co]')]"
python3 -c "import pathlib; [p.rmdir() for p in pathlib.Path('.').rglob('__pycache__')]"
```

## 使用

I would prefer to use it in a python script, just like this:

```python
# manage.py
import os
import fire

def clean(self):
    """Remove temporary files."""
    # for root, dirs, files in os.walk('.'):
    #     if '.venv' in root:
    #         continue
    #     for name in files:
    #         if name.endswith('.pyc') or name.endswith('~'):
    #             os.remove(os.path.join(root, name))
    #     for d in dirs:
    #         if os.path.join(root, d) == './__pycache__':
    #             continue
    #         if d == '__pycache__':
    #             os.rmdir(os.path.join(root, d))
    os.popen('''python3 -c "import pathlib; [p.unlink() for p in pathlib.Path('.').rglob('*.py[co]')]"''')
    # os.popen('''python3 -c "import pathlib; [p.rmdir() for p in pathlib.Path('.').rglob('__pycache__') if '.venv' not in p]"''')


if __name__ == '__main__':
    fire.Fire(clean)

```

and we can just type

```bash
python manage.py clean
```

all done. Yes, so simple!

## Reference

- [Python3 project remove __pycache__ folders and .pyc files - stackoverflow](https://stackoverflow.com/questions/28991015/python3-project-remove-pycache-folders-and-pyc-files)
