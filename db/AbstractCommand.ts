/**
 * @author afu
 * @license MIT
 */
import Event from '../core/Event';

/**
 * 数据库操作基类
 */
export default abstract class AbstractCommand extends Event {
    /**
     * @property {String} EVENT_BEFORE_QUERY
     */
    public static EVENT_BEFORE_QUERY = 'beforeQuery';

    /**
     * @property {String} EVENT_AFTER_QUERY
     */
    public static EVENT_AFTER_QUERY = 'afterQuery';

    /**
     * @property {String} EVENT_BEFORE_EXECUTE
     */
    public static EVENT_BEFORE_EXECUTE = 'beforeExecute';

    /**
     * @property {String} EVENT_AFTER_EXECUTE
     */
    public static EVENT_AFTER_EXECUTE = 'afterExecute';

    /**
     * 初始化操作
     */
    public abstract initConnection(configuration: any): void;

    /**
     * Create QueryBuilder
     */
    public abstract createQuery(): any;

    /**
     * Prepares a sql for execution
     *
     * @param {String} sql
     */
    public abstract prepareSql(sql: string): this;

    /**
     * Prepares a sql statement for execution
     *
     * @param {String} sql
     */
    public abstract prepareStatement(sql: string): this;

    /**
     * 绑定一个参数 只能用于绑定命名参数
     *
     * 预留接口
     *
     * @param {String} parameter
     * @param {String} value
     */
    // public abstract bindValue(parameter: string, value: string): this;

    /**
     * 绑定多个参数 用于绑定占位符参数
     *
     * @param {Array} parameters
     */
    public abstract bindValues(parameter: any[]): this;

    /**
     * Executes the query and returns all results as an array
     *
     * @return {Promise} 包含所有结果的数组 如果没有记录则返回一个空数组
     */
    public abstract queryAll(): Promise<any>;

    /**
     * Executes the query and returns a single row of result
     *
     * @return {Promise} 结果集的第一行记录 没有记录时返回 null
     */
    public abstract queryOne(): Promise<any>;

    /**
     * Executes the query and returns a single column of row
     *
     * 预留接口
     *
     * @return {Promise} 结果集的第一行第一列记录 如果没有记录则返回 null
     */
    // public abstract queryColumn(): Promise<string>;

    /**
     * 执行 sql 修改语句
     *
     * @return {Promise} 影响行数
     */
    public abstract execute(): Promise<number>;

    /**
     * 关闭数据库连接
     */
    public abstract close(): void;

    /**
     * 获取上一次执行的 sql 语句
     *
     * @return {String}
     */
    public abstract getLastSql(): string;

    /**
     * 开启事务
     *
     * 预留接口
     *
     * @return {Boolean}
     */
    // public abstract beginTransaction(): boolean;

    /**
     * 提交事务
     *
     * 预留接口
     *
     * @return {Boolean}
     */
    // public abstract commitTransaction(): boolean;

    /**
     * 回滚事务
     *
     * 预留接口
     *
     * @return {Boolean}
     */
    // public abstract rollbackTransaction(): boolean;
}
