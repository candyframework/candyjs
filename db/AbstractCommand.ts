/**
 * @author afu
 * @license MIT
 */
import Event = require('../core/Event');

/**
 * 数据库操作基类
 */
export default abstract class AbstractCommand extends Event {

    /**
     * EVENT_BEFORE_QUERY
     */
    public static EVENT_BEFORE_QUERY = 'beforeQuery';

    /**
     * EVENT_AFTER_QUERY
     */
    public static EVENT_AFTER_QUERY = 'afterQuery';

    /**
     * EVENT_BEFORE_EXECUTE
     */
    public static EVENT_BEFORE_EXECUTE = 'beforeExecute';

    /**
     * EVENT_AFTER_EXECUTE
     */
    public static EVENT_AFTER_EXECUTE = 'afterExecute';

    constructor() {
        super();
    }

    /**
     * 初始化操作
     */
    public initConnection(configuration: any): void {}

    /**
     * Prepares a sql for execution
     *
     * @param {String} sql
     */
    public abstract prepareSql(sql: string): any;

    /**
     * Prepares a sql statement for execution
     *
     * @param {String} sql
     */
    public abstract prepareStatement(sql: string): any;

    /**
     * Executes the query and returns all results as an array
     *
     * @returns {Promise} 包含所有结果的数组 如果没有记录则返回一个空数组
     */
    public abstract queryAll(): Promise<any>;

    /**
     * Executes the query and returns a single row of result
     *
     * @returns {Promise} 结果集的第一行记录 没有记录时返回 null
     */
    public abstract queryOne(): Promise<any>;

    /**
     * Executes the query and returns a single column of row
     *
     * @returns {Promise} 结果集的第一行第一列记录 如果没有记录则返回 null
     */
    public abstract queryColumn(): Promise<string>;

    /**
     * 执行 sql 修改语句
     *
     * @returns {Promise} 影响行数
     */
    public abstract execute(): Promise<number>;

    /**
     * 关闭数据库连接
     */
    public abstract close(): void;

    /**
     * 获取上一次执行的 sql 语句
     *
     * @returns {String}
     */
    public abstract getLastSql(): string;

    /**
     * 开启事务
     *
     * @returns {any}
     */
    public abstract beginTransaction(): any;

    /**
     * 提交事务
     *
     * @returns {any}
     */
    public abstract commitTransaction(): any;

    /**
     * 回滚事务
     *
     * @returns {any}
     */
    public abstract rollbackTransaction(): any;

}
