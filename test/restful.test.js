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
app.get('/user/{id:\\d+}', function(req, res, params){
    res.end( 'number_' + params.id );
});
app.get('/user/{name}', function(req, res, params){
    res.end( 'str_' + params.name );
});
app.get('/user/{name}/{page}', function(req, res, params){
    res.end( params.name + '_' + params.page );
});
app.post('/posts/add', function(req, res){
    res.end('post ok');
});
app.get('/xyz', 'app/api/Demo@index');
app.get('/xyz/{id}', 'app/api/Demo@testParam');

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

    it('get with number param', function(done) {
        request(server)
            .get('/user/123')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'number_123');

                done();
            });
    });

    it('get with string param', function(done) {
        request(server)
            .get('/user/zhangsan')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'str_zhangsan');

                done();
            });
    });

    it('get with multi params', function(done) {
        request(server)
            .get('/user/zhangsan/1')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'zhangsan_1');

                done();
            });
    });

    it('simple post', function(done) {
        request(server)
            .post('/posts/add')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'post ok');

                done();
            });
    });

    it('class get', function(done) {
        request(server)
            .get('/xyz')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, 'restful class ok');

                done();
            });
    });

    it('class get with param', function(done) {
        request(server)
            .get('/xyz/123')
            //.expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, '123');

                done();
            });
    });

});
