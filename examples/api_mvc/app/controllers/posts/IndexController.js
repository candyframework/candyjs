const Request = require('candyjs/web/Request');
const Ajax = require('../../libs/Ajax');
const Posts = require('../../models/Posts');

// 获取一条记录
class IndexController {
    run(req, res) {
        let id = Request.getQueryString(req, 'id', '');

        if(!id) {
            Ajax.toString(res, null, 404);
            return;
        }

        this.fetchData(res, id);
    }

    async fetchData(res, id) {
        let model = new Posts();

        let data = await model.getOne('id, title, content, post_time', id);

        Ajax.toString(res, {
            data: data
        });
    }
}

module.exports = IndexController;
