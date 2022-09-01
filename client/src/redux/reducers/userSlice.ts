import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";

interface userSliceState {
    user: IUser;
    isAuth: boolean;
}

const initialState: userSliceState = {
    user: {
        email: '',
        id: 0,
        role: []
    },
    isAuth: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = {
                email: '',
                id: 0,
                role: []
            }
        }
    }
})

export const {
    setUser,
    setIsAuth,
    clearUser
} = userSlice.actions