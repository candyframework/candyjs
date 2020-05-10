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
     * @return {Boolean}
     */
    beforeAction(request, response) {
        CandyJs.getLogger().trace('The beforeAction() method is called');

        this.trigger(Controller.EVENT_BEFORE_ACTION, this.context);

        return true;
    }

    /**
     * 控制器方法执行后
     *
     * @param {Object} request
     * @param {Object} response
     */
    afterAction(request, response) {
        CandyJs.getLogger().trace('The afterAction() method is called');

        this.trigger(Controller.EVENT_AFTER_ACTION, this.context);
    }

    /**
     * 执行控制器的方法
     *
     * @param {Object} request
     * @param {Object} response
     */
    runControllerAction(request, response) {
        if( true !== this.beforeAction(request, response) ) {
            return;
        }

        CandyJs.getLogger().trace('Starting to run the run() method of: ' + this.constructor.name);
        this.run(request, response);

        this.afterAction(request, response);
    }

    /**
     * 渲染文件
     *
     * @param {String} view 视图名
     * @param {Object} parameters 参数
     * @return string | undefined
     */
    render(view, parameters = null) {}

}

/**
 * @property {String} EVENT_BEFORE_ACTION
 */
Controller.EVENT_BEFORE_ACTION = 'beforeAction';

/**
 * @property {String} EVENT_AFTER_ACTION
 */
Controller.EVENT_AFTER_ACTION = 'afterAction';

module.exports = Controller;
