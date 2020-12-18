'use strict';

var Candy = require('../../../../Candy');
var Controller = Candy.include('candy/web/Controller');

class IndexController extends Controller {

    beforeAction(actionEvent) {
        actionEvent.valid = false;

        setTimeout(() => {
            this.myrun(actionEvent.request, actionEvent.response);
        }, 1000);
    }

    myrun(req, res) {
        res.end('before action call');
    }

}

module.exports = IndexController;
