export interface ITeaItem {
    id: string;
    imageUrl: string;
    title: string;
    category: number;
    price: number;
    rating: number;
}

export interface ICartItem extends ITeaItem {
    quantity: number;
}