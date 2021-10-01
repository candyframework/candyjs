/**
 * @author afu
 * @license MIT
 */

/**
 * server response
 */
class Response {

    public response: any;

    constructor(response: any) {
        this.response = response;
    }

    /**
     * sends data to client and end response
     *
     * @param {String} content 内容
     */
    public send(content: string = ''): void {}

}

export = Response;
