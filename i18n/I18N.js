"use strict";
const Candy = require("../Candy");
const ServiceLocator = require("../ioc/ServiceLocator");
const InvalidConfigException = require("../core/InvalidConfigException");
class I18N {
    constructor() {
        this.serviceLocator = new ServiceLocator();
    }
    static getI18N() {
        if (null === I18N.instance) {
            I18N.instance = new I18N();
        }
        return I18N.instance;
    }
    translate(type, message, parameters = null) {
        let translator = this.getTranslator(type);
        return translator.translate(type, message, parameters);
    }
    getTranslator(type) {
        let app = Candy.app;
        if (undefined === app.translator || undefined === app.translator[type]) {
            throw new InvalidConfigException('The translator configuration is not found');
        }
        if (!this.serviceLocator.hasService(type)) {
            this.serviceLocator.setService(type, Candy.createObjectAsDefinition(app.translator[type], app));
        }
        return this.serviceLocator.getService(type);
    }
}
I18N.instance = null;
module.exports = I18N;
