---
title: Mac下Homebrew安装MySQL
date: 2018-02-17
description: Mac下Homebrew安装MySQL
---

# Mac下Homebrew安装MySQL

## 目录

[[toc]]

## 安装

```bash
$ brew install mysql
```

## 启动

- 开机自动启动mysql服务

    ```bash
    $ brew services start mysql
    ```

- 本次启动服务

    ```bash
    $ mysql.server start
    ```
