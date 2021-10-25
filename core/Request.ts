/**
 * @author afu
 * @license MIT
 */

/**
 * server request
 */
class Request {

    public request: any;
    private scriptFile: string = '';

    constructor(request: any) {
        this.request = request;
    }

    /**
     * 返回入口文件
     *
     * @return {String}
     */
    public getScriptFile(): string {
        if ('' === this.scriptFile) {
            this.scriptFile = require.main.filename;
        }

        return this.scriptFile;
    }

}

export = Request;
