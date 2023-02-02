import { useRouter } from "next/router"
import React from "react"
import { useAppDispatch } from "hooks/useAppDispatch"
import $api from "http"
import { clearUser, setIsAuth, setUser } from "redux/reducers/userSlice"


const LogOutButton: React.FC = () => {

    const router = useRouter()

    const dispatch = useAppDispatch()

    const onClickHanlder = () => {
        $api.get('/auth/logout')
        dispatch(setIsAuth(false))
        dispatch(clearUser())
        router.push('/auth')
    }

    return (
        <button 
        className="button"
        onClick={onClickHanlder}>Выйти</button>
    )

}

export default LogOutButton