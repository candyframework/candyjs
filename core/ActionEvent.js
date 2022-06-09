"use strict";
const Event = require("./Event");
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
