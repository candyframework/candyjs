/**
 * @author afu
 * @license MIT
 */
import fs = require('fs');

import Request = require('../http/Request');

/**
 * Static Resources
 */
class Resource {

    /**
     * 实例
     */
    private static instance: Resource = null;

    /**
     * MimeType
     */
    public static MIME = {
        'js': 'text/javascript',
        'css': 'text/css',
        'txt': 'text/plain',

        'ico': 'image/x-icon',
        'gif': 'image/gif',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'webp': 'image/webp',
        'svg': 'image/svg+xml',
        'tiff': 'image/tiff',
        'avif': 'image/avif',
        'bmp': 'image/x-ms-bmp',

        'woff': 'application/font-woff',
        'eot': 'application/vnd.ms-fontobject',

        'mid': 'audio/midi',
        'mp3': 'audio/mpeg',
        'ogg': 'audio/ogg',
        'm4a': 'audio/x-m4a',
        'ra': 'audio/x-realaudio',
        'mpeg': 'video/mpeg',
        '3gpp': 'video/3gpp',
        'webm': 'video/webm',
        'flv': 'video/x-flv',
        'wmv': 'video/x-ms-wmv',
        'avi': 'video/x-msvideo',

        'rar': 'application/x-rar-compressed',
        'zip': 'application/zip'
    };

    /**
     * 毫秒缓存时间
     */
    public static CACHE_TIME = 2592000000;

    /**
     * 缓存的类型
     */
    public static CACHE_TYPES = /(\.gif|\.jpg|\.jpeg|\.png|\.webp|\.js|\.css)$/ig;

    /**
     * 静态资源目录
     */
    public directory: string;

    constructor(directory: string) {
        this.directory = directory;
    }

    /**
     * 托管目录
     */
    static serve(directory: string) {
        if(null === Resource.instance) {
            Resource.instance = new Resource(directory);
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

        if('' === ext) {
            return false;
        }

        for(let key in Resource.MIME) {
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
        let mime = Resource.MIME;

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

            if(Resource.CACHE_TYPES.test(extName)) {
                response.setHeader('Expires', new Date(Date.now() + Resource.CACHE_TIME).toUTCString());
                response.setHeader('Cache-Control', 'max-age=' + Resource.CACHE_TIME / 1000);
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
