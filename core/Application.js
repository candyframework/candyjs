/**
 * @author
 * @license MIT
 */
'use strict';

const Candy = require('../Candy');
const Event = require('./Event');
const InvalidConfigException = require('./InvalidConfigException');

/**
 * 应用基类
 */
class Application extends Event {

    /**
     * constructor
     *
     * @param {Object} config 配置信息
     */
    constructor(config) {
        super();

        /**
         * @property {String} encoding 编码
         */
        this.encoding = 'UTF-8';

        /**
         * @property {Boolean} debug 调试
         */
        this.debug = false;

        /**
         * @property {String} exceptionHandler 异常处理类
         */
        this.exceptionHandler = 'candy/web/ExceptionHandler';

        Candy.app = this;
        this.init(config);
    }

    /**
     * 初始化应用
     *
     * @param {Object} config 应用配置
     * @throws {InvalidConfigException} 当丢失必要配置项目时
     */
    init(config) {
        if(undefined === config.id) {
            throw new InvalidConfigException('The "id" configuration is required');
        }

        if(undefined !== config.appPath) {
            this.setAppPath(config.appPath);
            delete config.appPath;

        }

        if(undefined !== config.runtimePath) {
            this.setRuntimePath(config.runtimePath);
            delete config.runtimePath;

        } else {
            // set "app/runtime"
            this.setRuntimePath( this.getAppPath() + '/runtime');
        }

        if(undefined !== config.rootPath) {
            this.setRootPath(config.rootPath);
            delete config.rootPath;

        } else {
            this.setRootPath(process.env.PWD);
        }
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
     * 得到应用目录
     *
     * @return {String} 路径
     */
    getAppPath(){
        return Candy.getPathAlias('@app');
    }

    /**
     * 设置 runtime 路径
     *
     * @param {String} path 路径
     */
    setRuntimePath(path) {
        Candy.setPathAlias('@runtime', path);
    }

    /**
     * 得到 runtime 目录
     *
     * @return {String} 路径
     */
    getRuntimePath() {
        return Candy.getPathAlias('@runtime');
    }

    /**
     * 设置 root 路径
     *
     * @param {String} path 路径
     */
    setRootPath(path) {
        Candy.setPathAlias('@root', path);
    }

    /**
     * 得到 root 目录
     *
     * @return {String} 路径
     */
    getRootPath() {
        return Candy.getPathAlias('@root');
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

module.exports = Application;
