// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const Hook = require('../core/Hook');
const App = require('../rest/Application');

const app = new App({
    id: 1,
    debug: true,
    appPath: __dirname + '/app'
});

// hook
Hook.addHook((req, res, next) => {
    next();
});
Hook.addHook((req, res, next) => {
    setTimeout(() => {
        next();
    }, 1000);
});

// api
app.get('/path1', function(req, res){
    res.end('path1_rs');
});
app.get('/path2', function(req, res){
    res.end('path2_rs');
});


const candyJs = new CandyJs(app);
// candyJs.listen( 2333, () => {console.log('listened on 2333');} );
const server = candyJs.getServer();


// test
describe('Hook test: ', function() {
    it('get path1', function(done) {
        request(server)
            .get('/path1')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'path1_rs');

                done();
            });
    });

    it('get path2', function(done) {
        request(server)
            .get('/path2')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'path2_rs');

                done();
            });
    });
});
