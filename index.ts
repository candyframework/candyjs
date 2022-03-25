/**
 * @author afu
 * @license MIT
 */
import IWebApplication from './IWebApplication';

import http = require('http');

import Hook = require('./core/Hook');
import Logger = require('./log/Logger');

/**
 * 入口
 */
class CandyJs {

    /**
     * http server
     */
    public server: http.Server = null;

    /**
     * 当前应用
     */
    public app: IWebApplication;

    /**
     * constructor
     *
     * @typedef {import('./core/Application')} Application
     * @param {Application} application 应用实例
     */
    constructor(application: any) {
        this.app = application;
    }

    /**
     * 获取日志实例
     *
     * @return {Logger}
     */
    static getLogger(): Logger {
        return Logger.getLogger();
    }

    // web
    private requestListener(req: any, res: any): void {
        try {
            this.app.requestListener(req, res);

        } catch(e) {
            this.app.handlerException(e, res);
        }
    }

    // handler
    private handler(req: any, res: any): void {
        new Hook().trigger(req, res, (request, response) => {
            this.requestListener(request, response);
        });
    }

    /**
     * 获取 http server
     *
     * @return {http.Server}
     */
    public getServer(): http.Server {
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
    public listen(...args): void {
        this.server = this.getServer();
        this.server.listen(...args);
    }

}

export = CandyJs;
