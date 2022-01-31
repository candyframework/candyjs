"use strict";
/**
 * @author afu
 * @license MIT
 */
const CoreView = require("../core/View");
/**
 * web 视图
 */
class View extends CoreView {
    constructor(context) {
        super(context);
        /**
         * 是否直接输出
         */
        this.output = true;
        /**
         * 是否启用布局视图
         */
        this.enableLayout = false;
        /**
         * 布局文件
         */
        this.layout = 'app/views/layout';
        /**
         * 页面标题
         */
        this.title = '';
        /**
         * 页面关键字
         */
        this.keywords = '';
        /**
         * 页面描述
         */
        this.description = '';
        /**
         * Head 部分资源
         */
        this.headAssets = null;
        /**
         * Footer 部分资源
         */
        this.footerAssets = null;
        /**
         * 获取 head 部分资源
         *
         * @return {String}
         */
        this.getHeadAssets = () => {
            return null === this.headAssets ? '' : this.headAssets.join('\n');
        };
        /**
         * 添加 head 部分资源
         *
         * @param {String} asset 资源
         */
        this.addHeadAsset = (asset) => {
            if (null === this.headAssets) {
                this.headAssets = [];
            }
            this.headAssets.push(asset);
        };
        /**
         * 获取 footer 部分资源
         *
         * @return {String}
         */
        this.getFooterAssets = () => {
            return null === this.footerAssets ? '' : this.footerAssets.join('\n');
        };
        /**
         * 添加 footer 部分资源
         *
         * @param {String} asset 资源
         */
        this.addFooterAsset = (asset) => {
            if (null === this.footerAssets) {
                this.footerAssets = [];
            }
            this.footerAssets.push(asset);
        };
    }
    /**
     * @inheritdoc
     */
    renderFile(file, parameters) {
        this.getFileContent(file, (err, content) => {
            this.context.response.write(null === err ? content : err.message);
            this.context.response.end();
        });
    }
}
module.exports = View;
