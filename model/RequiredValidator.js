/**
 * @author afu
 * @license MIT
 */
'use strict';

const Validator = require('./Validator');

/**
 * 检查一个属性是不是空值 null undefined or 空字符串
 */
class RequiredValidator extends Validator {
    /**
     * @inheritdoc
     */
    validate(attribute) {
        if(
            !this.model.attributes
            || null === this.model.attributes[attribute]
            || undefined === this.model.attributes[attribute]
            || '' === this.model.attributes[attribute]
        ) {
            return attribute + ' is required';
        }

        return '';
    }
}

module.exports = RequiredValidator;
