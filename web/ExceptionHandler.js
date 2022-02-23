"use strict";
/**
 * @author afu
 * @license MIT
 */
const Candy = require("../Candy");
const CoreExceptionHandler = require("../core/ExceptionHandler");
/**
 * web 异常错误处理
 */
class ExceptionHandler extends CoreExceptionHandler {
    /**
     * @inheritdoc
     */
    handlerException(exception, response) {
        response.setHeader('Content-Type', 'text/plain');
        response.writeHead(500);
        response.write(null !== Candy.app && true === Candy.app.debug
            ? exception.message + '\n' + exception.stack
            : 'The server encountered an internal error');
        response.end();
    }
}
module.exports = ExceptionHandler;
