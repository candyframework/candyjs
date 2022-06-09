"use strict";
const Candy = require("../Candy");
const InvalidConfigException = require("../core/InvalidConfigException");
class Cache {
    static getCache(type) {
        let app = Candy.app;
        if (undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }
        if (undefined === app.cache[type].classPath) {
            throw new InvalidConfigException('The "classPath" configuration of the cache is missing');
        }
        if (!Cache.instances.has(type)) {
            Cache.instances.set(type, Candy.createObjectAsDefinition(app.cache[type], app));
            Cache.instances.get(type).init();
        }
        return Cache.instances.get(type);
    }
}
Cache.instances = new Map();
module.exports = Cache;
