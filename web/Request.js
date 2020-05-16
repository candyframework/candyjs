/**
 * @author
 * @license MIT
 */
'use strict';

const url = require('url');
const querystring = require('querystring');

const Cookie = require('./Cookie');
const CoreRequest = require('../core/Request');

/**
 * 请求
 */
class Request extends CoreRequest {

    /**
     * constructor
     */
    constructor(request) {
        super(request);
    }

    /**
     * 解析 request url
     *
     * @param {Object} request 请求对象
     * @return {Object}
     */
    static parseUrl(request) {
        return url.parse(request.url);
    }

    /**
     * 获取客户端 ip
     *
     * @param {Object} request 请求对象
     * @return {String}
     */
    static getClientIp(request) {
        let forward = request.headers['x-forwarded-for'];
        if(undefined !== forward) {
            return forward.substring(0, forward.indexOf(','));
        }

        return request.connection.remoteAddress;
    }

    /**
     * 静态方法 获取 get 参数
     *
     * @param {Object} request 请求对象
     * @param {String} parameter 参数名
     * @param {String} defaultValue 默认值
     * @return {String | null}
     */
    static getQueryString(request, parameter, defaultValue = null) {
        let parsed = url.parse(request.url);

        if(null === parsed.query) {
            return defaultValue;
        }

        let ret = querystring.parse(parsed.query);

        return undefined === ret[parameter] ? defaultValue : ret[parameter];
    }

    /**
     * 静态方法 获取 post 参数
     *
     * @param {Object} request 请求对象
     * @param {String} parameter 参数名
     * @param {String} defaultValue 默认值
     * @return {String | null}
     */
    static getParameter(request, parameter, defaultValue = null) {
        if(undefined === request.body) {
            return defaultValue;
        }

        return undefined === request.body[parameter] ? defaultValue : request.body[parameter];
    }

    /**
     * 获取 cookie
     *
     * @param {Object} request 请求对象
     * @param {String} name cookie name
     * @see Cookie.getCookie
     */
    static getCookie(request, name) {
        return Cookie.getCookie(request, name);
    }

    /**
     * 获取 get 参数
     *
     * @param {String} parameter 参数名
     * @see Request.getQueryString
     */
    getQueryString(parameter) {
        return Request.getQueryString(this.request, parameter);
    }

    /**
     * 获取 post 参数
     *
     * @param {String} parameter 参数名
     * @see Request.getParameter
     */
    getParameter(parameter) {
        return Request.getParameter(this.request, parameter);
    }

    /**
     * 获取 cookie
     *
     * @param {String} name cookie name
     * @see Request.getCookie
     */
    getCookie(name) {
        return Request.getCookie(this.request, name);
    }

    /**
     * 获取引用网址
     *
     * @return {String | null}
     */
    getReferer(request) {
        if(undefined !== this.request.headers.referer) {
            return this.request.headers.referer;
        }

        return null;
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

}

module.exports = Request;
