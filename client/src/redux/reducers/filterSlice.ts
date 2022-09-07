import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISortItem } from "../../types/ISortItem";

interface FilterSliceState {
    activeSearch: string;
    activeCategory: number;
    activeSort: ISortItem,
    currentPage: number;
}

const initialState: FilterSliceState = {
    activeCategory: 0,
    activeSearch: '',
    activeSort: {name: 'Сначала популярный', sortBy: 'rating', order: 'DESC'},
    currentPage: 1
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
            state.currentPage = 1
        },
        setActiveSort: (state, action: PayloadAction<ISortItem>) => {
            state.activeSort = action.payload
        },
        increaseCurrentPage: (state) => {
            state.currentPage = state.currentPage + 1
        },
        decreaseCurrentPage: (state) => {
            state.currentPage = state.currentPage - 1
        },
        changeCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        }
    }
})

export const {
    setActiveCategory,
    setActiveSearch,
    setActiveSort,
    decreaseCurrentPage,
    increaseCurrentPage,
    changeCurrentPage
} = filterSlice.actions