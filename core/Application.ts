/**
 * @author afu
 * @license MIT
 */
import IApplication from './IApplication';

import Candy = require('../Candy');
import Event = require('./Event');
import InvalidConfigException = require('./InvalidConfigException');

/**
 * 应用基类
 */
abstract class Application extends Event implements IApplication {

    public encoding: string = 'UTF-8';
    public debug: boolean = false;
    public exceptionHandler: string = 'candy/web/ExceptionHandler';

    constructor(config: any) {
        super();

        Candy.app = this;
        this.init(config);
    }

    /**
     * 初始化应用
     *
     * @param {any} config 应用配置
     * @throws {InvalidConfigException} 当丢失必要配置项目时
     */
    private init(config: any): void {
        if(undefined === config.id) {
            throw new InvalidConfigException('The "id" configuration of the Application is missing');
        }

        if(undefined !== config.appPath) {
            this.setAppPath(config.appPath);
            delete config.appPath;
        }

        if(undefined !== config.runtimePath) {
            this.setRuntimePath(config.runtimePath);
            delete config.runtimePath;

        } else {
            // set "app/runtime"
            this.setRuntimePath(this.getAppPath() + '/runtime');
        }

        if(undefined !== config.rootPath) {
            this.setRootPath(config.rootPath);
            delete config.rootPath;

        } else {
            this.setRootPath(process.env.PWD);
        }
    }

    /**
     * @inheritdoc
     */
    public setAppPath(path: string): void {
        Candy.setPathAlias('@app', path);
    }

    /**
     * @inheritdoc
     */
    public getAppPath(): string {
        return Candy.getPathAlias('@app');
    }

    /**
     * @inheritdoc
     */
    public setRuntimePath(path: string): void {
        Candy.setPathAlias('@runtime', path);
    }

    /**
     * @inheritdoc
     */
    public getRuntimePath(): string {
        return Candy.getPathAlias('@runtime');
    }

    /**
     * @inheritdoc
     */
    public setRootPath(path: string): void {
        Candy.setPathAlias('@root', path);
    }

    /**
     * @inheritdoc
     */
    public getRootPath(): string {
        return Candy.getPathAlias('@root');
    }

    /**
     * @inheritdoc
     */
    public abstract requestListener(request: any, response: any): void;

    /**
     * @inheritdoc
     */
    public abstract handlerException(exception: any, response: any): void;

}

export = Application;
