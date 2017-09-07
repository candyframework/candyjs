/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Candy = require('../Candy');
var InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 日志
 */
class Logger {
    
    /**
     * constructor
     */
    constructor() {
        /**
         * @property {Array} messages logged messages
         *
         * Each log message is of the following structure:
         * [
         *   [0] => string:message
         *   [1] => number:level
         *   [2] => number:timestamp
         * ]
         */
        this.messages = [];
        
        /**
         * @property {Number} flushInterval how many messages should be logged before they are flushed from memory
         */
        this.flushInterval = 10;
        
        /**
         * @property {Array} targets the targets class
         */
        this.targets = [];
        
        if(undefined === Candy.app.log || undefined === Candy.app.log.targets) {
            throw new InvalidConfigException('No log targets found');
        }
        if(undefined !== Candy.app.log.flushInterval) {
            this.flushInterval = Candy.app.log.flushInterval;
        }
        
        for(let target in Candy.app.log.targets) {
            if(undefined !== Candy.app.log.targets[target]['class']) {
                let clazz = Candy.createObject(Candy.app.log.targets[target]['class'],
                    Candy.app.log.targets[target]);
                clazz.on(clazz.EVENT_FLUSH, clazz);
                
                this.targets.push(clazz);
            }
        }
    }
    
    /**
     * 获取日志类实例
     * 
     * @return {Object}
     */
    static getLogger() {
        if(null === Logger._logger) {
            Logger._logger = new Logger();
        }
        
        return Logger._logger;
    }
    
    /**
     * 记录日志
     *
     * @param {String} message 消息
     * @param {Number} level 日志级别
     */
    log(message, level) {
        this.messages.push([message, level, Date.now()]);
        
        if(this.flushInterval > 0 && this.messages.length >= this.flushInterval) {
            this.flush();
        }
    }
    
    /**
     * 清空 log 并写入目的地
     */
    flush() {
        var messages = this.messages;
        this.messages = [];
        
        for(let target of this.targets) {
            target.trigger(target.EVENT_FLUSH, messages);
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
        this.log(message, Logger.LEVEL_TRACE);
    }
    
    /**
     * 获取日志级别描述
     *
     * @param {Number} level 级别
     * @return {String}
     */
    static getLevelName(level) {
        var name = 'unknown';
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
