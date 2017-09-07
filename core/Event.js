/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
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
         * @property {JSON} handlers
         * 
         * {
         *     'eventName': [fn1, fn2...]
         *     'eventName2': [fn1, fn2...]
         * }
         */
        this.handlers = {};
    }
    
    /**
     * 注册事件处理
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 回调函数
     */
    on(eventName, handler) {
        if(undefined === this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        
        this.handlers[eventName].push(handler);
    }
    
    /**
     * 注销事件处理
     *
     * @param {String} eventName 事件名称
     * @param {Function} handler 回调函数
     */
    off(eventName, handler) {
        if(undefined !== this.handlers[eventName]) {
            if(undefined === handler) {
                delete this.handlers[eventName];
                
            } else {
                for(let i=0,len=this.handlers[eventName].length; i<len; i++) {
                    if(handler === this.handlers[eventName][i]) {
                        this.handlers[eventName].splice(i, 1);
                    }
                }
            }
        }
    }
    
    /**
     * 触发
     *
     * @param {String} eventName 事件名称
     * @param {Array} param 参数
     */
    trigger(eventName, param) {
        if(undefined !== this.handlers[eventName]) {
            for(let i=0,len=this.handlers[eventName].length; i<len; i++) {
                undefined === param ? this.handlers[eventName][i]() :
                    this.handlers[eventName][i].apply(null, param);
            }
        }
    }
    
    /**
     * 触发
     *
     * @param {String} eventName 事件名称
     * @param {any} params 参数
     */
    triggerWithRestParams(eventName, ...params) {
        if(undefined !== this.handlers[eventName]) {
            for(let i=0,len=this.handlers[eventName].length; i<len; i++) {
                this.handlers[eventName][i](...params);
            }
        }
    }
    
}

module.exports = Event;
