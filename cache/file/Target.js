/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var fs = require('fs');

var Candy = require('../../Candy');
var ITarget = require('../ITarget');
var FileHelper = require('../../helpers/FileHelper');
var CacheException = require('../../core/CacheException');

/**
 * 文件缓存
 *
 * 'cache': {
 *      'file': {
 *          'class': 'y/cache/file/Target',
 *          'cachePath': '...'
 *      }
 * }
 *
 */
class Target extends ITarget {
    
    /**
     * constructor
     *
     * @param {JSON} config
     */
    constructor(config) {
        super();
        
        /**
         * @property {String} cacheFileSuffix 缓存文件后缀
         */
        this.cacheFileSuffix = '.bin';
        
        /**
         * @property {String} cachePath 缓存目录
         */
        this.cachePath = undefined === config.cachePath
            ? Candy.getPathAlias('@runtime/caches')
            : config.cachePath;
        
        // 目录不存在就创建
        if(!fs.existsSync(this.cachePath)) {
            FileHelper.createDirectorySync(this.cachePath);
        }
    }
    
    getCacheFile(key) {
        return this.cachePath + '/' + key + this.cacheFileSuffix;
    }
    
    /**
     * @inheritdoc
     */
    setSync(key, value, duration = 31536000000/* one year */) {
        var cacheFile = this.getCacheFile(key);
        
        var life = (Date.now() + duration) / 1000;
        
        fs.writeFileSync(cacheFile, value, Candy.app.encoding);
        
        fs.utimesSync(cacheFile, life, life);
    }
    
    /**
     * @inheritdoc
     */
    set(key, value, duration = 31536000000/* one year */, callback = null) {
        var cacheFile = this.getCacheFile(key);
        
        var life = (Date.now() + duration) / 1000;
        
        fs.writeFile(cacheFile, value, Candy.app.encoding, (err) => {
            if(null !== err) {
                callback(err);
                return;
            }
            
            fs.utimes(cacheFile, life, life, callback);
        });
    }
    
    /**
     * @inheritdoc
     */
    getSync(key) {
        var ret = null;
        var cacheFile = this.getCacheFile(key);
        
        if(fs.existsSync(cacheFile) && fs.statSync(cacheFile).mtime.getTime() > Date.now()) {
            ret = fs.readFileSync(cacheFile, Candy.app.encoding);
        }

        return ret;
    }
    
    /**
     * @inheritdoc
     */
    get(key, callback) {
        var cacheFile = this.getCacheFile(key);
        
        fs.stat(cacheFile, (err, stats) => {
            if(null !== err) {
                callback(err, null);
                return;
            }
            
            if(stats.mtime.getTime() < Date.now()) {
                callback(new CacheException('The cache: '+ key +' has expired'), null);
                return;
            }
            
            fs.readFile(cacheFile, Candy.app.encoding, callback);
        });
    }
    
    /**
     * @inheritdoc
     */
    deleteSync(key) {
        var cacheFile = this.getCacheFile(key);
        
        fs.unlinkSync(cacheFile);
    }
    
    /**
     * @inheritdoc
     */
    delete(key, callback) {
        var cacheFile = this.getCacheFile(key);
        
        fs.unlink(cacheFile, callback);
    }
    
}

module.exports = Target;
