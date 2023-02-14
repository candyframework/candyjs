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

    /**
     * @inheritdoc
     */
    public abstract prepareSql(sql: string): any;

    /**
     * @inheritdoc
     */
    public abstract prepareStatement(sql: string): any;

    /**
     * @inheritdoc
     */
    public abstract queryAll(): Promise<any>;

    /**
     * @inheritdoc
     */
    public abstract queryOne(): Promise<any>;

    /**
     * @inheritdoc
     */
    public abstract queryColumn(): Promise<string>;

    /**
     * @inheritdoc
     */
    public abstract execute(): Promise<number>;

    /**
     * @inheritdoc
     */
    public abstract close(): void;

    /**
     * @inheritdoc
     */
    public abstract getLastSql(): string;

    /**
     * @inheritdoc
     */
    public abstract beginTransaction(): any;

    /**
     * @inheritdoc
     */
    public abstract commitTransaction(): any;

    /**
     * @inheritdoc
     */
    public abstract rollbackTransaction(): any;

}
