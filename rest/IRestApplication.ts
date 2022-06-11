/**
 * @author afu
 * @license MIT
 */
import IApplication from '../core/IApplication';

export default interface IRestApplication extends IApplication {
    /**
     * get 请求
     */
    get(route: string, handler: any): void;

    /**
     * post 请求
     */
    post(route: string, handler: any): void;

    /**
     * put 请求
     */
    put(route: string, handler: any): void;

    /**
     * delete 请求
     */
    delete(route: string, handler: any): void;

    /**
     * patch 请求
     */
    patch(route: string, handler: any): void;

    /**
     * head 请求
     */
    head(route: string, handler: any): void;

    /**
     * options 请求
     */
    options(route: string, handler: any): void;
}