/**
 * @author
 * @license MIT
 */
'use strict';

const fs = require('fs');

const Candy = require('../../Candy');
const Logger = require('../Logger');
const ITarget = require('../ITarget');
const FileHelper = require('../../helpers/FileHelper');
const TimeHelper = require('../../helpers/TimeHelper');

/**
 * 文件日志
 *
 * ```
 * 'log': {
 *     'targets': {
 *         'file': {
 *             'classPath': 'candy/log/file/Target',
 *             'logPath': __dirname + '/logs'
 *         },
 *         'other': {...}
 *     },
 *     'flushInterval': 10
 * }
 * ```
 *
 */
class Target extends ITarget {

    /**
     * constructor
     */
    constructor(config) {
        super();

        /**
         * @property {String} absolute path of log file. default at runtime directory of the application
         */
        this.logPath = '@runtime/logs';

        /**
         * @property {String} log file name
         */
        this.logFile = 'system.log';

        /**
         * @property {Number} maxFileSize maximum log file size in KB
         */
        this.maxFileSize = 10240;

        // init
        this.logPath = undefined !== config.logPath
            ? config.logPath
            : Candy.getPathAlias(this.logPath);

        if(undefined !== config.logFile) {
            this.logFile = config.logFile;
        }

        if(undefined !== config.maxFileSize) {
            this.maxFileSize = config.maxFileSize;
        }
    }

    /**
     * @inheritdoc
     */
    flush(messages) {
        // 检查目录
        fs.access(this.logPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if(null === err) {
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
        var msg = '';
        for(let i=0,len=messages.length; i<len; i++) {
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
        var msg = this.formatMessage(messages);
        var file = this.logPath + '/' + this.logFile;

        // check file exists
        fs.access(file, fs.constants.F_OK, (err) => {
            // file not exists
            if(null !== err) {
                fs.writeFile(file, msg, (err) => {});

                return;
            }

            // check file size
            fs.stat(file, (err, stats) => {
                if(stats.size > this.maxFileSize * 1024) {
                    let newFile = file + TimeHelper.format('ymdhis');

                    fs.rename(file, newFile, (err) => {
                        fs.writeFile(file, msg, (err) => {});
                    });

                    return;
                }

                fs.appendFile(file, msg, (err) => {});
            });
        });
    }
    
}

module.exports = Target;
