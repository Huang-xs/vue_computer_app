# Node项目

## 1.项目描述
    后台模块主要有三部分.三大模块后台模块(Admin),前台模块(Main),接口模块(Api)

## 2.安装包命令

```shell
$npm install  //安装package.json所有包

$cnpm install express ejs mongoose express-session body-parser -S //安装包

$npm install -g nodemon //自动重启服务器

```

## 3.文件夹与文件介绍（通过对一些代码的抽离来提高代码的复用性）

    controller   控制器 //用于操作各种功能的控制器

    function    公共方法  

    views   视图
        -admin  后台模板
        -main   前台模板

    routers     路由  

    uploads     文件存放(图片,文件,视频,音频)

    public      公共文件
        -js/css/img/icon

    models   模型

    node_modules    node模块存放目录
    
    package.json 项目配置
    
    app.js 入口文件

## 4.后台模块
    1.Admin 后台
    2.Index 前台
    3.Api  接口

## 5.项目运行
```shell
    $node app.js //运行项目
    $nodemon app.js //自动重启服务器
```
## 6.数据库运行
```shell
    $mongod --dbpath c:/data/db //开启数据库
    $mongo  //连接控制台
    
```