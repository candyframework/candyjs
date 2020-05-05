const Request = require('candyjs/web/Request');
const Ajax = require('../../libs/Ajax');
const Posts = require('../../models/Posts');

class ListController {
    run(req, res) {
        let page = Request.getQueryString(req, 'page', '');
        let pageSize = Request.getQueryString(req, 'page_size', '');

        if(!page) {
            page = 1;
        }
        if(!pageSize) {
            pageSize = 20;
        }

        this.fetchList(res, parseInt(page, 10), parseInt(pageSize, 10));
    }

    async fetchList(res, page, pageSize) {
        let model = new Posts();

        let list = await model.getListByPage(
            'id, title, post_time',
            'status=1',
            page,
            pageSize);

        let total = await model.count('status=1');

        Ajax.toString(res, {
            data: list,
            page_size: pageSize,
            page: page,
            total: total
        });
    }
}

module.exports = ListController;
