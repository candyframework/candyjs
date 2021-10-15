const assert = require('assert');
const LinkedList = require('../utils/LinkedList');

const list = new LinkedList();


// test
describe('LinkedList', () => {
    it('#add()', (done) => {
        list.add('a');
        list.add('b');
        list.add('c');

        assert.equal(list.get(2), 'c');

        done();
    });

    it('#remove()', (done) => {
        list.remove('a');

        assert.equal(list.get(0), 'b');

        done();
    });

    it('#removeAt()', (done) => {
        list.removeAt(0);

        assert.equal(list.get(0), 'c');

        done();
    });

    it('continue #add()', (done) => {
        list.add('x');
        list.add('y');
        list.add('z');

        assert.equal(list.get(1), 'x');

        done();
    });

    it('#size()', (done) => {
        assert.equal(list.size(), 4);

        done();
    });

});
