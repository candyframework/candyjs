// node >= 6.0.0

var request = require('supertest');
var assert = require('assert');

var CandyJs = require('../index.js');

var app = new CandyJs({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,
    
    'interceptAll': 'app/Intercept',
    
    'modules': {
        'bbs': 'app/modules/bbs'
    }
});
var server = app.getServer();

// test mvc
describe('interceptRoutes', function() {
    it('a route', function(done) {
        request(server)
            .get('/aroute')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text, 'intercepted');
                
                done();
            });
    });
    
    it('b route', function(done) {
        request(server)
            .get('/broute')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                
                assert.equal(res.text, 'intercepted');
                
                done();
            });
    });
    
});
