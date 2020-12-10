/**
 * @author afu
 * @license MIT
 */
import Candy = require('../Candy');
import InvalidConfigException = require('../core/InvalidConfigException');
import AbstractLog = require('./AbstractLog');

/**
 * 日志
 */
class Logger {

    /**
     * Logger instance
     */
    static _logger = null;

    /**
     * Error message level
     */
    static LEVEL_ERROR = 1;

    /**
     * Warning message level
     */
    static LEVEL_WARNING = 2;

    /**
     * Informational message level
     */
    static LEVEL_INFO = 4;

    /**
     * Tracing message level
     */
    static LEVEL_TRACE = 8;

    /**
     * @property {Array} messages logged messages
     *
     * Each log message is of the following structure:
     *
     * ```
     * [
     *   [0] => string:message
     *   [1] => number:level
     *   [2] => number:timestamp
     * ]
     * ```
     */
    public messages: any[];

    /**
     * @property {Number} flushInterval how many messages should be logged before they are flushed from memory
     */
    public flushInterval: number;

    /**
     * @property {Array} targets the targets class
     */
    public targets: any[];

    constructor(settings: any) {
        this.messages = [];
        this.flushInterval = 10;
        this.targets = [];

        this.init(settings);
    }

    private init(settings: any) {
        if(undefined === settings) {
            return;
        }

        if(undefined === settings.targets) {
            throw new InvalidConfigException('The log configuration is invalid');
        }
        if(undefined !== settings.flushInterval) {
            this.flushInterval = settings.flushInterval;
        }

        for(let target in settings.targets) {
            if(undefined !== settings.targets[target].classPath) {
                let clazz = Candy.createObjectAsString(
                    settings.targets[target].classPath,
                    settings.targets[target]);
                clazz.on(AbstractLog.EVENT_FLUSH, clazz);

                this.targets.push(clazz);
            }
        }
    }

    /**
     * 获取日志类实例
     *
     * @return {Logger}
     */
    static getLogger(): Logger {
        let app: any = Candy.app;

        if(null === Logger._logger) {
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
    static newInstance(settings: any): Logger {
        return new Logger(settings);
    }

    /**
     * 记录日志
     *
     * @param {String} message 消息
     * @param {Number} level 日志级别
     */
    public log(message: string, level: number): void {
        this.messages.push([message, level, Date.now()]);

        if(this.flushInterval > 0 && this.messages.length >= this.flushInterval) {
            this.flush();
        }
    }

    /**
     * 清空 log 并写入目的地
     */
    public flush(): void {
        let messages = this.messages;
        this.messages = [];

        for(let target of this.targets) {
            target.trigger(AbstractLog.EVENT_FLUSH, messages);
        }
    }

    /**
     * Logs a error message
     *
     * @param {String} message the message to be logged
     */
    public error(message: string): void {
        this.log(message, Logger.LEVEL_ERROR);
    }

    /**
     * Logs a warning message
     *
     * @param {String} message the message to be logged
     */
    public warning(message: string): void {
        this.log(message, Logger.LEVEL_WARNING);
    }

    /**
     * Logs a info message
     *
     * @param {String} message the message to be logged
     */
    public info(message: string): void {
        this.log(message, Logger.LEVEL_INFO);
    }

    /**
     * Logs a trace message
     *
     * @param {String} message the message to be logged
     */
    public trace(message: string): void {
        if(Candy.app.debug) {
            this.log(message, Logger.LEVEL_TRACE);
        }
    }

    /**
     * 获取日志级别描述
     *
     * @param {Number} level 级别
     * @return {String}
     */
    static getLevelName(level: number): string {
        let name = 'unknown';
        switch(level) {
            case Logger.LEVEL_ERROR :
                name = 'error';
                break;
            case Logger.LEVEL_WARNING :
                name = 'warning';
                break;
            case Logger.LEVEL_INFO :
                name = 'info';
                break;
            case Logger.LEVEL_TRACE :
                name = 'trace';
                break;
            default :
                break;
        }

        return name;
    }

}
export = Logger;
