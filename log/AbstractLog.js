"use strict";
const Event = require("../core/Event");
class AbstractLog extends Event {
    constructor(application) {
        super();
        this.application = application;
    }
    flush(messages) { }
    trigger(eventName, parameter = null) {
        if (!this.eventsMap.has(eventName)) {
            return;
        }
        const handlers = this.eventsMap.get(eventName);
        for (let handler of handlers) {
            handler.flush(parameter);
        }
    }
}
AbstractLog.EVENT_FLUSH = 'flush';
module.exports = AbstractLog;
