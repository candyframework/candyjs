'use strict';

var CandyJs = require('../../../../index');
var Request = require('../../../../http/Request');

class IndexController {
    constructor(context) {
        let lang = new Request(context.request).getQueryString('lang', '');
        // 设置语言可以用过滤器方式添加 代码复用性更高
        let i18n = CandyJs.getI18N();
        i18n.getTranslator('mytype').setLanguage(lang === 'en' ? 'en-US' : 'zh-CN');
    }

    run(req, res) {
        let msg = CandyJs.getI18N().translate('mytype', 'hello world');
        res.end(msg);
    }

}

module.exports = IndexController;
