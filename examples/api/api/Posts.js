const Ajax = require('./Ajax');
const Db = require('./Db');

class Posts {
    getData(req, res, params) {
        this.fetchDb(req, res, params.id);
    }

    async fetchDb(req, res, id) {
        let data = await Db.getById(id);

        Ajax.toString(res, data);
    }
}

module.exports = Posts;
