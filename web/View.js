/**
 * @author
 * @license MIT
 */
'use strict';

const fs = require('fs');

const Candy = require('../Candy');
const CoreView = require('../core/View');

/**
 * 视图
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
    getTemplateFilePath(view) {
        var app = Candy.app;
        var context = this.context;

        // 模块无子目录 普通控制器有子目录
        if('' !== context.moduleId) {
            return app.modules[context.moduleId]
                + '/views/'
                + view + View.defaultViewExtension;
        }

        return app.getAppPath()
            + '/views/'
            + context.subRoute
            + '/'
            + view + View.defaultViewExtension;
    }

    /**
     * @inheritdoc
     */
    getTemplate(view, callback) {
        var path = this.getTemplateFilePath(view);

        fs.readFile(path, Candy.app.encoding, callback);
    }

    /**
     * @inheritdoc
     */
    getTemplateFromPath(path, callback) {
        fs.readFile(path, Candy.app.encoding, callback);
    }

}

module.exports = View;
