/**
 * @author
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
     * 渲染文件
     *
     * 这里是渲染模板的入口，模板引擎必须实现这个方法
     *
     * @param {String} file 文件路径
     * @param {Object} parameters 参数
     */
    renderFile(file, parameters) {
        this.context.response.end('View must implements the renderFile() method');
    }

}

module.exports = View;
