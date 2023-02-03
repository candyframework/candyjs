"use strict";
const Candy = require("../Candy");
const Component = require("./Component");
const ActionEvent = require("./ActionEvent");
const FilterChain = require("./FilterChain");
class AbstractController extends Component {
    constructor(context) {
        super();
        this.filterChain = new FilterChain();
        this.context = context;
        this.initializeFilterChain();
    }
    initializeFilterChain() {
        this.filterChain.setResource(this);
        let filters = this.filters();
        if (null === filters) {
            return;
        }
        for (let filter of filters) {
            if ('string' === typeof filter) {
                filter = Candy.createObject(filter);
            }
            this.filterChain.addFilter(filter);
        }
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
        this.filterChain.doFilter(request, response);
        this.afterAction(actionEvent);
    }
}
AbstractController.EVENT_BEFORE_ACTION = 'beforeAction';
AbstractController.EVENT_AFTER_ACTION = 'afterAction';
module.exports = AbstractController;
