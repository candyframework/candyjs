const Ajax = require('../../libs/Ajax');
const Posts = require('../../models/Posts');

class UpdateController {
    run(req, res) {
        const data = req.body;

        if(!data.id) {
            Ajax.toString(res, null, 1, 'id 获取失败');
            return;
        }
        if(!data.uid) {
            Ajax.toString(res, null, 2, '用户获取失败');
            return;
        }
        if(!data.title) {
            Ajax.toString(res, null, 3, '标题不能为空');
            return;
        }
        if(!data.content) {
            Ajax.toString(res, null, 4, '标题不能为空');
            return;
        }

        this.update(res, data.id, {
            uid: data.uid,
            title: decodeURIComponent(data.title),
            content: decodeURIComponent(data.content),
            update_time: Math.floor(Date.now() / 1000)
        });
    }

    async update(res, id, data) {
        const model = new Posts();

        await model.update(id, data);

        Ajax.toString(res, null);
    }
}

module.exports = UpdateController;
