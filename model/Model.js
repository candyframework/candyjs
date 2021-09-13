/**
 * @author afu
 * @license MIT
 */
'use strict';

const Candy = require('../Candy');
const Component = require('../core/Component');
const Validator = require('./Validator');

/**
 * 用于存储和校验与数据库相关的数据
 */
class Model extends Component {
    constructor() {
        super();

        /**
         * 数据字段 一般与数据库字段一致
         *
         * ```
         * {
         *      name: 'xyz',
         *      age: 10
         * }
         * ```
         */
        this.attributes = null;

        /**
         * 模型属性与表单字段对应关系
         */
        this.attributesMap = null;

        /**
         * 错误信息
         */
        this.messages = [];
    }

    /**
     * Returns the validation rules for attributes
     *
     * ```
     * [
     *      {
     *          rule: 'candy/validators/RequiredValidator',
     *          attributes: ['name', 'age']
     *      }
     * ]
     * ```
     */
    rules() {
        return null;
    }

    /**
     * 获取所有属性
     *
     * @return {any}
     */
    getAttributes() {
        return this.attributes;
    }

    /**
     * 设置属性
     *
     * @param {any} attributes 属性
     */
    setAttributes(attributes) {
        this.attributes = attributes;
    }

    /**
     * 设置一个属性
     *
     * @param {String} attribute 属性名
     * @param {any} value 属性值
     */
    setAttribute(attribute, value) {
        this.attributes[attribute] = value;
    }

    /**
     * 获取验证器
     *
     * @return {Validator[] | null}
     */
    getValidators() {
        let rules = this.rules();
        if(null === rules) {
            return null;
        }

        let ret = [];

        for(let i=0; i<rules.length; i++) {
            if(rules[i].rule instanceof Validator) {
                rules[i].model = this;
                rules[i].attributes = rules[i].attributes;
                ret.push(rules[i]);

                continue;
            }

            ret.push(
                Candy.createObjectAsDefinition({
                    classPath: rules[i].rule,
                    model: this,
                    attributes: rules[i].attributes
                })
            );
        }

        return ret;
    }

    /**
     * 执行验证
     *
     * @return {Boolean}
     */
    validate() {
        let validators = this.getValidators();

        if(null === validators) {
            return true;
        }

        for(let validator of validators) {
            this.messages = this.messages.concat(validator.validateAttributes());
        }

        return this.messages.length === 0;
    }

    /**
     * 获取错误信息
     *
     * @return {String[]}
     */
    getErrors() {
        return this.messages;
    }

    /**
     * 清空错误信息
     */
    clearErrors() {
        this.messages = [];
    }
}

module.exports = Model;
