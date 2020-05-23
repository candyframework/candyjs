'use strict';

const Candy = require('../../../../Candy');
const ActionFilter = Candy.include('candy/core/ActionFilter');

/**
 * Cross-Origin Resource Sharing
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
class Cors extends ActionFilter {

    constructor() {
        super();

        this.cors = {
            // 允许访问该资源的外域 URI
            'Access-Control-Allow-Origin': '*',
            // 允许使用的请求方法
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
            // 允许请求中使用的头信息
            'Access-Control-Allow-Headers': '',
            // 响应的有效时间为 秒
            'Access-Control-Max-Age': 86400,
            // 如果出现在预检请求的响应中 表示实际请求是否可以使用 credentials
            'Access-Control-Allow-Credentials': 'true'
        };
    }

    /**
     * @inheritdoc
     */
    beforeAction(actionEvent) {
        let request = actionEvent.request;
        let response = actionEvent.response;

        if(undefined !== request.headers['origin']) {
            response.setHeader('Access-Control-Allow-Origin', this.cors['Access-Control-Allow-Origin']);
        }

        if(undefined !== request.headers['access-control-request-method']) {
            response.setHeader('Access-Control-Allow-Methods', this.cors['Access-Control-Allow-Methods']);
        }

        if('OPTIONS' === request.method && undefined !== this.cors['Access-Control-Max-Age']) {
            response.setHeader('Access-Control-Max-Age', this.cors['Access-Control-Max-Age']);
        }

        if(undefined !== this.cors['Access-Control-Allow-Credentials']) {
            response.setHeader('Access-Control-Allow-Credentials', this.cors['Access-Control-Allow-Credentials']);
        }
    }

}

module.exports = Cors;
