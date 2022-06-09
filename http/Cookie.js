"use strict";
class Cookie {
    constructor(name, value, expires = 0, path = '', domain = '', secure = false, httpOnly = false) {
        this.name = name;
        this.value = value;
        this.expires = expires;
        this.path = path;
        this.domain = domain;
        this.secure = secure;
        this.httpOnly = httpOnly;
    }
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
