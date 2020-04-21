const User = require('../../models/User');
const Candy = require('../../../../../Candy');

// 加载系统控制器
const Controller = Candy.include('candy/web/Controller');
const CandyTemplate = require('../../../../../../candy-template');

class IndexController extends Controller {
    run(req, res) {
        this.fetchList(res);
    }

    async fetchList(res) {
        const user = new User();
        let data = await user.getUserList();

        this.setView(new CandyTemplate(this.context));
        this.render('index', {
            list: data
        });
    }
}

module.exports = IndexController;
