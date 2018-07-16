---
title: pyenv & pipenv 管理Python项目环境依赖
author: Jiangtao
date: 2018-07-16
description: pyenv & pipenv 管理Python项目环境依赖
---

<!--# 简介
pyenv & pipenv 管理Python项目环境依赖-->

# pyenv & pipenv 管理Python项目环境依赖

我们在创建Python项目时候经常会碰到的一个问题是
不同Python版本的项目管理或者是要管理多个环境依赖的时候，
往往会选择创建虚拟环境或者是多个依赖共存的方案，
但是以上两个方案都不是很理想。
一下尝试通过pyenv和pipenv给出一个比较方便的多环境多依赖的解决方案和实践。

## 目录

[toc]

## pyenv

### 简介

> pyenv是Python版本管理工具，利用它我们可以在同一台电脑上安装多个版本的Python
> 完美的解决了python版本的管理问题

### 安装

使用 `brew ` 安装，主要是方便管理，非Mac下再使用 `git` 手动安装或其他方式

```shell
$ brew install pyenv
$ brew upgrade pyenv
```

### 设置

安装成功之后需要在.bashrc或者.bash_profile或.zshrc中添加两行来开启自动补全

```shell
# setting for pyenv
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
```

### 使用

- help文档

```shell
$ pyenv
$ pyenv help
```

- 查看管理的Python版本

```shell
$ pyenv versions
```

列出系统&pyenv安装的Python版本，pyenv只管理系统和pyenv安装的Python

-  列出所有pipenv可安装的版本

```shell
$ pyenv install --list
```

- 安装指定版本

```shell
$ pyenv install <version>
$ pyenv install 3.6.5
$ pyenv install 2.7.14
```

- Python版本管理

```shell
$ pyenv global <version>  # 全局设置python版本为指定版本，设置全局的 Python 版本，通过将版本号写入 ~/.pyenv/version 文件的方式。
$ pyenv local <version>   # 设置当前路径下python版本为指定版本，设置 Python 本地版本，通过将版本号写入当前目录下的 .python-version 文件的方式。通过这种方式设置的 Python 版本优先级较 global 高。
$ pyenv shell <version>   # 设置当前shell窗口使用的python版本为指定版本，设置面向 shell 的 Python 版本，通过设置当前 shell 的 PYENV_VERSION 环境变量的方式。这个版本的优先级比 local 和 global 都要高。–unset 参数可以用于取消当前 shell 设定的版本。
```

使用pyenv切换Python 版本之后可以通过which python或者是python --version来查看是否生效。

- Python版本的优先级

```shell
shell > local > global
```

pyenv会从当前目录开始向上逐级查找.python-versiob文件，直到根目录为止，若找不到，则使用global版本。

- 创建垫片路径

```shell
$ pyenv rehash
```

为所有已安装的可执行文件创建 shims，如：`~/.pyenv/versions/*/bin/*`，
因此，每当你增删了 Python 版本或带有可执行文件的包（如 pip）以后，都应该执行一次本命令

- Python卸载

```shell
$ pyenv isntall <version> # 安装版本号为<version>的Python
$ pyenv uninstall <version> #卸载版本号为<version>的Python
```

## pipenv

### 简介

> pipenv是Python官方推荐的包管理工具。
>> Pipenv — the officially recommended Python packaging tool from Python.org, free (as in freedom).

它综合了 virtualenv , pip 和 pyenv 三者的功能。能够自动为项目创建和管理虚拟环境。
pipenv使用 Pipfile 和 Pipfile.lock 来管理依赖包，并且在使用pipenv添加或删除包时，
自动维护 Pipfile 文件，同时生成 Pipfile.lock 来锁定安装包的版本和依赖信息，避免构建错误。
相比pip需要手动维护requirements.txt 中的安装包和版本，具有很大的进步。

pipenv的思路简单理解便是把pip和virutalenv 2个工具统一起来，使用 pipenv 来代替。
其核心内容主要有两点

```
1. pipenv 使用 Pipfile 来代替 requirement.txt 文件记录python包。
2. 增加了Pipfile.lock 文件来锁定python软件的包名及版本，以及其依赖关系的列表。
```

### 安装

**尝试过使用pip install --user pipenv 和 brew install pipenv，安装的版本是不一样的**
这里建议使用 `brew ` 安装，主要是方便管理，非Mac下再使用 `pip` 安装

```shell
$ brew install pipenv
$ brew upgrade pipenv
```

### 设置

我们希望在每个项目的根目录下保存虚拟环境目录（.venv），
需要在 .bashrc 或 .bash_profile 中添加如下配置：

```shell
# setting for pipenv
export PIPENV_VENV_IN_PROJECT=1
```

退出编辑后执行：

```shell
$ source ~/.bashrc
或者
$ source ~/.bash_profile
```

### 使用

- 新项目创建虚拟环境

```shell
$ mkdir pipenv_demo
$ cd pipenv_demo
# 初始化一个python3虚拟环境
# 如果想初始化pyhton2的虚拟环境，则使用pipenv --two
# 或者指定版本pipenv --python 3.6.5 或者 pipenv --python 2.7.14
$ pipenv --three
```

- 已经存在的项目创建虚拟环境

直接在该项目根目录下创建

```shell
$ cd pipenv_demo
$ pipenv --three
```

创建完虚拟环境之后，在pipenv_demo目录下将会看到一个.venv的目录，这个目录就是pipenv_demo项目的虚拟环境。
还有一个文件Pipfile，这是一个yoml格式的文件，相当于requirements.txt的作用，用来记录pip的各种安装信息

- 安装卸载包

```shell
$ pipenv install flask
$ pipenv install pytest --dev   # 用于区分需要部署到线上的开发包、只需要在测试环境中执行的包
$ pipenv uninstall flask
```

- 通过requirements安装包

```shell
$ pipenv install -r requirements.txt
# 生成requirements文件
$ pipenv lock -r [--dev] > requirements.txt
```

- 安装项目中所有的依赖包

安装项目中Pipfile和Pipfile.lock中记录的所有依赖

```shell
# 安装[packages]下的包
$ pipenv install

# 安装[dev-packages]下的包
$ pipenv install -d
```

上面的方法都是安装Pipfile中列出来的第三方包的最新版本，
如果是想安装Pipfile.lock中固定版本的第三方依赖包，需要执行：

```shell
$ pipenv install --ignore-pipfile
```

- 检查已安装的包

```shell
$ pipenv graph
```

在安装依赖包完成以后，项目根目录会增加两个文件，分别是Pipfile和Pipfile.lock，
一个文件是Pipfile，这是一个yoml格式的文件，Pipfile.lock是json格式的文件，
这两个文件相当于requirements.txt的作用，记录了此项目的第三方依赖包，
这两个文件的区别是 Pipfile中安装的包不包含包的具体版本号，而Pipfile.lock是包含包的具体的版本号的

- 运行虚拟环境

启动虚拟环境的shell环境，可以直接在虚拟环境下开发

```shell
$ pipenv shell
$ source /path_to_.venv/bin/activate
$ pipenv shell --anyway
```

也可以运行项目

```shell
$ pipenv run python xxx.py
```

- 删除虚拟环境

```shell
$ cd pipenv_demo
$ pipenv --rm
```

执行完毕后可发现项目根目录下的.venv目录已经删除，但是Pipfile被留下了

- 注意事项

在安装时，指定--dev参数，则只安装[dev-packages]下的包,
若安装时不定指定--dev参数，只会安装[packages] 包下面的模块。

可以更新 pypi源来提高依赖库安装的速度，修改 `Pipfile` 文件中的 `[[source]]` 的 `url`，
设置为国内镜像源

```shell
[[source]]
#url = "https://pypi.org/simple"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
verify_ssl = true
name = "pypi"
```

- 开发建议

建议团队内开发人员，在自己电脑上都安装pyenv和pipenv。
Pipfile和Pipfile.lock加入版本跟踪，.venv不要加入版本管理。
为自己的每一个项目建立独立的虚拟环境。

## PyCharm设置使用pipenv

### 设置方式

```
在 Preferences/Project: demo/Project Interpreter 设置下选择
add... > Existing environment > Interpreter 中选择 /path_to_.venv/bin/python
```

## Reference

- [Mac OS下使用pyenv管理Python版本 - 简书](https://www.jianshu.com/p/2b0b652eaa50)
- [利用pipenv和pyenv管理多个相互独立的Python虚拟开发环境 - CSDN](https://blog.csdn.net/liuchunming033/article/details/79582617)
- [pipenv 更优雅的管理你的python开发环境 - segmentfault](https://segmentfault.com/a/1190000012837890)
- [PYTHON实践32-PYCHARM里使用PIPENV创建的环境](http://www.zengyuetian.com/?p=2655)
- [Python新利器之pipenv - 简书](https://www.jianshu.com/p/00af447f0005)
- [Configuring Pipenv Environment - PyCharm 2018.2 Help](https://www.jetbrains.com/help/pycharm/2018.2/pipenv.html)
