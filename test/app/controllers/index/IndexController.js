'use strict';

var Candy = require('../../../../Candy');
var Controller = Candy.include('candy/web/Controller');
var Request = Candy.include('candy/http/Request');

class IndexController extends Controller {

    run(req, res) {
        let p = new Request(req).getQueryString('p1');

        this.getView().getViewContent('index', (err, str) => {
            res.end(str.trim() + ' ' + p);
        });
    }

}

module.exports = IndexController;
