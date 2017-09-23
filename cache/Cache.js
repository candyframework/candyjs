/**
 * @author
 * @license MIT
 */
'use strict';

var Candy = require('../Candy');
var InvalidConfigException = require('../core/InvalidConfigException');
var InvalidArgumentException = require('../core/InvalidArgumentException');

class Cache {
    
    static getCache(cacheFlag) {
        if(undefined === cacheFlag) {
            throw new InvalidArgumentException('Invalid param: cacheFlag');
        }
        if(undefined === Candy.app.cache || undefined === Candy.app.cache[cacheFlag]) {
            throw new InvalidConfigException('No cache config found');
        }
        if(undefined === Candy.app.cache[cacheFlag]['class']) {
            throw new InvalidConfigException('The cache config lost key: class');
        }
        
        if(undefined === Cache._caches[cacheFlag] || null === Cache._caches[cacheFlag]) {
            Cache._caches[cacheFlag] = Candy.createObject(Candy.app.cache[cacheFlag]['class'],
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
