/**
 * @author
 * @license MIT
 */
'use strict';

var Exception = require('./Exception');

/**
 * 非法参数异常
 */
class InvalidArgumentException extends Exception {}

module.exports = InvalidArgumentException;
