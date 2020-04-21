const User = require('../../models/User');
const Candy = require('../../../../../Candy');

// 加载系统控制器
const Controller = Candy.include('candy/web/Controller');
const Request = Candy.include('candy/web/Request');
const CandyTemplate = require('../../../../../../candy-template');

class IndexController extends Controller {
    run(req, res) {
        let uid = Request.getQueryString(req, 'uid');

        this.fetchUser(res, parseInt(uid, 10));
    }

    async fetchUser(res, uid) {
        const user = new User();
        let data = await user.getUserById(uid);

        this.setView(new CandyTemplate(this.context));
        this.render('index', {
            info: JSON.stringify(data)
        });
    }
}

module.exports = IndexController;
