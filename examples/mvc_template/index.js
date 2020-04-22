const CandyJs = require('../..');
const App = require('../../web/Application');

const app = new App({
    'id': 'mvc',

    // 定义调试应用
    'debug': true,

    // 配置模板引擎
    'defaultView': 'app/libs/CandyTemplate',

    // 定义应用路径
    'appPath': __dirname + '/app'

});
new CandyJs(app).listen(2333, function(){
    console.log('listen on 2333');
});
