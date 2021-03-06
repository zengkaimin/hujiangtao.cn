---
title: 一个Python简单项目框架的建立流程
date: 2017-01-19
description: 一个Python简单项目框架的建立流程
---

# 一个Python简单项目框架的建立流程

## 目录

[[toc]]

## 目录结构

1. 创建一个文件夹，给这个文件夹命名，然后在这个文件夹里分别创建下面的文件和目录，文件和目录里面的内容可以先不管，先搭起项目结构。<br>

   - 文件application.py: 这个文件的核心任务是完成tornado.web.Application()的实例化
   - 文件URL.py: 这个文件中记录项目中所有URL和映射的类，即完成前面代码中handlers=[...]的功能
   - 文件server.py: 这是项目的入口文件，里面包含if __name__ == "__main__", 从这里启动项目和服务
   - 目录handlers: 存放.py文件，即所谓各种请求类（如果你是更大一些的项目，可能还要分配给别的目录来存储这种文件）
   - 目录optsql（或者是database）: 存放操作数据库的文件，比如各种读取数据或者写入数据库的类或函数，都放在这里面的某些文件中
   - 目录static: 存放静态文件，比如CSS, JS, 图片等，为了更清晰，在这个目录里面，还可以建立子目录，比如css，js，img等子目录，分别对应各种类型的文件
   - 目录template: 存放.html的模板（在更大的项目中，可能会设计多个目录来存放不同的模板，或者在里面再有子目录进行区分）<br>

## Application

2. application.py代码一般如下：

```python
  #!/usr/bin/env python
  #coding:utf-8
  from url import url
  import tornado.web
  import os

  setting = dict(
      template_path=os.path.join(os.path.dirname(__file__), "template"),
      static_path=os.path.join(os.path.dirname(__file__), "static"),
      )

  application = tornado.web.Application(
      handlers=url,
      **setting
      )
```

## Url

3. url.py文件内容：

```python
  #!/usr/bin/env python
  #coding:utf-8
  import sys
  reload(sys)
  sys.setdefaultencoding('utf-8')
  from handler.index import IndexHandler

  url=[
      (r'/', IndexHandler),
      ]
```

## Server

4. server.py文件内容:

```python
  #!/usr/bin/env python
  #coding:utf-8
  import tornado.ioloop
  import tornado.options
  import tornado.httpserver
  import sys
  from application import application
  from tornado.options import define,options

  define("port",default=8888,help="run on th given port",type=int)

  def main():
      tornado.options.parse_command_line()
      http_server = tornado.httpserver.HTTPServer(application)
      http_server.listen(options.port)
      print 'Development server is running at http://127.0.0.1:%s/' % options.port
      print 'Quit the server with Control-C' tornado.ioloop.IOLoop.instance().start()

  if __name__=="__main__":
      main()
```

## Static

5. 接下来就看目录，首先在static/css/里面建立一个style.css的文件，并写样式表。

## Template

6. 样式表定义好，就是template/index.html了，比如说Jinja2样式的。

## Handler

7. 目录handlers里面是放index.py文件，这个文件里面是请求响应的类IndexHandler

```python
  #!/usr/bin/env python
  #coding:utf-8
  import tornado.web
  import sys
  reload(sys)
  sys.setdefaultencoding('utf-8')

  class IndexHandler(tornado.web.RequestHandler):
      def get(self):
          lst = ["python","www.itdiffer.com","qiwsir@gmail.com"]
          self.render("index.html", info=lst)
```

## Note

8. 说明：

```
设置为utf-8的配置，目的是避免汉字乱码。
很需要说明的是，由于这个文件在handler目录里面，要在上一层的url.py中引用（看url.py内容）,必须要在本目录中建立一个名称是"__init__.py"的空文件
```
