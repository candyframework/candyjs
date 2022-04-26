"use strict";
const http = require("http");
const Hook = require("./core/Hook");
/**
 * 入口
 */
class CandyJs {
    constructor(application) {
        /**
         * http server
         */
        this.server = null;
        this.app = application;
    }
    // web
    requestListener(req, res) {
        try {
            this.app.requestListener(req, res);
        }
        catch (e) {
            this.app.handlerException(e, res);
        }
    }
    // handler
    handler(req, res) {
        new Hook().trigger(req, res, (request, response) => {
            this.requestListener(request, response);
        });
    }
    /**
     * 获取 http server
     *
     * @return {http.Server}
     */
    getServer() {
        return http.createServer(this.handler.bind(this));
    }
    /**
     * listen
     *
     * If you want to create HTTPS server you can do so as shown here
     *
     * ```
     * const https = require('https');
     * const CandyJs = require('candyjs');
     *
     * const main = new CandyJs({ ... });
     * https.createServer({ ... }, main.handler.bind(main)).listen(443);
     * ```
     *
     */
    listen(...args) {
        this.server = this.getServer();
        this.server.listen(...args);
    }
}
module.exports = CandyJs;
