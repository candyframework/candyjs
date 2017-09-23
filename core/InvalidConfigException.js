/**
 * @author
 * @license MIT
 */
'use strict';

var Exception = require('./Exception');

/**
 * 配置异常
 */
class InvalidConfigException extends Exception {}

module.exports = InvalidConfigException;
