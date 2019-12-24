// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const App = require('../web/Application');

const app = new App({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,

    'interceptAll': 'app/Intercept',

    'modules': {
        'bbs': 'app/modules/bbs'
    }
});
const server = new CandyJs(app).getServer();

// test mvc
describe('interceptRoutes', function() {
    it('a route', function(done) {
        request(server)
            .get('/aroute')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'intercepted');

                done();
            });
    });

    it('b route', function(done) {
        request(server)
            .get('/broute')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'intercepted');

                done();
            });
    });

});
