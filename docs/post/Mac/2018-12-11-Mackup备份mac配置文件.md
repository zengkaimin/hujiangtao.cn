---
title: Mackup备份mac配置文件
date: 2018-12-11
description: 使用Mackup工具备份mac系统的配置文件
permalink: /:regular
---

# Mackup备份mac配置文件

## 目录

[[toc]]

::: warning
使用 `$ mackup backup`
 命令后，一定不要直接删除 `~/<path>/Mackup/*` 目录下的备份文件，因为只有这么一份，修改也是一样，修改后直接生效，如果事先没有备份是找不回来的，如果要删除，一定要先使用 `$ mackup uninstall` 还原一切设置，把文件还原后再删除备份目录下的文件。你问我为什么知道，，，血与泪的教训 `~~o(>_<)o ~~`
:::

## 原理

集中管理需要备份的配置文件，然后通过软链接实现镜像文件

```bash
$ cp ~/.gitconfig ~/Dropbox/Mackup/.gitconfig
$ rm ~/.gitconfig
$ ln -s ~/Dropbox/Mackup/.gitconfig ~/.gitconfig
```

## brew安装mackup

mackup通过备份系统中的配置文件，如`.vimrc`, `.zshrc`, `.bash_profile`等配置文件，然后通过软链接，在系统中保留镜像，以此实现备份功能。

```bash
$ brew install mackup
```

## mackup使用

```bash
$ mackup list  # list all apps can backup
$ mackup backup  # to backup
$ mackup restore  # to restore
$ mackup uninstall  # to remove all links and reset all
```

- To read more, refer to:

```bash
$ mackup --help
```

## 配置

- 创建 mackup 配置文件

```bash
$ vim ~/.mackup.cfg
```

添加如下内容：

```bash
[storage]
engine = file_system
path = Documents/jiangtao/github/dotfiles
directory = Mackup
[applications_to_sync]
mackup
zsh
vim
bash
docker
git
httpie
ipython
iterm2
jupyter
keka
npm
oh-my-zsh
pip
pycharm
sublime-text-2
sublime-text-3
vscode
[applications_to_ignore]
ssh
```

## Reference

- [Mackup Github](https://github.com/lra/mackup)
