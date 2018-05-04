---
title: Mac安装Python开发环境依赖
date: 2018-02-05
description: Mac环境下安装Python开发环境依赖
sidebarDepth: 0
---

# Mac 安装 Python 开发环境依赖

---

## 关闭macos的安全模式

```bash
重启电脑，按住Command+R(直到出现苹果标志)进入Recovery Mode(恢复模式)
左上角菜单里找到实用工具 -> 终端
输入csrutil disable回车
重启Mac即可
```


## 安装homebrew

```shell
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```


## 安装openssl和swig

```shell
$ brew uninstall swig
$ brew install openssl && brew install swig
```


## 安装pip

```shell
$ sudo easy_install python-pip
$ brew --prefix openssl
```


## pip换源

```shell
$ mkdir ~/.pip & vim ~/.pip/pip.conf
```

添加如下内容：

```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```


## pip安装依赖库包

```shell
$ sudo pip install -r requirements.txt
```

requirements.txt可以自行创建，内容如下：

```
# requirements.txt
altgraph==0.10.2
arcade==1.3.0
backports-abc==0.5
bcrypt==3.1.4
bdist-mpkg==0.5.0
beautifulsoup4==4.6.0
certifi==2018.1.18
cffi==1.11.5
chardet==3.0.4
deprecation==2.0
enum34==1.1.6
esmre==0.3.1
future==0.16.0
futures==3.2.0
hiredis==0.2.0
idna==2.6
jieba==0.39
Jinja2==2.10
kazoo==2.4.0
kiel==0.9.3
lz4==1.0.0
M2Crypto==0.29.0
macholib==1.5.1
MarkupSafe==1.0
matplotlib==1.3.1
modulegraph==0.10.4
MySQL-python==1.2.5
nltk==3.2.5
numpy==1.8.0rc1
packaging==17.1
Pillow==5.0.0
py2app==0.7.3
pycparser==2.18
pycurl==7.43.0.1
pyglet==1.3.1
PyMySQL==0.8.0
pyobjc-core==2.5.1
pyOpenSSL==0.13.1
pyparsing==2.2.0
pypinyin==0.30.0
pytaf==1.2.0
python-dateutil==1.5
python-geohash==0.8.5
python-Levenshtein==0.12.0
pytlv==0.71
PyTrie==0.3
pytz==2013.7
PyYAML==3.12
qiniu==7.2.0
qrcode==5.3
redis==2.10.6
redis-py-cluster==1.3.4
requests==2.18.4
scikit-learn==0.19.1
scipy==0.13.0b1
singledispatch==3.4.0.3
six==1.4.1
sklearn==0.0
sortedcontainers==1.5.9
SQLAlchemy==1.2.4
tornado==4.5.3
typing==3.6.4
ujson==1.35
upyun==2.5.1
urllib3==1.22
xattr==0.6.4
xlrd==1.1.0
```


## *安装过程中可能出现的错误及解决方案*

* ==*RSA加解密包M2Crypto*==安装出现 "unable to execute 'swig': No such file or directory, error: command 'swig' failed with exit status 1" 错误，这种情况下一般是 swig 问题，按照如下命令可修复：

```shell
$ brew install openssl && brew install swig

$ brew --prefix openssl
/usr/local/opt/openssl

$ sudo LDFLAGS="-L$(brew --prefix openssl)/lib" \
CFLAGS="-I$(brew --prefix openssl)/include" \
SWIG_FEATURES="-I$(brew --prefix openssl)/include" \
pip install m2crypto
```
参考链接：https://gitlab.com/m2crypto/m2crypto/blob/master/INSTALL.rst#macosx

* 出现==*pycurl报错*==的问题
    * 卸载已有的pycurl

    ```shell
    $ sudo pip uninstall pycurl
    ```

    * 设置ssl环境变量

    ```shell
    $ export PYCURL_SSL_LIBRARY=openssl
    ```
    *这个时候建议查看一下环境变量是否真的设置到位了：echo $PYCURL_SSL_LIBRARY，如果输出为openssl，则说明可以。*

    * 创建openssl的软链

    ```shell
    $ ln -s /usr/local/Cellar/openssl/1.0.2n/include/openssl openssl
    ```

    * 安装pycurl

    ```shell
    $ pip install pycurl
    ```

* 出现 "Command '/usr/bin/python -u -c ', '--compile',"等编译问题时候，可尝试如下：

    ```shell
    $ vim ~/.bash_profile
    ```

    添加如下内容：

    ```
    export CC=gcc
    export CXX=g++
    ```




