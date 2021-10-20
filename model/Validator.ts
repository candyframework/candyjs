/**
 * @author afu
 * @license MIT
 */

/**
 * Validator base class
 */
class Validator {

    /**
     * 所属模型
     *
     * @typedef {import('./Model')} Model
     * @type {Model}
     */
    public model: any = null;

    /**
     * 待验证的属性
     *
     * ```
     * ['name', 'age']
     * ```
     */
    public attributes: string[] | null = null;

    /**
     * 属性验证不通过时的错误信息 与 attributes 一一对应
     *
     * ```
     * ['name is required', 'age is required']
     * ```
     */
    public messages: string[] | null = null;

    /**
     * 是否跳过校验
     */
    public skip: boolean = false;

    constructor() {}

    /**
     * 执行验证
     *
     * @return {String[]}
     */
    public validateAttributes(): string[] {
        let list = this.attributes;
        let infos = [];

        for(let i=0, result=''; i<list.length; i++) {
            // 跳过检查
            if(this.skip) {
                // continue or break in experimental stage
                break;
            }

            result = this.validate(list[i], this.model.attributes[ list[i] ]);

            if('' !== result) {
                infos.push(result);
            }
        }

        return infos;
    }

    /**
     * 获取属性的错误描述
     *
     * @param {String} attributeName 属性名
     * @return {String} 有配置错误信息则返回 否则返回空
     */
    public getMessage(attributeName: string): string {
        if(null === this.messages) {
            return '';
        }

        let index = this.attributes.indexOf(attributeName);
        if(-1 === index || this.messages.length <= index) {
            return '';
        }

        return this.messages[index];
    }

    /**
     * 验证一个属性 并返回错误信息
     *
     * @param {String} attributeName 属性名
     * @param {any} attributeValue 属性值
     * @return {String} 有错误时返回错误信息 无错误时返回空字符串
     */
    public validate(attributeName: string, attributeValue: any): string {
        return '';
    }

}

export = Validator;
