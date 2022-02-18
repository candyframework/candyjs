"use strict";
/**
 * @author afu
 * @license MIT
 */
const Headers = require("./Headers");
const CoreRequest = require("../core/Request");
/**
 * HTTP request
 */
class Request extends CoreRequest {
    /**
     * constructor
     *
     * @typedef {import('http').IncomingMessage} IncomingMessage
     * @param {IncomingMessage} request
     */
    constructor(request) {
        super(request);
        /**
         * http headers
         */
        this.headers = null;
    }
    /**
     * 获取一条 session
     *
     * @param {Boolean} create 不存在时是否创建
     */
    getSession(create = true) { }
    /**
     * 获取 get 参数
     *
     * @param {String} parameter 参数名
     * @param {String} defaultValue 默认值
     * @return {String}
     */
    getQueryString(parameter, defaultValue = undefined) {
        let params = new URL(this.request.url, this.getHostInfo()).searchParams;
        return params.has(parameter) ? params.get(parameter) : defaultValue;
    }
    /**
     * 获取 post 参数
     *
     * @param {String} parameter 参数名
     * @param {String} defaultValue 默认值
     * @return {String}
     */
    getParameter(parameter, defaultValue = undefined) {
        if (undefined === this.request.body) {
            return defaultValue;
        }
        return undefined === this.request.body[parameter] ? defaultValue : this.request.body[parameter];
    }
    /**
     * Returns the headers collection
     *
     * @return {Headers}
     */
    getHeaders() {
        if (null === this.headers) {
            this.headers = new Headers();
            let map = this.request.headers;
            for (let name in map) {
                // Node process headers as follow
                // For duplicate cookie headers, the values are joined together with '; '
                // For all other headers, the values are joined together with ', '
                this.headers.set(name, map[name]);
            }
        }
        return this.headers;
    }
    /**
     * Returns the cookies collection
     *
     * @return {Map<String, String>}
     */
    getCookies() {
        let map = new Map();
        let cookie = this.request.headers.cookie;
        if (undefined === cookie) {
            return map;
        }
        let list = cookie.split('; ');
        for (let i = 0, equalIndex = 0; i < list.length; i++) {
            equalIndex = list[i].indexOf('=');
            if (-1 === equalIndex) {
                map.set(list[i], '');
            }
            else {
                map.set(list[i].substring(0, equalIndex), list[i].substring(equalIndex + 1));
            }
        }
        return map;
    }
    /**
     * 获取客户端 ip
     *
     * @return {String}
     */
    getClientIp() {
        let forward = this.request.headers['x-forwarded-for'];
        if (undefined === forward) {
            return this.request.connection.remoteAddress;
        }
        return forward.indexOf(',') > 0
            ? forward.substring(0, forward.indexOf(','))
            : forward;
    }
    /**
     * 获取引用网址
     *
     * @return {String}
     */
    getReferrer() {
        let headers = this.request.headers;
        if (undefined !== headers.referrer) {
            return headers.referrer;
        }
        return headers.referer;
    }
    /**
     * 获取 URI 协议和主机部分
     *
     * @return {String}
     */
    getHostInfo() {
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
    getCurrent() {
        return this.getHostInfo() + this.request.url;
    }
    /**
     * 创建 URL 对象
     *
     * @return {URL}
     */
    createURL() {
        return new URL(this.request.url, this.getHostInfo());
    }
}
module.exports = Request;
