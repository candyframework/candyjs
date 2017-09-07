/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Exception = require('./Exception');

/**
 * 非法调用异常
 */
class InvalidCallException extends Exception {}

module.exports = InvalidCallException;
