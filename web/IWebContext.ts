import IWebApplication from './IWebApplication';

/**
 * web 上下文
 */
export default interface IWebContext {
    request: any;

    response: any;

    application: IWebApplication;
}
