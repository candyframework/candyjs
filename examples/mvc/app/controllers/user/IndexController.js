const User = require('../../models/User');
const Candy = require('../../../../../Candy');

// 加载系统控制器
const Controller = Candy.include('candy/web/Controller');
const Request = Candy.include('candy/web/Request');

class IndexController extends Controller {
    run(req, res) {
        let uid = Request.getQueryString(req, 'uid');

        this.fetchUser(res, parseInt(uid, 10));
    }
    
    async fetchUser(res, uid) {
        const user = new User();
        let data = await user.getUserById(uid);
        
        this.getView().getTemplate('index', (err, temp) => {
            temp = temp.replace('{info}', JSON.stringify(data));

            res.end(temp);
        });
    }
}

module.exports = IndexController;
