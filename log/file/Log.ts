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
import LinkedQueue = require('../../utils/LinkedQueue');

/**
 * 文件日志
 *
 * ```
 * 'log': {
 *     'targets': {
 *         'infoLog': {
 *             'classPath': 'candy/log/file/Log',
 *             'logPath': 'absolute path',
 *             'logFile': 'system.log',
 *             'maxFileSize': 10240,
 *             'level': Logger.LEVEL_INFO
 *         },
 *         'other': {...}
 *     },
 *     'flushInterval': 10
 * }
 * ```
 *
 */
class Log extends AbstractLog {

    private queue: LinkedQueue<any[]>;
    private isWriting: boolean = false;

    /**
     * absolute path of log file. default at runtime directory of the application
     */
    public logPath: string = Candy.getPathAlias('@runtime/logs');

    /**
     * log file name
     */
    public logFile: string = 'system.log';

    /**
     * maximum log file size in KB
     */
    public maxFileSize: number = 10240;

    /**
     * the log greater than the level will be dropped
     */
    public level: number = Logger.LEVEL_INFO;

    constructor(application) {
        super(application);

        this.queue = new LinkedQueue();
    }

    /**
     * @inheritdoc
     */
    public flush(messages: any[]): void {
        for(let i=0; i<messages.length; i++) {
            this.queue.add(messages[i]);
        }

        if(this.isWriting) {
            return;
        }
        this.isWriting = true;

        this.process();
    }

    /**
     * process log queue
     */
    private process() {
        let log = this.queue.take();

        if(null === log) {
            this.isWriting = false;
            return;
        }

        // 检查目录
        fs.access(this.logPath, fs.constants.R_OK | fs.constants.W_OK, (error) => {
            if(null === error) {
                this.writeLog(log);

                return;
            }

            FileHelper.createDirectory(this.logPath, 0o777, () => {
                this.writeLog(log);
            });
        });
    }

    /**
     * 写日志
     */
    private writeLog(message: any[]): void {
        let msg = this.formatMessage(message);
        let file = this.logPath + '/' + this.logFile;

        fs.access(file, fs.constants.F_OK, (error) => {
            // file not exists
            if(null !== error) {
                fs.writeFile(file, msg, () => {
                    // next log
                    this.process();
                });

                return;
            }

            // exists then check file size
            fs.stat(file, (err, stats) => {
                if(stats.size > this.maxFileSize * 1024) {
                    let newFile = file + TimeHelper.format('ymdhis');

                    fs.rename(file, newFile, (e) => {
                        if(null !== e) {
                            fs.appendFile(file, msg, () => {
                                this.process();
                            });
                        } else {
                            fs.writeFile(file, msg, () => {
                                this.process();
                            });
                        }
                    });

                    return;
                }

                fs.appendFile(file, msg, () => {
                    this.process();
                });
            });
        });
    }

    /**
     * 格式化内容
     */
    private formatMessage(message: any[]): string {
        // level
        if(message[1] > this.level) {
            return '';
        }

        let msg = '[' + Logger.getLevelName(message[1]) + ']'
            + ' [' + TimeHelper.format('y-m-d h:i:s', message[2]) + '] '
            + message[0]
            + '\n';

        return msg;
    }

}

export = Log;
