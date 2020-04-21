'use strict';

var Candy = require('../../../../Candy');
var Controller = Candy.include('candy/web/Controller');

class IndexController extends Controller {

    run(req, res) {
        this.getView().getTemplateContent('index', (err, str) => {
            res.end(str);
        });
    }

}

module.exports = IndexController;
