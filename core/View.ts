/**
 * @author afu
 * @license MIT
 */
import fs = require('fs');

import Candy = require('../Candy');

/**
 * 视图
 */
class View {

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
     * @param {String} view 视图文件名
     * @return {String} 视图文件路径
     */
    public findViewFile(view: string): string {
        if('@' === view.charAt(0)) {
            return Candy.getPathAlias(view) + this.defaultExtension;
        }

        let app = Candy.app;
        let context = this.context;

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
     * 读取视图文件
     *
     * @param {String} view 视图文件名
     * @param {Function} callback 回调函数
     */
    public getViewContent(view: string, callback: any): void {
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
    public renderFile(file: string, parameters: any): any {}

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

}

export = View;
