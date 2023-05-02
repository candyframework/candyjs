"use strict";
const Candy = require("../Candy");
const ServiceLocator = require("../ioc/ServiceLocator");
const InvalidConfigException = require("../core/InvalidConfigException");
class Cache {
    static getCache(type) {
        let app = Candy.app;
        if (undefined === app.cache || undefined === app.cache[type]) {
            throw new InvalidConfigException('The cache configuration is not found');
        }
        if (!Cache.caches.hasService(type)) {
            Cache.caches.setService(type, Candy.createObjectAsDefinition(app.cache[type], app));
            Cache.caches.getService(type).init();
        }
        return Cache.caches.getService(type);
    }
}
Cache.caches = new ServiceLocator();
module.exports = Cache;
