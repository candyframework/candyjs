/**
 * @author afu
 * @license MIT
 */
import IQuery from './IQuery';

/**
 * SQL 查询生成器抽象层
 *
 * 子类应该继承该类并实现该类的抽象方法
 */
export default abstract class AbstractQuery implements IQuery {

    /**
     * the columns being selected
     */
    public $select: string = '';

    /**
     * the table to be selected from
     */
    public $from: string = '';

    /**
     * the condition of a query
     */
    public $where: string = '';

    /**
     * the column of group by
     */
    public $groupBy: string = '';

    /**
     * the condition of a query
     */
    public $having: string = '';

    /**
     * the sort condition
     */
    public $orderBy: string = '';

    /**
     * list of query parameter values
     */
    public $parameters: any[] = [];

    constructor() {}

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

    public abstract getColumn(): Promise<string>;

    public abstract getOne(): Promise<any>;

    public abstract getAll(): Promise<any>;

    public abstract count(column: string): Promise<number>;

    public abstract select(columns: string): AbstractQuery;

    public abstract from(table: string): AbstractQuery;

    public abstract where(condition: string, parameters: any[]): AbstractQuery;

    public abstract groupBy(column: string): AbstractQuery;

    public abstract having(condition: string): AbstractQuery;

    public abstract orderBy(columns: string): AbstractQuery;

}
