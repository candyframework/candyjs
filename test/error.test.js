// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const App = require('../rest/Application');

const app = new App({
    id: 1
});
// api
app.get('/test', function(req, res){
    setTimeout(() => {
        app.trigger('myerror', [res, 'error from customer']);
    }, 1000);
});
app.on('myerror', (params) => {
    const res = params[0];
    res.end(params[1]);
});


const candyJs = new CandyJs(app);
const server = candyJs.getServer();


// test restful api
describe('Test fire error', function() {
    it('request /test', function(done) {
        request(server)
            .get('/test')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'error from customer');

                done();
            });
    });

});
