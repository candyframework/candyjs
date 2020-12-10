/**
 * @author afu
 * @license MIT
 */
import ILog from './ILog';
import Event = require('../core/Event');

/**
 * 日志抽象层
 */
abstract class AbstractLog extends Event implements ILog {

    /**
     * @property {String} EVENT_FLUSH 事件
     */
    static EVENT_FLUSH: string = 'flush';

    constructor() {
        super();
    }

    /**
     * flush log
     *
     * @param {Array} message the message to be logged
     */
    public flush(messages: any[]): void {}

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
