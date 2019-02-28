---
title: 搭建ss原版及网络加速
date: 2019-02-28
description: 搭建ss原版及网络加速
---

# 搭建ss原版及网络加速

## 目录

[[toc]]

## ss

- ss安装

CentOS 7, with AEAD ciphers

```bash
$ yum install dnf
$ dnf install libsodium python34-pip
$ pip3 install  git+https://github.com/shadowsocks/shadowsocks.git@master
```

- ss配置文件

```bash
$ vim /etc/shadowsocks.json
```

```text
# /etc/shadowsocks.json
{
    "server":"my_server_ip",
    "server_port":8388,
    "local_address": "127.0.0.1",
    "local_port":1080,
    "password":"mypassword",
    "timeout":300,
    "method":"aes-256-gcm",
    "fast_open": false
}
```

- ss启动

```bash
$ ssserver -c /etc/shadowsocks.json
$ ssserver -c /etc/shadowsocks.json -d start
$ ssserver -c /etc/shadowsocks.json -d stop
```

## 网络加速模块

采用现有的一键脚本

```bash
$ wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh"
$ chmod +x tcp.sh
$ ./tcp.sh
```

## 客户端

- Mac

```bash
$ brew cask install shadowsocksx-ng
```

- Windows

- [原版包Shadowsocks-4.1.4.zip](https://github.com/shadowsocks/shadowsocks-windows/releases/download/4.1.4/Shadowsocks-4.1.4.zip)
- [三方包](https://www.qingkuai.me/downloads.php)

## Reference

- [shadowsocks README.md](https://github.com/shadowsocks/shadowsocks/blob/master/README.md)
- [ssr及网络加速模块安装教程](https://github.com/dubstep1212/ShadowsocksR-install)
