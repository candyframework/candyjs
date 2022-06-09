"use strict";
class URI {
    constructor() {
        this.scheme = '';
        this.host = '';
        this.port = '';
        this.user = '';
        this.password = '';
        this.path = '';
        this.query = '';
        this.fragment = '';
        this.uriRegExp = new RegExp([
            '(http|https)?',
            '(?::\\/\\/)?',
            '(?:([^:@\\/]*):?([^:@\\/]*)@)?',
            '([^:\\/?#]*)(?::(\\d*))?',
            '((?:\\/)?[^?#]*)',
            '(?:\\?([^#]*))?',
            '(?:#(.*))?'
        ].join(''));
        this.uriRegExpKeys = [
            'source',
            'scheme',
            'user',
            'password',
            'host',
            'port',
            'path',
            'query',
            'fragment'
        ];
    }
    createURIString(scheme = '', authority = '', path = '', query = '', fragment = '') {
        let uri = '';
        if ('' !== scheme) {
            uri += scheme + '://';
        }
        if ('' !== authority) {
            uri += authority;
        }
        if ('' !== path) {
            if ('/' !== path.charAt(0)) {
                path = '/' + path;
            }
            uri += path;
        }
        if ('' !== query) {
            uri += '?' + query;
        }
        if ('' !== fragment) {
            uri += '#' + fragment;
        }
        return uri;
    }
    setURI(uri) {
        let ret = this.parseUrl(uri);
        if (undefined !== ret.scheme) {
            this.scheme = ret.scheme;
        }
        if (undefined !== ret.host) {
            this.host = ret.host;
        }
        if (undefined !== ret.port) {
            this.port = ret.port;
        }
        if (undefined !== ret.user) {
            this.user = ret.user;
        }
        if (undefined !== ret.password) {
            this.password = ret.password;
        }
        if (undefined !== ret.path) {
            this.path = ret.path;
        }
        if (undefined !== ret.query) {
            this.query = ret.query;
        }
        if (undefined !== ret.fragment) {
            this.fragment = ret.fragment;
        }
    }
    parseUrl(url) {
        let ret = {};
        let matches = url.match(this.uriRegExp);
        if (null !== matches) {
            for (let i = 0, len = this.uriRegExpKeys.length; i < len; i++) {
                ret[this.uriRegExpKeys[i]] = matches[i];
            }
        }
        return ret;
    }
    getAuthority() {
        let authority = '';
        if ('' !== this.user) {
            authority += this.user + ':' + this.password + '@';
        }
        authority += this.host;
        if ('' !== this.port) {
            authority += ':' + this.port;
        }
        return authority;
    }
    toString() {
        return this.createURIString(this.scheme, this.getAuthority(), this.path, this.query, this.fragment);
    }
}
module.exports = URI;
