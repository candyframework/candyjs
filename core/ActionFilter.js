"use strict";
const Behavior = require("./Behavior");
const AbstractController = require("./AbstractController");
class ActionFilter extends Behavior {
    constructor() {
        super();
        this.beforeFilter = (actionEvent) => {
            if (!actionEvent.valid) {
                this.unListen();
                return;
            }
            this.beforeAction(actionEvent);
            if (!actionEvent.valid) {
                this.unListen();
            }
        };
        this.afterFilter = (actionEvent) => {
            this.unListen();
            this.afterAction(actionEvent);
        };
    }
    events() {
        return [
            [AbstractController.EVENT_BEFORE_ACTION, this.beforeFilter],
            [AbstractController.EVENT_AFTER_ACTION, this.afterFilter]
        ];
    }
    beforeAction(actionEvent) { }
    afterAction(actionEvent) { }
}
module.exports = ActionFilter;
