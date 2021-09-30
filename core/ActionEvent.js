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
        this.request = null;
        this.response = null;
        this.data = null;
        this.valid = true;
    }
}
module.exports = ActionEvent;
