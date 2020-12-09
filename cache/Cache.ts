/**
 * @author afu
 * @license MIT
 */
import Candy = require('../Candy');
import InvalidConfigException = require('../core/InvalidConfigException');
import InvalidArgumentException = require('../core/InvalidArgumentException');
import AbstractCache = require('./AbstractCache');

/**
 * 缓存入口
 */
class Cache {

    /**
     * @property {Map<String, Object>} _caches
     */
    static _caches: any = {};

    /**
     * @typedef {import('./AbstractCache')} AbstractCache
     * @return {AbstractCache}
     */
    static getCache(cacheFlag): AbstractCache {
        const app: any = Candy.app;

        if(undefined === cacheFlag) {
            throw new InvalidArgumentException('An argument must be provide for getCache()');
        }
        if(undefined === app.cache || undefined === app.cache[cacheFlag]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }
        if(undefined === app.cache[cacheFlag].classPath) {
            throw new InvalidConfigException('The classPath of cache configuration is not found');
        }

        if(undefined === Cache._caches[cacheFlag] || null === Cache._caches[cacheFlag]) {
            Cache._caches[cacheFlag] = Candy.createObjectAsString(
                app.cache[cacheFlag].classPath,
                app.cache[cacheFlag]);

            Cache._caches[cacheFlag].init();
        }

        return Cache._caches[cacheFlag];
    }

}
export = Cache;
