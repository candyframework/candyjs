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
    public static CACHE_TIME = {
        'js': 2592000000,
        'css': 2592000000,
        'gif': 2592000000,
        'jpg': 2592000000,
        'jpeg': 2592000000,
        'png': 2592000000,
        'webp': 2592000000
    };

    /**
     * 静态资源目录
     */
    public directory: string;

    constructor(directory: string) {
        this.directory = directory;
    }

    /**
     * 托管
     */
    public serve() {
        return (req, res, next) => {
            this.handler(req, res, next);
        };
    }

    /**
     * 是否是静态资源
     *
     * @param {String} pathname 请求路径
     * @return {Boolean}
     */
    public isStatic(pathname: string): boolean {
        let ext = this.getExtName(pathname);

        if('' === ext) {
            return false;
        }

        return Resource.MIME[ext] !== undefined;
    }

    /**
     * 获取 mimeType
     *
     * @param {String} pathName 访问路径
     * @return {String}
     */
    public getMimeType(pathName: string): string {
        let ext = this.getExtName(pathName);
        let mime = Resource.MIME;

        return mime[ext] === undefined ? '' : mime[ext];
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
        let pathname = new Request(request).createURL().pathname;
        if('GET' !== request.method || !this.isStatic(pathname)) {
            next();
            return;
        }

        let mimeType = this.getMimeType(pathname);
        pathname = pathname.replace(/\.\./g, '');
        while(pathname.indexOf('//') >= 0) {
            pathname = pathname.replace('//', '/');
        }
        pathname = this.directory + pathname;

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

            // 有缓存直接返回
            if(stats.mtime.toUTCString() === request.headers['if-modified-since']) {
                response.writeHead(304);
                response.end();
                return;
            }

            // headers
            response.setHeader('Content-Type', mimeType);
            response.setHeader('Last-Modified', stats.mtime.toUTCString());

            // 设置缓存
            let ext = this.getExtName(pathname);
            if(Resource.CACHE_TIME[ext] !== undefined) {
                response.setHeader('Expires', new Date(Date.now() + Resource.CACHE_TIME[ext]).toUTCString());
                response.setHeader('Cache-Control', 'max-age=' + Resource.CACHE_TIME[ext] / 1000);
            }

            let rs = fs.createReadStream(pathname);
            response.writeHead(200);
            rs.pipe(response);
        });
    }

}

export = Resource;
