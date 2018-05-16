---
title: Mac安装Python开发环境依赖
date: 2018-02-05
description: Mac环境下安装Python开发环境依赖
---

# Mac 安装 Python 开发环境依赖

::: danger
*请务必按照顺序执行以下步骤*
:::

## 目录

[[toc]]

## 关闭macos的安全模式

```bash
重启电脑
按住 Command+R (直到出现苹果标志)进入 Recovery Mode (恢复模式)
左上角菜单里找到
    实用工具 -> 终端
输入
    csrutil disable
    回车
重启 Mac 即可
```


## 安装Homebrew

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```


## 安装openssl、swig和MySQL

```bash
$ brew uninstall swig
$ brew install openssl && brew install swig
$ brew --prefix openssl
$ brew install mysql
```


## 安装pip

```bash
$ sudo easy_install python-pip
```


## pip换源

- 创建配置文件

    ```bash
    $ mkdir ~/.pip; vim ~/.pip/pip.conf
    ```

- 添加如下内容：

    ```
    [global]
    index-url = https://pypi.tuna.tsinghua.edu.cn/simple
    ```


## pip安装依赖库包

- 创建requirements.txt

    ```bash
    $ vim requirements.txt
    ```

- 添加如下内容：

    ```
    # requirements.txt
    altgraph
    arcade
    backports-abc
    bcrypt
    bdist-mpkg
    beautifulsoup4
    certifi
    cffi
    chardet
    deprecation
    enum34
    esmre
    future
    futures
    hiredis
    idna
    jieba
    Jinja2
    kazoo
    kiel
    lz4
    M2Crypto
    macholib
    MarkupSafe
    matplotlib
    modulegraph
    MySQL-python
    nltk
    numpy
    packaging
    Pillow
    py2app
    pycparser
    pycurl
    pyglet
    PyMySQL
    pyobjc-core
    pyOpenSSL
    pyparsing
    pypinyin
    pytaf
    python-dateutil
    python-geohash
    python-Levenshtein
    pytlv
    PyTrie
    pytz
    PyYAML
    qiniu
    qrcode
    redis
    redis-py-cluster
    requests
    scikit-learn
    scipy
    singledispatch
    six
    sklearn
    sortedcontainers
    SQLAlchemy
    tornado
    typing
    ujson
    upyun
    urllib3
    xattr
    xlrd
    ipip-datx
    ```

- 安装

    ```bash
    $ sudo pip install -r requirements.txt
    ```

## *安装过程中可能出现的错误及解决方案*

- ==*RSA加解密包M2Crypto*==安装出现 "unable to execute 'swig': No such file or directory, error: command 'swig' failed with exit status 1" 错误，这种情况下一般是 swig 问题，按照如下命令可修复：

    ```bash
    $ brew install openssl && brew install swig

    $ brew --prefix openssl
    /usr/local/opt/openssl

    $ sudo LDFLAGS="-L$(brew --prefix openssl)/lib" \
    CFLAGS="-I$(brew --prefix openssl)/include" \
    SWIG_FEATURES="-I$(brew --prefix openssl)/include" \
    pip install m2crypto
    ```

    参考链接：[Installing M2Crypto](https://gitlab.com/m2crypto/m2crypto/blob/master/INSTALL.rst#macosx)

- 出现==*pycurl报错*==的问题

    1. 卸载已有的pycurl

        ```bash
        $ sudo pip uninstall pycurl
        ```

    2. 设置ssl环境变量

        ```bash
        $ export PYCURL_SSL_LIBRARY=openssl
        ```

        *这个时候建议查看一下环境变量是否真的设置到位了：`echo $PYCURL_SSL_LIBRARY`，如果输出为`openssl`，则说明可以。*

    3. 创建openssl的软链

        ```bash
        $ ln -s /usr/local/Cellar/openssl/1.0.2n/include/openssl /usr/bin/openssl
        ```

    4. 安装pycurl

        ```bash
        $ pip install pycurl
        ```

- 出现 "Command '/usr/bin/python -u -c ', '--compile',"等编译问题时候，可尝试如下：

    ```bash
    $ vim ~/.bash_profile
    ```

    添加如下内容：

    ```
    export CC=gcc
    export CXX=g++
    ```

    保存退出后，执行

    ```bash
    $ . ~/.bash_profile
    ```
