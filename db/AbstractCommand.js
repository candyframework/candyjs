"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event = require("../core/Event");
class AbstractCommand extends Event {
    constructor() {
        super();
    }
    initConnection(configuration) { }
}
exports.default = AbstractCommand;
AbstractCommand.EVENT_BEFORE_QUERY = 'beforeQuery';
AbstractCommand.EVENT_AFTER_QUERY = 'afterQuery';
AbstractCommand.EVENT_BEFORE_EXECUTE = 'beforeExecute';
AbstractCommand.EVENT_AFTER_EXECUTE = 'afterExecute';
