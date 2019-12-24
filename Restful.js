/**
 * @author
 * @license MIT
 */
'use strict';

const CandyJs = require('./index');

class Restful extends CandyJs {
    constructor(application) {
        super(application);
    }

    /**
     * get
     */
    get(pattern, handler) {
        this.app.addRoute('GET', pattern, handler);
    }

    /**
     * post
     */
    post(pattern, handler) {
        this.app.addRoute('POST', pattern, handler);
    }

    /**
     * put
     */
    put(pattern, handler) {
        this.app.addRoute('PUT', pattern, handler);
    }

    /**
     * delete
     */
    delete(pattern, handler) {
        this.app.addRoute('DELETE', pattern, handler);
    }

    /**
     * patch
     */
    patch(pattern, handler) {
        this.app.addRoute('PATCH', pattern, handler);
    }

    /**
     * head
     */
    head(pattern, handler) {
        this.app.addRoute('HEAD', pattern, handler);
    }

    /**
     * options
     */
    options(pattern, handler) {
        this.app.addRoute('OPTIONS', pattern, handler);
    }
}

module.exports = Restful;
