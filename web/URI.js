/**
 * @author
 * @license MIT
 */
'use strict';

/**
 * Universal Resource Identifier
 *
 * @see https://tools.ietf.org/html/rfc3986
 *
 * URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
 *
 * eg.
 *
 * foo://user:password@example.com:8000/over/there?name=ferret#nose
 * \_/   \____________________________/ \________/ \_________/ \__/
 *  |                   |                   |           |        |
 * scheme           authority              path       query   fragment
 *
 */
class URI {

    /**
     * constructor
     */
    constructor() {
        /**
         * @property {String} scheme 协议
         */
        this.scheme = '';

        /**
         * @property {String} host 主机
         */
        this.host = '';

        /**
         * @property {String} port 端口号
         */
        this.port = '';

        /**
         * @property {String} user 用户
         */
        this.user = '';

        /**
         * @property {String} password 密码
         */
        this.password = '';

        /**
         * @property {String} path 资源路径
         */
        this.path = '';

        /**
         * @property {String} query 请求参数
         */
        this.query = '';

        /**
         * @property {String} fragment 锚点
         */
        this.fragment = '';

        /**
         * @property {RegExp} uri 正则表达式
         */
        this.uriRegExp = new RegExp([
            // (scheme)
            '(http|https)?',
            // ://
            '(?::\\/\\/)?',
            // (user):(password)@
            '(?:([^:@\\/]*):?([^:@\\/]*)@)?',
            // (host):(port)
            '([^:\\/?#]*)(?::(\\d*))?',
            // (path)
            '((?:\\/)?[^?#]*)',
            // ?(query)
            '(?:\\?([^#]*))?',
            // #(fragment)
            '(?:#(.*))?'
        ].join(''));

        /**
         * @property {Array} uri 正则表达式匹配项
         */
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

    /**
     * 创建一个 uri
     *
     * @param {String} scheme
     * @param {String} authority
     * @param {String} path
     * @param {String} query
     * @param {String} fragment
     * @return {String}
     */
    createURIString(scheme = '', authority = '', path = '', query = '', fragment = '') {
        var uri = '';

        if('' !== scheme) {
            uri += scheme + '://';
        }
        if('' !== authority) {
            uri += authority;
        }
        if('' !== path) {
            if('/' !== path.charAt(0)) {
                path = '/' + path;
            }

            uri += path;
        }
        if('' !== query) {
            uri += '?' + query;
        }
        if('' !== fragment) {
            uri += '#' + fragment;
        }

        return uri;
    }

    /**
     * 设置 uri
     *
     * @param {String} uri
     */
    setURI(uri) {
        var ret = this.parseUrl(uri);

        if(undefined !== ret.scheme) {
            this.scheme = ret.scheme;
        }
        if(undefined !== ret.host) {
            this.host = ret.host;
        }
        if(undefined !== ret.port) {
            this.port = ret.port;
        }
        if(undefined !== ret.user) {
            this.user = ret.user;
        }
        if(undefined !== ret.password) {
            this.password = ret.password;
        }
        if(undefined !== ret.path) {
            this.path = ret.path;
        }
        if(undefined !== ret.query) {
            this.query = ret.query;
        }
        if(undefined !== ret.fragment) {
            this.fragment = ret.fragment;
        }
    }

    /**
     * 解析 url
     *
     * @param {String} url
     * @return {JSON}
     */
    parseUrl(url) {
        var ret = {};

        var matches = url.match(this.uriRegExp);

        if(null !== matches) {
            for(let i=0,len=this.uriRegExpKeys.length; i<len; i++) {
                ret[this.uriRegExpKeys[i]] = matches[i];
            }
        }

        return ret;
    }

    /**
     * 解析 URI 的 authority 部分
     *
     * @return {String}
     */
    getAuthority() {
        var authority = '';

        if('' !== this.user) {
            authority += this.user + ':' + this.password + '@';
        }

        authority += this.host;

        if('' !== this.port) {
            authority += ':' + this.port;
        }

        return authority;
    }

    /**
     * 转为字符串
     */
    toString() {
        return this.createURIString(
            this.scheme,
            this.getAuthority(),
            this.path,
            this.query,
            this.fragment
        );
    }

}

module.exports = URI;
