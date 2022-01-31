/**
 * @author afu
 * @license MIT
 */
import CoreView = require('../core/View');

/**
 * web 视图
 */
class View extends CoreView {

    /**
     * 是否直接输出
     */
    public output: boolean = true;

    /**
     * 是否启用布局视图
     */
    public enableLayout: boolean = false;

    /**
     * 布局文件
     */
    public layout: string = 'app/views/layout';

    /**
     * 页面标题
     */
    public title: string = '';

    /**
     * 页面关键字
     */
    public keywords: string = '';

    /**
     * 页面描述
     */
    public description: string = '';

    /**
     * Head 部分资源
     */
    public headAssets: string[] = null;

    /**
     * Footer 部分资源
     */
    public footerAssets: string[] = null;

    constructor(context: any) {
        super(context);
    }

    /**
     * 获取 head 部分资源
     *
     * @return {String}
     */
    public getHeadAssets = (): string => {
        return null === this.headAssets ? '' : this.headAssets.join('\n');
    }

    /**
     * 添加 head 部分资源
     *
     * @param {String} asset 资源
     */
    public addHeadAsset = (asset: string): void => {
        if(null === this.headAssets) {
            this.headAssets = [];
        }

        this.headAssets.push(asset);
    }

    /**
     * 获取 footer 部分资源
     *
     * @return {String}
     */
    public getFooterAssets = (): string => {
        return null === this.footerAssets ? '' : this.footerAssets.join('\n');
    }

    /**
     * 添加 footer 部分资源
     *
     * @param {String} asset 资源
     */
    public addFooterAsset = (asset: string): void => {
        if(null === this.footerAssets) {
            this.footerAssets = [];
        }

        this.footerAssets.push(asset);
    }

    /**
     * @inheritdoc
     */
    renderFile(file: string, parameters: any): any {
        this.getFileContent(file, (err, content) => {
            this.context.response.write(null === err ? content : err.message);
            this.context.response.end();
        });
    }

}

export = View;
