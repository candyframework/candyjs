"use strict";
const Headers = require("./Headers");
const CoreRequest = require("../core/Request");
class Request extends CoreRequest {
    constructor(request) {
        super(request);
        this.headers = null;
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
            this.headers = new Headers();
            let map = this.request.headers;
            for (let name in map) {
                this.headers.set(name, map[name]);
            }
        }
        return this.headers;
    }
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
