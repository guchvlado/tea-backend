import { ICartItem } from "../types/ITeaItem";

export function countCartOrder(items: ICartItem[]) {
    let totalPrice = 0;
    let totalWeight = 0;
    items.forEach(item => {
        totalPrice += item.price * item.quantity / 100
        totalWeight += item.quantity
    })
    return {totalPrice, totalWeight}
}