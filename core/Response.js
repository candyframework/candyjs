"use strict";
/**
 * @author afu
 * @license MIT
 */
/**
 * server response
 */
class Response {
    constructor(response) {
        this.response = response;
    }
    /**
     * sends data to client and end response
     *
     * @param {String} content 内容
     */
    send(content = '') { }
}
module.exports = Response;
