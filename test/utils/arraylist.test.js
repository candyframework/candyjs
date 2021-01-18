const assert = require('assert');
const ArrayList = require('../../utils/ArrayList');

const list = new ArrayList();


// test
describe('ArrayList: ', function() {
    it('add test', function(done) {
        list.add('a');
        list.add('b');
        list.add('c');

        assert.equal(list.get(2), 'c');

        done();
    });

    it('remove test', function(done) {
        list.remove('a');

        assert.equal(list.get(0), 'b');

        done();
    });

    it('removeAt test', function(done) {
        list.removeAt(0);

        assert.equal(list.get(0), 'c');

        done();
    });

    it('readd test', function(done) {
        list.add('x');
        list.add('y');
        list.add('z');

        assert.equal(list.get(1), 'x');

        done();
    });

    it('length test', function(done) {
        assert.equal(list.size(), 4);

        done();
    });
});
