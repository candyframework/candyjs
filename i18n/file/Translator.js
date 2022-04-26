"use strict";
/**
 * @author afu
 * @license MIT
 */
const Candy = require("../../Candy");
const AbstractTranslator = require("../AbstractTranslator");
/**
 * 翻译器
 */
class Translator extends AbstractTranslator {
    constructor(application) {
        super(application);
        this.language = 'en-US';
        this.basePath = Candy.getPathAlias('@app/i18n');
    }
    /**
     * 从文件系统加载语言
     *
     * @param {String} type 消息类型
     */
    loadLanguageFromFile(type) {
        let file = this.basePath + '/' + this.language + '/' + type;
        let lang = Candy.include(file, false);
        return lang;
    }
    /**
     * @inheritdoc
     */
    translate(type, sourceMessage, parameters = null) {
        let lang = this.loadLanguageFromFile(type);
        if (undefined === lang[sourceMessage]) {
            return sourceMessage;
        }
        let target = lang[sourceMessage];
        return this.parseMessage(target, parameters);
    }
}
module.exports = Translator;
