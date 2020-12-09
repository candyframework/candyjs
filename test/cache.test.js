const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const App = require('../rest/Application');
const Cache = require('../cache/Cache');

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
const msg = 'hello cache with async await';
app.get('/cache', async (req, res) => {
    let c = Cache.getCache('file');

    await c.set('mykey', msg);
    let data = await c.get('mykey');

    res.end(data);
});

const js = new CandyJs(app);
const server = js.getServer();


describe('Cache', function() {
    it('set & get', function(done) {
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
