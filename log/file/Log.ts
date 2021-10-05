/**
 * @author afu
 * @license MIT
 */
import fs = require('fs');

import Candy = require('../../Candy');
import Logger = require('../Logger');
import AbstractLog = require('../AbstractLog');
import FileHelper = require('../../helpers/FileHelper');
import TimeHelper = require('../../helpers/TimeHelper');

/**
 * 文件日志
 *
 * ```
 * 'log': {
 *     'targets': {
 *         'file': {
 *             'classPath': 'candy/log/file/Log',
 *             'logPath': 'absolute path',
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

    /**
     * absolute path of log file. default at runtime directory of the application
     */
    public logPath: string;

    /**
     * log file name
     */
    public logFile: string;

    /**
     * maximum log file size in KB
     */
    public maxFileSize: number;

    constructor() {
        super();

        this.logPath = Candy.getPathAlias('@runtime/logs');
        this.logFile = 'system.log';
        this.maxFileSize = 10240;
    }

    /**
     * @inheritdoc
     */
    public flush(messages: any[]): void {
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
    private formatMessage(messages: any[]): string {
        let msg = '';
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
    private writeLog(messages: any[]): void {
        let msg = this.formatMessage(messages);
        let file = this.logPath + '/' + this.logFile;

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
                        fs.appendFile(file, msg, (err) => {});
                    });

                    return;
                }

                fs.appendFile(file, msg, (err) => {});
            });
        });
    }

}

export = Log;
