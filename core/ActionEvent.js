"use strict";
/**
 * @author afu
 * @license MIT
 */
const Event = require("./Event");
/**
 * 控制器动作事件
 */
class ActionEvent extends Event {
    constructor() {
        super();
        /**
         * http request
         */
        this.request = null;
        /**
         * http response
         */
        this.response = null;
        /**
         * 数据
         */
        this.data = null;
        /**
         * 状态
         */
        this.valid = true;
    }
}
module.exports = ActionEvent;
