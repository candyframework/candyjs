const User = require('../../models/User');
const Candy = require('../../../../../Candy');

// 加载系统控制器
const Controller = Candy.include('candy/web/Controller');

class IndexController extends Controller {
    run(req, res) {
        this.fetchList(res);
    }

    async fetchList(res) {
        const user = new User();
        let data = await user.getUserList();

        // 可以获取到模板引擎实例
        // 具体使用方式请参考 handlebars 模板引擎官方文档
        // const handlebars = this.getView().handlebars;
        // handlebars.todo

        // 这里的 render 将使用我们制定的模板引擎渲染页面
        this.render('index', {
            list: data
        });
    }
}

module.exports = IndexController;
