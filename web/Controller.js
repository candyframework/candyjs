/**
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
     * @inheritdoc
     */
    getView() {
        if(null === this.view) {
            this.view = Candy.createObject(Candy.app.viewHandler, this.context);
        }

        return this.view;
    }

}

module.exports = Controller;
