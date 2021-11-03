/**
 * @author afu
 * @license MIT
 */
import fs = require('fs');

import Candy = require('../../Candy');
import AbstractCache = require('../AbstractCache');
import FileHelper = require('../../helpers/FileHelper');

/**
 * 文件缓存
 *
 * ```
 * 'cache': {
 *      'file': {
 *          'classPath': 'candy/cache/file/Cache',
 *          'cachePath': 'absolute path'
 *      }
 * }
 * ```
 *
 */
class Cache extends AbstractCache {

    /**
     * 扩展名
     */
    public fileExtension: string = '.bin';

    /**
     * 缓存目录
     */
    public cachePath: string = Candy.getPathAlias('@runtime/caches');

    constructor() {
        super();
    }

    private getCacheFile(key: string): string {
        return this.cachePath + '/' + key + this.fileExtension;
    }

    /**
     * @inheritdoc
     */
    public setSync(key: string, value: string, duration: number = 31536000000/* one year */): void {
        let cacheFile = this.getCacheFile(key);

        let life = (Date.now() + duration) / 1000;

        // 目录不存在就创建
        if(!fs.existsSync(this.cachePath)) {
            FileHelper.createDirectorySync(this.cachePath);
        }

        fs.writeFileSync(cacheFile, value, Candy.app.encoding);

        fs.utimesSync(cacheFile, life, life);
    }

    /**
     * @inheritdoc
     */
    public set(key: string, value: string, duration: number = 31536000000/* one year */): Promise<any> {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);
            let life = (Date.now() + duration) / 1000;

            // 检查目录
            fs.access(this.cachePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
                if(null === err) {
                    fs.writeFile(cacheFile, value, Candy.app.encoding, (err) => {
                        if(null !== err) {
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
                    fs.writeFile(cacheFile, value, Candy.app.encoding, (err) => {
                        if(null !== err) {
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

    /**
     * @inheritdoc
     */
    public getSync(key: string): string {
        let ret = null;
        let cacheFile = this.getCacheFile(key);

        if(fs.existsSync(cacheFile) && fs.statSync(cacheFile).mtime.getTime() > Date.now()) {
            ret = fs.readFileSync(cacheFile, Candy.app.encoding);
        }

        return ret;
    }

    /**
     * @inheritdoc
     */
    public get(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);

            fs.stat(cacheFile, (err, stats) => {
                if(null !== err) {
                    reject(err);
                    return;
                }

                if(stats.mtime.getTime() < Date.now()) {
                    resolve(null);
                    return;
                }

                fs.readFile(cacheFile, Candy.app.encoding, (err, data) => {
                    if(null !== err) {
                        reject(err);
                        return;
                    }

                    resolve(data);
                });
            });
        });
    }

    /**
     * @inheritdoc
     */
    public deleteSync(key: string): void {
        let cacheFile = this.getCacheFile(key);

        fs.unlinkSync(cacheFile);
    }

    /**
     * @inheritdoc
     */
    public delete(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let cacheFile = this.getCacheFile(key);

            fs.unlink(cacheFile, (err) => {
                if(null !== err) {
                    reject(err);
                    return;
                }

                resolve(null);
            });
        });
    }

}

export = Cache;
