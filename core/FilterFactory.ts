/**
 * @author afu
 * @license MIT
 */
import Candy  = require('../Candy');
import FilterChain = require('./FilterChain');

/**
 * 过滤链静态工厂
 */
class FilterFactory {

    private constructor() {}

    /**
     * 创建过滤连
     *
     * @param {any} resource 资源
     * @return {FilterChain}
     */
    public static createFilterChain(resource: any): FilterChain {
        let filterChain = new FilterChain();
        filterChain.setResource(resource);

        let filters = resource.filters();
        if(null === filters) {
            return filterChain;
        }

        for(let filter of filters) {
            if('function' !== typeof filter.doFilter) {
                filter = Candy.createObject(filter);
            }

            filterChain.addFilter(filter);
        }

        return filterChain;
    }

}

export = FilterFactory;
