const Ajax = require('../../libs/Ajax');
const Posts = require('../../models/Posts');

class DeleteController {
    run(req, res) {
        const data = req.body;

        if(!data.id) {
            Ajax.toString(res, null, 1, 'id 获取失败');
            return;
        }

        this.delete(res, data.id);
    }

    async delete(res, pkid) {
        const model = new Posts();

        await model.delete(pkid);

        Ajax.toString(res, null);
    }
}

module.exports = DeleteController;
