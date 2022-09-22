"use strict";
const CoreRequest = require("../core/Request");
const HeaderCollection = require("./HeaderCollection");
const CookieCollection = require("./CookieCollection");
class Request extends CoreRequest {
    constructor(request) {
        super(request);
        this.headers = null;
        this.cookies = null;
    }
    getSession(create = true) { }
    getQueryString(parameter, defaultValue = undefined) {
        let params = new URL(this.request.url, this.getHostInfo()).searchParams;
        return params.has(parameter) ? params.get(parameter) : defaultValue;
    }
    getParameter(parameter, defaultValue = undefined) {
        if (undefined === this.request.body) {
            return defaultValue;
        }
        return undefined === this.request.body[parameter] ? defaultValue : this.request.body[parameter];
    }
    getHeaders() {
        if (null === this.headers) {
            this.headers = new HeaderCollection();
            let map = this.request.headers;
            for (let name in map) {
                this.headers.set(name, map[name]);
            }
        }
        return this.headers;
    }
    getCookies() {
        if (null === this.cookies) {
            this.cookies = new CookieCollection();
            let cookie = this.request.headers.cookie;
            if (undefined === cookie) {
                return this.cookies;
            }
            let list = cookie.split('; ');
            for (let i = 0, equalIndex = 0; i < list.length; i++) {
                equalIndex = list[i].indexOf('=');
                if (-1 === equalIndex) {
                    this.cookies.set(list[i], '');
                }
                else {
                    this.cookies.set(list[i].substring(0, equalIndex), list[i].substring(equalIndex + 1));
                }
            }
        }
        return this.cookies;
    }
    getClientIp() {
        let forward = this.request.headers['x-forwarded-for'];
        if (undefined === forward) {
            return this.request.connection.remoteAddress;
        }
        return forward.indexOf(',') > 0
            ? forward.substring(0, forward.indexOf(','))
            : forward;
    }
    getReferrer() {
        let headers = this.request.headers;
        if (undefined !== headers.referrer) {
            return headers.referrer;
        }
        return headers.referer;
    }
    getHostInfo() {
        let protocol = undefined !== this.request.socket.encrypted
            || 'https' === this.request.headers['x-forwarded-protocol']
            ? 'https'
            : 'http';
        let host = protocol + '://' + this.request.headers.host;
        return host;
    }
    getCurrent() {
        return this.getHostInfo() + this.request.url;
    }
    createURL() {
        return new URL(this.request.url, this.getHostInfo());
    }
}
module.exports = Request;
