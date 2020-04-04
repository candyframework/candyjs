/**
 * @author
 * @license MIT
 */
'use strict';

const Event = require('../core/Event');

/**
 * 日志接口层 所有日志类都需要实现这个接口中定义的方法
 */
class ITarget extends Event {

    /**
     * constructor
     */
    constructor() {
        super();
    }

    /**
     * flush log
     *
     * @param {Array} message the message to be logged
     */
    flush(messages) {}

    /**
     * 触发事件
     *
     * @param {String} eventName 事件名称
     * @param {Array} param 参数
     */
    trigger(eventName, param) {
        const handlers = this.eventsMap.get(eventName);

        if(undefined === handlers) {
            return;
        }

        for(let handler of handlers) {
            handler.flush(param);
        }
    }

}

/**
 * @property {String} EVENT_FLUSH 事件
 */
ITarget.EVENT_FLUSH = 'flush';

module.exports = ITarget;
