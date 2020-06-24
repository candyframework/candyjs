/**
 * @author afu
 * @license MIT
 */
import AbstractCommand from './AbstractCommand';

/**
 * 一主多从数据库入口
 *
 * ```
 * const conf = {
 *      'master': {
 *          'host': HOST,
 *          'database': DBNAME,
 *          'username': '',
 *          'password': ''
 *      },
 *
 *      'slaves': [
 *          { 'host': HOST, 'database': DBNAME, 'username': '', 'password': '' },
 *          { 'host': HOST, 'database': DBNAME, 'username': '', 'password': '' }
 *      ]
 * };
 *
 * const db = new Db(conf);
 * const master = db.getMaster();
 * ```
 */
export default abstract class Db {
    public configurations: any;

    constructor(configurations: any) {
        this.configurations = configurations;
    }

    /**
     * 获取一个主库连接
     *
     * @returns {AbstractCommand}
     */
    public abstract getMaster(): AbstractCommand;

    /**
     * 获取一个从库链接
     *
     * @returns {AbstractCommand}
     */
    public abstract getSlave(): AbstractCommand;
}
