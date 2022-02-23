/**
 * @author afu
 * @license MIT
 */

/**
 * 异常错误处理基类
 */
abstract class ExceptionHandler {

    /**
     * 异常处理
     *
     * @param {any} exception 异常类
     * @param {any} response 输出类
     */
    public abstract handlerException(exception: any, response: any): void;

}

export = ExceptionHandler;
