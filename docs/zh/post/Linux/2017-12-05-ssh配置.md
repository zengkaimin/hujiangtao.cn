---
title: ssh配置
date: 2017-12-05
description: linux系统下ssh配置方式
---

# linux系统下ssh配置方式

## 目录

[[toc]]

## 密钥文件

密钥文件复制或移动到目录 `~/.ssh` 下

```bash
$ mv id_rsa ~/.ssh/
$ mv id_rsa_public ~/.ssh/
```

## 配置ssh：

```bash
$ sudo vi ~/.ssh/config
```

添加如下内容：

```
Host remote-server
HostName 192.168.2.60
User jiangtao
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
UseKeychain yes
AddKeysToAgent yes
```

或者使用简化版配置

```
# 简化版
Host remote-server
HostName 192.168.2.60
User root
IdentityFile ~/.ssh/id_rsa
```

## ssh连接:

```bash
$ ssh remote-server
```

## 密钥管理器

启动密钥代理

```bash
$ ssh-agent
Agent pid 4168;
```

添加密钥

```bash
$ ssh-add ~/.ssh/id_rsa
Identity added: ~/.ssh/id_rsa
```
