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
    constructor(request, response) {
        super();

        /**
         * @property {any} request
         */
        this.request = request;

        /**
         * @property {any} response
         */
        this.response = response;

        /**
         * @property {Boolean} 状态
         */
        this.valid = true;
    }

}

module.exports = ActionEvent;
