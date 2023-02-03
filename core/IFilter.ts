/**
 * @author afu
 * @license MIT
 */
import IFilterChain from './IFilterChain';

/**
 * 过滤器接口
 */
export default interface IFilter {

    /**
     * The filter method
     *
     * 如果当前过滤器想终止过滤链 必须手动调用 response.end('') 结束请求
     */
    doFilter(req: any, res: any, chain: IFilterChain): void;

}
