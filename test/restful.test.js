// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const App = require('../web/RestApplication');

const app = new App({
    id: 1,
    appPath: __dirname + '/app'
});
// api
app.get('/abc', function(req, res){
    res.end('get ok');
});
app.get('/abc/{id:\\d+}', function(req, res, id){
    res.end(String(id));
});
app.post('/def', function(req, res){
    res.end('post ok');
});
app.get('/xyz', 'app/api/Demo@index');


const candyJs = new CandyJs(app);
const server = candyJs.getServer();


// test restful api
describe('RESTful api', function() {
    it('simple get', function(done) {
        request(server)
            .get('/abc')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'get ok');

                done();
            });
    });

    it('get with param', function(done) {
        request(server)
            .get('/abc/123')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, '123');

                done();
            });
    });

    it('simple post', function(done) {
        request(server)
            .post('/def')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'post ok');

                done();
            });
    });
        // request(server)
            // .get('/abc')
            // .expect(200)
            // .end(function(err, res){
                // if (err) return done(err);

                // assert.equal(res.text, 'get ok');

                // done();
            // });
    // });

    // it('get with param', function(done) {
        // request(server)
            // .get('/abc/123')
            // .expect(200)
            // .end(function(err, res){
                // if (err) return done(err);

                // assert.equal(res.text, '123');

                // done();
            // });
    // });

    // it('simple post', function(done) {
        // request(server)
            // .post('/def')
            // .expect(200)
            // .end(function(err, res){
                // if (err) return done(err);

                // assert.equal(res.text, 'post ok');

                // done();
            // });
    // }); */

    it('simple class get', function(done) {
        request(server)
            .get('/xyz')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'restful class ok');

                done();
            });
    });

});
