/**
 * @author afu
 * @license MIT
 */
import IModel from './IModel';

import Candy = require('../Candy');
import Component = require('../core/Component');
import Validator = require('./Validator');
import ModelException = require('../core/ModelException');

/**
 * 用于存储和校验数据
 */
class Model extends Component implements IModel {

    /**
     * 从哪里获取参数
     */
    static fromParameter = 'body';

    public modelName: string = '';

    public attributes: any = null;
    public attributesMap: any = null;
    public messages: string[] = [];

    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public rules(): any[] | null {
        return null;
    }

    /**
     * @inheritdoc
     */
    public getAttributes(): any {
        return this.attributes;
    }

    /**
     * @inheritdoc
     */
    public getAttribute(attribute: string): any {
        if(null === this.attributes) {
            throw new ModelException('The model has no attribute to get');
        }

        return this.attributes[attribute];
    }

    /**
     * @inheritdoc
     */
    public setAttributes(attributes: any): void {
        this.attributes = attributes;
    }

    /**
     * @inheritdoc
     */
    public setAttribute(attribute: string, value: any): void {
        if(null === this.attributes) {
            this.attributes = {};
        }

        this.attributes[attribute] = value;
    }

    /**
     * @inheritdoc
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
     * @inheritdoc
     */
    public fill(incoming: any): boolean {
        if(null === this.attributes) {
            throw new ModelException('The model has no attributes to fill');
        }

        let fields = Object.getOwnPropertyNames(this.attributes);
        let data = incoming[Model.fromParameter];

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
     * @inheritdoc
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
     * @inheritdoc
     */
    public getErrors(): string[] {
        return this.messages;
    }

    /**
     * @inheritdoc
     */
    public getFirstError(): string {
        if(this.messages.length > 0) {
            return this.messages[0];
        }

        return '';
    }

    /**
     * @inheritdoc
     */
    public clearErrors(): void {
        this.messages = [];
    }

}

export = Model;
