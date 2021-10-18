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
        this._scriptFile = '';
    }
    /**
     * 返回入口文件
     *
     * @return {String}
     */
    getScriptFile() {
        if ('' === this._scriptFile) {
            this._scriptFile = require.main.filename;
        }
        return this._scriptFile;
    }
}
module.exports = Request;
