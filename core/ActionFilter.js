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
 * 过滤器会在控制器的动作执行之前执行
 */
class ActionFilter extends Behavior {

    constructor() {
        super();

        // make sure function has 'this' reference
        this.beforeFilter = this.beforeFilter.bind(this);
    }

    /**
     * @inheritdoc
     */
    events() {
        return [
            [Controller.EVENT_BEFORE_ACTION, this.beforeFilter]
        ];
    }

    beforeFilter(actionEvent) {
        this.beforeAction(actionEvent);
    }

    /**
     * 前置过滤
     */
    beforeAction(actionEvent) {
        return true;
    }

}

module.exports = ActionFilter;
