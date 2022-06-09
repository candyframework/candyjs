"use strict";
class Request {
    constructor(request) {
        this.scriptFile = '';
        this.request = request;
    }
    getScriptFile() {
        if ('' === this.scriptFile) {
            this.scriptFile = require.main.filename;
        }
        return this.scriptFile;
    }
}
module.exports = Request;
