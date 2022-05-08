/**
 * @author afu
 * @license MIT
 */
import Validator = require('../Validator');

/**
 * 检查邮件地址是否合法
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  rule: 'candy/model/validators/EmailValidator',
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

    /**
     * 模式
     */
    public pattern: RegExp = /^[a-zA-Z0-9_\.\-]+\@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,8}$/;

    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public validate(attributeName: string, attributeValue: any): string {
        let info = this.getMessage(attributeName);

        if(!this.pattern.test(attributeValue)) {
            return '' === info ? attributeName + ' is invalid' : info;
        }

        return '';
    }

}

export = EmailValidator;
