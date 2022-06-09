"use strict";
const Validator = require("../Validator");
class EmailValidator extends Validator {
    constructor() {
        super();
        this.pattern = /^[a-zA-Z0-9_\.\-]+\@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,8}$/;
    }
    validate(attributeName, attributeValue) {
        let info = this.getMessage(attributeName);
        if (!this.pattern.test(attributeValue)) {
            return '' === info ? attributeName + ' is invalid' : info;
        }
        return '';
    }
}
module.exports = EmailValidator;
