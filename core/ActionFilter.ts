/**
 * @author afu
 * @license MIT
 */
import Behavior = require('./Behavior');
import Controller = require('./Controller');

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

        /**
         * @param {import('./ActionEvent')} actionEvent
         */
        this.beforeFilter = (actionEvent) => {
            // since runControllerAction() may block the program
            // afterFilter() will not execute when `false === actionEvent.valid`
            // so unListen here
            if(!actionEvent.valid) {
                this.unListen();
            }

            this.beforeAction(actionEvent);
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
    public events(): any[] {
        return [
            [Controller.EVENT_BEFORE_ACTION, this.beforeFilter],
            [Controller.EVENT_AFTER_ACTION, this.afterFilter]
        ];
    }

    /**
     * 前置过滤
     */
    public beforeAction(actionEvent: any) {}

    /**
     * 后置过滤
     */
    public afterAction(actionEvent: any) {}

}

export = ActionFilter;
