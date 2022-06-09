"use strict";
class Validator {
    constructor() {
        this.model = null;
        this.attributes = null;
        this.messages = null;
        this.skip = false;
    }
    validateAttributes() {
        let list = this.attributes;
        let infos = [];
        for (let i = 0, result = ''; i < list.length; i++) {
            if (this.skip) {
                break;
            }
            result = this.validate(list[i], this.model.attributes[list[i]]);
            if ('' !== result) {
                infos.push(result);
            }
        }
        return infos;
    }
    getMessage(attributeName) {
        if (null === this.messages) {
            return '';
        }
        let index = this.attributes.indexOf(attributeName);
        if (-1 === index || this.messages.length <= index) {
            return '';
        }
        return this.messages[index];
    }
    validate(attributeName, attributeValue) {
        return '';
    }
}
module.exports = Validator;
