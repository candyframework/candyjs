// node >= 6.0.0

const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const App = require('../web/Application');

const app = new App({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,

    'translator': {
        'mytype': {
            classPath: 'candy/i18n/Translator',
            basePath: __dirname + '/app/i18n'
        }
    }
});
const server = new CandyJs(app).getServer();

// test mvc
describe('I18N', function() {
    it('zh-CN', function(done) {
        request(server)
            .get('/i18n?lang=cn')
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text.trim(), '你好 世界');

                done();
            });
    });

    it('en-US', function(done) {
        request(server)
            .get('/i18n?lang=en')
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text.trim(), 'hello world');

                done();
            });
    });

    it('en-US', function(done) {
        request(server)
            .get('/i18n?param=123&lang=en')
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text.trim(), 'hello world123');

                done();
            });
    });
});
