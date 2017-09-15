'use strict';

class Intercept {
    run(req, res) {
        res.end('intercepted');
    }
}

module.exports = Intercept;