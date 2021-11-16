"use strict";
/**
 * @author afu
 * @license MIT
 */
const Candy = require("../Candy");
const CoreController = require("../core/Controller");
/**
 * 控制器
 */
class Controller extends CoreController {
    /**
     * constructor
     */
    constructor(context) {
        super(context);
        /**
         * 视图类
         */
        this.view = null;
    }
    /**
     * 获取视图类
     */
    getView() {
        if (null === this.view) {
            this.view = Candy.createObjectAsString(Candy.app.defaultView, this.context);
        }
        return this.view;
    }
    /**
     * 设置视图类
     *
     * @param {any} view
     */
    setView(view) {
        this.view = view;
    }
    /**
     * @inheritdoc
     */
    run(request, response) {
        response.write('Controller must implements the run() method');
        response.end();
    }
    /**
     * @inheritdoc
     */
    render(view, parameters = null) {
        return this.getView().render(view, parameters);
    }
}
module.exports = Controller;
