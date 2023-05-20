"use strict";
const fs = require("fs");
const Candy = require("../../Candy");
const Logger = require("../Logger");
const AbstractLog = require("../AbstractLog");
const FileHelper = require("../../helpers/FileHelper");
const TimeHelper = require("../../helpers/TimeHelper");
class Log extends AbstractLog {
    constructor(application) {
        super(application);
        this.logPath = Candy.getPathAlias('@runtime/logs');
        this.logFile = 'system.log';
        this.maxFileSize = 10240;
        this.level = Logger.LEVEL_INFO;
    }
    flush(messages) {
        fs.access(this.logPath, fs.constants.R_OK | fs.constants.W_OK, (error) => {
            if (null === error) {
                this.writeLog(messages);
                return;
            }
            FileHelper.createDirectory(this.logPath, 0o777, () => {
                this.writeLog(messages);
            });
        });
    }
    formatMessage(messages) {
        let msg = '';
        for (let i = 0, len = messages.length; i < len; i++) {
            if (messages[i][1] > this.level) {
                continue;
            }
            msg = msg
                + '[' + Logger.getLevelName(messages[i][1]) + ']'
                + ' [' + TimeHelper.format('y-m-d h:i:s', messages[i][2]) + '] '
                + messages[i][0]
                + '\n';
        }
        return msg;
    }
    writeLog(messages) {
        let msg = this.formatMessage(messages);
        let file = this.logPath + '/' + this.logFile;
        fs.access(file, fs.constants.F_OK, (error) => {
            if (null !== error) {
                fs.writeFile(file, msg, () => { });
                return;
            }
            fs.stat(file, (err, stats) => {
                if (stats.size > this.maxFileSize * 1024) {
                    let newFile = file + TimeHelper.format('ymdhis');
                    fs.rename(file, newFile, (e) => {
                        if (null !== e) {
                            fs.appendFile(file, msg, () => { });
                        }
                        else {
                            fs.writeFile(file, msg, () => { });
                        }
                    });
                    return;
                }
                fs.appendFile(file, msg, () => { });
            });
        });
    }
}
module.exports = Log;
