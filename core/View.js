"use strict";
/**
 * @author afu
 * @license MIT
 */
const fs = require("fs");
const Candy = require("../Candy");
/**
 * 视图
 */
class View {
    constructor(context) {
        this.context = context;
        this.defaultExtension = '.html';
    }
    /**
     * 查找视图文件路径
     *
     * @param {String} view 视图文件名
     * @return {String} 视图文件路径
     */
    findViewFile(view) {
        if ('@' === view.charAt(0)) {
            return Candy.getPathAlias(view) + this.defaultExtension;
        }
        let app = Candy.app;
        let context = this.context;
        // 模块无子目录 普通控制器有子目录
        if ('' !== context.moduleId) {
            return app.modules[context.moduleId]
                + '/views/'
                + view + this.defaultExtension;
        }
        return app.getAppPath()
            + '/views/'
            + context.viewPath
            + '/'
            + view + this.defaultExtension;
    }
    /**
     * 读取视图文件
     *
     * @deprecated since 4.2.1 请使用 getViewContent
     * @param {String} view 视图文件名
     * @param {any} callback 回调函数
     */
    getTemplateContent(view, callback) {
        this.getViewContent(view, callback);
    }
    /**
     * 读取视图文件
     *
     * @since 4.2.1
     * @param {String} view 视图文件名
     * @param {Function} callback 回调函数
     */
    getViewContent(view, callback) {
        let file = this.findViewFile(view);
        fs.readFile(file, Candy.app.encoding, callback);
    }
    /**
     * 渲染文件
     *
     * 模板渲染入口 模板引擎必须实现这个方法
     *
     * @param {String} file 文件路径
     * @param {any} parameters 参数
     */
    renderFile(file, parameters) { }
    /**
     * 渲染视图文件
     *
     * @param {String} view 视图名
     * @param {any} parameters 参数
     */
    render(view, parameters = null) {
        let file = this.findViewFile(view);
        return this.renderFile(file, parameters);
    }
}
module.exports = View;
