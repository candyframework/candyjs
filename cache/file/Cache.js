"use strict";
const fs = require("fs");
const Candy = require("../../Candy");
const AbstractCache = require("../AbstractCache");
const FileHelper = require("../../helpers/FileHelper");
class Cache extends AbstractCache {
    constructor(application) {
        super(application);
        this.fileExtension = '.bin';
        this.cachePath = Candy.getPathAlias('@runtime/caches');
    }
    getCacheFile(key) {
        return this.cachePath + '/' + key + this.fileExtension;
    }
    setSync(key, value, duration = 31536000000) {
        let cacheFile = this.getCacheFile(key);
        let life = (Date.now() + duration) / 1000;
        if (!fs.existsSync(this.cachePath)) {
            FileHelper.createDirectorySync(this.cachePath);
        }
        fs.writeFileSync(cacheFile, value, this.application.encoding);
        fs.utimesSync(cacheFile, life, life);
    }
    set(key, value, duration = 31536000000) {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);
            let life = (Date.now() + duration) / 1000;
            fs.access(this.cachePath, fs.constants.R_OK | fs.constants.W_OK, (error) => {
                if (null === error) {
                    fs.writeFile(cacheFile, value, this.application.encoding, (err) => {
                        if (null !== err) {
                            reject(err);
                            return;
                        }
                        fs.utimes(cacheFile, life, life, () => {
                            resolve(null);
                        });
                    });
                    return;
                }
                FileHelper.createDirectory(this.cachePath, 0o777, () => {
                    fs.writeFile(cacheFile, value, this.application.encoding, (err) => {
                        if (null !== err) {
                            reject(err);
                            return;
                        }
                        fs.utimes(cacheFile, life, life, () => {
                            resolve(null);
                        });
                    });
                });
            });
        });
    }
    getSync(key) {
        let ret = null;
        let cacheFile = this.getCacheFile(key);
        if (fs.existsSync(cacheFile) && fs.statSync(cacheFile).mtime.getTime() > Date.now()) {
            ret = fs.readFileSync(cacheFile, this.application.encoding);
        }
        return ret;
    }
    get(key) {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);
            fs.stat(cacheFile, (error, stats) => {
                if (null !== error) {
                    reject(error);
                    return;
                }
                if (stats.mtime.getTime() < Date.now()) {
                    resolve(null);
                    return;
                }
                fs.readFile(cacheFile, this.application.encoding, (err, data) => {
                    if (null !== err) {
                        reject(err);
                        return;
                    }
                    resolve(data);
                });
            });
        });
    }
    deleteSync(key) {
        let cacheFile = this.getCacheFile(key);
        fs.unlinkSync(cacheFile);
    }
    delete(key) {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);
            fs.unlink(cacheFile, (err) => {
                if (null !== err) {
                    reject(err);
                    return;
                }
                resolve(null);
            });
        });
    }
}
module.exports = Cache;
