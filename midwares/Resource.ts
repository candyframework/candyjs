/**
 * @author afu
 * @license MIT
 */
import fs = require('fs');

import Request = require('../http/Request');

/**
 * 静态资源处理
 */
class Resource {

    /**
     * 实例
     */
    private static instance: Resource = null;

    /**
     * MimeType
     */
    static mime = {
        'js': 'text/javascript',
        'css': 'text/css',

        'ico': 'image/x-icon',
        'gif': 'image/gif',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',

        'svg': 'image/svg+xml',
        'tiff': 'image/tiff',

        'swf': 'application/x-shockwave-flash'
    };

    /**
     * 缓存
     */
    static cache = {
        // 那些资源需要缓存
        'regExp': /(\.gif|\.jpg|\.jpeg|\.png|\.js|\.css)$/ig,
        // 缓存时间毫秒
        'maxAge': 1000 * 3600 * 24 * 30
    };

    public directory: string;
    public options: any;

    /**
     * constructor
     *
     * @param {String} directory 静态资源目录
     * @param {any} options 配置参数
     *
     * {
     *    mime: { ... },
     *    cache: {regExp, maxAge}
     * }
     *
     */
    constructor(directory: string, options: any = {}) {
        this.directory = directory;
        this.options = options;
    }

    /**
     * 入口
     *
     * @deprecated since 4.13.3 使用 `Resource.serve(directory, options?: any)` 替代
     * @return {any} 中间件
     */
    public serve(): any {
        return (req, res, next) => {
            this.handler(req, res, next);
        };
    }

    /**
     * 托管目录
     */
    static serve(directory: string, options: any = {}) {
        if(null === Resource.instance) {
            Resource.instance = new Resource(directory, options);
        }

        return (req, res, next) => {
            Resource.instance.handler(req, res, next);
        };
    }

    /**
     * 是否是静态资源
     *
     * @param {any} request 请求对象
     * @return {Boolean}
     */
    public isStatic(request: any): boolean {
        let ret = false;
        let pathname = new Request(request).createURL().pathname;
        let ext = this.getExtName(pathname);
        let mime = undefined === this.options.mime ?
            Resource.mime :
            Object.assign({}, Resource.mime, this.options.mime);

        if('' === ext) {
            return false;
        }

        for(let key in mime) {
            if(ext === key) {
                ret = true;
                break;
            }
        }

        return ret;
    }

    /**
     * 获取 mimeType
     *
     * @param {String} pathName 访问路径
     * @return {String}
     */
    public getMimeType(pathName: string): string {
        let ret = '';
        let ext = this.getExtName(pathName);
        let mime = undefined === this.options.mime
            ? Resource.mime
            : Object.assign({}, Resource.mime, this.options.mime);

        for(let key in mime) {
            if(ext === key) {
                ret = mime[key];
                break;
            }
        }

        return ret;
    }

    /**
     * 获得扩展名
     *
     * @param {String} pathName 访问路径
     * @return {String} 扩展名
     */
    public getExtName(pathName: string): string {
        let index = pathName.lastIndexOf('.');

        if(-1 === index) {
            return '';
        }

        return pathName.substring(index + 1);
    }

    /**
     * 处理静态资源
     *
     * @param {any} request
     * @param {any} response
     * @param {any} next
     */
    public handler(request: any, response: any, next: any): void {
        if('GET' !== request.method || !this.isStatic(request)) {
            next();
            return;
        }

        let pathname = new Request(request).createURL().pathname;
        let mimeType = this.getMimeType(pathname);

        pathname = (this.directory + pathname).replace(/\.\./g, '');
        while(pathname.indexOf('//') >= 0) {
            pathname = pathname.replace('//', '/');
        }

        fs.stat(pathname, (error, stats) => {
            if(null !== error) {
                response.writeHead(404);
                response.end();
                return;
            }

            if(stats.isDirectory()) {
                response.writeHead(403);
                response.end();
                return;
            }

            // headers
            response.setHeader('Content-Type', '' === mimeType ? 'text/plain' : mimeType);
            response.setHeader('Last-Modified', stats.mtime.toUTCString());

            // 设置缓存
            let extName = '.' + this.getExtName(pathname);
            let cacheConfig = undefined === this.options.cache ?
                Resource.cache : this.options.cache;

            if(cacheConfig.regExp.test(extName)) {
                response.setHeader('Expires', new Date(Date.now() + cacheConfig.maxAge).toUTCString());
                response.setHeader('Cache-Control', 'max-age=' + cacheConfig.maxAge / 1000);
            }

            // 有缓存直接返回
            if(stats.mtime.toUTCString() === request.headers['if-modified-since']) {
                response.writeHead(304);
                response.end();
                return;
            }

            let rs = fs.createReadStream(pathname);
            response.writeHead(200);
            rs.pipe(response);
        });
    }

}

export = Resource;
