const assert = require('assert');

const RegExpRouter = require('../utils/RegExpRouter');

const routes = [
    { route: '/home', handler: () => {} },
    { route: '/user/{uid}', handler: (params) => {} }
];

const reg = new RegExpRouter(routes);
reg.combineRoutes();

describe('router test', function() {
    it('no parameters', function(done) {
        let ret = reg.exec('/home');
        assert.equal(ret.parameters, null);

        done();
    });

    it('with parameters', function(done) {
        let ret = reg.exec('/user/123');
        assert.equal(ret.parameters.uid, '123');

        done();
    });
});
