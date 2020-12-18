/**
 * Node
 */
class DataNode {

    /**
     * The saved data
     */
    public data: any;

    /**
     * Pointer to next node
     */
    public next: DataNode;

    /**
     * Pointer to previous node
     */
    public previous: DataNode;

    /**
     * constructor
     */
    constructor(data: any, next: DataNode = null, previous: DataNode = null) {
        this.data = data;
        this.next = next;
        this.previous = previous;
    }

}
export = DataNode;
