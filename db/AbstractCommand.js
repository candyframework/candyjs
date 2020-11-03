"use strict";
/**
 * @author afu
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Event = require('../core/Event');
/**
 * 数据库操作基类
 */
class AbstractCommand extends Event {
    /**
     * 初始化操作
     */
    initConnection(configuration) {}
}
exports.default = AbstractCommand;
/**
 * @property {String} EVENT_BEFORE_QUERY
 */
AbstractCommand.EVENT_BEFORE_QUERY = 'beforeQuery';
/**
 * @property {String} EVENT_AFTER_QUERY
 */
AbstractCommand.EVENT_AFTER_QUERY = 'afterQuery';
/**
 * @property {String} EVENT_BEFORE_EXECUTE
 */
AbstractCommand.EVENT_BEFORE_EXECUTE = 'beforeExecute';
/**
 * @property {String} EVENT_AFTER_EXECUTE
 */
AbstractCommand.EVENT_AFTER_EXECUTE = 'afterExecute';
