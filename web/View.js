"use strict";
/**
 * @author afu
 * @license MIT
 */
const CoreView = require("../core/View");
/**
 * web 视图
 */
class View extends CoreView {
    constructor(context) {
        super(context);
    }
    /**
     * @inheritdoc
     */
    renderFile(file, parameters) {
        this.context.response.write('View must implements the renderFile() method');
        return this.context.response.end();
    }
}
module.exports = View;
