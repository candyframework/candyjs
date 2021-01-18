const assert = require('assert');
const Stack = require('../../utils/Stack');

const s = new Stack();


// test
describe('Stack: ', function() {
    it('push test', function(done) {
        s.push('a');
        s.push('b');
        s.push('c');

        assert.equal(s.size(), 3);

        done();
    });

    it('pop test', function(done) {
        let ret = s.pop();

        assert.equal(ret, 'c');

        done();
    });
});
