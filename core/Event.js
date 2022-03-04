"use strict";
const LinkedList = require("../utils/LinkedList");
/**
 * 简单 Event
 */
class Event {
    constructor() {
        this.eventsMap = new Map();
    }
    /**
     * @inheritdoc
     */
    on(eventName, handler) {
        if (!this.eventsMap.has(eventName)) {
            this.eventsMap.set(eventName, new LinkedList());
        }
        this.eventsMap.get(eventName).add(handler);
    }
    /**
     * @inheritdoc
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
     * @inheritdoc
     */
    offAll() {
        this.eventsMap.clear();
    }
    /**
     * @inheritdoc
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
