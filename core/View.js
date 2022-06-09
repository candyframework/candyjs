"use strict";
const fs = require("fs");
const Candy = require("../Candy");
class View {
    constructor(context) {
        this.defaultExtension = '.html';
        this.context = context;
    }
    findViewFile(view) {
        if ('@' === view.charAt(0)) {
            return Candy.getPathAlias(view) + this.defaultExtension;
        }
        let context = this.context;
        let app = this.context.application;
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
    getViewContent(view, callback) {
        let file = this.findViewFile(view);
        fs.readFile(file, this.context.application.encoding, callback);
    }
    getFileContent(file, callback) {
        fs.readFile(file, this.context.application.encoding, callback);
    }
    render(view, parameters = null) {
        let file = this.findViewFile(view);
        return this.renderFile(file, parameters);
    }
}
module.exports = View;
