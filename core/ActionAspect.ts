/**
 * @author afu
 * @license MIT
 */
import ActionEvent = require('./ActionEvent');

import Behavior = require('./Behavior');
import AbstractController = require('./AbstractController');

/**
 * 动作切面
 *
 * 具体切面类需要从此类继承 并选择实现 `beforeAction()` 或者 `afterAction()`
 */
class ActionAspect extends Behavior {

    private beforeAspect: any;
    private afterAspect: any;

    constructor() {
        super();

        this.beforeAspect = (actionEvent: ActionEvent) => {
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

        this.afterAspect = (actionEvent: ActionEvent) => {
            this.unListen();

            this.afterAction(actionEvent);
        };
    }

    /**
     * @inheritdoc
     */
    public events(): any[] {
        return [
            [AbstractController.EVENT_BEFORE_ACTION, this.beforeAspect],
            [AbstractController.EVENT_AFTER_ACTION, this.afterAspect]
        ];
    }

    /**
     * 前置切面
     */
    public beforeAction(actionEvent: ActionEvent): void {}

    /**
     * 后置切面
     *
     * 由于控制器可能包含异步逻辑 所以该方法不能保证在控制器动作执行完成后再运行
     */
    public afterAction(actionEvent: ActionEvent): void {}

}

export = ActionAspect;
