/**
 * @author
 * @license MIT
 */
'use strict';

const CandyJs = require('../index');
const Component = require('./Component');

/**
 * 控制器基类
 */
class Controller extends Component {

    /**
     * constructor
     */
    constructor(context) {
        super();

        /**
         * @property {Object} context 上下文环境 用于保存当前请求相关的信息
         */
        this.context = context;
    }

    /**
     * 控制器方法执行前
     *
     * @param {Object} request
     * @param {Object} response
     */
    beforeActionCall(request, response) {
        CandyJs.getLogger().trace('The beforeActionCall() method is called');
        this.triggerWithRestParams(Controller.EVENT_BEFORE_ACTIONCALL, request, response);
    }

    /**
     * 控制器方法执行后
     *
     * @param {Object} request
     * @param {Object} response
     */
    afterActionCall(request, response) {
        CandyJs.getLogger().trace('The afterActionCall() method is called');
        this.triggerWithRestParams(Controller.EVENT_AFTER_ACTIONCALL, request, response);
    }

    /**
     * 执行控制器的方法
     *
     * @param {Object} request
     * @param {Object} response
     */
    runControllerAction(request, response) {
        this.beforeActionCall(request, response);

        CandyJs.getLogger().trace('Starting to run the run() method of: ' + this.constructor.name);
        this.run(request, response);

        this.afterActionCall(request, response);
    }

    /**
     * 获取视图类
     *
     * @return {Object}
     */
    getView() {}

}

/**
 * @property {String} EVENT_BEFORE_ACTIONCALL
 */
Controller.EVENT_BEFORE_ACTIONCALL = 'beforeActionCall';

/**
 * @property {String} EVENT_AFTER_ACTIONCALL
 */
Controller.EVENT_AFTER_ACTIONCALL = 'afterActionCall';

module.exports = Controller;
