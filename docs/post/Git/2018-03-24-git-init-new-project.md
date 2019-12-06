---
title: Git初始化项目流程
date: 2018-03-24
description: 初始化一个完整的Git新项目的简单流程记录
---

# Git初始化项目流程

## 目录

[[toc]]

## 新建远程仓库

- Github新建远程仓库

    ```
    "https://github.com/dydjiangtao/my-project.git"
    ```

## 初始化本地仓库

- 初始化Git项目

    ```bash
    $ mkdir my-project
    $ cd my-project
    $ git init
    ```

## 配置本地仓库

- 配置本地git

    ```bash
    $ git config user.name my-name
    $ git config user.email my-email
    ```

## 关联远程仓库

- 关联本地仓库与远程仓库

    ```bash
    $ git remote add origin git@github.com:my-github-account/my-app-demo.git
    ```

## 提交新文件

- 提交新文件

    ```bash
    $ git add .
    $ git commit -m "my first commit"
    ```

## 关联远程分支

- 本地分支关联远程分支(可选，如果本地分支与远程分支保持最新，也不做这一步和下一步，这一是为了git pull操作)

    ```bash
    $ git branch --set-upstream-to=origin/<branch> master
    ```

- 拉取最新代码并合并代码

    ```bash
    $ git pull --rebase
    ```

## 推送至远程

- 推送代码至远程仓库(-u参数把本地的master分支和远程的master分支进行关联起来)

    ```bash
    $ git push -u origin master
    ```






