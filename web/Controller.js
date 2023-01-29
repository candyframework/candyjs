"use strict";
const Candy = require("../Candy");
const AbstractController = require("../core/AbstractController");
class Controller extends AbstractController {
    constructor(context) {
        super(context);
        this.view = null;
    }
    getView() {
        if (null === this.view) {
            this.view = Candy.createObjectAsString(this.context.application.defaultView, this.context);
        }
        return this.view;
    }
    setView(view) {
        this.view = view;
    }
    run(request, response) {
        response.write('Controller must implements the run() method');
        response.end();
    }
    render(view, parameters = null) {
        return this.getView().render(view, parameters);
    }
}
module.exports = Controller;
