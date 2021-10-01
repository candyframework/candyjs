"use strict";
/**
 * @author afu
 * @license MIT
 */
/**
 * 一条 HTTP cookie 信息
 *
 * name=value; Expires=expires; Path=path; Domain=domain[; secure][; httponly]
 */
class Cookie {
    /**
     * constructor
     *
     * @param {String} name cookie name
     * @param {String} value cookie value
     * @param {Number} expires cookie expires time in milliseconds
     * @param {String} path cookie path
     * @param {String} domain cookie domain
     * @param {Boolean} secure cookie secure
     * @param {Boolean} httpOnly cookie httpOnly
     */
    constructor(name, value, expires = 0, path = '', domain = '', secure = false, httpOnly = false) {
        this.name = name;
        this.value = value;
        this.expires = expires;
        this.path = path;
        this.domain = domain;
        this.secure = secure;
        this.httpOnly = httpOnly;
    }
    /**
     * 格式化一条 cookie
     *
     * @return {String}
     */
    toString() {
        let ret = [this.name + '=' + this.value];
        if (0 !== this.expires) {
            ret.push('Expires=' + new Date(this.expires).toUTCString());
        }
        ret.push('Path=' + this.path);
        if ('' !== this.domain) {
            ret.push('Domain=' + this.domain);
        }
        if (this.secure) {
            ret.push('Secure');
        }
        if (this.httpOnly) {
            ret.push('HttpOnly');
        }
        return ret.join('; ');
    }
}
module.exports = Cookie;
