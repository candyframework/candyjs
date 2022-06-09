"use strict";
const fs = require("fs");
class FileHelper {
    static getDirname(dir) {
        dir = dir.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');
        return '' === dir ? '/' : dir;
    }
    static normalizePath(path, directorySeparator = '/') {
        let ret = [];
        path = path.replace(/\\+/g, directorySeparator);
        if (directorySeparator === path.charAt(path.length - 1)) {
            path = path.substring(0, path.length - 1);
        }
        path = path.replace(/\/+/g, directorySeparator);
        for (let arr = path.split(directorySeparator), len = arr.length, i = 0; i < len; i++) {
            if ('.' === arr[i]) {
                continue;
            }
            else if ('..' === arr[i] && ret.length > 0) {
                ret.pop();
            }
            else {
                ret.push(arr[i]);
            }
        }
        return ret.join('/');
    }
    static createDirectory(dir, mode = 0o777, callback = null) {
        fs.access(dir, fs.constants.F_OK, (error) => {
            if (null === error) {
                null !== callback && callback(null);
                return true;
            }
            let parentDir = FileHelper.getDirname(dir);
            FileHelper.createDirectory(parentDir, mode, (err) => {
                fs.mkdir(dir, mode, callback);
            });
        });
    }
    static createDirectorySync(dir, mode = 0o777) {
        if (fs.existsSync(dir)) {
            return true;
        }
        if (FileHelper.createDirectorySync(FileHelper.getDirname(dir))) {
            fs.mkdirSync(dir, mode);
        }
        return true;
    }
}
module.exports = FileHelper;
