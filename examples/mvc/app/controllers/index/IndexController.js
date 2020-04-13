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

        this.getView().getTemplate('index', (err, temp) => {
            // 这里可以使用第三方的模板引擎进行处理
            let str = '';
            for(let i=0, len=data.length; i<len; i++) {
                str += `<p><a href="/user?uid=${data[i].id}">${data[i].name}</a></p>`;
            }
            temp = temp.replace('{data}', str);

            res.end(temp);
        });
    }
}

module.exports = IndexController;
