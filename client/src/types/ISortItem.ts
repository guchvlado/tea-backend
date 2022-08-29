export interface ISortItem {
    name: string;
    sortBy: 'price' | 'title' | 'rating';
    order: 'desc' | 'inc';
}