/**
 * @author afu
 * @license MIT
 */
import IStatement from './IStatement';

/**
 * 数据库操作接口层
 */
export default interface ICommand {

    /**
     * Initialization operation
     */
    initConnection(configuration: any): void;

    /**
     * Prepares a sql for execution
     *
     * @param {String} sql
     */
    prepareSql(sql: string): ICommand;

    /**
     * Prepares a sql statement for execution
     *
     * @param {String} sql
     */
    prepareStatement(sql: string): IStatement;

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
     * Execute the modification query and returns the number of affected rows
     *
     * @returns {Promise} 影响行数
     */
    execute(): Promise<number>;

    /**
     * Close db connection
     */
    close(): void;

    /**
     * Get the last executed SQL
     *
     * @returns {String}
     */
    getLastSql(): string;

    /**
     * Begin a transaction
     *
     * @returns {any}
     */
    beginTransaction(): any;

    /**
     * Commit transaction
     *
     * @returns {any}
     */
    commitTransaction(): any;

    /**
     * Rollback transaction
     *
     * @returns {any}
     */
    rollbackTransaction(): any;

}
