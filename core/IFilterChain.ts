/**
 * @author afu
 * @license MIT
 */

/**
 * 过滤链接口
 */
export default interface IFilterChain {

    /**
     * Invoked the next filter or the resource
     */
    doFilter(req: any, res: any): void;

}
