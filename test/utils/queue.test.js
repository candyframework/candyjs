const assert = require('assert');
const Q = require('../../utils/SingleLinkedQueue');

const q = new Q();


// test
describe('Queue: ', function() {
    it('take test', function(done) {
        q.add('a');
        q.add('b');
        q.add('c');
        let ret = q.take();

        assert.equal(ret, 'a');

        done();
    });

    it('remove test', function(done) {
        q.remove('c');

        assert.equal(q.size(), 1);

        done();
    });
});
