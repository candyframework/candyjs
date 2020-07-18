/**
 * @author afu
 * @license MIT
 */
'use strict';

const Candy = require('../Candy');
const CoreController = require('../core/Controller');

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
         * @typedef {import('./View')} View
         * @type {View} view
         */
        this.view = null;
    }

    /**
     * 获取视图类
     *
     * @typedef {import('./View')} View
     * @return {View}
     */
    getView() {
        if(null === this.view) {
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
        response.end('Controller must implements the run() method');
    }

    /**
     * @inheritdoc
     */
    render(view, parameters = null) {
        this.getView().render(view, parameters);
    }

}

module.exports = Controller;
