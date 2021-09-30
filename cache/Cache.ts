/**
 * @author afu
 * @license MIT
 */
import Candy = require('../Candy');
import InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 缓存入口
 */
class Cache {

    /**
     * @property {Map<String, Object>} _instances
     */
    static _instances: Map<string, any> = new Map();

    /**
     * @typedef {import('./AbstractCache')} AbstractCache
     * @return {AbstractCache}
     */
    static getCache(type: string): any {
        let app = Candy.app;

        if(undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }
        if(undefined === app.cache[type].classPath) {
            throw new InvalidConfigException('The classPath of cache configuration is not found');
        }

        if(!Cache._instances.has(type)) {
            Cache._instances.set(
                type,
                Candy.createObjectAsString(app.cache[type].classPath, app.cache[type])
            );

            Cache._instances.get(type).init();
        }

        return Cache._instances.get(type);
    }

}

export = Cache;
