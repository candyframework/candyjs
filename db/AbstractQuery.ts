/**
 * @author afu
 * @license MIT
 */

/**
 * SQL 查询生成器抽象层
 *
 * 子类应该继承该类并实现该类的抽象方法
 */
export default abstract class AbstractQuery {
    /**
     * @property {String} $select the columns being selected
     */
    public $select = '';

    /**
     * @property {String} $from the table to be selected from
     */
    public $from = '';

    /**
     * @property {String} $where the condition of a query
     */
    public $where = '';

    /**
     *  @property {String} $groupBy the column of group by
     */
    public $groupBy = '';

    /**
     *  @property {String} $having the condition of a query
     */
    public $having = '';

    /**
     *  @property {String} $orderBy the sort condition
     */
    public $orderBy = '';

    /**
     * @property {Map} $options other sql information
     */
    public $options = new Map();

    /**
     * @property {Array} $parameters list of query parameter values
     */
    public $parameters = [];

    /**
     * Set parameters
     *
     * @param {Array} parameters
     */
    public addParameters(parameters: any[]): void {
        for(let name of parameters) {
            this.$parameters.push(name);
        }
    }

    /**
     * Executes the query and returns a single column of row
     *
     * 预留接口
     *
     * @returns {Promise} 结果集的第一行第一列记录 如果没有记录则返回 null
     */
    // public abstract getColumn(): Promise<string>;

    /**
     * Executes the query and returns a single row of result
     *
     * @returns {Promise} 结果集的第一行记录 没有记录时返回 null
     */
    public abstract getOne(): Promise<any>;

    /**
     * Executes the query and returns all results as an array
     *
     * @returns {Promise} 包含所有结果的数组 如果没有记录则返回一个空数组
     */
    public abstract getAll(): Promise<any>;

    /**
     * Returns the number of records
     *
     * @param {String} column
     * @returns {Promise}
     */
    public abstract count(column: string): Promise<number>;

    /**
     * Set the columns to select
     *
     * @param {String} columns
     */
    public abstract select(columns: string): this;

    /**
     * Set the target to select
     *
     * @param {String} table
     */
    public abstract from(table: string): this;

    /**
     * Sets the WHERE condition of a query
     *
     * @param {String} condition
     * @param {Array} parameters
     */
    public abstract where(condition: string, parameters: any[]): this;

    /**
     * 分组
     *
     * @param {String} column
     */
    public abstract groupBy(column: string): this;

    /**
     * 筛选
     *
     * @param {String} condition
     */
    public abstract having(condition: string): this;

    /**
     * Sets the ORDER BY condition of a query
     *
     * @param {String} columns
     */
    public abstract orderBy(columns: string): this;
}
