"use strict";
const fs = require("fs");
const Candy = require("../../Candy");
const Logger = require("../Logger");
const AbstractLog = require("../AbstractLog");
const FileHelper = require("../../helpers/FileHelper");
const TimeHelper = require("../../helpers/TimeHelper");
const LinkedQueue = require("../../utils/LinkedQueue");
class Log extends AbstractLog {
    constructor(application) {
        super(application);
        this.isWriting = false;
        this.logPath = Candy.getPathAlias('@runtime/logs');
        this.logFile = 'system.log';
        this.maxFileSize = 10240;
        this.queue = new LinkedQueue();
    }
    flush(messages) {
        for (let i = 0; i < messages.length; i++) {
            if (messages[i][1] <= this.level) {
                this.queue.add(messages[i]);
            }
        }
        if (this.isWriting) {
            return;
        }
        this.isWriting = true;
        this.process();
    }
    process() {
        let log = this.queue.take();
        if (null === log) {
            this.isWriting = false;
            return;
        }
        fs.access(this.logPath, fs.constants.R_OK | fs.constants.W_OK, (error) => {
            if (null === error) {
                this.writeLog(log);
                return;
            }
            FileHelper.createDirectory(this.logPath, this.directoryMode, () => {
                this.writeLog(log);
            });
        });
    }
    writeLog(message) {
        let msg = this.formatMessage(message);
        let file = this.logPath + '/' + this.logFile;
        fs.access(file, fs.constants.F_OK, (error) => {
            if (null !== error) {
                fs.writeFile(file, msg, () => {
                    this.process();
                });
                return;
            }
            fs.stat(file, (err, stats) => {
                if (stats.size > this.maxFileSize * 1024) {
                    let newFile = file + TimeHelper.format('ymdhis');
                    fs.rename(file, newFile, (e) => {
                        if (null !== e) {
                            fs.appendFile(file, msg, () => {
                                this.process();
                            });
                        }
                        else {
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
    formatMessage(message) {
        let msg = '[' + Logger.getLevelName(message[1]) + ']'
            + ' [' + TimeHelper.format('y-m-d h:i:s', message[2]) + '] '
            + message[0]
            + '\n';
        return msg;
    }
}
module.exports = Log;
