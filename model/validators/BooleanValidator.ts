/**
 * @author afu
 * @license MIT
 */
import Validator = require('../Validator');

/**
 * Check if the attribute value is a boolean value
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  rule: 'candy/model/BooleanValidator',
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

    /**
     * 是否严格模式
     */
    public strict: boolean = true;

    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public validate(attributeName: string, attributeValue: any): string {
        let valid = false;
        let info = this.getMessage(attributeName);

        if(this.strict) {
            valid = true === attributeValue || false === attributeValue;

        } else {
            valid = true == attributeValue || false == attributeValue;
        }

        if(!valid) {
            return '' === info ? attributeName + ' is invalid' : info;
        }

        return '';
    }

}

export = BooleanValidator;
