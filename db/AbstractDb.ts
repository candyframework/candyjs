/**
 * @author afu
 * @license MIT
 */

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
     */
    public abstract getMain(): any;

    /**
     * 获取一个从库链接
     */
    public abstract getSlave(): any;

}
