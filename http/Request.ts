/**
 * @author afu
 * @license MIT
 */
import Headers = require('./Headers');
import CoreRequest = require('../core/Request');

/**
 * HTTP request
 */
class Request extends CoreRequest {

    /**
     * http headers
     */
    public headers: Headers = null;

    /**
     * constructor
     *
     * @typedef {import('http').IncomingMessage} IncomingMessage
     * @param {IncomingMessage} request
     */
    constructor(request: any) {
        super(request);
    }

    /**
     * 获取一条 session
     *
     * @param {Boolean} create 不存在时是否创建
     */
    public getSession(create: boolean = true): any {}

    /**
     * 获取 get 参数
     *
     * @param {String} parameter 参数名
     * @param {String} defaultValue 默认值
     * @return {any}
     */
    public getQueryString(parameter: string, defaultValue: any = null): any {
        let params = new URL(this.request.url, this.getHostInfo()).searchParams;
        let value = params.get(parameter);

        return null === value ? defaultValue : value;
    }

    /**
     * 获取 post 参数
     *
     * @param {String} parameter 参数名
     * @param {String} defaultValue 默认值
     * @return {any}
     */
    public getParameter(parameter: string, defaultValue: any = null): any {
        if(undefined === this.request.body) {
            return defaultValue;
        }

        return undefined === this.request.body[parameter] ? defaultValue : this.request.body[parameter];
    }

    /**
     * Returns the header collection
     *
     * @return {Headers}
     */
    public getHeaders(): Headers {
        if(null === this.headers) {
            this.headers = new Headers();

            let map = this.request.headers;
            for(let name in map) {
                // Node process headers as follow
                // For duplicate cookie headers, the values are joined together with '; '
                // For all other headers, the values are joined together with ', '
                this.headers.set(name, map[name]);
            }
        }

        return this.headers;
    }

    /**
     * 获取 cookie
     *
     * @param {String} name cookie name
     * @return {String | null}
     */
    public getCookie(name: string): string | null {
        let cookie = this.request.headers.cookie;

        if(undefined === cookie) {
            return null;
        }

        let ret = null;
        let list = cookie.split('; ');
        for(let i=0, equalIndex=0, key='', value=''; i<list.length; i++) {
            equalIndex = list[i].indexOf('=');

            if(-1 === equalIndex) {
                continue;
            }

            key = list[i].substring(0, equalIndex);
            value = list[i].substring(equalIndex + 1);

            if(name === key) {
                ret = value;
                break;
            }
        }

        return ret;
    }

    /**
     * 获取客户端 ip
     *
     * @return {String}
     */
    public getClientIp(): string {
        let forward = this.request.headers['x-forwarded-for'];

        if(undefined === forward) {
            return this.request.connection.remoteAddress;
        }

        return forward.indexOf(',') > 0
            ? forward.substring(0, forward.indexOf(','))
            : forward;
    }

    /**
     * 获取引用网址
     *
     * @return {String | null}
     */
    public getReferer(): string | null {
        let referer = this.request.headers.referer;

        if(undefined === referer) {
            return null;
        }

        return referer;
    }

    /**
     * 获取 URI 协议和主机部分
     *
     * @return {String}
     */
    public getHostInfo(): string {
        let protocol = undefined !== this.request.socket.encrypted
            || 'https' === this.request.headers['x-forwarded-protocol']
                ? 'https'
                : 'http';

        let host = protocol + '://' + this.request.headers.host;

        return host;
    }

    /**
     * 获取当前网址 不包含锚点部分
     *
     * @return {String}
     */
    public getCurrent(): string {
        return this.getHostInfo() + this.request.url;
    }

    /**
     * 创建 URL 对象
     *
     * @return {URL}
     */
    public createURL(): URL {
        return new URL(this.request.url, this.getHostInfo());
    }

}

export = Request;
