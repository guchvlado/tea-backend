import { createSlice } from "@reduxjs/toolkit";
import { ITeaItem } from "../../types/ITeaItem";
import {fetchTea} from './fetchTea'

interface TeaSliceState {
    count: number;
    items: ITeaItem[];
    status: 'loading' | 'success' | 'error';
}

const initialState: TeaSliceState = {
    count: 0,
    items: [],
    status: 'loading'
}

export const teaSlice = createSlice({
    name: 'tea',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchTea.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchTea.fulfilled, (state, action) => {
                state.items = action.payload.rows
                state.count = action.payload.count
                state.status = 'success'
            })
            .addCase(fetchTea.rejected, state => {
                state.status = 'error'
            })
    }
})