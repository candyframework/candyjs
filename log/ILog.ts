/**
 * @author afu
 * @license MIT
 */

/**
 * 日志接口层
 */
export default interface ILog {
    /**
     * flush log
     *
     * @param {Array} message the message to be logged
     */
    flush(messages: any[]): void;
}
