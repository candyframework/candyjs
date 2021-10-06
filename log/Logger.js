"use strict";
/**
 * @author afu
 * @license MIT
 */
const Candy = require("../Candy");
const InvalidConfigException = require("../core/InvalidConfigException");
const AbstractLog = require("./AbstractLog");
/**
 * 日志
 */
class Logger {
    constructor(settings) {
        this.messages = [];
        this.flushInterval = 10;
        this.targets = [];
        this.init(settings);
    }
    init(settings) {
        // 没有配置日志
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
                let instance = Candy.createObjectAsDefinition(settings.targets[target]);
                instance.on(AbstractLog.EVENT_FLUSH, instance);
                this.targets.push(instance);
            }
        }
    }
    /**
     * 获取日志类实例
     *
     * @return {Logger}
     */
    static getLogger() {
        let app = Candy.app;
        if (null === Logger._logger) {
            Logger._logger = new Logger(app.log);
        }
        return Logger._logger;
    }
    /**
     * 创建新日志对象
     *
     * @param {Object} settings
     * @return {Logger}
     */
    static newInstance(settings) {
        return new Logger(settings);
    }
    /**
     * 记录日志
     *
     * @param {String} message 消息
     * @param {Number} level 日志级别
     */
    log(message, level) {
        this.messages.push([message, level, Date.now()]);
        if (this.flushInterval > 0 && this.messages.length >= this.flushInterval) {
            this.flush();
        }
    }
    /**
     * 清空 log 并写入目的地
     */
    flush() {
        let messages = this.messages;
        this.messages = [];
        for (let target of this.targets) {
            target.trigger(AbstractLog.EVENT_FLUSH, messages);
        }
    }
    /**
     * Logs a error message
     *
     * @param {String} message the message to be logged
     */
    error(message) {
        this.log(message, Logger.LEVEL_ERROR);
    }
    /**
     * Logs a warning message
     *
     * @param {String} message the message to be logged
     */
    warning(message) {
        this.log(message, Logger.LEVEL_WARNING);
    }
    /**
     * Logs a info message
     *
     * @param {String} message the message to be logged
     */
    info(message) {
        this.log(message, Logger.LEVEL_INFO);
    }
    /**
     * Logs a trace message
     *
     * @param {String} message the message to be logged
     */
    trace(message) {
        if (Candy.app.debug) {
            this.log(message, Logger.LEVEL_TRACE);
        }
    }
    /**
     * 获取日志级别描述
     *
     * @param {Number} level 级别
     * @return {String}
     */
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
/**
 * Logger instance
 */
Logger._logger = null;
/**
 * Error message level
 */
Logger.LEVEL_ERROR = 1;
/**
 * Warning message level
 */
Logger.LEVEL_WARNING = 2;
/**
 * Informational message level
 */
Logger.LEVEL_INFO = 4;
/**
 * Tracing message level
 */
Logger.LEVEL_TRACE = 8;
module.exports = Logger;
