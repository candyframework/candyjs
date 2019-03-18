'use strict';

var CandyJs = require('../../../../index');
var Controller = CandyJs.Candy.include('candy/web/Controller');

class IndexController extends Controller {
    
    run(req, res) {
        this.getView().getTemplate('index', (err, str) => {
            res.end(str);
        });
    }
    
}

module.exports = IndexController;
