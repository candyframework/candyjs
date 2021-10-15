'use strict';

class MyRouteHandler {
    run(req, res) {
        res.end('custom route data');
    }
}

module.exports = MyRouteHandler;
