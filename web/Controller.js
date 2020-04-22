+/**
 * @author
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
         * @property {View} view
         */
        this.view = null;
    }

    /**
     * 获取视图类
     *
     * @return {Object}
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
     * @param {Object} view
     */
    setView(view) {
        this.view = view;
    }

    /**
     * {@inheritdoc}
     */
    render(view, parameters = null) {
        this.getView().render(view, parameters);
    }

}

module.exports = Controller;
