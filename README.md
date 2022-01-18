# 一个面向对象的高效 Node.js MVC and REST 框架

CandyJs 并非基于第三方框架扩展，而是一个新的框架。

### 为什么是 CandyJs

+ CandyJs 实现了 MVC (Model-View-Controller) 设计模式并基于该模式组织代码

+ CandyJs 实现了自动路由映射

+ CandyJs 高可扩展和高可配置

+ CandyJs 的代码简约而不简单，每一个 api 、配置参数名字都是经过深思熟虑决定的，这是它的编程哲学

+ CandyJs 采用 MIT 许可 这意味着您可以免费的使用 CandyJs 来开发 WEB 应用

### 文档

+ 最新文档请参阅源码的 doc 目录

+ doc https://douyu-beijing.github.io/candyjs-guide

+ demo https://github.com/douyu-beijing/candyjs-examples

### 源码 source code

+ https://github.com/douyu-beijing/candyjs

+ 修改代码

```
$ npm install typescript
$ ./node_modules/.bin/tsc
```

### Node 版本

8.0.0 +

### Hello world

使用 CandyJs 你只需要从一个入口文件开始， 入口文件的内容可以使用 CandyJs 自带的工具来生成

```javascript
// 入口文件 index.js

var CandyJs = require('candyjs');
var App = require('candyjs/web/Application');

var app = new App({
    'id': 1,

    // 定义调试应用
    'debug': true,

    // 定义应用路径
    'appPath': __dirname + '/app'

});

new CandyJs(app).listen(8090, function(){
    console.log('listen on 8090');
});
```

### 系统内置别名

+ @candy  系统目录

+ @app  项目目录 由 appPath 指定 `Candy.app.getAppPath()` 可得到该值

+ @runtime  缓存目录 默认指向 @app/runtime `Candy.app.getRuntimePath()` 可得到该值

+ @root  网站根目录 `Candy.app.getRootPath()` 可得到该值

### 项目目录示例

<pre>
|- index.js
|
|- node_modules 目录
|
|- public 目录
|
|- app 项目目录
|  |
|  |-- apis
|  |
|  |-- controllers 普通控制器目录
|      |
|      |-- user 用户组目录
|      |   |
|      |   |-- IndexController.js
|      |   |-- OtherController.js
|      |
|      |-- goods 商品组目录
|      |   |
|      |   |-- IndexController.js
|      |   |-- OtherController.js
|      |
|   -- views 普通控制器模板目录
|      |
|      |-- user 用户组模板 对应上面用户组
|      |   |
|      |   |-- index.html
|      |   |-- other.html
|      |
|   -- goods 商品组模板
|      |   |
|      |   |-- index.html
|      |   |-- other.html
|      |
|   -- modules 模块
|      |
|      |-- actives
|      |   |
|      |   |-- controllers 模块控制器目录 其下无子目录
|      |   |   |
|      |   |   |-- IndexController.js
|      |   |
|      |   |-- views 模块模板目录
|      |   |   |
|      |   |   |-- index.html
|      |   |
|      |   |-- 其他目录
|      |
|   -- runtime 缓存目录
|
</pre>

### 变更

+ 2021-11-13

    * 4.9.6 修复 bug

+ 2021-10-21

    * 4.9.4 优化系统

+ 2021-10-14

    * 重构 模板 模块

+ 2021-10-04

    * npm package 4.9.0 添加 model

+ 2021-10-01

    * fix some bug

+ 2020-12-16

    * npm package 4.7.0 优化数据库类

+ 2020-10-31

    * npm package 4.6.0 移除已经标记为过期的类

+ 2020-07-12

    * npm package 4.5.0 系统优化 并修复部分 bug

+ 2020-06-10

    * npm package 4.4.4 分离正则路由组件到 `fast-regexp-router`

+ 2020-05-30

    * npm package 4.4.1 重构了 url 请求部分 `candy/web/Request` 与 `candy/web/Response` 已标记为过期 使用 `candy/http/*` 替代

+ 2020-05-16

    * npm package 4.4.0 重构了缓存系统 所有异步操作均返回 Promise ，不再使用回调函数

+ 2020-05-16

    * 优化系统

+ 2020-05-10

    * 由于设计缺陷 npm 包 4.3.0 对控制器切面进行了重构，当 `beforeAction()` 返回值不为 true 时将阻止程序的运行
    * `beforeActionCall()` 更名为 `beforeAction()`
    * `afterActionCall()` 更名为 `afterAction()`

+ 2020-04-21

    * npm 包 4.2.0 对模板系统进行了重构
    * View 类的 `getTemplate(view, callback)` 更名为 `getTemplateContent(view, callback)`
    * View 类的 `getTemplateFilePath(view)` 更名为 `findViewFile(view)`
    * 去除 View 类的 `getTemplateFromPath()`

+ 2020-04-11

    * npm 包 4.1.2 修复系统 Hook bug

+ 2020-04-03

    * npm 包 4.1.0 将 `Component` 的 `inject` 方法改名为 `injectBehaviors`
    * 对 rest 路由系统进行了重构

+ 2019-12-24

    * npm 包 4.0.0 移除了 `CandyJs.Candy` 属性

+ 2019-03-18

    * npm 包 3.1.4 优化代码 修改测试用例

+ 2019-02-25

    * npm 包 3.1.3 优化部分代码

+ 2018-09-27

    * npm 包 3.1.0 优化日志系统

+ 2018-08-20

    * npm 包 3.0.5 移除 candy/web/Request 类的 `setQueryString()` 方法

+ 2018-08-20

    * npm 包 3.0.3 项目增加组件测试用例

+ 2018-08-02

    * npm 包 3.0.2 项目中 `class` 配置项修改为 `classPath`

+ 2018-06-15

    * npm 包 3.0.0 更新了 web/Request 和 web/URL 两个类 web/URL 类中的大部分方法移动到了 web/Request 中

+ 2018-05-09

    * npm 包 2.0.0 重构 rest 模式

+ 2018-05-07

    * npm 包 1.2.3 优化代码

+ 2018-03-21

    * npm 包 1.2.0 修改 rest 模式不能正常运行 bug

+ 2018-03-15

    * npm 包 1.1.5 StringHelper.indexOfN() 方法名字修改为 StringHelper.nIndexOf()

+ 2018-03-02

    * npm 包 1.1.4 系统所用的事件变量从实例变量修改为静态变量

+ 2018-02-05

    * npm 包 1.1.3 日志生成文件 bug 修复

+ 2018-02-01

    * npm 包 1.1.2 日志部分重构

+ 2018-01-12

    * npm 包 1.1.1 修复部分 bug

+ 2018-01-12

    * npm 包 1.1.0 util/LinkedQueue 添加 `each()` 方法

+ 2018-01-11

    * npm 包 1.0.9 util/LinkedQueue 添加 `iterator()` 和 `remove(data)` 方法
