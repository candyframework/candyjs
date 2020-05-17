/**
 * @author afu
 * @license MIT
 */
'use strict';

/**
 * server response
 */
class Response {

    /**
     * constructor
     *
     * @param {Object} response
     */
    constructor(response) {
        this.response = response;
    }

    /**
     * sends data to client and end response
     *
     * @param {String | Buffer} content
     */
    send(content) {}

}

module.exports = Response;
