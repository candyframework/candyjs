/**
 * @author afu
 * @license MIT
 */
'use strict';

const ModelException = require('../core/ModelException');

/**
 * Validator base class
 */
class Validator {
    constructor() {
        /**
         * 所属模型
         *
         * @typedef {import('./Model')} Model
         * @type {Model}
         */
        this.model = null;
        /**
         * 待验证的属性
         *
         * ```
         * ['name', 'age']
         * ```
         */
        this.attributes = null;
        /**
         * 属性验证不通过时的错误信息 与 attributes 一一对应
         */
        this.messages = null;
    }

    /**
     * 执行验证
     *
     * @return {String[]}
     */
    validateAttributes() {
        let list = this.attributes;
        let messages = [];

        for(let i=0, result='', currentMessage=''; i<list.length; i++) {
            currentMessage = null !== this.messages && this.messages.length > i
                ? this.messages[i]
                : '';
            result = this.validate(list[i], this.model.attributes[ list[i] ], currentMessage);

            if('' !== result) {
                messages.push(result);
            }
        }

        return messages;
    }

    /**
     * 验证一个属性 子类应该实现该方法
     *
     * @param {String} attributeName 属性名
     * @param {any} attributeValue 属性值
     * @param {String} message 错误信息
     * @return {String} 有错误时返回错误信息 无错误时返回空字符串
     */
    validate(attributeName, attributeValue, message) {
        throw new ModelException('Child class must implement the validate() method');
    }
}

module.exports = Validator;
