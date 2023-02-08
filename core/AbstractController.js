"use strict";
const Component = require("./Component");
const ActionEvent = require("./ActionEvent");
const FilterFactory = require("./FilterFactory");
class AbstractController extends Component {
    constructor(context) {
        super();
        this.filterChain = FilterFactory.createFilterChain(this);
        this.context = context;
    }
    filters() {
        return null;
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
        if (false === actionEvent.valid) {
            return;
        }
        this.filterChain.doFilter(request, response);
        this.afterAction(actionEvent);
    }
}
AbstractController.EVENT_BEFORE_ACTION = 'beforeAction';
AbstractController.EVENT_AFTER_ACTION = 'afterAction';
module.exports = AbstractController;
