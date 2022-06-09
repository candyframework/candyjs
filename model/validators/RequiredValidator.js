"use strict";
const Validator = require("../Validator");
class RequiredValidator extends Validator {
    validate(attributeName, attributeValue) {
        let info = this.getMessage(attributeName);
        if (undefined === attributeValue
            || '' === attributeValue
            || null === attributeValue) {
            return '' === info ? attributeName + ' is required' : info;
        }
        return '';
    }
}
module.exports = RequiredValidator;
