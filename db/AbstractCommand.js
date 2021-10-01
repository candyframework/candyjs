"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author afu
 * @license MIT
 */
const Event = require("../core/Event");
/**
 * 数据库操作基类
 */
class AbstractCommand extends Event {
    /**
     * 初始化操作
     */
    initConnection(configuration) { }
}
exports.default = AbstractCommand;
/**
 * EVENT_BEFORE_QUERY
 */
AbstractCommand.EVENT_BEFORE_QUERY = 'beforeQuery';
/**
 * EVENT_AFTER_QUERY
 */
AbstractCommand.EVENT_AFTER_QUERY = 'afterQuery';
/**
 * EVENT_BEFORE_EXECUTE
 */
AbstractCommand.EVENT_BEFORE_EXECUTE = 'beforeExecute';
/**
 * EVENT_AFTER_EXECUTE
 */
AbstractCommand.EVENT_AFTER_EXECUTE = 'afterExecute';
