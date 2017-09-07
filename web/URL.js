/**
 * @author
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

var StringHelper = require('../helpers/StringHelper');

/**
 * Uniform Resource Location
 *
 * @see https://tools.ietf.org/html/rfc1738
 */
class URL {
    
    /**
     * constructor
     */
    constructor(request) {
        /**
         * @property {Object} request
         */
        this.request = request;
    }
    
    /**
     * 获取引用网址
     *
     * @return {String}
     */
    getReferer() {
        if(undefined !== this.request.headers.referer) {
            return this.request.headers.referer;
        }
        
        return '';
    }
    
    /**
     * 获取 URI 协议和主机部分
     *
     * @return {String}
     */
    getHostInfo() {
        var protocol = undefined !== this.request.socket.encrypted
                || this.request.headers['x-forwarded-protocol'] === 'https'
            ? 'https'
            : 'http';
        
        var host = protocol + '://' + this.request.headers.host;
        
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
     * 创建一个 url
     *
     * eg.
     *
     * // scheme://host/index/index
     * url.to('index/index')
     *
     * // scheme://host/index/index?id=1#anchor
     * url.to('index/index', {id: 1, '#': 'anchor'})
     *
     * @param {String} url
     * @param {JSON} params
     * @return {String}
     */
    to(url, params = null) {
        var host = this.getHostInfo();
        var query = '';
        var anchor = '';
        
        url = host + '/' + url;
        
        if(null !== params) {
            if(undefined !== params['#']) {
                anchor = params['#'];
                delete params['#'];
            }
            
            for(let k in params) {
                query = query + k + '=' + params[k] + '&';
            }
            query = StringHelper.rTrimChar(query, '&');
            
            if('' !== query) {
                url = url + '?' + query;
            }
            if('' !== anchor) {
                url = url + '#' + anchor;
            }
        }
        
        return url;
    }
    
}

module.exports = URL;
