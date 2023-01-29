"use strict";
const Component = require("./Component");
const ActionEvent = require("./ActionEvent");
class AbstractController extends Component {
    constructor(context) {
        super();
        this.context = context;
    }
    beforeAction(actionEvent) {
        this.trigger(AbstractController.EVENT_BEFORE_ACTION, actionEvent);
    }
    afterAction(actionEvent) {
        this.trigger(AbstractController.EVENT_AFTER_ACTION, actionEvent);
    }
    runControllerAction(request, response) {
        let actionEvent = new ActionEvent();
        actionEvent.request = request;
        actionEvent.response = response;
        this.beforeAction(actionEvent);
        if (true !== actionEvent.valid) {
            if (!response.finished) {
                response.end('');
            }
            return;
        }
        this.run(request, response);
        this.afterAction(actionEvent);
    }
    run(request, response) { }
}
AbstractController.EVENT_BEFORE_ACTION = 'beforeAction';
AbstractController.EVENT_AFTER_ACTION = 'afterAction';
module.exports = AbstractController;
