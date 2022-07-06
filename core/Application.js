"use strict";
const Candy = require("../Candy");
const Event = require("./Event");
const InvalidConfigException = require("./InvalidConfigException");
class Application extends Event {
    constructor(config) {
        super();
        this.encoding = 'UTF-8';
        this.debug = false;
        this.exceptionHandler = '';
        Candy.app = this;
        this.init(config);
    }
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
            this.setRuntimePath(this.getAppPath() + '/runtime');
        }
    }
    setAppPath(path) {
        Candy.setPathAlias('@app', path);
    }
    getAppPath() {
        return Candy.getPathAlias('@app');
    }
    setRuntimePath(path) {
        Candy.setPathAlias('@runtime', path);
    }
    getRuntimePath() {
        return Candy.getPathAlias('@runtime');
    }
}
module.exports = Application;
