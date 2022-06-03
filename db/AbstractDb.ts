/**
 * @author afu
 * @license MIT
 */
import IDb from './IDb';

/**
 * 一主多从数据库入口
 */
export default abstract class AbstractDb implements IDb {

    public configurations: any;

    constructor(configurations: any) {
        this.configurations = configurations;
    }

    public abstract getMain(): any;

    public abstract getSlave(): any;

}
