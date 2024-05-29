/**
 * @author afu
 * @license MIT
 */
import IDb from './IDb';
import AbstractCommand from './AbstractCommand';

/**
 * 一主多从数据库入口
 */
export default abstract class AbstractDb implements IDb {

    public configurations: any;

    constructor(configurations: any) {
        this.configurations = configurations;
    }

    public abstract getMain(): AbstractCommand;

    public abstract getSlave(): AbstractCommand;

}
