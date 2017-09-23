/**
 * @author
 * @license MIT
 */
'use strict';

var Exception = require('./Exception');

/**
 * 路由异常
 */
class InvalidRouteException extends Exception {}

module.exports = InvalidRouteException;
