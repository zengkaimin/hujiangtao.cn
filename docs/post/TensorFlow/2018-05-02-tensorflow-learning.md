---
title: TensorFlow
date: 2018-05-02
description: TensorFlow
---

# TensorFlow

<!--# 简介
采用 Virtualenv 环境安装-->

## 目录

[[toc]]

## 安装 TensorFlow

- 安装虚拟环境

```bash
$ pip3 install --upgrade virtualenv
```

- 创建 Virtualenv 环境

```bash
$ virtualenv --system-site-packages -p python3 ~/Desktop/tensorflow
```

- 激活该 Virtualenv 环境

```bash
$ cd ~/Desktop/tensorflow
$ source ./bin/activate  # If using bash, sh, ksh, or zsh
```

激活之后就变成了：

```bash
(tensorflow)$
```

- 退出 Virtualenv 环境

```bash
(tensorflow)$ deactivate
```

- 安装 TensorFlow 及其需要的所有软件包至 Virtualenv 环境中

```bash
(tensorflow)$ pip3 install --upgrade tensorflow
```

- 卸载 TensorFlow, 只需移除之前创建的目录即可

```bash
$ rm -r ~/Desktop/tensorflow
```

- 尝试运行 TensorFlow

```bash
(tensorflow)$ python
>>> import tensorflow as tf
>>> session = tf.Session()
>>> hello = tf.constant('hello, master jiangtao')
>>> session.run(hello)
b'hello, master jiangtao'
>>> print(type(session.run(hello)))
<class 'bytes'>
>>> a = tf.constant(3)
>>> b = tf.constant(2)
>>> print(session.run(a + b))
5
```

- Reference

    1. [在 macOS 上安装 TensorFlow](https://www.tensorflow.org/install/install_mac?hl=zh-cn)

## 安装 Pandas

- pip安装

```bash
(tensorflow)$ pip3 install pandas
```

## 获取示例程序

- 克隆 TensorFlow 模型代码库

```bash
$ git clone https://github.com/tensorflow/models
```

- 运行示例程序

```bash
$ cd models/samples/core/get_started/
$ python premade_estimator.py
```

- Reference

    1. [机器学习新手使用入门](https://www.tensorflow.org/get_started/get_started_for_beginners?hl=zh-cn)
