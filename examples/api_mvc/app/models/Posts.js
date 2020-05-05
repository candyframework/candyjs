const IModel = require('./IModel');

class Posts extends IModel {
    constructor() {
        super();

        this.table = 't_posts';
    }
}

module.exports = Posts;
