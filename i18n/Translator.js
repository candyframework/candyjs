"use strict";
/**
 * @author afu
 * @license MIT
 */
const Candy = require("../Candy");
const AbstractTranslator = require("./AbstractTranslator");
/**
 * 翻译器
 */
class Translator extends AbstractTranslator {
    constructor() {
        super();
        this.language = 'en-US';
        this.basePath = Candy.getPathAlias('@app/i18n');
    }
    /**
     * @inheritdoc
     */
    translate(type, sourceMessage, parameters = null) {
        let path = this.basePath + '/' + this.language + '/' + type;
        let lang = this.loadLanguageFromFile(path);
        if (undefined === lang[sourceMessage]) {
            return sourceMessage;
        }
        let target = lang[sourceMessage];
        return this.parseMessage(target, parameters);
    }
}
module.exports = Translator;
