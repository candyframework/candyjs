/**
 * @author afu
 * @license MIT
 */
import fs = require('fs');

/**
 * 文件处理
 */
class FileHelper {

    /**
     * 获取 dirname
     *
     * @param {String} dir 目录路径
     * @return {String}
     */
    static getDirname(dir: string): string {
        dir = dir.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');

        return '' === dir ? '/' : dir;
    }

    /**
     * 转化正常路径
     *
     * ```
     * 路径分隔符转换 e.g. '\\a\\b\\c' becomes '/a/b/c'
     * 删除末尾分隔符 e.g. '/a/b/c/' becomes '/a/b/c'
     * 多斜线转为单个 e.g. '/a///b/c' becomes '/a/b/c'
     * 处理 .. 与 . e.g. '/a/./b/../c' becomes '/a/c'
     * ```
     *
     * @param {String} path 待转换路径
     * @param {String} directorySeparator 目录分隔符
     * @return {String} 转换后的路径
     */
    static normalizePath(path: string, directorySeparator: string = '/'): string {
        let ret = [];

        path = path.replace(/\\+/g, directorySeparator);
        if(directorySeparator === path.charAt(path.length - 1)) {
            path = path.substring(0, path.length - 1);
        }

        path = path.replace(/\/+/g, directorySeparator);

        for(let arr = path.split(directorySeparator), len=arr.length, i=0; i<len; i++) {
            if('.' === arr[i]) {
                continue;

            } else if('..' === arr[i] && ret.length > 0) {
                ret.pop();

            } else {
                ret.push(arr[i]);
            }
        }

        return ret.join('/');
    }

    /**
     * 创建文件夹
     *
     * @param {String} dir 目录路径
     * @param {Number} mode 目录权限
     * @param {any} callback 回调函数
     */
    static createDirectory(dir: string, mode: number = 0o777, callback: any = null): void {
        fs.access(dir, fs.constants.F_OK, (error) => {
            if(null === error) {
                null !== callback && callback(null);
                return true;
            }

            let parentDir = FileHelper.getDirname(dir);
            FileHelper.createDirectory(parentDir, mode, (err) => {
                fs.mkdir(dir, mode, callback);
            });
        });
    }

    /**
     * 同步创建文件夹
     *
     * @param {String} dir 目录路径
     * @param {Number} mode 目录权限
     * @return {Boolean}
     */
    static createDirectorySync(dir: string, mode: number = 0o777): boolean {
        if(fs.existsSync(dir)) {
            return true;
        }

        if(FileHelper.createDirectorySync(FileHelper.getDirname(dir))) {
            fs.mkdirSync(dir, mode);
        }

        return true;
    }

    /**
     * 文件是否存在
     *
     * @param {String} path 文件路径
     * @return {Boolean}
     */
    static existsSync(path: string): boolean {
        return fs.existsSync(path);
    }

}

export = FileHelper;
