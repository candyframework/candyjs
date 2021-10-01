/**
 * @author afu
 * @license MIT
 */

/**
 * HttpSession 接口
 */
export default interface ISession {

    /**
     * 获取 sessionId
     */
    getId(): string;

    /**
     * 获取一条 session 数据
     *
     * @param {String} name
     */
    getAttribute(name: string): any;

    /**
     * 设置 session
     *
     * @param {String} name
     * @param {any} value
     */
    setAttribute(name: string, value: any): void;

    /**
     * 删除一条 session 数据
     *
     * @param {String} name
     */
    deleteAttribute(name: string): any;

}
