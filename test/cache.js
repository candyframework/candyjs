// node >= 10.0.0

const request = require('supertest');
const assert = require('assert');

const CandyJs = require('../index');
const App = require('../web/Application');
const Cache = require('../cache/Cache');

const app = new App({
    'id': 1,
    'appPath': __dirname + '/app',
    'debug': true,

    'cache': {
        'fileCache': {
            classPath: 'candy/cache/file/Cache',
            cachePath: __dirname
        }
    }
});
const server = new CandyJs(app).getServer();


// test mvc
describe('Cache', () => {
    it('set-get', (done) => {
        let cache = Cache.getCache('fileCache');

        cache.set('mykey', 'this is cache data').then(() => {

            let data = cache.getSync('mykey');
            assert.equal(data, 'this is cache data');

            done();
        });
    });
});
