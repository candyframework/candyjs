'use strict';

var CandyJs = require('CandyJs');
var Controller = CandyJs.Candy.include('candy/web/Controller');

class IndexController extends Controller {
    
    run(req, res) {
        res.end('mvc ok');
    }
    
}

module.exports = IndexController;
