/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Exception = require('./Exception');

/**
 * 文件找不到异常
 */
class FileNotFoundException extends Exception {}

module.exports = FileNotFoundException;
