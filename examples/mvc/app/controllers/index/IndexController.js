const TestModel = require('../../models/Test');
const Candy = require('../../../../../Candy');

// 加载系统控制器
const Controller = Candy.include('candy/web/Controller');

class IndexController extends Controller {
    run(req, res) {
        this.fetchList(res);
    }

    async fetchList(res) {
        const model = new TestModel();
        let data = await model.getData();

        this.getView().getTemplate('index', (err, temp) => {
            let str = '';
            for(let i=0, len=data.length; i<len; i++) {
                str += `<a href="/user?uid=${data[i].id}">${data[i].name}</a><br />`;
            }
            temp = temp.replace('{data}', str);

            res.end(temp);
        });
    }
}

module.exports = IndexController;
