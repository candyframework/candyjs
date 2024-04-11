"use strict";
const fs = require("fs");
const Request = require("../http/Request");
class Resource {
    constructor(directory) {
        this.directory = directory;
    }
    static serve(directory) {
        if (null === Resource.instance) {
            Resource.instance = new Resource(directory);
        }
        return (req, res, next) => {
            Resource.instance.handler(req, res, next);
        };
    }
    isStatic(request) {
        let ret = false;
        let pathname = new Request(request).createURL().pathname;
        let ext = this.getExtName(pathname);
        if ('' === ext) {
            return false;
        }
        for (let key in Resource.MIME) {
            if (ext === key) {
                ret = true;
                break;
            }
        }
        return ret;
    }
    getMimeType(pathName) {
        let ret = '';
        let ext = this.getExtName(pathName);
        let mime = Resource.MIME;
        for (let key in mime) {
            if (ext === key) {
                ret = mime[key];
                break;
            }
        }
        return ret;
    }
    getExtName(pathName) {
        let index = pathName.lastIndexOf('.');
        if (-1 === index) {
            return '';
        }
        return pathName.substring(index + 1);
    }
    handler(request, response, next) {
        if ('GET' !== request.method || !this.isStatic(request)) {
            next();
            return;
        }
        let pathname = new Request(request).createURL().pathname;
        let mimeType = this.getMimeType(pathname);
        pathname = (this.directory + pathname).replace(/\.\./g, '');
        while (pathname.indexOf('//') >= 0) {
            pathname = pathname.replace('//', '/');
        }
        fs.stat(pathname, (error, stats) => {
            if (null !== error) {
                response.writeHead(404);
                response.end();
                return;
            }
            if (stats.isDirectory()) {
                response.writeHead(403);
                response.end();
                return;
            }
            response.setHeader('Content-Type', '' === mimeType ? 'text/plain' : mimeType);
            response.setHeader('Last-Modified', stats.mtime.toUTCString());
            let extName = '.' + this.getExtName(pathname);
            if (Resource.CACHE_TYPES.test(extName)) {
                response.setHeader('Expires', new Date(Date.now() + Resource.CACHE_TIME).toUTCString());
                response.setHeader('Cache-Control', 'max-age=' + Resource.CACHE_TIME / 1000);
            }
            if (stats.mtime.toUTCString() === request.headers['if-modified-since']) {
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
Resource.instance = null;
Resource.MIME = {
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
Resource.CACHE_TIME = 2592000000;
Resource.CACHE_TYPES = /(\.gif|\.jpg|\.jpeg|\.png|\.webp|\.js|\.css)$/ig;
module.exports = Resource;
