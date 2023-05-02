# 一个面向对象的高效 Node.js MVC and REST 框架

[![NPM version](https://img.shields.io/npm/v/candyjs.svg?style=flat-square)](https://www.npmjs.com/package/candyjs)
[![Test coverage](https://img.shields.io/codecov/c/github/candyframework/candyjs.svg?style=flat-square)](https://app.codecov.io/gh/candyframework/candyjs)


CandyJs 并非基于第三方框架扩展，而是一个新的框架。

### 为什么是 CandyJs

+ CandyJs 实现了 MVC (Model-View-Controller) 模式并基于该模式组织代码

+ CandyJs 实现了自动路由映射

+ CandyJs 高可扩展和高可配置

+ CandyJs 的代码简约而不简单，每一个 api 、配置参数名字都是经过深思熟虑决定的，这是它的编程哲学

+ CandyJs 采用 MIT 许可 这意味着您可以免费的使用 CandyJs 来开发 WEB 应用

+ 良好的 TypeScript 开发体验

### 文档

+ 最新文档请参阅源码的 doc 目录

+ doc https://candyframework.github.io/candyjs-guide

+ examples https://gitee.com/candyjs/candyjs-examples

+ examples https://github.com/candyframework/candyjs-examples

### Node 版本

由于 `candy/http/Request` 类使用了全局 `URL` 类，所以需要 nodejs 10.0 及以上版本

### 快速开始

可以使用 cli 工具快速搭建一个示例项目

```bash
# 安装依赖
npm install -g @candyjs/cli

# 运行命令 根据提示进行操作
candyjs-cli
```

### Hello world

使用 CandyJs 你只需要从一个入口文件开始

初始项目可以利用 `bin/_candy` 命令或者 `@candyjs/cli` 工具生成

```javascript
// 入口文件 index.ts
import '@candyjs/tswrapper';

import CandyJs from 'candyjs';
import App from 'candyjs/web/Application';

new CandyJs(new App({
    'id': 1,

    // 定义调试应用
    'debug': true,

    // 定义应用路径
    'appPath': __dirname + '/app'

})).listen(2333, () => {
    console.log('listen on 2333');
});
```

### 系统内置别名

+ @candy  框架目录

+ @app  项目目录 由 appPath 指定 `Candy.app.getAppPath()` 可得到该值

+ @runtime  缓存目录 默认指向 @app/runtime `Candy.app.getRuntimePath()` 可得到该值

### 项目目录规范示例

<pre>
|- index.ts
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
|      |   |-- IndexController.ts
|      |   |-- OtherController.ts
|      |
|      |-- goods 商品组目录
|      |   |
|      |   |-- IndexController.ts
|      |   |-- OtherController.ts
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
|      |   |   |-- IndexController.ts
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

### 思想来源

本程序借鉴了许多开源软件的架构思想，正是有这些优秀的开源作品，才有了本程序

+ `express` 本程序的 rest 格式路由以及中间件想法的来源

+ `ThinkPHP` 与 `Struts` 本程序多数思想来源于 tp 与 struts 框架

+ `JavaEE` 一些设计思想被引入本程序

### 变更

+ 2023-2

    * 4.18 变更

    * 新增过滤器

    * 修改 `core/ActionFilter` 名字为 `core/ActionAspect`

    * 删除 `Component#attachBehaviors()` 方法 使用 `Component#attachBehavior()` 代替

    * 删除 `Component#detachBehaviors()` 方法 使用 `Component#detachBehavior()` 代替

+ 2023-01-26

    * 4.17.2 对 `core/Application core/View core/Controller` 抽象类进行了重命名

+ 2022-11-16

    * 4.17.0 重构 I18N

+ 2022-09-22

    * 4.16.0 优化 http 工具包

+ 2022-05-12

    * 4.14.0 删除 `candy/midwares/Resource#serve()` 替换为静态方法 `candy/midwares/Resource.serve(directory, options)`

+ 2022-05-07

    * 4.13.0 移动 `candy/model/*Validator` 到 `candy/model/validators/*Validator`

+ 2022-04-29

    * 4.12.0

    * 移除 `Application#getRootPath()` 与 `Application#setRootPath()`

    * 移除 `Logger.newInstance(settings)` 方法

    * 移除 `CandyJs.getLogger(app)` 方法

    * 移动 `candy/i18n/Translator` 到 `candy/i18n/file/Translator`

+ 2022-04-21

    * 4.11.5 优化代码

+ 2022-04-15

    * 4.11.4 优化代码

+ 2022-02-23

    * 4.10.3 修改了 `handlerException(exception, res)` 参数位置

+ 2022-02-18

    * 4.10.2 发布

    * 移除了 `candy/web/Request#getCookie()` 增加了 `candy/web/Request#getCookies()`

    * 修改 `candy/web/Request#getReferer()` 函数名为 `candy/web/Request#getReferrer()`

    * 删除了 `Candyjs#getI18N()` 方法

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
