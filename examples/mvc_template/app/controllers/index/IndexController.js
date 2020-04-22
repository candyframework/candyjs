const User = require('../../models/User');
const Candy = require('../../../../../Candy');

// 加载系统控制器
const Controller = Candy.include('candy/web/Controller');
const Handlebars = require('handlebars');

class IndexController extends Controller {
    run(req, res) {
        this.fetchList(res);
    }

    async fetchList(res) {
        const user = new User();
        let data = await user.getUserList();

        this.getView().getTemplateContent('index', (err, template) => {
            let compiled = Handlebars.compile(template);

            res.end( compiled({ list: data }) );
        });
    }
}

module.exports = IndexController;
