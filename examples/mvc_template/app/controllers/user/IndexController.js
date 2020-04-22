const User = require('../../models/User');
const Candy = require('../../../../../Candy');

// 加载系统控制器
const Controller = Candy.include('candy/web/Controller');
const Request = Candy.include('candy/web/Request');
const Handlebars = require('handlebars');

class IndexController extends Controller {
    run(req, res) {
        let uid = Request.getQueryString(req, 'uid');

        this.fetchUser(res, parseInt(uid, 10));
    }

    async fetchUser(res, uid) {
        const user = new User();
        let data = await user.getUserById(uid);

        this.getView().getTemplateContent('index', (err, template) => {
            let compiled = Handlebars.compile(template);

            res.end( compiled({ info: JSON.stringify(data) }) );
        });
    }
}

module.exports = IndexController;
