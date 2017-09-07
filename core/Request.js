/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/**
 * server request
 */
class Request {
    
    /**
     * constructor
     *
     * @param {Object} request
     */
    constructor(request) {
        this.request = request;
        
        this._scriptFile = null;
    }
    
    /**
     * 返回入口文件名
     *
     * @return {String}
     */
    getScriptFile() {
        if (null === this._scriptFile) {
            this._scriptFile = process.mainModule.filename;
        }
        
        return this._scriptFile;
    }
    
}

module.exports = Request;
