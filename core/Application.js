"use strict";
const Candy = require("../Candy");
const Event = require("./Event");
const InvalidConfigException = require("./InvalidConfigException");
/**
 * 应用基类
 */
class Application extends Event {
    constructor(config) {
        super();
        this.encoding = 'UTF-8';
        this.debug = false;
        this.exceptionHandler = 'candy/web/ExceptionHandler';
        Candy.app = this;
        this.init(config);
    }
    /**
     * 初始化应用
     *
     * @param {any} config 应用配置
     * @throws {InvalidConfigException} 当丢失必要配置项目时
     */
    init(config) {
        if (undefined === config.id) {
            throw new InvalidConfigException('The "id" configuration of the Application is missing');
        }
        if (undefined !== config.appPath) {
            this.setAppPath(config.appPath);
            delete config.appPath;
        }
        if (undefined !== config.runtimePath) {
            this.setRuntimePath(config.runtimePath);
            delete config.runtimePath;
        }
        else {
            // set "app/runtime"
            this.setRuntimePath(this.getAppPath() + '/runtime');
        }
        if (undefined !== config.rootPath) {
            this.setRootPath(config.rootPath);
            delete config.rootPath;
        }
        else {
            this.setRootPath(process.env.PWD);
        }
    }
    /**
     * @inheritdoc
     */
    setAppPath(path) {
        Candy.setPathAlias('@app', path);
    }
    /**
     * @inheritdoc
     */
    getAppPath() {
        return Candy.getPathAlias('@app');
    }
    /**
     * @inheritdoc
     */
    setRuntimePath(path) {
        Candy.setPathAlias('@runtime', path);
    }
    /**
     * @inheritdoc
     */
    getRuntimePath() {
        return Candy.getPathAlias('@runtime');
    }
    /**
     * @inheritdoc
     */
    setRootPath(path) {
        Candy.setPathAlias('@root', path);
    }
    /**
     * @inheritdoc
     */
    getRootPath() {
        return Candy.getPathAlias('@root');
    }
}
module.exports = Application;
