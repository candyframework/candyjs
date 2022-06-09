"use strict";
const Candy = require("../Candy");
const InvalidConfigException = require("../core/InvalidConfigException");
class I18N {
    constructor() {
        this.translators = new Map();
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
        if (this.translators.has(type)) {
            return this.translators.get(type);
        }
        let app = Candy.app;
        if (undefined === app.translator || undefined === app.translator[type]) {
            throw new InvalidConfigException('The translator configuration is not found');
        }
        if (undefined === app.translator[type].classPath) {
            throw new InvalidConfigException('The "classPath" configuration of the translator is missing');
        }
        this.translators.set(type, Candy.createObjectAsDefinition(app.translator[type], app));
        return this.translators.get(type);
    }
}
I18N.instance = null;
module.exports = I18N;
