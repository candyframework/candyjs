"use strict";
const Candy = require("../Candy");
const InvalidConfigException = require("../core/InvalidConfigException");
const AbstractLog = require("./AbstractLog");
class Logger {
    constructor(application) {
        this.messages = [];
        this.flushInterval = 1;
        this.targets = [];
        this.application = application;
        this.init(application.log);
    }
    init(settings) {
        if (undefined === settings) {
            return;
        }
        if (undefined === settings.targets) {
            throw new InvalidConfigException('The "targets" configuration of the log is missing');
        }
        if (undefined !== settings.flushInterval) {
            this.flushInterval = settings.flushInterval;
        }
        for (let target in settings.targets) {
            if (undefined !== settings.targets[target].classPath) {
                let instance = Candy.createObjectAsDefinition(settings.targets[target], this.application);
                instance.on(AbstractLog.EVENT_FLUSH, instance);
                this.targets.push(instance);
            }
        }
    }
    static getLogger() {
        let app = Candy.app;
        if (null === Logger.instance) {
            Logger.instance = new Logger(app);
        }
        return Logger.instance;
    }
    log(message, level) {
        this.messages.push([message, level, Date.now()]);
        if (this.flushInterval > 0 && this.messages.length >= this.flushInterval) {
            this.flush();
        }
    }
    flush() {
        let messages = this.messages;
        this.messages = [];
        for (let target of this.targets) {
            target.trigger(AbstractLog.EVENT_FLUSH, messages);
        }
    }
    error(message) {
        this.log(message, Logger.LEVEL_ERROR);
    }
    warning(message) {
        this.log(message, Logger.LEVEL_WARNING);
    }
    info(message) {
        this.log(message, Logger.LEVEL_INFO);
    }
    trace(message) {
        if (this.application.debug) {
            this.log(message, Logger.LEVEL_TRACE);
        }
    }
    static getLevelName(level) {
        let name = 'unknown';
        switch (level) {
            case Logger.LEVEL_ERROR:
                name = 'error';
                break;
            case Logger.LEVEL_WARNING:
                name = 'warning';
                break;
            case Logger.LEVEL_INFO:
                name = 'info';
                break;
            case Logger.LEVEL_TRACE:
                name = 'trace';
                break;
            default:
                break;
        }
        return name;
    }
}
Logger.instance = null;
Logger.LEVEL_ERROR = 1;
Logger.LEVEL_WARNING = 2;
Logger.LEVEL_INFO = 4;
Logger.LEVEL_TRACE = 8;
module.exports = Logger;
