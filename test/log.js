const Candy = require('../Candy');

const config = {
    'targets': {
        'file': {
            'classPath': 'candy/log/file/Log',
            'logPath': __dirname + '/tmp_logs',
            'logFile': 'system.log',
            'maxFileSize': 1  // 1KB
        }
    },
    'flushInterval': 1
};
const Logger = Candy.include('candy/log/Logger');
const log = Logger.newInstance(config);

// 写日志
log.error('这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容 这是一条超过 1 KB 的内容');

