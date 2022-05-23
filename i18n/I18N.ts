/**
 * @author afu
 * @license MIT
 */
import AbstractTranslator = require('./AbstractTranslator');

import Candy = require('../Candy');
import InvalidConfigException = require('../core/InvalidConfigException');

/**
 * 国际化
 *
 * ```
 * translator: {
 *      // 基于 file 的翻译器
 *      [type]: {
 *          classPath: 'candy/i18n/file/Translator',
 *          basePath: __dirname + '/app/messages'
 *      }
 * }
 * ```
 *
 */
class I18N {

    /**
     * 实例
     */
    private static instance: I18N = null;

    /**
     * 翻译器
     */
    public translators: Map<string, AbstractTranslator> = new Map();

    private constructor() {}

    /**
     * 获取 i18n 实例
     */
    static getI18N(): I18N {
        if(null === I18N.instance) {
            I18N.instance = new I18N();
        }

        return I18N.instance;
    }

    /**
     * 翻译
     *
     * @param {String} type 消息类型
     * @param {String} message 消息
     * @param {any[]} parameters 消息中的占位参数
     */
    public translate(type: string, message: string, parameters: any[] = null): string {
        let translator = this.getTranslator(type);

        return translator.translate(type, message, parameters);
    }

    /**
     * 获取翻译器
     *
     * @param {String} type
     */
    public getTranslator(type: string): AbstractTranslator {
        if(this.translators.has(type)) {
            return this.translators.get(type);
        }

        let app = Candy.app;
        if(undefined === app.translator || undefined === app.translator[type]) {
            throw new InvalidConfigException('The translator configuration is not found');
        }
        if(undefined === app.translator[type].classPath) {
            throw new InvalidConfigException('The "classPath" configuration of the translator is missing');
        }

        this.translators.set(type, Candy.createObjectAsDefinition(app.translator[type], app));

        return this.translators.get(type);
    }

}

export = I18N;
