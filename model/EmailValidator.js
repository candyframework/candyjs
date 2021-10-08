"use strict";
/**
 * @author afu
 * @license MIT
 */
const Validator = require("./Validator");
/**
 * 检查邮件地址是否合法
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  rule: 'candy/model/EmailValidator',
 *                  attributes: ['user_email'],
 *                  messages: ['user email is invalid']
 *              }
 *          ];
 *      }
 * }
 * ```
 *
 */
class EmailValidator extends Validator {
    constructor() {
        super();
        this.pattern = /^[a-zA-Z0-9_\.\-]+\@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,8}$/;
    }
    /**
     * @inheritdoc
     */
    validate(attributeName, attributeValue) {
        let info = this.getMessage(attributeName);
        if (!this.pattern.test(attributeValue)) {
            return '' === info ? attributeName + ' is invalid' : info;
        }
        return '';
    }
}
module.exports = EmailValidator;
