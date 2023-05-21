/**
 * @author afu
 * @license MIT
 */
import ILog from './ILog';

import Event = require('../core/Event');
import Logger = require('./Logger');

/**
 * 日志抽象层
 */
abstract class AbstractLog extends Event implements ILog {

    public application: any;

    /**
     * the log greater than the level will be dropped
     */
    public level: number = Logger.LEVEL_INFO;

    constructor(application) {
        super();

        this.application = application;
    }

    /**
     * flush log
     *
     * @param {Array} message the message to be logged
     */
    public abstract flush(messages: any[]): void;

    /**
     * 触发事件
     *
     * @param {String} eventName 事件名称
     * @param {Array} parameter 参数
     */
    public trigger(eventName: string, parameter: any = null): void {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        const handlers = this.eventsMap.get(eventName);
        for(let handler of handlers) {
            handler.flush(parameter);
        }
    }

}

export = AbstractLog;
