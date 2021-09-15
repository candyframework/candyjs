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
    validate(attributeName, attributeValue, message) {
        if(
            null === attributeValue
            || undefined === attributeValue
            || '' === attributeValue
        ) {
            return '' === message
                ? attributeName + ' is required'
                : message;
        }

        return '';
    }
}

module.exports = RequiredValidator;
