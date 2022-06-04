/**
 * @author afu
 * @license MIT
 */

/**
 * SQL 查询生成器接口层
 */
export default interface IQuery {

    /**
     * Executes the query and returns a single column of row
     *
     * @returns {Promise} 结果集的第一行第一列记录 如果没有记录则返回 null
     */
    getColumn(): Promise<string>;

    /**
     * Executes the query and returns a single row of result
     *
     * @returns {Promise} 结果集的第一行记录 没有记录时返回 null
     */
    getOne(): Promise<any>;

    /**
     * Executes the query and returns all results as an array
     *
     * @returns {Promise} 包含所有结果的数组 如果没有记录则返回一个空数组
     */
    getAll(): Promise<any>;

    /**
     * Returns the number of records
     *
     * @param {String} column
     * @returns {Promise}
     */
    count(column: string): Promise<number>;

    /**
     * Set the columns to select
     *
     * @param {String} columns
     */
    select(columns: string): IQuery;

    /**
     * Set the target to select
     *
     * @param {String} table
     */
    from(table: string): IQuery;

    /**
     * Sets the WHERE condition of a query
     *
     * @param {String} condition
     * @param {Array} parameters
     */
    where(condition: string, parameters: any[]): IQuery;

    /**
     * 分组
     *
     * @param {String} column
     */
    groupBy(column: string): IQuery;

    /**
     * 筛选
     *
     * @param {String} condition
     */
    having(condition: string): IQuery;

    /**
     * Sets the ORDER BY condition of a query
     *
     * @param {String} columns
     */
    orderBy(columns: string): IQuery;

}
