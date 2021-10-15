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
describe('Intercept', () => {
    it('request route /abc', (done) => {
        request(server)
            .get('/abc')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'intercepted');

                done();
            });
    });

    it('request route /xyz', (done) => {
        request(server)
            .get('/xyz')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'intercepted');

                done();
            });
    });

});
