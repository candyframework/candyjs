/**
 * @author afu
 * @license MIT
 */
import CoreExceptionHandler = require('../core/ExceptionHandler');

/**
 * web 异常错误处理
 */
class ExceptionHandler extends CoreExceptionHandler {

    constructor(application) {
        super(application);
    }

    /**
     * @inheritdoc
     */
    public handlerException(exception: any, response: any): void {
        let app = this.application;

        response.setHeader('Content-Type', 'text/plain');
        response.writeHead(500);

        response.write(true === app.debug
            ? exception.message + '\n' + exception.stack
            : 'The server encountered an internal error');
        response.end();
    }

}

export = ExceptionHandler;
