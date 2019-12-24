/**
 * @author
 * @license MIT
 */
'use strict';

const http = require('http');

const Hook = require('./core/Hook');

/**
 * 入口
 */
class CandyJs {

    /**
     * constructor
     *
     * @param {any} application 应用实例
     */
    constructor(application) {
        this.server = null;
        this.app = application;
    }

    // web
    requestListener(req, res) {
        try {
            this.app.requestListener(req, res);

        } catch(e) {
            this.app.handlerException(res, e);
        }
    }

    // handler
    handler(req, res) {
        Hook.getInstance().trigger(req, res, () => {
            this.requestListener(req, res);
        });
    }

    /**
     * 获取 http server
     *
     * @return http server
     */
    getServer() {
        return http.createServer(this.handler.bind(this));
    }

    /**
     * listen
     *
     * @param {Number} port
     * @param {Function} callback
     *
     * If you want to create HTTPS server you can do so as shown here
     *
     * ```
     * const https = require('https');
     * const CandyJs = require('candyjs');
     *
     * const app = new CandyJs({ ... });
     * https.createServer({ ... }, app.handler.bind(app)).listen(443);
     * ```
     *
     */
    listen(port, callback) {
        this.server = this.getServer();
        this.server.listen(port, callback);
    }

}

module.exports = CandyJs;
