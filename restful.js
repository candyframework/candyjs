/**
 * @author
 * @license MIT
 */
'use strict';

var http = require('http');

var Hook = require('./core/Hook');
var Rest = require('./web/Rest');
var InvalidConfigException = require('./core/InvalidConfigException');

class Restful {

    /**
     * constructor
     *
     * @param {Object} config 配置信息
     */
    constructor(config) {
        if(undefined === config) {
            throw new InvalidConfigException('The rest config is required');
        }

        this.config = config;
        this.server = null;
        this.rest = new Rest(config);
    }

    // web
    requestListener(req, res) {
        try {
            this.rest.requestListener(req, res);

        } catch(e) {
            this.rest.handlerException(res, e);
        }
    }

    // handler
    handler(req, res) {
        Hook.getInstance().trigger(req, res, () => {
            this.requestListener(req, res);
        });
    }

    /**
     * get
     */
    get(pattern, handler) {
        this.rest.addRoute('GET', pattern, handler);
    }

    /**
     * post
     */
    post(pattern, handler) {
        this.rest.addRoute('POST', pattern, handler);
    }

    /**
     * put
     */
    put(pattern, handler) {
        this.rest.addRoute('PUT', pattern, handler);
    }

    /**
     * delete
     */
    delete(pattern, handler) {
        this.rest.addRoute('DELETE', pattern, handler);
    }

    /**
     * patch
     */
    patch(pattern, handler) {
        this.rest.addRoute('PATCH', pattern, handler);
    }

    /**
     * head
     */
    head(pattern, handler) {
        this.rest.addRoute('HEAD', pattern, handler);
    }

    /**
     * options
     */
    options(pattern, handler) {
        this.rest.addRoute('OPTIONS', pattern, handler);
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
     */
    listen(port, callback) {
        this.server = this.getServer();
        this.server.listen(port, callback);
    }

}

module.exports = Restful;
