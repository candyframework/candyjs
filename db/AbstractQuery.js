"use strict";
/**
 * @author afu
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * SQL 查询生成器抽象层
 *
 * 子类应该继承该类并实现该类的抽象方法
 */
class AbstractQuery {
    constructor() {
        /**
         * @property {String} $select the columns being selected
         */
        this.$select = '';
        /**
         * @property {String} $from the table to be selected from
         */
        this.$from = '';
        /**
         * @property {String} $where the condition of a query
         */
        this.$where = '';
        /**
         *  @property {String} $groupBy the column of group by
         */
        this.$groupBy = '';
        /**
         *  @property {String} $having the condition of a query
         */
        this.$having = '';
        /**
         *  @property {String} $orderBy the sort condition
         */
        this.$orderBy = '';
        /**
         * @property {Map} $options other sql information
         */
        this.$options = new Map();
        /**
         * @property {Array} $parameters list of query parameter values
         */
        this.$parameters = [];
    }
    /**
     * Set parameters
     *
     * @param {Array} parameters
     */
    addParameters(parameters) {
        for (let name of parameters) {
            this.$parameters.push(name);
        }
    }
}
exports.default = AbstractQuery;
