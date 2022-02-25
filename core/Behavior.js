"use strict";
/**
 * 行为类
 *
 * 行为类能够监听组件的事件并作出响应
 */
class Behavior {
    constructor() {
        /**
         * 行为持有的组件
         */
        this.component = null;
    }
    /**
     * 声明要监听的组件的事件和对应事件的处理程序
     *
     * [
     *      ['eventName', handler]
     * ]
     *
     * @return {any[]}
     */
    events() {
        return null;
    }
    /**
     * 监听组件的事件
     *
     * @typedef {import('./Component')} Component
     * @param {Component} component 组件
     */
    listen(component) {
        this.component = component;
        let events = this.events();
        if (null === events) {
            return;
        }
        for (let v of events) {
            this.component.on(v[0], v[1]);
        }
    }
    /**
     * 取消监听组件的事件
     */
    unListen() {
        if (null === this.component) {
            return;
        }
        let events = this.events();
        if (null === events) {
            return;
        }
        for (let v of events) {
            this.component.off(v[0], v[1]);
        }
        this.component = null;
    }
}
module.exports = Behavior;
