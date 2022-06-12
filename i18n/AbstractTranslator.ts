/**
 * @author afu
 * @license MIT
 */
import ITranslator from './ITranslator';

/**
 * 抽象层
 */
abstract class AbstractTranslator implements ITranslator {

    /**
     * 语言
     */
    public language: string = '';

    /**
     * 语言配置所在目录
     */
    public basePath: string = '';

    /**
     * 应用
     */
    public application: any;

    constructor(application) {
        this.application = application;
    }

    /**
     * 设置语言
     */
    public setLanguage(language: string): void {
        this.language = language;
    }

    /**
     * 获取语言
     */
    public getLanguage(): string {
        return this.language;
    }

    /**
     * 设置基础路径
     */
    public setBasePath(basePath: string): void {
        this.basePath = basePath;
    }

    /**
     * 获取基础路径
     */
    public getBasePath(): string {
        return this.basePath;
    }

    /**
     * 解析消息中的参数
     *
     * ```
     * 'your name is {name}' => your name is xyz
     * ```
     *
     */
    public parseMessage(targetMessage: string, parameters: any[] = null): string {
        if(null === parameters) {
            return targetMessage;
        }

        let list = targetMessage.match(/\{[^\}]+\}/g);

        if(null === list) {
            return targetMessage;
        }

        for(let i=0; i<parameters.length; i++) {
            targetMessage = targetMessage.replace(list[i], parameters[i]);
        }

        return targetMessage;
    }

    /**
     * @inheritdoc
     */
    public abstract translate(type: string, sourceMessage: string, parameters?: any[]): string;

}

export = AbstractTranslator;
