"use strict";
/**
 * @author afu
 * @license MIT
 */
const Behavior = require("./Behavior");
const Controller = require("./Controller");
/**
 * 动作过滤器
 *
 * 过滤器会在控制器的动作执行之前执行并且只支持同步操作
 *
 * 自定义过滤器需要从此类继承 并选择实现 `beforeAction()` 或者 `afterAction()`
 */
class ActionFilter extends Behavior {
    constructor() {
        super();
        /**
         * @param {import('./ActionEvent')} actionEvent
         */
        this.beforeFilter = (actionEvent) => {
            this.beforeAction(actionEvent);
            // since runControllerAction() may block the program
            // afterFilter() will not execute when `false === actionEvent.valid`
            // so unListen here
            if (!actionEvent.valid) {
                this.unListen();
            }
        };
        /**
         * @param {import('./ActionEvent')} actionEvent
         */
        this.afterFilter = (actionEvent) => {
            this.unListen();
            this.afterAction(actionEvent);
        };
    }
    /**
     * @inheritdoc
     */
    events() {
        return [
            [Controller.EVENT_BEFORE_ACTION, this.beforeFilter],
            [Controller.EVENT_AFTER_ACTION, this.afterFilter]
        ];
    }
    /**
     * 前置过滤
     */
    beforeAction(actionEvent) { }
    /**
     * 后置过滤
     */
    afterAction(actionEvent) { }
}
module.exports = ActionFilter;
