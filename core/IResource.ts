/**
 * @author afu
 * @license MIT
 */

/**
 * 实现该接口的类称为资源类
 */
export default interface IResource {

    /**
     * 声明资源过滤器
     */
    filters(): any;

    /**
     * 执行
     */
    run(...parameters): void;

}
