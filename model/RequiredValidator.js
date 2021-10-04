"use strict";
/**
 * @author afu
 * @license MIT
 */
const Validator = require("./Validator");
/**
 * 检查一个属性是不是空值 null undefined or 空字符串
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  rule: 'candy/model/RequiredValidator'.
 *                  attributes: ['name', 'email'],
 *                  messages: ['name is required', 'email is required']
 *              }
 *          ];
 *      }
 * }
 * ```
 *
 */
class RequiredValidator extends Validator {
    /**
     * @inheritdoc
     */
    validate(attributeName, attributeValue) {
        let info = this.getMessage(attributeName);
        if (null === attributeValue
            || undefined === attributeValue
            || '' === attributeValue) {
            return '' === info ? attributeName + ' is required' : info;
        }
        return '';
    }
}
module.exports = RequiredValidator;
