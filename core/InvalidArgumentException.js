/**
 * @author afu
 * @license MIT
 */
'use strict';

const Exception = require('./Exception');

/**
 * 非法参数异常
 */
class InvalidArgumentException extends Exception {}

module.exports = InvalidArgumentException;
