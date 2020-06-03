/**
 * @author afu
 * @license MIT
 */
import AbstractQuery from './AbstractQuery';

 /**
  * 数据库操作基类
  */
export default abstract class AbstractCommand {
    public static EVENT_BEFORE_QUERY = 1
    public static EVENT_AFTER_QUERY = 2;
    public static EVENT_BEFORE_EXECUTE = 3;
    public static EVENT_AFTER_EXECUTE = 4;;

    /**
     * Create QueryBuilder
     */
    public abstract createQuery(): AbstractQuery;

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
     * @param {String} parameter
     * @param {String} value
     */
    public abstract bindValue(parameter: string, value: string): this;

    /**
     * 绑定多个参数 可以用于绑定命名参数和占位符参数
     *
     * @param {any} parameters
     */
    public abstract bindValues(parameter: any): this;

    /**
     * 获取所有数据
     *
     * @return {Promise} 包含所有结果的数组 如果没有记录则返回一个空数组
     */
    public abstract queryAll(): Promise<any>;

    /**
     * 获取一条数据
     *
     * @return {Promise}} 结果集的第一行记录 没有记录时返回 null
     */
    public abstract queryOne(): Promise<any>;

    /**
     * 获取单独一列的值
     *
     * @return {Promise} 结果集的第一行第一列记录 如果没有记录则返回 null
     */
    public abstract queryColumn(): Promise<string>;

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
     * 获取最后插入的数据的 ID
     */
    public abstract getLastInsertId(): number;

    /**
     * 获取执行的 sql 语句
     *
     * @return {String}
     */
    public abstract getLastSql(): string;

    /**
     * 开启事务
     *
     * @return {Boolean}
     */
    public abstract beginTransaction(): boolean;

    /**
     * 提交事务
     *
     * @return {Boolean}
     */
    public abstract commitTransaction(): boolean;

    /**
     * 回滚事务
     *
     * @return {Boolean}
     */
    public abstract rollbackTransaction(): boolean;
}
