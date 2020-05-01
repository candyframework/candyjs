/**
 * @author
 * @license MIT
 */
'use strict';

/**
 * 缓存接口层 所有缓存类都需要实现这个接口中定义的方法
 */
class ICache {

    /**
     * 进行初始化
     */
    init() {}

    /**
     * 同步写入缓存
     *
     * @param {String} key 缓存键
     * @param {String} value 缓存值
     * @param {Number} duration 缓存时间 毫秒
     */
    setSync(key, value, duration) {}

    /**
     * 写入缓存
     *
     * @param {String} key 缓存键
     * @param {String} value 缓存值
     * @param {Number} duration 缓存时间 毫秒
     * @param {Function} callback 回调
     */
    set(key, value, duration, callback) {}

    /**
     * 同步读取缓存
     *
     * @param {String} key 缓存键
     */
    getSync(key) {}

    /**
     * 读取缓存
     *
     * @param {String} key 缓存键
     * @param {Function} callback 回调
     */
    get(key, callback) {}

    /**
     * 同步删除缓存
     *
     * @param {String} key 缓存键
     */
    deleteSync(key) {}

    /**
     * 删除缓存
     *
     * @param {String} key 缓存键
     * @param {Function} callback 回调
     */
    delete(key, callback) {}

}

module.exports = ICache;
