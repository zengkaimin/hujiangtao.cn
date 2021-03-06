---
title: 从0开始React
date: 2018-04-18
description: 从0开始React
---

# 从0开始React

<!--# 简介
从0开始搭建一个React项目-->

公司重构项目的过程中，前端项目全部使用React重构，为了以后能够听得懂前端大佬们的技术约谈，特意学习一下React。
以下全是从0基础开始的，所以即使是小白也能看得懂吧。

## 目录

[[toc]]

## 安装Node

- Mac安装Node

    ```bash
    $ brew install node
    ```

- 查看Node、npm版本

    ```bash
    $ node -v
    $ npm -v
    ```

- npm换源

    ```bash
    $ npm config set registry https://registry.npm.taobao.org
    $ npm config get registry  查看
    ```

    参考链接：
    - [npm换源 - 简书](https://www.jianshu.com/p/0deb70e6f395)
    - [npm换源 - 简书](https://www.jianshu.com/p/f311a3a155ff)

## 安装React

- npm安装create-react-app

    ```bash
    $ npm install -g create-react-app
    ```

## 新建React项目

- 创建React项目

    ```bash
    $ create-react-app my-app
    ```

- 开启服务

    ```bash
    $ cd my-app
    $ npm start
    ```

- 为生产环境打包App(Builds the app for production to the **build** folder.)

    打包App至build目录下

    ```bash
    $ npm run build
    ```

至此，一个最基本的React项目就创建完成了。







