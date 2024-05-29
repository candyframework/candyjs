/**
 * @author afu
 * @license MIT
 */
import ICommand from './ICommand';

/**
 * 一主多从数据库接口
 */
export default interface IDb {

    /**
     * 获取一个主库连接
     */
    getMain(): ICommand;

    /**
     * 获取一个从库链接
     */
    getSlave(): ICommand;

}
