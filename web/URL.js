"use strict";
const Request = require("../http/Request");
const StringHelper = require("../helpers/StringHelper");
class URL {
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
