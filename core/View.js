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
        /**
         * 默认视图文件后缀
         */
        this.defaultExtension = '.html';
        this.context = context;
    }
    /**
     * 查找视图文件路径
     *
     * @param {String} view 视图名
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
     * 读取视图文件内容
     *
     * @param {String} view 视图名
     * @param {Function} callback 回调函数
     */
    getViewContent(view, callback) {
        let file = this.findViewFile(view);
        fs.readFile(file, Candy.app.encoding, callback);
    }
    /**
     * 读取视图文件内容
     *
     * @param {String} file 视图文件路径
     * @param {Function} callback 回调函数
     */
    getFileContent(file, callback) {
        fs.readFile(file, Candy.app.encoding, callback);
    }
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
