/**
 * @author
 * @license MIT
 */
'use strict';

const Candy = require('../Candy');
const CandyJS = require('../index');
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
        let route = Request.parseUrl(request).pathname;

        CandyJS.getLogger().trace('Route requested: ' + route);

        let controller = this.createController(route);

        if(null === controller) {
            throw new InvalidRouteException('The route requested is invalid');
        }

        // 是否继承自框架控制器
        if( !(controller instanceof WebController) ) {
            CandyJS.getLogger().trace('Starting to run the run() method of: ' + controller.constructor.name);
            controller.run(request, response);
            return;
        }

        CandyJS.getLogger().trace('Starting to run the runControllerAction() method of: ' + controller.constructor.name);
        controller.runControllerAction(request, response);
    }

    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        let handler = Candy.createObject('' === this.exceptionHandler
            ? this.defaultExceptionHandler
            : this.exceptionHandler);

        handler.handlerException(response, exception);
    }

}

module.exports = Application;
