/**
 * @author
 * @license MIT
 */
'use strict';

var Candy = require('../Candy');
var CoreController = require('../core/Controller');

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
         * @property {String} viewHandler
         */
        this.viewHandler = 'candy/web/View';
        
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
            this.view = Candy.createObject(this.viewHandler, this.context);
        }
        
        return this.view;
    }
    
}

module.exports = Controller;
