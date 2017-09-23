/**
 * @author
 * @license MIT
 */
'use strict';

var Exception = require('./Exception');

/**
 * 文件找不到异常
 */
class FileNotFoundException extends Exception {}

module.exports = FileNotFoundException;
