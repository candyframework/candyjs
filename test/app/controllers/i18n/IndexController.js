'use strict';

var CandyJs = require('../../../../index');
var Request = require('../../../../http/Request');

class IndexController {
    run(req, res) {
        let lang = new Request(req).getQueryString('lang', '');
        // 设置语言可以用过滤器方式添加 代码复用性更高
        let i18n = CandyJs.getI18N();
        i18n.getTranslator('mytype').setLanguage(lang === 'en' ? 'en-US' : 'zh-CN');

        let msg = CandyJs.getI18N().translate('mytype', 'hello world');
        res.end(msg);
    }

}

module.exports = IndexController;
