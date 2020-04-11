const TestModel = require('../../models/Test');
const Candy = require('../../../../../Candy');

// 加载系统控制器
const Controller = Candy.include('candy/web/Controller');
const Request = Candy.include('candy/web/Request');

class IndexController extends Controller {
    run(req, res) {
        let uid = Request.getQueryString(req, 'uid');

        this.getView().getTemplate('index', (err, temp) => {
            temp = temp.replace('{uid}', uid);

            res.end(temp);
        });
    }
}

module.exports = IndexController;
