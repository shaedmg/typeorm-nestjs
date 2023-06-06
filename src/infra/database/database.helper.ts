const QUERY_OPTIONS = {
    select: ['_show'],
    order: ['_order', '_sort'],
};

const DEFAULT_ORDER = 'ASC';

export class DatabaseHelper {
    static getFilterQuery(query: Record<string, any>): { where: Record<string, any> } {
        const filters = {};
        for (const key in query) {
            if (Object.values(QUERY_OPTIONS).every(option => !option.includes(key))) {
                filters[key] = query[key];
            }
        }
        return { where: filters };
    }

    static getDbSelect(query: Record<string, any[]>): { select: string[] } {
        const selectQuery = [];
        QUERY_OPTIONS.select.forEach(option => {
            if (query[option]) {
                selectQuery.push(...query[option]);
            }
        });
        return { select: selectQuery };
    }

    static getDbOrder(query: Record<string, any>): { order: Record<string, any> } {
        const orderQuery = {};
        if (query._sort) {
            orderQuery[query._sort] = query._order || DEFAULT_ORDER;
        }
        return { order: orderQuery };
    }

    static getDbQuery(query: Record<string, any>): any {
        const filterQuery = this.getFilterQuery(query);
        const selectQuery = this.getDbSelect(query);
        const orderQuery = this.getDbOrder(query);
        return { ...filterQuery, ...selectQuery, ...orderQuery };
    }
}
