/**
 * @author afu
 * @license MIT
 */
import Validator = require('./Validator');

/**
 * 检查一个属性是不是空值 null undefined or 空字符串
 */
class RequiredValidator extends Validator {

    /**
     * @inheritdoc
     */
    public validate(attributeName: string, attributeValue: any): string {
        let info = this.getMessage(attributeName);

        if(
            null === attributeValue
            || undefined === attributeValue
            || '' === attributeValue
        ) {
            return '' === info ? attributeName + ' is required' : info;
        }

        return '';
    }

}

export = RequiredValidator;
