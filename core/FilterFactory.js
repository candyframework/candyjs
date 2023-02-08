"use strict";
const Candy = require("../Candy");
const FilterChain = require("./FilterChain");
class FilterFactory {
    constructor() { }
    static createFilterChain(resource) {
        let filterChain = new FilterChain();
        filterChain.setResource(resource);
        let filters = resource.filters();
        if (null === filters) {
            return filterChain;
        }
        for (let filter of filters) {
            if ('function' !== typeof filter.doFilter) {
                filter = Candy.createObject(filter);
            }
            filterChain.addFilter(filter);
        }
        return filterChain;
    }
}
module.exports = FilterFactory;
