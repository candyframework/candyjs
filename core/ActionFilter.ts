/**
 * @author afu
 * @license MIT
 */
import ActionEvent = require('./ActionEvent');

import Behavior = require('./Behavior');
import AbstractController = require('./AbstractController');

/**
 * 动作过滤器
 *
 * 过滤器会在控制器的动作执行之前执行并且只支持同步操作
 *
 * 自定义过滤器需要从此类继承 并选择实现 `beforeAction()` 或者 `afterAction()`
 */
class ActionFilter extends Behavior {

    private beforeFilter: any;
    private afterFilter: any;

    constructor() {
        super();

        this.beforeFilter = (actionEvent: ActionEvent) => {
            // 如果前一个 valid 为 false 那么本次 filter 不再执行
            if(!actionEvent.valid) {
                this.unListen();
                return;
            }

            this.beforeAction(actionEvent);

            // since runControllerAction() may block the program
            // afterFilter() will not execute when `false === actionEvent.valid`
            // so unListen here
            if(!actionEvent.valid) {
                this.unListen();
            }
        };

        this.afterFilter = (actionEvent: ActionEvent) => {
            this.unListen();

            this.afterAction(actionEvent);
        };
    }

    /**
     * @inheritdoc
     */
    public events(): any[] {
        return [
            [AbstractController.EVENT_BEFORE_ACTION, this.beforeFilter],
            [AbstractController.EVENT_AFTER_ACTION, this.afterFilter]
        ];
    }

    /**
     * 前置过滤
     */
    public beforeAction(actionEvent: ActionEvent): void {}

    /**
     * 后置过滤
     */
    public afterAction(actionEvent: ActionEvent): void {}

}

export = ActionFilter;
