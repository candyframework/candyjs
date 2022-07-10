/**
 * @author afu
 * @license MIT
 */
import AbstractCache = require('./AbstractCache');

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
    private static serviceLocator: ServiceLocator = new ServiceLocator();

    /**
     * 获取缓存对象
     */
    static getCache(type: string): AbstractCache {
        let app = Candy.app;

        if(undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }

        if(!Cache.serviceLocator.hasService(type)) {
            Cache.serviceLocator.setService(
                type,
                Candy.createObjectAsDefinition(app.cache[type], app)
            );
            Cache.serviceLocator.getService(type).init();
        }

        return Cache.serviceLocator.getService(type);
    }

}

export = Cache;
