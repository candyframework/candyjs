/**
 * @author afu
 * @license MIT
 */
'use strict';

const InvalidCallException = require('../core/InvalidCallException');

/**
 * Validator base class
 */
class Validator {
    constructor() {
        /**
         * 所属模型
         */
        this.model = null;
        /**
         * 待验证的属性
         *
         * ```
         * ['name', 'age']
         * ```
         */
        this.attributes = [];
    }

    /**
     * 执行验证
     *
     * @return {String[]}
     */
    validateAttributes() {
        let list = this.attributes;
        let messages = [];

        for(let i=0, msg=''; i<list.length; i++) {
            msg = this.validate(list[i]);

            if('' !== msg) {
                messages.push(msg);
            }
        }

        return messages;
    }

    /**
     * 验证一个属性 子类应该实现该方法
     *
     * @param {String} attribute 属性
     * @return {String} 有错误时返回错误信息 无错误时返回空字符串
     */
    validate(attribute) {
        throw new InvalidCallException('Child class must implement the validate() method');
    }
}

module.exports = Validator;
