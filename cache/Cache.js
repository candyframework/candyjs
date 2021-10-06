"use strict";
/**
 * @author afu
 * @license MIT
 */
const Candy = require("../Candy");
const InvalidConfigException = require("../core/InvalidConfigException");
/**
 * 缓存入口
 */
class Cache {
    /**
     * @typedef {import('./AbstractCache')} AbstractCache
     * @return {AbstractCache}
     * @throws {InvalidConfigException}
     */
    static getCache(type) {
        let app = Candy.app;
        if (undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }
        if (undefined === app.cache[type].classPath) {
            throw new InvalidConfigException('The "classPath" configuration of the cache is missing');
        }
        if (!Cache._instances.has(type)) {
            Cache._instances.set(type, Candy.createObjectAsDefinition(app.cache[type]));
            Cache._instances.get(type).init();
        }
        return Cache._instances.get(type);
    }
}
/**
 * @type {Map<String, any>}
 */
Cache._instances = new Map();
module.exports = Cache;
