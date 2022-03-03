"use strict";
/**
 * 行为类
 *
 * 行为类能够监听组件的事件并作出响应
 */
class Behavior {
    constructor() {
        this.component = null;
    }
    /**
     * @inheritdoc
     */
    events() {
        return null;
    }
    /**
     * @inheritdoc
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
     * @inheritdoc
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
