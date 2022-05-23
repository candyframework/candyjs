/**
 * @author afu
 * @license MIT
 */
import AbstractCache = require('./AbstractCache');

import Candy = require('../Candy');
import InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 缓存入口
 */
class Cache {

    /**
     * 实例
     */
    private static instances: Map<string, AbstractCache> = new Map();

    /**
     * 获取缓存对象
     */
    static getCache(type: string): AbstractCache {
        let app = Candy.app;

        if(undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }
        if(undefined === app.cache[type].classPath) {
            throw new InvalidConfigException('The "classPath" configuration of the cache is missing');
        }

        if(!Cache.instances.has(type)) {
            Cache.instances.set(type, Candy.createObjectAsDefinition(app.cache[type], app));
            Cache.instances.get(type).init();
        }

        return Cache.instances.get(type);
    }

}

export = Cache;
