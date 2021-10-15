// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const App = require('../web/Application');

const app = new App({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,

    'routesMap': {
        'customRoute': 'app/MyRouteHandler'
    },

    'modules': {
        'bbs': 'app/modules/bbs'
    }
});
const server = new CandyJs(app).getServer();


// test mvc
describe('MVC', () => {
    it('simple request test', (done) => {
        request(server)
            .get('/?p1=param1&p2=param2')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text.trim(), 'mvc param1');

                done();
            });
    });

    it('routesmap request test', (done) => {
        request(server)
            .get('/customRoute')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text.trim(), 'custom route data');

                done();
            });
    });

    it('module request test', (done) => {
        request(server)
            .get('/bbs')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text.trim(), 'bbs module');

                done();
            });
    });

});
