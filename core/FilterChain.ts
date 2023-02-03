/**
 * @author afu
 * @license MIT
 */
import IFilter from './IFilter';
import IFilterChain from './IFilterChain';

import ArrayList = require('../utils/ArrayList');

/**
 * 处理请求的过滤链
 */
class FilterChain implements IFilterChain {

    private resource = null;

    /**
     * The current position of the filter chain
     */
    private position: number = 0;

    /**
     * The filter collection
     */
    private filters: ArrayList<IFilter> = new ArrayList<IFilter>(2);

    /**
     * @inheritdoc
     */
    public doFilter(req: any, res: any): void {
        if(this.position >= this.filters.size()) {
            this.resource.run(req, res);
            this.clearFilters();
            return;
        }

        let filter = this.filters.get(this.position++);
        filter.doFilter(req, res, this);
    }

    /**
     * 添加过滤器
     */
    public addFilter(filter: IFilter): void {
        if(this.filters.contains(filter)) {
            return;
        }

        this.filters.add(filter);
    }

    /**
     * 清空过滤器
     */
    public clearFilters(): void {
        this.filters.clear();
        this.position = 0;
        this.resource = null;
    }

    public setResource(resource: any): void {
        this.resource = resource;
    }

}

export = FilterChain;
