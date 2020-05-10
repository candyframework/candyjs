'use strict';

var Candy = require('../../../../Candy');
var Controller = Candy.include('candy/web/Controller');

class IndexController extends Controller {

    beforeAction(req, res) {
        setTimeout(() => {
            this.run(req, res);
        }, 1000);

        return false;
    }

    run(req, res) {
        res.end('before action call');
    }

}

module.exports = IndexController;
