const assert = require('assert');
const Stack = require('../utils/Stack');

const s = new Stack();


// test
describe('Stack', () => {
    it('#push()', (done) => {
        s.push('a');
        s.push('b');
        s.push('c');

        assert.equal(s.size(), 3);

        done();
    });

    it('#pop()', (done) => {
        let ret = s.pop();

        assert.equal(ret, 'c');

        done();
    });

});
