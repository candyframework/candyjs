import Validator = require('./Validator');

/**
 * 模型接口
 */
export default interface IModel {
    /**
     * 模型名
     */
    modelName: string;

    /**
     * 数据字段配置
     *
     * 现阶段没有完整的反射机制可以获取模型属性列表
     * 所以使用一个专用变量保存模型的属性
     *
     * ```
     * {
     *      name: 'defaultValue',
     *      age: defaultValue
     * }
     * ```
     */
    attributes: any;

    /**
     * 模型属性与表单字段对应关系 用于解决模型字段与表单字段名称不同问题
     *
     * ```
     * {
     *      name: 'form_user_name'
     * }
     * ```
     */
    attributesMap: any;

    /**
     * 错误信息
     */
    messages: string[];

    /**
     * Returns the validation rules for attributes
     *
     * ```
     * [
     *      {
     *          // 验证器
     *          rule: 'candy/model/RequiredValidator',
     *          // 待验证的属性
     *          attributes: ['name', 'age'],
     *          // 错误信息
     *          messages: ['name is required', 'age is required']
     *      }
     * ]
     * ```
     */
    rules(): any[] | null;

    /**
     * 获取所有属性
     *
     * @return {any}
     */
    getAttributes(): any;

    /**
     * 获取某个属性
     *
     * @param {String} attribute 属性名
     * @throws {ModelException}
     */
    getAttribute(attribute: string): any;

    /**
     * 设置属性
     *
     * @param {any} attributes 属性
     */
    setAttributes(attributes: any): void;

    /**
     * 设置一个属性
     *
     * @param {String} attribute 属性名
     * @param {any} value 属性值
     */
    setAttribute(attribute: string, value: any): void;

    /**
     * 获取验证器
     *
     * @return {Validator[] | null}
     */
    getValidators(): Validator[] | null;

    /**
     * 填充模型
     *
     * @throws {Error}
     */
    fill(incoming: any): boolean;

    /**
     * 执行验证
     *
     * @return {Boolean}
     */
    validate(): boolean;

    /**
     * 获取错误信息
     *
     * @return {String[]}
     */
    getErrors(): string[];

    /**
     * 获取第一个错误信息 如果没有则返回空
     *
     * @return {String}
     */
    getFirstError(): string;

    /**
     * 清空错误信息
     */
    clearErrors(): void;
}
