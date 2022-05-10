/**
 * @author afu
 * @license MIT
 */
import Validator = require('../Validator');

/**
 * 检查一个属性是不是空值 null undefined or 空字符串
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  rule: 'candy/model/validators/RequiredValidator',
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
    public validate(attributeName: string, attributeValue: any): string {
        let info = this.getMessage(attributeName);

        if(
            undefined === attributeValue
            || '' === attributeValue
            || null === attributeValue
        ) {
            return '' === info ? attributeName + ' is required' : info;
        }

        return '';
    }

}

export = RequiredValidator;
