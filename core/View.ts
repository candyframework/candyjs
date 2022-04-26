/**
 * @author afu
 * @license MIT
 */
import fs = require('fs');

import Candy = require('../Candy');

/**
 * 视图
 */
abstract class View {

    /**
     * 上下文环境
     */
    public context: any;

    /**
     * 默认视图文件后缀
     */
    public defaultExtension: string = '.html';

    constructor(context: any) {
        this.context = context;
    }

    /**
     * 查找视图文件路径
     *
     * @param {String} view 视图名
     * @return {String} 视图文件路径
     */
    public findViewFile(view: string): string {
        if('@' === view.charAt(0)) {
            return Candy.getPathAlias(view) + this.defaultExtension;
        }

        let context = this.context;
        let app = this.context.application;

        // 模块无子目录 普通控制器有子目录
        if('' !== context.moduleId) {
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
    public getViewContent(view: string, callback: any): void {
        let file = this.findViewFile(view);

        fs.readFile(file, this.context.application.encoding, callback);
    }

    /**
     * 读取视图文件内容
     *
     * @param {String} file 视图文件路径
     * @param {Function} callback 回调函数
     */
    public getFileContent(file: string, callback: any): void {
        fs.readFile(file, this.context.application.encoding, callback);
    }

    /**
     * 渲染视图文件
     *
     * @param {String} view 视图名
     * @param {any} parameters 参数
     */
    public render(view: string, parameters: any = null): any {
        let file = this.findViewFile(view);

        return this.renderFile(file, parameters);
    }

    /**
     * 渲染文件
     *
     * 模板渲染入口
     *
     * @param {String} file 文件路径
     * @param {any} parameters 参数
     */
    public abstract renderFile(file: string, parameters: any): any;

}

export = View;
