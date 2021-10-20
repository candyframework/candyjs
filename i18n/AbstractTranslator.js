"use strict";
const Candy = require("../Candy");
/**
 * 抽象层
 */
class AbstractTranslator {
    constructor() {
        /**
         * 语言
         */
        this.language = '';
        /**
         * 语言配置所在目录
         */
        this.basePath = '';
    }
    /**
     * 设置语言
     */
    setLanguage(language) {
        this.language = language;
    }
    /**
     * 获取语言
     */
    getLanguage() {
        return this.language;
    }
    /**
     * 设置基础路径
     */
    setBasePath(basePath) {
        this.basePath = basePath;
    }
    /**
     * 获取基础路径
     */
    getBasePath() {
        return this.basePath;
    }
    /**
     * @inheritdoc
     */
    translate(type, sourceMessage, parameters = null) {
        return '';
    }
    /**
     * 解析消息中的参数
     *
     * ```
     * 'your name is {name}' => your name is xyz
     * ```
     *
     */
    parseMessage(targetMessage, parameters = null) {
        if (null === parameters) {
            return targetMessage;
        }
        let list = targetMessage.match(/\{[^\}]+\}/g);
        if (null === list) {
            return targetMessage;
        }
        for (let i = 0; i < parameters.length; i++) {
            targetMessage = targetMessage.replace(list[i], parameters[i]);
        }
        return targetMessage;
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
}
module.exports = AbstractTranslator;
