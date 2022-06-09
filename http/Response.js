"use strict";
const CoreResponse = require("../core/Response");
const Cookie = require("./Cookie");
const Headers = require("./Headers");
const HttpException = require("../core/HttpException");
class Response extends CoreResponse {
    constructor(response) {
        super(response);
        this.encoding = 'UTF-8';
        this.version = '1.1';
        this.statusCode = 200;
        this.statusText = 'OK';
        this.headers = new Headers();
        this.content = '';
        this.cookies = [];
    }
    getStatusCode() {
        return this.statusCode;
    }
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
    getHeader(name) {
        return this.headers.get(name);
    }
    setHeader(name, value) {
        this.headers.add(name, value);
        return this;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
        return this;
    }
    setCookie(name, value, expires = 0, path = '', domain = '', secure = false, httpOnly = false) {
        let cookie = new Cookie(name, value, expires, path, domain, secure, httpOnly);
        this.cookies.push(cookie.toString());
        return this;
    }
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
    sendContent() {
        this.response.write(this.content, this.encoding);
    }
    send(content = '') {
        if ('' !== content) {
            this.setContent(content);
        }
        this.sendHeaders();
        this.sendContent();
        this.response.end();
    }
    redirect(url, statusCode = 302) {
        this.setHeader('Location', url);
        this.setStatusCode(statusCode);
        this.send();
    }
}
Response.httpStatuses = {
    '100': 'Continue',
    '101': 'Switching Protocols',
    '102': 'Processing',
    '118': 'Connection timed out',
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
