export interface ITeaItem {
    id: string;
    image: string;
    title: string;
    categoryId: number;
    price: number;
    rating: number;
}

export interface ICartItem extends ITeaItem {
    quantity: number;
}