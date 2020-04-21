const CandyJs = require('../../index');
const App = require('../../web/Application');

const app = new App({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,

    'interceptAll': 'app/Intercept'
});
new CandyJs(app).listen(2333, () => {
    console.log('listen on 2333');
})
