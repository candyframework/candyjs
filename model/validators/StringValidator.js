"use strict";
/**
 * @author afu
 * @license MIT
 */
const Validator = require("../Validator");
/**
 * 校验字符串
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  rule: {
 *                      classPath: 'candy/model/validators/StringValidator',
 *                      minLength: 1,
 *                      maxLength: 2333
 *                  },
 *                  attributes: ['name'],
 *                  messages: ['length of the name should be between 1 and 2333']
 *              }
 *          ];
 *      }
 * }
 * ```
 *
 */
class StringValidator extends Validator {
    constructor() {
        super();
        /**
         * 删除两端空格
         */
        this.trim = true;
        /**
         * 最小长度
         */
        this.minLength = 1;
        /**
         * 最大长度
         */
        this.maxLength = 2333;
    }
    /**
     * @inheritdoc
     */
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
