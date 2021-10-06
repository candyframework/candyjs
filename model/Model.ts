/**
 * @author afu
 * @license MIT
 */
import Candy = require('../Candy');
import Component = require('../core/Component');
import Validator = require('./Validator');
import ModelException = require('../core/ModelException');

/**
 * 用于存储和校验与数据库相关的数据
 */
class Model extends Component {

    /**
     * 从哪里获取参数
     */
    static fromParameter = 'body';

    public attributes: any;
    public attributesMap: any;
    public messages: string[];

    constructor() {
        super();

        /**
         * 数据字段配置 一般与数据库字段一致
         *
         * ```
         * {
         *      name: 'defaultValue',
         *      age: defaultValue
         * }
         * ```
         */
        this.attributes = null;

        /**
         * 模型属性与表单字段对应关系 用于解决模型字段与表单字段名称不同问题
         *
         * ```
         * {
         *      name: 'form_user_name'
         * }
         * ```
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
     *          // 必选参数
     *          rule: 'candy/model/RequiredValidator',
     *          attributes: ['name', 'age'],
     *          // 可选参数 错误信息
     *          messages: ['name is required', 'age is required']
     *      }
     * ]
     * ```
     */
    public rules(): any[] | null {
        return null;
    }

    /**
     * 获取所有属性
     *
     * @return {any}
     */
    public getAttributes(): any {
        return this.attributes;
    }

    /**
     * 获取某个属性
     *
     * @param {String} attribute 属性名
     * @throws {ModelException}
     */
    public getAttribute(attribute: string): any {
        if(null === this.attributes) {
            throw new ModelException('The model has no attribute to get');
        }

        return this.attributes[attribute];
    }

    /**
     * 设置属性
     *
     * @param {any} attributes 属性
     */
    public setAttributes(attributes: any): void {
        this.attributes = attributes;
    }

    /**
     * 设置一个属性
     *
     * @param {String} attribute 属性名
     * @param {any} value 属性值
     */
    public setAttribute(attribute: string, value: any): void {
        if(null === this.attributes) {
            this.attributes = {};
        }

        this.attributes[attribute] = value;
    }

    /**
     * 获取验证器
     *
     * @return {Validator[] | null}
     */
    public getValidators(): Validator[] | null {
        let rules = this.rules();
        if(null === rules) {
            return null;
        }

        let ret = [];

        for(let i=0; i<rules.length; i++) {
            let messages = undefined === rules[i].messages ? null : rules[i].messages;

            // rule is validator instance
            if(rules[i].rule instanceof Validator) {
                rules[i].rule.model = this;
                rules[i].rule.attributes = rules[i].attributes;
                rules[i].rule.messages = messages;
                ret.push(rules[i].rule);

                continue;
            }

            // rule is string
            if('string' === typeof rules[i].rule) {
                ret.push(
                    Candy.createObjectAsDefinition({
                        classPath: rules[i].rule,
                        model: this,
                        attributes: rules[i].attributes,
                        messages: messages
                    })
                );

                continue;
            }

            // rule is config
            ret.push(
                Candy.createObjectAsDefinition(Object.assign({
                    model: this,
                    attributes: rules[i].attributes,
                    messages: messages
                }, rules[i].rule))
            );
        }

        return ret;
    }

    /**
     * 填充模型
     */
    public fill(request: any): boolean {
        if(null === this.attributes) {
            throw new ModelException('The model has no attributes to fill');
        }

        let fields = Object.getOwnPropertyNames(this.attributes);
        let data = request[Model.fromParameter];

        if(undefined === data) {
            return false;
        }

        let value = '';
        for(let field of fields) {
            if(null !== this.attributesMap && undefined !== this.attributesMap[field]) {
                value = data[ this.attributesMap[field] ];
            } else {
                value = data[ field ];
            }

            this.attributes[field] = value;
        }

        return true;
    }

    /**
     * 执行验证
     *
     * @return {Boolean}
     */
    public validate(): boolean {
        if(null === this.attributes) {
            throw new ModelException('The model has no attributes to validate');
        }

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
    public getErrors(): string[] {
        return this.messages;
    }

    /**
     * 清空错误信息
     */
    public clearErrors(): void {
        this.messages = [];
    }

}

export = Model;
