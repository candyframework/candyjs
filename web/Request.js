/**
 * @author afu
 * @license MIT
 */
'use strict';

const url = require('url');

const HttpRequest = require('../http/Request');

/**
 * 请求
 *
 * @deprecated
 * @see HttpRequest
 */
class Request extends HttpRequest {

    /**
     * constructor
     */
    constructor(request) {
        super(request);
    }

    /**
     * 解析 request url
     *
     * @deprecated
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
        return new HttpRequest(request).getClientIp();
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
        return new HttpRequest(request).getQueryString(parameter, defaultValue);
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
        return new HttpRequest(request).getParameter(parameter, defaultValue);
    }

    /**
     * 获取 cookie
     *
     * @param {Object} request 请求对象
     * @param {String} name cookie name
     */
    static getCookie(request, name) {
        return new HttpRequest(request).getCookie(name);
    }

}

module.exports = Request;
