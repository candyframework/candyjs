"use strict";
/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
const Candy = require("../Candy");
const CoreResponse = require("../core/Response");
const Cookie = require("./Cookie");
const Headers = require("./Headers");
const HttpException = require("../core/HttpException");
/**
 * HTTP response
 *
 * 使用 response 输出内容
 *
 * const response = new Response(res);
 * response.setContent('some data from server');
 * response.send();
 *
 * 使用 response 重定向
 *
 * response.redirect('http://foo.com');
 *
 */
class Response extends CoreResponse {
    /**
     * constructor
     *
     * @typedef {import('http').ServerResponse} ServerResponse
     * @param {ServerResponse} response
     */
    constructor(response) {
        super(response);
        this.encoding = Candy.app.encoding;
        this.version = '1.1';
        this.statusCode = 200;
        this.statusText = 'OK';
        this.headers = new Headers();
        this.content = '';
        this.cookies = [];
    }
    /**
     * 得到 http status code
     *
     * @return {Number}
     */
    getStatusCode() {
        return this.statusCode;
    }
    /**
     * 设置 http status code
     *
     * @param {Number} value the status code
     * @param {String} text the status text
     */
    setStatusCode(value, text = '') {
        if (value < 100 || value >= 600) {
            throw new HttpException('HTTP status code is invalid');
        }
        this.statusCode = value;
        if ('' === text) {
            this.statusText = undefined !== Response.httpStatuses[String(value)]
                ? Response.httpStatuses[String(value)]
                : '';
        }
        else {
            this.statusText = text;
        }
        return this;
    }
    /**
     * 获取 header
     *
     * @param {String} name the name of the header
     * @return {String | null}
     */
    getHeader(name) {
        return this.headers.get(name);
    }
    /**
     * 设置 header
     *
     * @param {String} name the name of the header
     * @param {String} value the value of the header
     */
    setHeader(name, value) {
        this.headers.add(name, value);
        return this;
    }
    /**
     * 获取实体内容
     *
     * @return {String}
     */
    getContent() {
        return this.content;
    }
    /**
     * 设置实体内容
     *
     * @param {String} content 实体内容
     */
    setContent(content) {
        this.content = content;
        return this;
    }
    /**
     * 设置一条 cookie
     */
    setCookie(name, value, expires = 0, path = '', domain = '', secure = false, httpOnly = false) {
        let cookie = new Cookie(name, value, expires, path, domain, secure, httpOnly);
        this.cookies.push(cookie.toString());
        return this;
    }
    /**
     * 发送 header
     */
    sendHeaders() {
        if (this.response.headersSent) {
            return;
        }
        for (let [name, value] of this.headers) {
            this.response.setHeader(name, value);
        }
        if (this.cookies.length > 0) {
            this.response.setHeader('Set-Cookie', this.cookies);
        }
        this.response.writeHead(this.statusCode, this.statusText);
    }
    /**
     * 发送内容
     */
    sendContent() {
        this.response.write(this.content, this.encoding);
    }
    /**
     * @inheritdoc
     */
    send(content = '') {
        if ('' !== content) {
            this.setContent(content);
        }
        this.sendHeaders();
        this.sendContent();
        this.response.end();
    }
    /**
     * 重定向
     *
     * @param {String} url
     * @param {Number} statusCode
     */
    redirect(url, statusCode = 302) {
        this.setHeader('Location', url);
        this.setStatusCode(statusCode);
        this.send();
    }
}
/**
 * list of HTTP status codes and the corresponding texts
 */
Response.httpStatuses = {
    // Informational
    '100': 'Continue',
    '101': 'Switching Protocols',
    '102': 'Processing',
    '118': 'Connection timed out',
    // Success
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '207': 'Multi-Status',
    '208': 'Already Reported',
    '210': 'Content Different',
    '226': 'IM Used',
    // Redirection
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '306': 'Reserved',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect',
    '310': 'Too many Redirect',
    // Client error
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Time-out',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Request Entity Too Large',
    '414': 'Request-URI Too Long',
    '415': 'Unsupported Media Type',
    '416': 'Requested range unsatisfiable',
    '417': 'Expectation failed',
    '418': 'I\'m a teapot',
    '422': 'Unprocessable entity',
    '423': 'Locked',
    '424': 'Method failure',
    '425': 'Unordered Collection',
    '426': 'Upgrade Required',
    '428': 'Precondition Required',
    '429': 'Too Many Requests',
    '431': 'Request Header Fields Too Large',
    '449': 'Retry With',
    '450': 'Blocked by Windows Parental Controls',
    // Server error
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway or Proxy Error',
    '503': 'Service Unavailable',
    '504': 'Gateway Time-out',
    '505': 'HTTP Version not supported',
    '507': 'Insufficient storage',
    '508': 'Loop Detected',
    '509': 'Bandwidth Limit Exceeded',
    '510': 'Not Extended',
    '511': 'Network Authentication Required'
};
module.exports = Response;
