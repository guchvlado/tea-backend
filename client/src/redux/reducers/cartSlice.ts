import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../../types/ITeaItem";

interface CartSliceState {
    items: ICartItem[]
}

const initialState: CartSliceState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action: PayloadAction<ICartItem>) => {
            const cartItem = state.items.find(item => item.id === action.payload.id)
            if (cartItem) {
                cartItem.quantity+= action.payload.quantity
            }
            else {
                state.items.push(action.payload)
            }
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        deleteCartItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        clearCart: state => {
            state.items = []
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        decreaseItemQuantity: (state, action: PayloadAction<ICartItem>) => {
            const cartItem = state.items.find(item => item.id === action.payload.id)
            if (!cartItem) throw new Error('there is no such item in the cart')
            if (cartItem.quantity > action.payload.quantity) {
                cartItem.quantity-= action.payload.quantity
            }
            else {
                state.items = state.items.filter(item => item.id !== action.payload.id)
            }
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        setCartItems: (state, action: PayloadAction<ICartItem[]>) => {
            state.items = action.payload
            localStorage.setItem('cart', JSON.stringify(state.items))
        }
    }
})

export const {
    addCartItem,
    clearCart,
    decreaseItemQuantity,
    deleteCartItem,
    setCartItems
} = cartSlice.actions