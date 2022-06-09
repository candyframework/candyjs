"use strict";
const http = require("http");
const Hook = require("./core/Hook");
class CandyJs {
    constructor(application) {
        this.server = null;
        this.app = application;
    }
    requestListener(req, res) {
        try {
            this.app.requestListener(req, res);
        }
        catch (e) {
            this.app.handlerException(e, res);
        }
    }
    handler(req, res) {
        new Hook().trigger(req, res, (request, response) => {
            this.requestListener(request, response);
        });
    }
    getServer() {
        return http.createServer((req, res) => {
            this.handler(req, res);
        });
    }
    listen(...args) {
        this.server = this.getServer();
        this.server.listen(...args);
    }
}
module.exports = CandyJs;
