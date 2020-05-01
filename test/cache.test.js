const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index.js');
const App = require('../web/RestApplication.js');
const Cache = require('../cache/Cache.js');

const app = new App({
    id: 1,
    cache: {
        'file': {
            'classPath': 'candy/cache/file/Cache',
            'cachePath': __dirname + '/tmp_cache'
        }
    }
});


// api
const msg = 'hello cache';
app.get('/cache', (req, res) => {
    let c = Cache.getCache('file');
    c.setSync('mykey', msg);

    c.get('mykey', (err, data) => {
        res.end(data);
    });
});

const js = new CandyJs(app);
const server = js.getServer();

// test restful api
describe('RESTful api', function() {
    it('simple get', function(done) {
        request(server)
            .get('/cache')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);

                assert.equal(res.text, msg);

                done();
            });
    });
});
