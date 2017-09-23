/**
 * @author
 * @license MIT
 */
'use strict';

var fs = require('fs');

var Candy = require('../Candy');
var CoreView = require('../core/View');

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
        var path = '';
        
        // 模块无子目录 普通控制器有子目录
        if('' !== context.moduleId) {
            path = app.modules[context.moduleId]
                + '/views/'
                + view + View.defaultViewExtension;
            
        } else {
            path = app.getAppPath()
                + '/views/'
                + ('' === context.subRoute ? '.' : context.subRoute)
                + '/'
                + view + View.defaultViewExtension;
        }
        
        return path;
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
