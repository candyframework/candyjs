'use strict';

const Candy = require('../../../../../Candy');
const Controller = Candy.include('candy/web/Controller');

class IndexController extends Controller {
    run(req, res) {
        this.getView().getViewContent('index', (err, str) => {
            res.end(str);
        });
    }
}

module.exports = IndexController;
