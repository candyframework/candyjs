"use strict";
const Behavior = require("./Behavior");
const AbstractController = require("./AbstractController");
class ActionAspect extends Behavior {
    constructor() {
        super();
        this.beforeAspect = (actionEvent) => {
            if (!actionEvent.valid) {
                this.unListen();
                return;
            }
            this.beforeAction(actionEvent);
            if (!actionEvent.valid) {
                this.unListen();
            }
        };
        this.afterAspect = (actionEvent) => {
            this.unListen();
            this.afterAction(actionEvent);
        };
    }
    events() {
        return [
            [AbstractController.EVENT_BEFORE_ACTION, this.beforeAspect],
            [AbstractController.EVENT_AFTER_ACTION, this.afterAspect]
        ];
    }
    beforeAction(actionEvent) { }
    afterAction(actionEvent) { }
}
module.exports = ActionAspect;
