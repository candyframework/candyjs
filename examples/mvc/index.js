const CandyJs = require('../..');
const App = require('../../web/Application');

const app = new App({
    'id': 'mvc',

    // 定义调试应用
    'debug': true,

    // 定义应用路径
    'appPath': __dirname + '/app'

});
new CandyJs(app).listen(2333, function(){
    console.log('listen on 2333');
});
