"use strict";
/**
 * @author afu
 * @license MIT
 */
const Validator = require("../Validator");
/**
 * Check if the attribute value is a boolean value
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  rule: 'candy/model/validators/BooleanValidator',
 *                  attributes: ['booleanAttr'],
 *                  messages: ['booleanAttr is invalid']
 *              }
 *          ];
 *      }
 * }
 * ```
 *
 */
class BooleanValidator extends Validator {
    constructor() {
        super();
        /**
         * 是否严格模式
         */
        this.strict = true;
    }
    /**
     * @inheritdoc
     */
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
