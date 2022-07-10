// node >= 10.0.0

const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const Hook = require('../core/Hook');
const App = require('../rest/Application');

const app = new App({
    id: 1,
    debug: true
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
app.get('/path1', (req, res) => {
    res.end('path1 data');
});
app.get('/path2', (req, res) => {
    res.end('path2 data');
});

const candyJs = new CandyJs(app);
const server = candyJs.getServer();


// test
describe('Hook', () => {
    it('request /path1', (done) => {
        request(server)
            .get('/path1')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'path1 data');

                done();
            });
    });

    it('request /path2', (done) => {
        request(server)
            .get('/path2')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'path2 data');

                done();
            });
    });
});
