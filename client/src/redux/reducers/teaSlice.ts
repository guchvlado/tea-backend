import { createSlice } from "@reduxjs/toolkit";
import { ITeaItem } from "../../types/ITeaItem";
import {fetchTea} from './fetchTea'

interface TeaSliceState {
    items: ITeaItem[];
    status: 'loading' | 'success' | 'error';
}

const initialState: TeaSliceState = {
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
                state.items = action.payload
                state.status = 'success'
            })
            .addCase(fetchTea.rejected, state => {
                state.status = 'error'
            })
    }
})