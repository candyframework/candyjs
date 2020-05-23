const User = require('../../models/User');
const Candy = require('../../../../../Candy');

// 加载系统控制器
const Controller = Candy.include('candy/web/Controller');
const Request = Candy.include('candy/web/Request');

class IndexController extends Controller {
    // 动作执行前添加一个加过滤器
    // 过滤器添加了跨域 header 头信息
    behaviors() {
        return [
            ['cors', 'app/filters/Cors']
        ];
    }

    run(req, res) {
        let uid = Request.getQueryString(req, 'uid');

        this.fetchUser(res, parseInt(uid, 10));
    }

    async fetchUser(res, uid) {
        const user = new User();
        let data = await user.getUserById(uid);

        // 手动输出内容
        this.getView().getViewContent('index', (err, temp) => {
            temp = temp.replace('{info}', JSON.stringify(data));

            res.end(temp);
        });
    }
}

module.exports = IndexController;
