"use strict";
/**
 * @author afu
 * @license MIT
 */
const Candy = require("../Candy");
const Controller = require("../web/Controller");
/**
 * Bean
 */
class BeanController extends Controller {
    constructor(context) {
        super(context);
    }
    /**
     * 需要装配的模型
     *
     * ```
     * [
     *      'app/models/XxxModel',
     *      {
     *          classPath: 'app/models/XxxModel'
     *      }
     * ]
     * ```
     *
     */
    autowire() {
        return null;
    }
    generateName(name) {
        let ret = name.charAt(0).toLowerCase();
        return ret + name.substring(1);
    }
    wire() {
        let beans = this.autowire();
        if (null === beans) {
            return;
        }
        for (let i = 0, bean = null, name = ''; i < beans.length; i++) {
            // model is string
            if ('string' === typeof beans[i]) {
                bean = Candy.createObjectAsString(beans[i]);
            }
            else {
                // model is config
                bean = Candy.createObjectAsDefinition(beans[i]);
            }
            bean.fill(this.context.request);
            name = undefined === bean.modelName ? this.generateName(bean.className()) : bean.modelName;
            this[name] = bean;
        }
    }
    /**
     * @override
     */
    runControllerAction(request, response) {
        this.wire();
        super.runControllerAction(request, response);
    }
}
module.exports = BeanController;
