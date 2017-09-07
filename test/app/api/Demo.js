'use strict';

var CandyJs = require('CandyJs');
var Controller = CandyJs.Candy.include('y/web/Controller');

class Demo extends Controller {
    
    index(req, res) {
        res.end('restful class ok');
    }
    
}

module.exports = Demo;
