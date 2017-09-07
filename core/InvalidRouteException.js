/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Exception = require('./Exception');

/**
 * 路由异常
 */
class InvalidRouteException extends Exception {}

module.exports = InvalidRouteException;
