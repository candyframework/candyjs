'use strict';

var CandyJs = require('CandyJs');

class IndexController {
    run(req, res) {
        res.end('module ok');
    }
}

module.exports = IndexController;