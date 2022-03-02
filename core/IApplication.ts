/**
 * @author afu
 * @license MIT
 */

/**
 * 应用接口层
 */
export default interface IApplication {
    /**
     * 编码
     */
    encoding: string;

    /**
     * 调试开关
     */
    debug: boolean;

    /**
     * 异常处理类
     */
    exceptionHandler: string;

    /**
     * 设置应用路径
     *
     * @param {String} path 应用路径
     */
    setAppPath(path: string): void;

    /**
     * 得到应用目录
     *
     * @return {String} 路径
     */
    getAppPath(): string;

    /**
     * 设置 runtime 路径
     *
     * @param {String} path 路径
     */
    setRuntimePath(path: string): void;

    /**
     * 得到 runtime 目录
     *
     * @return {String} 路径
     */
    getRuntimePath(): string;

    /**
     * 设置 root 路径
     *
     * @param {String} path 路径
     */
    setRootPath(path: string): void;

    /**
     * 得到 root 目录
     *
     * @return {String} 路径
     */
    getRootPath(): string;

    /**
     * handle request
     *
     * @param {any} request http request
     * @param {any} response http response
     */
    requestListener(request: any, response: any): void;

    /**
     * 异常处理
     *
     * @param {any} exception 异常类
     * @param {any} response http response
     */
    handlerException(exception: any, response: any): void;
}
