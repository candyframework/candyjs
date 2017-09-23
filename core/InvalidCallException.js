/**
 * @author
 * @license MIT
 */
'use strict';

var Exception = require('./Exception');

/**
 * 非法调用异常
 */
class InvalidCallException extends Exception {}

module.exports = InvalidCallException;
