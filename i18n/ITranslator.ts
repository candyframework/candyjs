/**
 * @author afu
 * @license MIT
 */

/**
 * 翻译接口层
 */
export default interface ITranslator {

    /**
     * 翻译
     *
     * @param {String} type 消息类型
     * @param {String} sourceMessage 消息
     * @param {any[]} parameters 消息中的占位参数
     */
    translate(type: string, sourceMessage: string, parameters?: any[]): string;

}
