/**
 * @author afu
 * @license MIT
 */
import Candy = require('../Candy');
import AbstractTranslator = require('./AbstractTranslator');

/**
 * 翻译器
 */
class Translator extends AbstractTranslator {

    constructor() {
        super();

        this.language = 'en-US';
        this.basePath = Candy.getPathAlias('@app/i18n');
    }

    /**
     * @inheritdoc
     */
    public translate(type: string, sourceMessage: string, parameters: any[] = null): string {
        let path = this.basePath + '/' + this.language + '/' + type;
        let lang = this.loadLanguageFromFile(path);

        if(undefined === lang[sourceMessage]) {
            return sourceMessage;
        }

        let target = lang[sourceMessage];

        return this.parseMessage(target, parameters);
    }

}

export = Translator;
