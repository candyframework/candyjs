"use strict";
/**
 * @author afu
 * @license MIT
 */
const Component = require("./Component");
const ActionEvent = require("./ActionEvent");
/**
 * 控制器基类
 */
class Controller extends Component {
    /**
     * constructor
     */
    constructor(context) {
        super();
        this.context = context;
    }
    /**
     * 控制器方法执行前
     *
     * @param {ActionEvent} actionEvent
     */
    beforeAction(actionEvent) {
        this.trigger(Controller.EVENT_BEFORE_ACTION, actionEvent);
    }
    /**
     * 控制器方法执行后
     *
     * @param {ActionEvent} actionEvent
     */
    afterAction(actionEvent) {
        this.trigger(Controller.EVENT_AFTER_ACTION, actionEvent);
    }
    /**
     * 执行控制器的方法
     *
     * @param {any} request
     * @param {any} response
     */
    runControllerAction(request, response) {
        let actionEvent = new ActionEvent();
        actionEvent.request = request;
        actionEvent.response = response;
        // todo 这里没想好怎么设计 让我想想看
        this.beforeAction(actionEvent);
        if (true !== actionEvent.valid) {
            return;
        }
        this.run(request, response);
        this.afterAction(actionEvent);
    }
    /**
     * 执行控制器入口
     */
    run(request, response) { }
    /**
     * 渲染文件 须由子类进行实现
     *
     * @param {String} view 视图名
     * @param {any} parameters 参数
     */
    render(view, parameters = null) { }
}
/**
 * 前置事件
 */
Controller.EVENT_BEFORE_ACTION = 'beforeAction';
/**
 * 后置事件
 */
Controller.EVENT_AFTER_ACTION = 'afterAction';
module.exports = Controller;
