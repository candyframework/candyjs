'use strict';

var CandyJs = require('candyjs');
var Controller = CandyJs.Candy.include('candy/web/Controller');

class IndexController extends Controller {
    run(req, res) {
        this.getView().getTemplate('index', (err, str) => {
            console.log(str)
            
            res.end(str);
        });
    }
}

module.exports = IndexController;
