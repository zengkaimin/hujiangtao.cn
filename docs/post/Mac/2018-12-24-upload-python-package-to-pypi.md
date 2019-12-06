---
title: pypi打包上传流程参考
date: 2018-12-24
description: Mac上Pypi打包上传Python包的流程参考
---

# pypi打包上传流程参考

## 目录

[[toc]]

## 配置Pypi本地环境

```bash
$ vim ~/.pypirc
```

填写下面内容

```shell
[pypirc]
index-servers =
    pypi
    pypitest

[pypi]
repository=https://pypi.python.org/pypi

[pypitest]
repository=https://testpypi.python.org/pypi

[server-login]
username:<username>
password:<password>
```

## 使用

- 打包

```bash
// 切到相应的目录
$ cd /path_to_your_source_code_dir
// 打包预检
$ python setup.py check
// 打包，但不上传
$ python setup.py sdist
// 打包并上传
$ python setup.py sdist register upload
// 如果没有配置过上传的账号和密码，需要先配置
$ vim ~/.pypirc
```

## Reference

- [Pypi upload tutorials](https://packaging.python.org/tutorials/packaging-projects/)
