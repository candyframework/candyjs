"use strict";
const Candy = require("../Candy");
const Component = require("../core/Component");
const Validator = require("./Validator");
const ModelException = require("../core/ModelException");
class Model extends Component {
    constructor() {
        super();
        this.modelName = '';
        this.attributes = null;
        this.attributesMap = null;
        this.messages = [];
    }
    rules() {
        return null;
    }
    getAttributes() {
        return this.attributes;
    }
    getAttribute(attribute) {
        if (null === this.attributes) {
            throw new ModelException('The model has no attribute to get');
        }
        return this.attributes[attribute];
    }
    setAttributes(attributes) {
        this.attributes = attributes;
    }
    setAttribute(attribute, value) {
        if (null === this.attributes) {
            this.attributes = {};
        }
        this.attributes[attribute] = value;
    }
    getValidators() {
        let rules = this.rules();
        if (null === rules) {
            return null;
        }
        let ret = [];
        for (let i = 0; i < rules.length; i++) {
            let messages = undefined === rules[i].messages ? null : rules[i].messages;
            if (rules[i].rule instanceof Validator) {
                rules[i].rule.model = this;
                rules[i].rule.attributes = rules[i].attributes;
                rules[i].rule.messages = messages;
                ret.push(rules[i].rule);
                continue;
            }
            if ('string' === typeof rules[i].rule) {
                ret.push(Candy.createObjectAsDefinition({
                    classPath: rules[i].rule,
                    model: this,
                    attributes: rules[i].attributes,
                    messages: messages
                }));
                continue;
            }
            ret.push(Candy.createObjectAsDefinition(Object.assign({
                model: this,
                attributes: rules[i].attributes,
                messages: messages
            }, rules[i].rule)));
        }
        return ret;
    }
    fill(incoming) {
        if (null === this.attributes) {
            throw new ModelException('The model has no attributes to fill');
        }
        let fields = Object.getOwnPropertyNames(this.attributes);
        let data = incoming[Model.fromParameter];
        if (undefined === data) {
            return false;
        }
        let value = '';
        for (let field of fields) {
            if (null !== this.attributesMap && undefined !== this.attributesMap[field]) {
                value = data[this.attributesMap[field]];
            }
            else {
                value = data[field];
            }
            this.attributes[field] = value;
        }
        return true;
    }
    validate() {
        if (null === this.attributes) {
            throw new ModelException('The model has no attributes to validate');
        }
        let validators = this.getValidators();
        if (null === validators) {
            return true;
        }
        for (let validator of validators) {
            this.messages = this.messages.concat(validator.validateAttributes());
        }
        return this.messages.length === 0;
    }
    getErrors() {
        return this.messages;
    }
    getFirstError() {
        if (this.messages.length > 0) {
            return this.messages[0];
        }
        return '';
    }
    clearErrors() {
        this.messages = [];
    }
}
Model.fromParameter = 'body';
module.exports = Model;
