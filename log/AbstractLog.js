"use strict";
const Event = require("../core/Event");
const Logger = require("./Logger");
class AbstractLog extends Event {
    constructor(application) {
        super();
        this.directoryMode = 0o777;
        this.level = Logger.LEVEL_INFO;
        this.application = application;
    }
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
module.exports = AbstractLog;
