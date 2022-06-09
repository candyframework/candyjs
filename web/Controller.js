"use strict";
const Candy = require("../Candy");
const CoreController = require("../core/Controller");
class Controller extends CoreController {
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
