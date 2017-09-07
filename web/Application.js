/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var Candy = require('../Candy');
var CoreApp = require('../core/Application');
var CoreController = require('../core/Controller');
var Request = require('./Request');
var InvalidRouteException = require('../core/InvalidRouteException');

/**
 * web 应用
 */
class Application extends CoreApp {
    
    /**
     * @inheritdoc
     */
    constructor(config) {
        super(config);
        
        /**
         * @property {String} exceptionHandler 异常处理类
         */
        this.exceptionHandler = 'y/web/ExceptionHandler';
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
        if( !(controller instanceof CoreController) ) {
            controller.run(request, response);
            
            return;
        }
        
        controller.runControllerAction(request, response);
    }
    
    /**
     * @inheritdoc
     */
    handlerException(response, exception) {
        var handler = Candy.createObject(this.exceptionHandler);
        
        handler.handlerException(response, exception);
    }
    
}

module.exports = Application;
