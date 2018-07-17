# 一个面向对象的高效 node.js mvc and REST 框架。CandyJs 不是第三方框架的扩展，而是一个全新的框架。

### 为什么写 candyjs

解决一个问题的思路有多种，没有最好的，只有合适的。

candyjs 由一个个人项目发展而来，最早写于 2017 年。
node 使用 npm 管理依赖包，这很方便，但是也有很多问题，依赖太复杂，代码跟踪复杂等。
设计框架之初，我们一直在想能不能换一种组织代码的思路，而不是通过一个个零碎的依赖包来构建我们的应用，
基于此 candyjs 采用了一套基于别名的类的加载模式，架构上尽量减少了 npm 包的管理。

candyjs 使用了面向对象的技术，原因如下：

1. 面向对象的代码比函数式编程结构更清晰，便于维护。

2. 软件开发过程中在编译期间发现错误要远比在运行期间发现错误要好得多，
这种机制在强类型语言中已经做的比较好，
js 的一些超集的实现 (eg. typescript) 也可以让 js 拥有强类型特性，
在构建强类型语言上面向对象语言比函数式编程更合适。

###### Node 版本

+ 大于等于 6.0.0

###### 变更

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

    * npm 包 1.1.0 util/LinkedQueue 添加 ```each()``` 方法

+ 2018-01-11

    * npm 包 1.0.9 util/LinkedQueue 添加 ```iterator()``` 和 ```remove(data)``` 方法

###### 网站

+ http://candyjs.org

+ https://douyu-beijing.github.io/candyjs-guide

###### 源码 source code

+ https://github.com/douyu-beijing/candyjs

###### 系统内置别名

+ @candy  系统目录
+ @app  项目目录 由 appPath 指定 ```CandyJs.Candy.app.getAppPath()``` 可得到该值
+ @runtime  缓存目录 默认指向 @app/runtime ```CandyJs.Candy.app.getRuntimePath()``` 可得到该值
+ @root  网站根目录 ```CandyJs.Candy.app.getRootPath()``` 可得到该值

###### 项目目录示例

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
|      |   |-- IndexController.js  - host:port/user/index 可以访问到该类
|      |   |-- OtherController.js  - host:port/user/other 可以访问到该类
|      |
|      |-- goods 商品组目录
|      |   |
|      |   |-- IndexController.js  - host:port/goods/index 可以访问到该类
|      |   |-- OtherController.js  - host:port/goods/other 可以访问到该类
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
|      |-- reg
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
