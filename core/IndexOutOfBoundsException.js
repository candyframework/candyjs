/**
 * @author afu
 * @license MIT
 */
'use strict';

const Exception = require('./Exception');

/**
 * 索引越界
 */
class IndexOutOfBoundsException extends Exception {}

module.exports = IndexOutOfBoundsException;
