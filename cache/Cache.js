/**
 * @author afu
 * @license MIT
 */
'use strict';

const Candy = require('../Candy');
const InvalidConfigException = require('../core/InvalidConfigException');
const InvalidArgumentException = require('../core/InvalidArgumentException');
const ICache = require('./ICache');

class Cache {

    /**
     * @return {ICache}
     */
    static getCache(cacheFlag) {
        if(undefined === cacheFlag) {
            throw new InvalidArgumentException('Invalid parameter: cacheFlag');
        }
        if(undefined === Candy.app.cache || undefined === Candy.app.cache[cacheFlag]) {
            throw new InvalidConfigException('No cache config found');
        }
        if(undefined === Candy.app.cache[cacheFlag].classPath) {
            throw new InvalidConfigException('The cache config lost key: classPath');
        }

        if(undefined === Cache._caches[cacheFlag] || null === Cache._caches[cacheFlag]) {
            Cache._caches[cacheFlag] = Candy.createObjectAsString(
                Candy.app.cache[cacheFlag].classPath,
                Candy.app.cache[cacheFlag]);

            Cache._caches[cacheFlag].init();
        }

        return Cache._caches[cacheFlag];
    }

}

/**
 * @var {Map<String, Object>} _caches
 */
Cache._caches = {};

module.exports = Cache;
