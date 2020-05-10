# api_mvc

本示例演示了使用 mvc 模式处理接口请求，并假设我们在如下表结构下做操作

```
CREATE TABLE `t_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL DEFAULT '0',
  `title` varchar(200) NOT NULL DEFAULT '',
  `content` text,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态 1 正常 2 删除',
  `post_time` int(11) NOT NULL DEFAULT '0',
  `update_time` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

```

### 安装依赖

```
npm install
```

### 运行

```
// on windows:
node index.js

// on linux:
nohup node index.js &
```
