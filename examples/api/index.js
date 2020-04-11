const CandyJs = require('../../');
const App = require('../../web/RestApplication');
const Hook = require('../../core/Hook');

const app = new App({
    id: 'api',
    debug: true,
    appPath: __dirname + '/api'
});

// api
Hook.addHook((req, res, next) => {
    // The favicon.ico request may also be here
    console.log('filter request here');

    next();
});
app.get('/', function(req, res){
    res.end('homepage');
});
app.get('/user/{uid}', (req, res, params) => {
    res.end('user page: ' + params.uid);
});
// The 'app' segment of 'app/Posts@getData' based on the appPath config
app.get('/posts/{id}', 'app/Posts@getData');

new CandyJs(app).listen(2333, () => {
    console.log('listen on 2333')
});
