/**
 * @author afu
 * @license MIT
 */
'use strict';

/**
 * server request
 */
class Request {

    /**
     * constructor
     *
     * @param {any} request
     */
    constructor(request) {
        this.request = request;

        this._scriptFile = '';
    }

    /**
     * 返回入口文件名
     *
     * @return {String}
     */
    getScriptFile() {
        if ('' === this._scriptFile) {
            this._scriptFile = process.mainModule.filename;
        }

        return this._scriptFile;
    }

}

module.exports = Request;
