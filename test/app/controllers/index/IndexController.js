'use strict';

const Candy = require('../../../../Candy');
const Controller = Candy.include('candy/web/Controller');
const Request = Candy.include('candy/http/Request');

class IndexController extends Controller {

    run(req, res) {
        let p = new Request(req).getQueryString('p1');

        this.getView().getViewContent('index', (err, str) => {
            res.end(str.trim() + ' ' + p);
        });
    }

}

module.exports = IndexController;
