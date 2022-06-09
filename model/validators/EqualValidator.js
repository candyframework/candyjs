"use strict";
const Validator = require("../Validator");
class EqualValidator extends Validator {
    validate(attributeName, attributeValue) {
        let hasError = false;
        let validatingAttributes = this.attributes;
        let firstValue = attributeValue;
        let info = this.getMessage(attributeName);
        this.skip = true;
        for (let i = 1; i < validatingAttributes.length; i++) {
            if (firstValue !== this.model.attributes[validatingAttributes[i]]) {
                hasError = true;
                break;
            }
        }
        if (hasError) {
            return '' === info ? this.attributes.toString() + ' are not equal' : info;
        }
        return '';
    }
}
module.exports = EqualValidator;
