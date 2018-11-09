/**
 * @author
 * @license MIT
 */
'use strict';

const Candy = require('../Candy');
const CoreApp = require('../core/Application');
const Request = require('./Request');
const WebController = require('./Controller');
const InvalidRouteException = require('../core/InvalidRouteException');

/**
 * web 应用
 */
class Application extends CoreApp {

    /**
     * @inheritdoc
     */
    constructor(config) {
        super(config);

        this.defaultExceptionHandler = 'candy/web/ExceptionHandler';
    }

    /**
     * @inheritdoc
     */
    requestListener(request, response) {
        var route = Request.parseUrl(request).pathname;

        var controller = this.createController(route);

        if(null === controller) {
            throw new InvalidRouteException('The route requested is invalid');
        }

        // 是否继承自框架控制器
        if( !(controller instanceof WebController) ) {
            controller.run(request, response);

            return;
        }

        controller.runControllerAction(request, response);
    }

    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        var handler = Candy.createObject('' === this.exceptionHandler
            ? this.defaultExceptionHandler
            : this.exceptionHandler);

        handler.handlerException(response, exception);
    }

}

module.exports = Application;
