"use strict";
const Validator = require("../Validator");
class StringValidator extends Validator {
    constructor() {
        super();
        this.trim = true;
        this.minLength = 1;
        this.maxLength = 2333;
    }
    validate(attributeName, attributeValue) {
        let info = this.getMessage(attributeName);
        if (undefined === attributeValue) {
            attributeValue = '';
        }
        if ('' !== attributeValue && this.trim) {
            attributeValue = attributeValue.trim();
        }
        if (attributeValue.length < this.minLength || attributeValue.length > this.maxLength) {
            return '' === info
                ? 'length of the ' + attributeName + ' should be between ' + this.minLength + ' and ' + this.maxLength
                : info;
        }
        return '';
    }
}
module.exports = StringValidator;
