/**
 * @author afu
 * @license MIT
 */
'use strict';

const url = require('url');
const querystring = require('querystring');

const Headers = require('./Headers');
const CoreRequest = require('../core/Request');

/**
 * HTTP request
 */
class Request extends CoreRequest {

    /**
     * constructor
     */
    constructor(request) {
        super(request);

        this.headers = null;
    }

    /**
     * 获取 get 参数
     *
     * @param {String} parameter 参数名
     * @param {String} defaultValue 默认值
     * @return {String | null}
     */
    getQueryString(parameter, defaultValue = null) {
        let parsed = url.parse(this.request.url);

        if(null === parsed.query) {
            return defaultValue;
        }

        let ret = querystring.parse(parsed.query);

        return undefined === ret[parameter] ? defaultValue : ret[parameter];
    }

    /**
     * 获取 post 参数
     *
     * @param {String} parameter 参数名
     * @param {String} defaultValue 默认值
     * @return {String | null}
     */
    getParameter(parameter, defaultValue = null) {
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
    getHeaders() {
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
    getCookie(name) {
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
    getClientIp() {
        let forward = this.request.headers['x-forwarded-for'];

        if(undefined !== forward) {
            return forward.indexOf(',') > 0
                ? forward.substring(0, forward.indexOf(','))
                : forward;
        }

        return this.request.connection.remoteAddress;
    }

    /**
     * 获取引用网址
     *
     * @return {String | null}
     */
    getReferer() {
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
