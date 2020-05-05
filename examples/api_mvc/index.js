const CandyJs = require('candyjs');
const bodyParser = require('body-parser');

const App = require('candyjs/web/Application');
const Hook = require('candyjs/core/Hook');

Hook.addHook(bodyParser.json());

const app = new App({
    'id': 1,

    // 定义调试应用
    'debug': false,

    // 定义应用路径
    'appPath': __dirname + '/app',

    // 配置日志
    'log': {
        'targets': {
            'file': {
                'classPath': 'candy/log/file/Log',
                'logPath': __dirname + '/logs',
            }
        }
    },

    'db': {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mydatabase'
    },

    exceptionHandler: 'app/ExceptionHandler'
});
new CandyJs(app).listen(2333, function(){
    console.log('listen on 2333');
});
