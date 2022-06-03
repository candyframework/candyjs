/**
 * @author afu
 * @license MIT
 */

/**
 * 数据库操作接口层
 */
export default interface ICommand {

    /**
     * 初始化操作
     */
    initConnection(configuration: any): void;

    /**
     * Prepares a sql for execution
     *
     * @param {String} sql
     */
    prepareSql(sql: string): any;

    /**
     * Prepares a sql statement for execution
     *
     * @param {String} sql
     */
    prepareStatement(sql: string): any;

    /**
     * Executes the query and returns all results as an array
     *
     * @returns {Promise} 包含所有结果的数组 如果没有记录则返回一个空数组
     */
    queryAll(): Promise<any>;

    /**
     * Executes the query and returns a single row of result
     *
     * @returns {Promise} 结果集的第一行记录 没有记录时返回 null
     */
    queryOne(): Promise<any>;

    /**
     * Executes the query and returns a single column of row
     *
     * @returns {Promise} 结果集的第一行第一列记录 如果没有记录则返回 null
     */
    queryColumn(): Promise<string>;

    /**
     * 执行 sql 修改语句
     *
     * @returns {Promise} 影响行数
     */
    execute(): Promise<number>;

    /**
     * 关闭数据库连接
     */
    close(): void;

    /**
     * 获取上一次执行的 sql 语句
     *
     * @returns {String}
     */
    getLastSql(): string;

    /**
     * 开启事务
     *
     * @returns {any}
     */
    beginTransaction(): any;

    /**
     * 提交事务
     *
     * @returns {any}
     */
    commitTransaction(): any;

    /**
     * 回滚事务
     *
     * @returns {any}
     */
    rollbackTransaction(): any;

}
