import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { ITeaItem } from "../../types/ITeaItem";

interface fetchTeaParams {
    search: string;
    sortBy: string;
    order: string;
    category: number;
}

export const fetchTea = createAsyncThunk<ITeaItem[], fetchTeaParams>(
    'tea/fetchTeaStatus',
    async (params) => {
        const {category, order, search, sortBy} = params
        const categoryParam = category === 0 ? '' : `&category=${category}`
        const sortParam = `sortBy=${sortBy}&order=${order}`
        const searchParam = search.length > 0 ? `&search=${search}` : ''
        const response = await axios.get<ITeaItem[]>(`${process.env.NEXT_PUBLIC_API_HOST}?${sortParam}${categoryParam}${searchParam}`)
        return response.data
    }
)