const Ajax = require('../../libs/Ajax');
const Posts = require('../../models/Posts');

class AddController {
    run(req, res) {
        const data = req.body;

        if(!data.uid) {
            Ajax.toString(res, null, 1, '用户获取失败');
            return;
        }
        if(!data.title) {
            Ajax.toString(res, null, 2, '标题不能为空');
            return;
        }
        if(!data.content) {
            Ajax.toString(res, null, 3, '标题不能为空');
            return;
        }

        const t = Math.floor(Date.now() / 1000);
        this.insert(res, {
            uid: data.uid,
            title: decodeURIComponent(data.title),
            content: decodeURIComponent(data.content),
            post_time: t,
            update_time: t
        });
    }

    async insert(res, data) {
        const model = new Posts();

        let insertId = await model.insert(data);

        Ajax.toString(res, null);
    }
}

module.exports = AddController;
