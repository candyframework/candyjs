## candyjs-db-interface

database interface

## 说明

尚未设计完成

此库是关系型数据库的接口层，设计该接口的目的是为了统一关系型数据库接口，使得切换数据库变得简单

我们打算将数据库设计成一主多从的架构，这样既可以满足小型公司需求，也可满足大型企业级需求

## 预想的使用方法如下 可能会随时变更

大致是所有查询使用 promise 返回，所有中间查询方法都是同步的

```
const db = await db.instance('master');

// 1. 使用 sql 操作数据库

// 增加
const command = db.prepareSql('INSERT INTO xxx(id, age) VALUES(1, 20)');
const rows = await command.execute();
const insertId = await command.getLastInsertId('id');

// 删除
const command = db.prepareSql('DELETE FROM xxx WHERE id = 1');
await command.execute();

// 修改
const command = db.prepareSql('UPDATE xxx SET age = 22 WHERE id = 1');
await command.execute();

// 查询所有
const command = db.prepareSql('SELECT age FROM xxx');
const arr = command.queryAll();

// 查询一条
const command = db.prepareSql('SELECT age FROM xxx WHERE id = 1');
const rs = command.queryOne();

// 查询单列
const command = db.prepareSql('SELECT count(id) FROM xxx');
const rs = command.queryColumn();


// 2. 使用预处理语句

// 增加
const command = db.prepareStatement('INSERT INTO xxx(id, age) VALUES(:id, :age)')
    .bindValues([':id': 1, ':age': 20]);
await command.execute();

const command = db.prepareStatement('INSERT INTO xxx(id, age) VALUES(?, ?)')
    .bindValues([1, 20]);
await command.execute();

// 删除
const command = db.prepareStatement('DELETE FROM xxx WHERE id = ?')
    .bindValues([1]);
await command.execute();

// 修改
const command = db.prepareStatement('UPDATE xxx SET age = ? WHERE id = ?')
    .bindValues([22, 1]);
await command.execute();

// 查询一条
const command = db.prepareStatement('SELECT age FROM xxx WHERE id = :id')
    .bindValue(':id', 1);
await command.queryOne();


// 3. 使用查询生成器 只能执行查询操作

// 查询所有 select id, age from xxx
const query = db.createQuery()->select('id, age')->from('xxx');
await query.getAll();

// 查询一条
await db.createQuery().select('id, age').from('xxx').where('id = ?', [1]).getOne();
await db.createQuery().select('id, age').from('xxx').where('id = :id', [':id': 1]).getOne();

// 查询单列
await db.createQuery().select('age').from('xxx').where('id = 1').getColumn();

// 统计
await db.createQuery().from('xxx').where('id > 2').count('id');
```
