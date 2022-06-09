"use strict";
const CoreExceptionHandler = require("../core/ExceptionHandler");
class ExceptionHandler extends CoreExceptionHandler {
    constructor(application) {
        super(application);
    }
    handlerException(exception, response) {
        let app = this.application;
        response.setHeader('Content-Type', 'text/plain');
        response.writeHead(500);
        response.write(true === app.debug
            ? exception.message + '\n' + exception.stack
            : 'The server encountered an internal error');
        response.end();
    }
}
module.exports = ExceptionHandler;
