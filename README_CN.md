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

+ doc https://candyframework.github.io/candyjs-guide

+ examples https://gitee.com/candyjs/candyjs-examples

+ examples https://github.com/candyframework/candyjs-examples

### Node 版本

nodejs >= 10.0

### 快速开始

可以使用 cli 工具快速搭建一个示例项目

```bash
# 安装依赖
npm install -g @candyjs/cli

# 运行命令 根据提示进行操作
candyjs-cli
```

### Hello world

使用 CandyJs 只需要从一个入口文件开始，许多配置都会出现在这里，如下

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

+ @candy 代表 Candy.ts 所在的框架目录

+ @app 代表项目文件所在的目录

+ @runtime 缓存目录 默认指向 @app/runtime

### 项目目录示例

<pre>
|- index.ts 入口文件
|
|- node_modules 依赖目录
|
|- public 静态资源目录
|
|- app 项目目录
|  |
|  |-- controllers 控制器目录
|      |
|      |-- user 用户相关
|      |   |
|      |   |-- IndexController.ts
|      |   |-- OtherController.ts
|      |
|      |-- goods 商品相关
|      |   |
|      |   |-- IndexController.ts
|      |   |-- OtherController.ts
|      |
|   -- views 模板目录
|      |
|      |-- user 用户模板
|      |   |
|      |   |-- index.html
|      |   |-- other.html
|      |
|   -- goods 商品模板
|      |   |
|      |   |-- index.html
|      |   |-- other.html
|      |
|   -- modules 模块
|      |
|      |-- actives 某种活动模块
|      |   |
|      |   |-- controllers 模块控制器目录 其下无子目录
|      |   |   |
|      |   |   |-- IndexController.ts
|      |   |
|      |   |-- views 模块模板目录
|      |   |   |
|      |   |   |-- index.html
|      |   |
|      |
|   -- runtime 缓存目录
|
</pre>

### 思想来源

本程序借鉴了许多开源软件的架构思想，正是有这些优秀的开源作品，才有了本程序

+ `express` 本程序的 rest 格式路由以及中间件想法的来源

+ `ThinkPHP` 与 `Struts` 本程序多数思想来源于 tp 与 struts 框架

+ `JavaEE` 一些设计思想被引入本程序
