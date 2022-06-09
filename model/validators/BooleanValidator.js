"use strict";
const Validator = require("../Validator");
class BooleanValidator extends Validator {
    constructor() {
        super();
        this.strict = true;
    }
    validate(attributeName, attributeValue) {
        let valid = false;
        let info = this.getMessage(attributeName);
        if (this.strict) {
            valid = true === attributeValue || false === attributeValue;
        }
        else {
            valid = true == attributeValue || false == attributeValue;
        }
        if (!valid) {
            return '' === info ? attributeName + ' is invalid' : info;
        }
        return '';
    }
}
module.exports = BooleanValidator;
