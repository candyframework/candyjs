/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
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
