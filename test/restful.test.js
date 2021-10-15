// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const App = require('../rest/Application');

const app = new App({
    id: 1,
    appPath: __dirname + '/app'
});

// api
app.get('/abc', (req, res) => {
    res.end('get ok');
});
app.get('/user/{id:\\d+}', (req, res, params) => {
    res.end( 'number_' + params.id );
});
app.get('/user/{name}', (req, res, params) => {
    res.end( 'str_' + params.name );
});
app.get('/user/{name}/{page}', (req, res, params) => {
    res.end( params.name + '_' + params.page );
});
app.post('/posts/add', (req, res) => {
    res.end('post ok');
});
app.get('/xyz', 'app/api/Demo@index');
app.get('/xyz/{id}', 'app/api/Demo@testParam');

const candyJs = new CandyJs(app);
const server = candyJs.getServer();


// test restful api
describe('RESTful', () => {
    it('simple request test', (done) => {
        request(server)
            .get('/abc')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'get ok');

                done();
            });
    });

    it('with number param request test', (done)  => {
        request(server)
            .get('/user/123')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'number_123');

                done();
            });
    });

    it('with string param request test', (done) => {
        request(server)
            .get('/user/zhangsan')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'str_zhangsan');

                done();
            });
    });

    it('multi params request test', (done) => {
        request(server)
            .get('/user/zhangsan/1')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'zhangsan_1');

                done();
            });
    });

    it('simple post', (done) => {
        request(server)
            .post('/posts/add')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'post ok');

                done();
            });
    });

    it('use class', (done) => {
        request(server)
            .get('/xyz')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, 'restful class ok');

                done();
            });
    });

    it('use class and param', (done) => {
        request(server)
            .get('/xyz/123')
            .end((err, res) => {
                if (err) return done(err);

                assert.equal(res.text, '123');

                done();
            });
    });

});
