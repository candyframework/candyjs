/**
 * @author afu
 * @license MIT
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
