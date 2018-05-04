/**
 * @author
 * @license MIT
 */
'use strict';

const Exception = require('./Exception');

/**
 * 配置异常
 */
class InvalidConfigException extends Exception {}

module.exports = InvalidConfigException;
