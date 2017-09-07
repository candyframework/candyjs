// node >= 6.0.0

var request = require('supertest');
var assert = require('assert');

var CandyJs = require('../index.js');

var app = new CandyJs({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,
    'useRestful': true
    ,'combineRoutes': true
});
var server = app.getServer();

var Restful = CandyJs.Candy.include('candy/web/Restful');
// api
Restful.get('/abc', function(req, res){
    res.end('get ok');
});
Restful.get('/abc/{id:\\d+}', function(req, res, id){
    res.end(String(id));
});
Restful.post('/def', function(req, res){
    res.end('post ok');
});
Restful.get('/xyz', 'app/api/Demo@index');

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
