/**
 * @author afu
 * @license MIT
 */
import http = require('http');

import Hook = require('./core/Hook');
import Logger = require('./log/Logger');
import I18N = require('./i18n/I18N');

/**
 * 入口
 */
class CandyJs {

    /**
     * http server
     */
    public server: http.Server;

    /**
     * 当前应用
     */
    public app: any;

    /**
     * constructor
     *
     * @typedef {import('./core/Application')} Application
     * @param {Application} application 应用实例
     */
    constructor(application: any) {
        this.server = null;
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

    /**
     * 获取国际化实例
     *
     * @returns {I18N}
     */
    static getI18N(): I18N {
        return I18N.getI18N();
    }

    // web
    private requestListener(req: any, res: any): void {
        try {
            this.app.requestListener(req, res);

        } catch(e) {
            this.app.handlerException(res, e);
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
    public listen(port: number, callback: any): void {
        this.server = this.getServer();
        this.server.listen(port, callback);
    }

}

export = CandyJs;
