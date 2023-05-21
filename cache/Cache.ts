/**
 * @author afu
 * @license MIT
 */
import ICache from './ICache';

import Candy = require('../Candy');
import ServiceLocator = require('../ioc/ServiceLocator');
import InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 缓存入口
 */
class Cache {

    /**
     * 实例
     */
    private static caches: ServiceLocator = new ServiceLocator();

    /**
     * 获取缓存对象
     */
    static getCache(type: string): ICache {
        let app = Candy.app;

        if(undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }

        if(!Cache.caches.hasService(type)) {
            Cache.caches.setService(
                type,
                Candy.createObjectAsDefinition(app.cache[type], app)
            );
            Cache.caches.getService(type).init();
        }

        return Cache.caches.getService(type);
    }

}

export = Cache;
