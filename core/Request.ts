/**
 * @author afu
 * @license MIT
 */

/**
 * server request
 */
class Request {

    public request: any;
    private _scriptFile: string;

    constructor(request: any) {
        this.request = request;

        this._scriptFile = '';
    }

    /**
     * 返回入口文件
     *
     * @return {String}
     */
    public getScriptFile(): string {
        if ('' === this._scriptFile) {
            this._scriptFile = require.main.filename;
        }

        return this._scriptFile;
    }

}

export = Request;
