/**
 * @author afu
 * @license MIT
 */

/**
 * Statement 接口
 */
export default interface IStatement {

    /**
     * 绑定一个参数 只能用于绑定命名参数
     *
     * @param {String} parameter
     * @param {String} value
     */
    bindValue(parameter: string, value: string): any;

    /**
     * 绑定多个参数 用于绑定占位符参数
     *
     * @param {Array} parameters
     */
    bindValues(parameter: any[]): any;

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

}
