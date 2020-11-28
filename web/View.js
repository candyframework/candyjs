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
        this.context.response.write('View must implements the renderFile() method');
        return this.context.response.end();
    }

}

module.exports = View;
