import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISortItem } from "../../types/ISortItem";

interface FilterSliceState {
    activeSearch: string;
    activeCategory: number;
    activeSort: ISortItem
}

const initialState: FilterSliceState = {
    activeCategory: 0,
    activeSearch: '',
    activeSort: {name: 'Сначала популярный', sortBy: 'rating', order: 'desc'},
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveSearch: (state, action: PayloadAction<string>) => {
            state.activeSearch = action.payload
        },
        setActiveCategory: (state, action: PayloadAction<number>) => {
            state.activeCategory = action.payload
        },
        setActiveSort: (state, action: PayloadAction<ISortItem>) => {
            state.activeSort = action.payload
        }
    }
})

export const {
    setActiveCategory,
    setActiveSearch,
    setActiveSort
} = filterSlice.actions