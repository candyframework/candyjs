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
 * 按天分割的日志
 *
 * ```
 * 'log': {
 *     'targets': {
 *         'rotateLog': {
 *             'classPath': 'candy/log/file/DailyRotateLog',
 *             'logPath': 'absolute path',
 *             'logFile': 'system.log',
 *             'level': Logger.LEVEL_INFO
 *         }
 *     },
 *     'flushInterval': 1
 * }
 * ```
 *
 */
class DailyRotateLog extends AbstractLog {

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
     * rotate date format
     */
    public dateFormat: string = 'ymd';

    constructor(application) {
        super(application);

        this.queue = new LinkedQueue();
    }

    /**
     * @inheritdoc
     */
    public flush(messages: any[]): void {
        for(let i=0; i<messages.length; i++) {
            if(messages[i][1] <= this.level) {
                this.queue.add(messages[i]);
            }
        }

        if(this.isWriting) {
            return;
        }
        this.isWriting = true;

        this.process();
    }

    /**
     * 处理队列
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

            FileHelper.createDirectory(this.logPath, this.directoryMode, () => {
                this.writeLog(log);
            });
        });
    }

    /**
     * 写日志
     */
    private writeLog(message: any[]): void {
        let msg = this.formatMessage(message);
        let file = this.logPath + '/' + this.logFile + TimeHelper.format(this.dateFormat);

        fs.access(file, fs.constants.F_OK, (error) => {
            // file not exists
            if(null !== error) {
                fs.writeFile(file, msg, () => {
                    // next log
                    this.process();
                });

                return;
            }

            fs.appendFile(file, msg, () => {
                this.process();
            });
        });
    }

    /**
     * 格式化内容
     */
    private formatMessage(message: any[]): string {
        let msg = '[' + Logger.getLevelName(message[1]) + ']'
            + ' [' + TimeHelper.format('y-m-d h:i:s', message[2]) + '] '
            + message[0]
            + '\n';

        return msg;
    }

}

export = DailyRotateLog;
