/**
 * @author afu
 * @license MIT
 */

/**
 * 一主多从数据库接口
 */
export default interface IDb {

    /**
     * 获取一个主库连接
     */
    getMain(): any;

    /**
     * 获取一个从库链接
     */
    getSlave(): any;

}
