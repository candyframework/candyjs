/**
 * @author afu
 * @license MIT
 */
'use strict';

const CoreView = require('../core/View');

/**
 * web 视图
 */
class View extends CoreView {

    /**
     * constructor
     */
    constructor(context) {
        super(context);
    }

    /**
     * @inheritdoc
     */
    renderFile(file, parameters) {
        return this.context.response.end('View must implements the renderFile() method');
    }

}

module.exports = View;
