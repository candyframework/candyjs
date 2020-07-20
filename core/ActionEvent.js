/**
 * @author afu
 * @license MIT
 */
'use strict';

const Event = require('./Event');

/**
 * 控制器动作事件
 */
class ActionEvent extends Event {

    /**
     * constructor
     */
    constructor() {
        super();

        /**
         * @property {any} request
         */
        this.request = null;

        /**
         * @property {any} response
         */
        this.response = null;

        /**
         * @property {any} data
         */
        this.data = null;

        /**
         * @property {Boolean} 状态
         */
        this.valid = true;
    }

}

module.exports = ActionEvent;
