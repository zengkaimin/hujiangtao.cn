---
title: Centos用户管理
date: 2017-12-05
description: linux系统下ssh配置方式
---

# Centos 用户管理

## 目录

[[toc]]

## 用户管理

- 添加

```bash
$ useradd test -d /home/test
```

centos下 `useradd` 与 `adduser` 并无区别，adduser 通过符号链接指向 useradd，即 Cen­tOS 只有 useradd。两者都会在home下自动创建目录，没有设置密码，需使用passwd修改密码。

`-d` 指定用户家目录

- 密码

```bash
$ passwd test
```

- 删除

```bash
$ userdel -r test
```

`-r` 删除用户家目录

- 权限

`/etc/sudoers` 文件中赋予test用户新权限

```
root    ALL=(ALL)       ALL
+ test    ALL=(ALL)       ALL
```

## ssh管理

- 生成sshkey

```bash
$ ssh-keygen -t rsa -C "test@gmail.com"
```

- 配置ssh

```bash
$ mv id_rsa ~/.ssh/
$ mv id_rsa_public ~/.ssh/
$ sudo vi ~/.ssh/config
# 简化版
Host remote-server
HostName 192.168.2.60
User root
IdentityFile ~/.ssh/id_rsa

$ ssh-add ~/.ssh/id_rsa
$ ssh remote-server
```

- 部署至服务器

```bash
$ ssh-copy-id -i ~/.ssh/id_rsa_2048.pub test@ip
$ ssh-copy-id -u root -i ~/.ssh/id_rsa_2048.pub test@ip -p ssh-port
```

`ssh-copy-id` 将key写到远程机器的 `~/.ssh/authorized_key` 文件中

## Reference

- [adduser和useradd的区别 - segmentfault](https://segmentfault.com/a/1190000007316406)
- [Linux 使用 adduser 与 useradd 添加普通用户的正确姿势](https://p3terx.com/archives/add-normal-users-with-adduser-and-useradd.html)
- [useradd和adduser的区别](https://www.jianshu.com/p/46f852d5e23c)
- [CentOS 生成SSH-KEY - segmentfault](https://segmentfault.com/a/1190000013450267)

