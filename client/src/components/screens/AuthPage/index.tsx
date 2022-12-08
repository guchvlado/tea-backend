import React from 'react';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { login, registration } from "http/userAPI";
import { useState } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { setIsAuth, setUser } from "redux/reducers/userSlice";


interface IFormInputs {
    email: string;
    password: string;
}

const schema = yup.object({
    email: yup.string().email('Строка не являяется почтой').required('Поле обязательно для заполнения'),
    password: yup.string().min(4, 'Минимум 4 символа').max(16, 'Максимум 16 символов').required('Поле обязательно для заполнения'),
}).required();

const AuthPage = () => {
    const router = useRouter()

    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('')

    const dispatch = useAppDispatch()
    const {user, isAuth} = useAppSelector(state => state.user)

    if (isAuth) {
        router.replace('/profile')
    }

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data: IFormInputs) => {
        try {
            const response = isLogin ? await login(data) : await registration(data)
            dispatch(setIsAuth(true))
            dispatch(setUser(response.user))
            router.push('/profile')
        } catch(e: any) {
            setError(e?.response?.data?.message || '')
        }
    };

    const isLoginHandler = () => {
        setIsLogin(isLogin => !isLogin)
    }

    return (
        <div className="mycontainer h-[600px]">
            <form onSubmit={handleSubmit(onSubmit)} className="border rounded-xl border-gray-400 shadow-md w-1/3 mt-20 p-10 mx-auto flex flex-col gap-4">
                <h2 className="text-center">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                {error ? <p className="text-red-700">{error}</p> : null}
                <label htmlFor="email" className="input-label">Почта</label>
                <input id="email" {...register('email',)} className="input" />
                <p className="input-error">{errors.email?.message}</p>

                <label htmlFor="password" className="input-label">Пароль</label>
                <input id="password" {...register('password')} className="input" />
                <p className="input-error">{errors.password?.message}</p>

                <button className="button rounded-xl w-full">{isLogin ? "Войти"  : "Регистрация"}</button>
                <div onClick={isLoginHandler} className="text-blue-700 underline cursor-pointer">{isLogin ? "Нет аккаунта? Зарегистрируйся!" : "Есть аккаунт? Войдите!"}</div>
            </form>
        </div>
    )
};

export default AuthPage;