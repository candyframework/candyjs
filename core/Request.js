"use strict";
/**
 * @author afu
 * @license MIT
 */
/**
 * server request
 */
class Request {
    constructor(request) {
        this.request = request;
        this.scriptFile = '';
    }
    /**
     * 返回入口文件
     *
     * @return {String}
     */
    getScriptFile() {
        if ('' === this.scriptFile) {
            this.scriptFile = require.main.filename;
        }
        return this.scriptFile;
    }
}
module.exports = Request;
