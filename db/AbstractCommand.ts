/**
 * @author afu
 * @license MIT
 */
import ICommand from './ICommand';

import Event = require('../core/Event');

/**
 * 数据库操作基类
 */
export default abstract class AbstractCommand extends Event implements ICommand {

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

    public abstract prepareSql(sql: string): any;

    public abstract prepareStatement(sql: string): any;

    public abstract queryAll(): Promise<any>;

    public abstract queryOne(): Promise<any>;

    public abstract queryColumn(): Promise<string>;

    public abstract execute(): Promise<number>;

    public abstract close(): void;

    public abstract getLastSql(): string;

    public abstract beginTransaction(): any;

    public abstract commitTransaction(): any;

    public abstract rollbackTransaction(): any;

}
