import { ICartItem } from "../types/ITeaItem"

export const getCartFromLS = (): ICartItem[] => {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
}