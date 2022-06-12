"use strict";
class AbstractTranslator {
    constructor(application) {
        this.language = '';
        this.basePath = '';
        this.application = application;
    }
    setLanguage(language) {
        this.language = language;
    }
    getLanguage() {
        return this.language;
    }
    setBasePath(basePath) {
        this.basePath = basePath;
    }
    getBasePath() {
        return this.basePath;
    }
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
}
module.exports = AbstractTranslator;
