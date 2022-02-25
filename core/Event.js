"use strict";
const LinkedList = require("../utils/LinkedList");
/**
 * 简单 Event
 */
class Event {
    constructor() {
        /**
         * the attached event handlers
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
        if (!this.eventsMap.has(eventName)) {
            this.eventsMap.set(eventName, new LinkedList());
        }
        this.eventsMap.get(eventName).add(handler);
    }
    /**
     * 注销事件
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 事件处理器
     */
    off(eventName, handler = null) {
        if (!this.eventsMap.has(eventName)) {
            return;
        }
        if (null === handler) {
            this.eventsMap.delete(eventName);
            return;
        }
        let list = this.eventsMap.get(eventName);
        list.remove(handler);
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
        if (!this.eventsMap.has(eventName)) {
            return;
        }
        let handlers = this.eventsMap.get(eventName);
        for (let h of handlers) {
            h(parameter);
        }
    }
}
module.exports = Event;
