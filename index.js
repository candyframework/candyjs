"use strict";
/**
 * @author afu
 * @license MIT
 */
const http = require("http");
const Hook = require("./core/Hook");
const Logger = require("./log/Logger");
const I18N = require("./i18n/I18N");
/**
 * 入口
 */
class CandyJs {
    /**
     * constructor
     *
     * @typedef {import('./core/Application')} Application
     * @param {Application} application 应用实例
     */
    constructor(application) {
        /**
         * http server
         */
        this.server = null;
        this.app = application;
    }
    /**
     * 获取日志实例
     *
     * @return {Logger}
     */
    static getLogger() {
        return Logger.getLogger();
    }
    /**
     * 获取国际化实例
     *
     * @returns {I18N}
     */
    static getI18N() {
        return I18N.getI18N();
    }
    // web
    requestListener(req, res) {
        try {
            this.app.requestListener(req, res);
        }
        catch (e) {
            this.app.handlerException(res, e);
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
     * @param {Number} port
     * @param {Function} callback
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
    listen(port, callback) {
        this.server = this.getServer();
        this.server.listen(port, callback);
    }
}
module.exports = CandyJs;
