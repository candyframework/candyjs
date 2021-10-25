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
        this.scriptFile = '';
        this.request = request;
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
