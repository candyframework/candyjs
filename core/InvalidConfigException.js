/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Exception = require('./Exception');

/**
 * 配置异常
 */
class InvalidConfigException extends Exception {}

module.exports = InvalidConfigException;
