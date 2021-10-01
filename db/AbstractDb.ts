/**
 * @author afu
 * @license MIT
 */
import AbstractCommand from './AbstractCommand';

/**
 * 一主多从数据库入口
 */
export default abstract class AbstractDb {

    public configurations: any;

    constructor(configurations: any) {
        this.configurations = configurations;
    }

    /**
     * 获取一个主库连接
     *
     * @returns {AbstractCommand}
     */
    public abstract getMain(): AbstractCommand;

    /**
     * 获取一个从库链接
     *
     * @returns {AbstractCommand}
     */
    public abstract getSlave(): AbstractCommand;

}
