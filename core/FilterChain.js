"use strict";
const ArrayList = require("../utils/ArrayList");
class FilterChain {
    constructor() {
        this.resource = null;
        this.position = 0;
        this.filters = new ArrayList(2);
    }
    doFilter(req, res) {
        if (this.position >= this.filters.size()) {
            this.resource.run(req, res);
            return;
        }
        let filter = this.filters.get(this.position++);
        filter.doFilter(req, res, this);
    }
    addFilter(filter) {
        if (this.filters.contains(filter)) {
            return;
        }
        this.filters.add(filter);
    }
    clearFilters() {
        this.filters.clear();
        this.position = 0;
        this.resource = null;
    }
    setResource(resource) {
        this.resource = resource;
    }
}
module.exports = FilterChain;
