const mysql = require('mysql2/promise');

const CandyJs = require('candyjs');
const Candy = require('candyjs/Candy');
const StringHelper = require('candyjs/helpers/StringHelper');

const Sql = require('../libs/Sql');

class IModel {
    constructor() {
        this.table = '';
    }

    /**
     * 获取 mysql 链接
     */
    async getConnection() {
        const conn = await mysql.createConnection({
            host: Candy.app.db.host,
            user: Candy.app.db.user,
            password: Candy.app.db.password,
            database: Candy.app.db.database
        });

        return conn;
    }

    /**
     * 后去记录数
     */
    async count(where = '1=1') {
        const conn = await this.getConnection();

        return conn.query(`SELECT count(id) as c FROM ${this.table} WHERE ${where}`)
            .then(([rows]) => {
                conn.end();

                return rows[0].c;

            }).catch((err) => {
                conn.end();
                CandyJs.getLogger().error(err);
                // console.log('syserror', err);
            });
    }

    /**
     * 插入一条记录
     * @param {Object} data 一个 map 对象
     */
    async insert(data) {
        const k = Object.keys(data);
        const v = Object.values(data);

        // insert into t(title, post_time) value(?, ?)
        const fields = k.join(',');
        let valuesHolder = '';
        for(let i=0,len=k.length; i<len; i++) {
            valuesHolder += '?,';
        }
        valuesHolder = StringHelper.rTrimChar(valuesHolder, ',');

        const conn = await this.getConnection();
        // insert into t(age) values(1);
        let sql = 'INSERT INTO ' + this.table + '('+ fields +') VALUES('+ valuesHolder +')';

        return conn.execute(sql, v).then(([rs]) => {
            conn.end();

            return rs.insertId;

        }).catch((err) => {
            conn.end();
            CandyJs.getLogger().error(err.message);
            // console.log('syserror', err);
        });
    }

    /**
     * 根据主键删除一条数据 软删除
     * @param {Number} pkid
     */
    async delete(pkid) {
        const sql = `UPDATE ${this.table} set status=2 where id=?`;
        const conn = await this.getConnection();

        return conn.execute(sql, [pkid]).then(( [rs] ) => {
            conn.end();

            return rs;

        }).catch((err) => {
            conn.end();
            CandyJs.getLogger().error(err.message);
        });
    }

    /**
     * 根据主键删除一条数据 软删除
     * @param {Number} pkid
     * @param {Object} data
     */
    async update(pkid, data) {
        const v = Object.values(data);
        v.push(pkid);

        let ret = '';
        for(let k in data) {
            ret = ret + k + '=?,';
        }
        ret = StringHelper.rTrimChar(ret, ',');

        const sql = `UPDATE ${this.table} set ${ret} where id=?`;
        const conn = await this.getConnection();

        return conn.execute(sql, v).then(( [rs] ) => {
            conn.end();

            return rs;

        }).catch((err) => {
            conn.end();
            CandyJs.getLogger().error(err.message);
        });
    }

    /**
     * 根据主键获取一条数据
     * @param {String} fields
     * @param {Number} pkid
     */
    async getOne(fields, pkid) {
        let sql = `SELECT ${fields} FROM ${this.table} WHERE id=?`;

        const conn = await this.getConnection();

        return conn.execute(sql, [pkid]).then(([rows]) => {
            conn.end();

            if(rows[0]) {
                return rows[0];
            }

            return null;

        }).catch((err) => {
            conn.end();
            CandyJs.getLogger().error(err.message);
            // console.log('syserror', err);
        });
    }

    /**
     * 根据条件获取列表
     *
     * @param {String} fields 字段
     * @param {String} condition 条件
     * @param {Number} limit 限制数量
     * @param {String} orderBy 排序
     * @return Promise
     */
    async getListByCondition(fields, condition, limit = '100', orderBy = '') {
        let sql = `SELECT ${fields} FROM ${this.table} WHERE ${condition} LIMIT ${limit}`;

        if('' !== orderBy) {
            sql = sql + ' ORDER BY ' + orderBy;
        }

        const conn = await this.getConnection();

        return conn.query(sql).then(([rows]) => {
            conn.end();

            return rows;

        }).catch((err) => {
            conn.end();
            CandyJs.getLogger().error(err);
            // console.log('syserror', err);
        });
    }

    /**
     * 分页获取数据
     * @param {String} fields
     * @param {String} where
     * @param {String} page
     * @param {String} pageSize
     */
    async getListByPage(fields, where, page, pageSize) {
        const limit = (page - 1) * pageSize;
        const sql = Sql.buildSelectSql(this.table, fields, where, limit, pageSize);

        const conn = await this.getConnection();

        return conn.query(sql).then(([rows]) => {
            conn.end();

            return rows;

        }).catch((err) => {
            conn.end();
            CandyJs.getLogger().error(err);
            // console.log('syserror', err);
        });
    }
}

module.exports = IModel;
