/**
 * @author afu
 * @license MIT
 */
'use strict';

/**
 * 简单 Event
 */
class Event {

    constructor() {
        /**
         * @property {Map<String, Array>} eventsMap the attached event handlers
         *
         * {
         *      'eventName1': [fn1, fn2],
         *      'eventName2': [fn1, fn2]
         * }
         */
        this.eventsMap = new Map();
    }

    /**
     * 注册事件处理
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 事件处理器
     */
    on(eventName, handler) {
        if(!this.eventsMap.has(eventName)) {
            this.eventsMap.set(eventName, []);
        }

        this.eventsMap.get(eventName).push(handler);
    }

    /**
     * 注销事件
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 事件处理器
     */
    off(eventName, handler = null) {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        if(null === handler) {
            this.eventsMap.delete(eventName);
            return;
        }

        const handlers = this.eventsMap.get(eventName);
        for(let i=0; i<handlers.length; i++) {
            if(handler === handlers[i]) {
                handlers.splice(i, 1);
            }
        }
    }

    /**
     * 注销所有事件
     */
    offAll() {
        this.eventsMap.clear();
    }

    /**
     * 触发事件
     *
     * @param {String} eventName 事件名称
     * @param {any} parameter 参数
     */
    trigger(eventName, parameter = null) {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        const handlers = this.eventsMap.get(eventName);
        for(let i=0; i<handlers.length; i++) {
            handlers[i](parameter);
        }
    }

}

module.exports = Event;
