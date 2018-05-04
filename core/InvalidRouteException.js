/**
 * @author
 * @license MIT
 */
'use strict';

const Exception = require('./Exception');

/**
 * 路由异常
 */
class InvalidRouteException extends Exception {}

module.exports = InvalidRouteException;
