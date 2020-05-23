/**
 * @author afu
 * @license MIT
 */
'use strict';

const Behavior = require('./Behavior');
const Controller = require('./Controller');

/**
 * 动作过滤器
 *
 * 过滤器会在控制器的动作执行之前执行并且只支持同步操作
 */
class ActionFilter extends Behavior {

    constructor() {
        super();

        // make sure function has 'this' reference
        this.beforeFilter = this.beforeFilter.bind(this);
        this.afterFilter = this.afterFilter.bind(this);
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

    beforeFilter(actionEvent) {
        this.beforeAction(actionEvent);
    }

    afterFilter(actionEvent) {
        this.unListen();

        this.afterAction(actionEvent);
    }

    /**
     * 前置过滤
     */
    beforeAction(actionEvent) {}

    /**
     * 后置过滤
     */
    afterAction(actionEvent) {}

}

module.exports = ActionFilter;
