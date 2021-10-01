"use strict";
/**
 * @author afu
 * @license MIT
 */
const Request = require("../http/Request");
const StringHelper = require("../helpers/StringHelper");
/**
 * Uniform Resource Location
 *
 * @see https://tools.ietf.org/html/rfc1738
 */
class URL {
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
     * @param {any} request
     * @param {String} url
     * @param {any} parameters
     * @return {String}
     */
    static to(request, url, parameters = null) {
        let host = new Request(request).getHostInfo();
        let query = '';
        let anchor = '';
        url = host + '/' + url;
        if (null !== parameters) {
            if (undefined !== parameters['#']) {
                anchor = parameters['#'];
                delete parameters['#'];
            }
            for (let k in parameters) {
                query = query + k + '=' + parameters[k] + '&';
            }
            query = StringHelper.rTrimChar(query, '&');
            if ('' !== query) {
                url = url + '?' + query;
            }
            if ('' !== anchor) {
                url = url + '#' + anchor;
            }
        }
        return url;
    }
}
module.exports = URL;
