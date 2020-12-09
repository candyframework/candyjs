/**
 * @author afu
 * @license MIT
 */

/**
 * 缓存接口层 所有缓存类都需要实现这个接口中定义的方法
 */
export default interface ICache {

    /**
     * 同步写入缓存
     *
     * @param {String} key 缓存键
     * @param {String} value 缓存值
     * @param {Number} duration 缓存时间 毫秒
     */
    setSync(key: string, value: string, duration: number): void;

    /**
     * 异步写入缓存
     *
     * @param {String} key 缓存键
     * @param {String} value 缓存值
     * @param {Number} duration 缓存时间 毫秒
     * @return {Promise}
     * @throws {Error}
     */
    set(key: string, value: string, duration: number): Promise<any>;

    /**
     * 同步读取缓存
     *
     * @param {String} key 缓存键
     * @return {String}
     */
    getSync(key: string): string;

    /**
     * 异步读取缓存
     *
     * @param {String} key 缓存键
     * @return {Promise}
     * @throws {Error}
     */
    get(key: string): Promise<any>;

    /**
     * 同步删除缓存
     *
     * @param {String} key 缓存键
     */
    deleteSync(key: string): void;

    /**
     * 异步删除缓存
     *
     * @param {String} key 缓存键
     * @return {Promise}
     * @throws {Error}
     */
    delete(key: string): Promise<any>;

}
