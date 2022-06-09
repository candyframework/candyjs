"use strict";
const CoreView = require("../core/View");
class View extends CoreView {
    constructor(context) {
        super(context);
        this.output = true;
        this.enableLayout = false;
        this.layout = 'app/views/layout';
        this.title = '';
        this.keywords = '';
        this.description = '';
        this.headAssets = null;
        this.footerAssets = null;
        this.getHeadAssets = () => {
            return null === this.headAssets ? '' : this.headAssets.join('\n');
        };
        this.addHeadAsset = (asset) => {
            if (null === this.headAssets) {
                this.headAssets = [];
            }
            this.headAssets.push(asset);
        };
        this.getFooterAssets = () => {
            return null === this.footerAssets ? '' : this.footerAssets.join('\n');
        };
        this.addFooterAsset = (asset) => {
            if (null === this.footerAssets) {
                this.footerAssets = [];
            }
            this.footerAssets.push(asset);
        };
    }
    renderFile(file, parameters) {
        this.getFileContent(file, (err, content) => {
            this.context.response.write(null === err
                ? content
                : (this.context.application.debug
                    ? err.message
                    : 'The view encountered an internal error'));
            this.context.response.end();
        });
    }
}
module.exports = View;
