/**
 * @author
 * @license MIT
 */
'use strict';

var fs = require('fs');

var Candy = require('../../Candy');
var Logger = require('../Logger');
var ITarget = require('../ITarget');
var FileHelper = require('../../helpers/FileHelper');
var TimeHelper = require('../../helpers/TimeHelper');

/**
 * 文件日志
 *
 * 'log': {
 *     'targets': {
 *         'file': {
 *             'class': 'candy/log/file/Target',
 *             'logPath': __dirname + '/logs'
 *         },
 *         'other': {...}
 *     },
 *     'flushInterval': 10
 * }
 *
 */
class Target extends ITarget {
    
    /**
     * constructor
     */
    constructor(config) {
        super();
        
        /**
         * @property {String} fileExtension 文件扩展名
         */
        this.fileExtension = undefined === config.fileExtension
            ? '.log'
            : config.fileExtension;
        
        /**
         * @property {String} 日志路径
         */
        this.logPath = undefined === config.logPath
            ? Candy.getPathAlias('@runtime/logs')
            : config.logPath;
        
        /**
         * @property {String} 日志文件名
         */
        this.logFile = undefined === config.logFile
            ? this.generateTimeLogFile()
            : config.logFile;
    }
    
    /**
     * @inheritdoc
     */
    flush(messages) {
        var msg = this.formatMessage(messages);
        var file = this.logPath + '/' + this.logFile;
        
        // 检查目录
        fs.access(this.logPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if(null === err) {
                fs.appendFile(file, msg, Candy.app.encoding, (err) => {});
                
                return;
            }
            
            FileHelper.createDirectory(this.logPath, 0o777, (err) => {
                fs.appendFile(file, msg, Candy.app.encoding, (err) => {});
            });
        });
    }
    
    /**
     * 生成日志文件名
     */
    generateTimeLogFile() {
        var date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + this.fileExtension;
    }
    
    /**
     * 格式化内容
     */
    formatMessage(messages) {
        var msg = '';
        for(let i=0,len=messages.length; i<len; i++) {
            msg += TimeHelper.format('y-m-d h:i:s', messages[i][2])
                + ' -- '
                + Logger.getLevelName(messages[i][1])
                + ' -- '
                + messages[i][0]
                + '\n';
        }
        
        return msg;
    }
}

module.exports = Target;
