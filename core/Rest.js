/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Candy = require('../Candy');
var InvalidConfigException = require('./InvalidConfigException');

/**
 * RESTful 基类
 */
class Rest {
    
    constructor(config) {
        /**
         * @property {Boolean} debug 调试
         */
        this.debug = false;

        /**
         * @property {String} exceptionHandler 异常处理类
         */
        this.exceptionHandler = '';
        
        Candy.rest = this;
        this.init(config);
        Candy.config(this, config);
    }
    
    /**
     * 初始化应用
     *
     * @param {Object} config 应用配置
     * @throws {InvalidConfigException} 当丢失必要配置项目时
     */
    init(config) {
        if(undefined === config.appPath) {
            throw new InvalidConfigException('The "appPath" configuration is required');
        }
        
        this.setAppPath(config.appPath);
        delete config.appPath;
    }
    
    /**
     * 设置应用路径
     *
     * @param {String} path 应用路径
     */
    setAppPath(path) {
        Candy.setPathAlias('@app', path);
    }
    
    /**
     * handler request
     *
     * @param {Object} request
     * @param {Object} response
     */
    requestListener(request, response) {}
    
    /**
     * 异常处理
     *
     * @param {Object} response 输出类
     * @param {Exception} exception 异常类
     */
    handlerException(response, exception) {}
    
}

module.exports = Rest;
