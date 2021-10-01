/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
import Candy = require('../Candy');
import CoreResponse = require('../core/Response');
import Cookie = require('./Cookie');
import Headers = require('./Headers');
import HttpException = require('../core/HttpException');

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
     * list of HTTP status codes and the corresponding texts
     */
    static httpStatuses: any = {
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

    /**
     * 编码
     */
    public encoding: string;

    /**
     * HTTP protocol version
     */
    public version: string;

    /**
     * the HTTP status code
     */
    public statusCode: number;

    /**
     * the HTTP status description that comes together with the status code
     */
    public statusText: string;

    /**
     * HTTP headers
     */
    public headers: Headers;

    /**
     * HTTP content
     */
    public content: string;

    /**
     * HTTP cookies
     */
    public cookies: string[];

    /**
     * constructor
     *
     * @typedef {import('http').ServerResponse} ServerResponse
     * @param {ServerResponse} response
     */
    constructor(response: any) {
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
    public getStatusCode(): number {
        return this.statusCode;
    }

    /**
     * 设置 http status code
     *
     * @param {Number} value the status code
     * @param {String} text the status text
     */
    public setStatusCode(value: number, text: string = ''): Response {
        if(value < 100 || value >= 600) {
            throw new HttpException('HTTP status code is invalid');
        }

        this.statusCode = value;

        if('' === text) {
            this.statusText = undefined !== Response.httpStatuses[String(value)]
                ? Response.httpStatuses[String(value)]
                : '';

        } else {
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
    public getHeader(name: string): string | null {
        return this.headers.get(name);
    }

    /**
     * 设置 header
     *
     * @param {String} name the name of the header
     * @param {String} value the value of the header
     */
    public setHeader(name: string, value: string): Response {
        this.headers.add(name, value);

        return this;
    }

    /**
     * 获取实体内容
     *
     * @return {String}
     */
    public getContent(): string {
        return this.content;
    }

    /**
     * 设置实体内容
     *
     * @param {String} content 实体内容
     */
    public setContent(content: string): Response {
        this.content = content;

        return this;
    }

    /**
     * 设置一条 cookie
     */
    public setCookie(name: string, value: string, expires: number = 0, path: string = '', domain: string = '', secure: boolean = false, httpOnly: boolean = false): Response {
        let cookie = new Cookie(
            name,
            value,
            expires,
            path,
            domain,
            secure,
            httpOnly
        );

        this.cookies.push(cookie.toString());

        return this;
    }

    /**
     * 发送 header
     */
    public sendHeaders(): void {
        if(this.response.headersSent) {
            return;
        }

        for(let [name, value] of this.headers) {
            this.response.setHeader(name, value);
        }

        if(this.cookies.length > 0) {
            this.response.setHeader('Set-Cookie', this.cookies);
        }

        this.response.writeHead(this.statusCode, this.statusText);
    }

    /**
     * 发送内容
     */
    public sendContent(): void {
        this.response.write(this.content, this.encoding);
    }

    /**
     * @inheritdoc
     */
    public send(content: string = ''): void {
        if('' !== content) {
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
    public redirect(url: string, statusCode: number = 302): void {
        this.setHeader('Location', url);

        this.setStatusCode(statusCode);

        this.send();
    }

}

export = Response;
