/**
 * Queue 接口
 */
export default interface IQueue {

    /**
     * 返回队列大小
     */
    size(): number;

    /**
     * 添加元素
     *
     * @param {any} item 数据
     */
    add(item: any): void;

    /**
     * 移除并返回队首元素
     *
     * @return {any | null}
     */
    take(): any;

    /**
     * 删除一个元素
     *
     * @param {any} item 要删除的元素
     * @returns 队列包含元素且删除成功 返回 true
     */
    remove(item: any): boolean;

    /**
     * 清空队列
     */
    clear(): void;

}
