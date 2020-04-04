'use strict';

class Demo {

    index(req, res) {
        res.end('restful class ok');
    }

    testParam(req, res, params) {
        res.end(params.id);
    }
}

module.exports = Demo;
