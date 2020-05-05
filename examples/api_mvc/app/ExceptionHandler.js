const Ajax = require('./libs/Ajax');

class ExceptionHandler {
    handlerException(res, exp) {
        Ajax.toString(res, null, 404, exp.message);
    }
}

module.exports = ExceptionHandler;
