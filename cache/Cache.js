"use strict";
/**
 * @author afu
 * @license MIT
 */
const Candy = require("../Candy");
const InvalidConfigException = require("../core/InvalidConfigException");
const InvalidArgumentException = require("../core/InvalidArgumentException");
/**
 * 缓存入口
 */
class Cache {
    /**
     * @typedef {import('./AbstractCache')} AbstractCache
     * @return {AbstractCache}
     */
    static getCache(cacheFlag) {
        const app = Candy.app;
        if (undefined === cacheFlag) {
            throw new InvalidArgumentException('An argument must be provide for getCache()');
        }
        if (undefined === app.cache || undefined === app.cache[cacheFlag]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }
        if (undefined === app.cache[cacheFlag].classPath) {
            throw new InvalidConfigException('The classPath of cache configuration is not found');
        }
        if (undefined === Cache._caches[cacheFlag] || null === Cache._caches[cacheFlag]) {
            Cache._caches[cacheFlag] = Candy.createObjectAsString(app.cache[cacheFlag].classPath, app.cache[cacheFlag]);
            Cache._caches[cacheFlag].init();
        }
        return Cache._caches[cacheFlag];
    }
}
/**
 * @property {Map<String, Object>} _caches
 */
Cache._caches = {};
module.exports = Cache;
