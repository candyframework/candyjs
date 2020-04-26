/**
 * @author
 * @license MIT
 */
'use strict';

/**
 * 简单 Event
 */
class Event {

    /**
     * constructor
     */
    constructor() {
        /**
         * @property {Map} eventsMap the attached event handlers
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
     * 注销事件处理
     *
     * @param {String} eventName
     * @param {Function} handler
     */
    off(eventName, handler) {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        if(undefined === handler) {
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
     * 触发
     *
     * @param {String} eventName 事件名称
     * @param {any} parameter 参数
     */
    trigger(eventName, parameter) {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        const handlers = this.eventsMap.get(eventName);
        for(let i=0, len=handlers.length; i<len; i++) {
            handlers[i](parameter);
        }
    }

    /**
     * 触发
     *
     * @param {String} eventName 事件名称
     * @param {any} parameters 参数
     */
    triggerWithRestParameters(eventName, ...parameters) {
        if(!this.eventsMap.has(eventName)) {
            return;
        }

        const handlers = this.eventsMap.get(eventName);
        for(let i=0, len=handlers.length; i<len; i++) {
            handlers[i](...parameters);
        }
    }

}

module.exports = Event;
