"use strict";
/**
 * @author afu
 * @license MIT
 */
const fs = require("fs");
const Candy = require("../../Candy");
const Logger = require("../Logger");
const AbstractLog = require("../AbstractLog");
const FileHelper = require("../../helpers/FileHelper");
const TimeHelper = require("../../helpers/TimeHelper");
/**
 * 文件日志
 *
 * ```
 * 'log': {
 *     'targets': {
 *         'file': {
 *             'classPath': 'candy/log/file/Log',
 *             'logPath': '@runtime/logs',
 *             'logFile': 'system.log',
 *             'maxFileSize': 10240
 *         },
 *         'other': {...}
 *     },
 *     'flushInterval': 10
 * }
 * ```
 *
 */
class Log extends AbstractLog {
    constructor(config) {
        super();
        this.logPath = undefined === config.logPath
            ? Candy.getPathAlias('@runtime/logs')
            : config.logPath;
        this.logFile = undefined === config.logFile
            ? 'system.log'
            : config.logFile;
        this.maxFileSize = undefined === config.maxFileSize
            ? 10240
            : config.maxFileSize;
    }
    /**
     * @inheritdoc
     */
    flush(messages) {
        // 检查目录
        fs.access(this.logPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (null === err) {
                this.writeLog(messages);
                return;
            }
            FileHelper.createDirectory(this.logPath, 0o777, (err) => {
                this.writeLog(messages);
            });
        });
    }
    /**
     * 格式化内容
     */
    formatMessage(messages) {
        let msg = '';
        for (let i = 0, len = messages.length; i < len; i++) {
            msg += TimeHelper.format('y-m-d h:i:s', messages[i][2])
                + ' [ '
                + Logger.getLevelName(messages[i][1])
                + ' ] '
                + messages[i][0]
                + '\n';
        }
        return msg;
    }
    /**
     * 写日志
     */
    writeLog(messages) {
        let msg = this.formatMessage(messages);
        let file = this.logPath + '/' + this.logFile;
        // check file exists
        fs.access(file, fs.constants.F_OK, (err) => {
            // file not exists
            if (null !== err) {
                fs.writeFile(file, msg, (err) => { });
                return;
            }
            // check file size
            fs.stat(file, (err, stats) => {
                if (stats.size > this.maxFileSize * 1024) {
                    let newFile = file + TimeHelper.format('ymdhis');
                    fs.rename(file, newFile, (err) => {
                        fs.appendFile(file, msg, (err) => { });
                    });
                    return;
                }
                fs.appendFile(file, msg, (err) => { });
            });
        });
    }
}
module.exports = Log;
