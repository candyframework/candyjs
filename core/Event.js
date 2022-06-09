"use strict";
const LinkedList = require("../utils/LinkedList");
class Event {
    constructor() {
        this.eventsMap = new Map();
    }
    on(eventName, handler) {
        if (!this.eventsMap.has(eventName)) {
            this.eventsMap.set(eventName, new LinkedList());
        }
        this.eventsMap.get(eventName).add(handler);
    }
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
    offAll() {
        this.eventsMap.clear();
    }
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
