// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const App = require('../rest/Application');

const app = new App({
    id: 1
});
// api
app.get('/test', (req, res) => {
    setTimeout(() => {
        app.trigger('myerror', [res, 'error from customer']);
    }, 50);
});
app.on('myerror', (params) => {
    const res = params[0];
    res.end(params[1]);
});

const candyJs = new CandyJs(app);
const server = candyJs.getServer();


// test restful api
describe('App', () => {
    it('trigger error', (done) => {
        request(server)
            .get('/test')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'error from customer');

                done();
            });
    });
});
