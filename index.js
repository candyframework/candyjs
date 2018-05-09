/**
 * @author
 * @license MIT
 */
'use strict';

const http = require('http');

const Candy = require('./Candy');
const Hook = require('./core/Hook');
const WebApp = require('./web/Application');
const InvalidConfigException = require('./core/InvalidConfigException');

/**
 * 入口
 */
class CandyJs {

    /**
     * constructor
     *
     * @param {any} config 配置信息
     */
    constructor(config) {
        if(undefined === config) {
            throw new InvalidConfigException('The app config is required');
        }

        this.config = config;
        this.server = null;
        this.app = new WebApp(config);
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
     * var https = require('https');
     * var CandyJs = require('candyjs');
     * var app = new CandyJs({ ... });
     * https.createServer({ ... }, app.handler.bind(app)).listen(443);
     * ```
     *
     */
    listen(port, callback) {
        this.server = this.getServer();
        this.server.listen(port, callback);
    }

}

/**
 * handler
 */
CandyJs.Candy = Candy;

module.exports = CandyJs;
