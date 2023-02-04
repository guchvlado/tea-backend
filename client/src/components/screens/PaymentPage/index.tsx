import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import Head from "next/head";
import { useAppSelector } from "hooks/useAppSelector";
import { countCartOrder } from "utils/countCartOrder";
import $api from "http";
import { setCartItems } from "redux/reducers/cartSlice";
import { useRouter } from "next/router";


interface IFormInputs {
    name: string;
    phone: string;
    address: string;
    time: string;
}

const schema = yup.object({
    name: yup.string().required('Поле обязательно для заполнения'),
    phone: yup.string().required('Поле обязательно для заполнения'),
    address: yup.string().required('Поле обязательно для заполнения'),
    time: yup.string().required('Поле обязательно для заполнения')
}).required();

interface IPostTea {
    teaId: number;
    teaQuantity: number;
  }

const PaymentPage = () => {

    const router = useRouter()

    const dispatch = useAppDispatch()

    const items = useAppSelector(state => state.cart.items)
    const isAuth = useAppSelector(state => state.user.isAuth)

    const [error, setError] = useState('')

    const {totalPrice} = countCartOrder(items)
    
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: IFormInputs) => {
        try {
            if (!isAuth) {
                alert('Для создания заказа необходимо зарегестрироваться')
                return
            }
            
            const postTeaItems: IPostTea[] = items.map(item => ({teaId: +item.id, teaQuantity: item.quantity}))

            await $api.post('/orders', {...data, items: postTeaItems})
            dispatch(setCartItems([]))
            window.alert('Заказ успешно создан')
            router.push('/profile')
        } catch(e: any) {
            setError(e?.response?.data?.message || '')
        }
    };

    return (
        <div className="mycontainer">
            <div className="w-full lg:w-[820px] mx-auto py-24">
                <form onSubmit={handleSubmit(onSubmit)} className="border rounded-xl border-gray-400 shadow-md w-full p-10 mx-auto flex flex-col gap-4">
                    <h2 className="mb-8 text-center">Информация для доставки заказа</h2>
                    {error ? <p className="text-red-700">{error}</p> : null}
                    <label htmlFor="name" className="input-label">Ваше имя</label>
                    <input id="name" {...register('name',)} className="input" placeholder="Владимир" />
                    <p className="input-error">{errors.name?.message}</p>

                    <label htmlFor="phone" className="input-label">Ваш телефон</label>
                    <input type="tel" id="phone" {...register('phone',)} className="input" placeholder="8 800 555 35 35" pattern="^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$"/>
                    <p className="input-error">{errors.phone?.message}</p>

                    <label htmlFor="address" className="input-label">Ваш адрес</label>
                    <input id="address" {...register('address')} className="input" placeholder="Москва, Кремлёвская набережная, д. 1, кв. 1" />
                    <p className="input-error">{errors.address?.message}</p>                    

                    <label htmlFor="time" className="input-label">Предпочтительное время доставки</label>
                    <select id="time" {...register('time')} className="w-44 border border-lime-800 p-3 rounded-xl">
                        <option value="morning">8:00 - 14:00</option>
                        <option value="evening">14:00 - 20:00</option>
                    </select>
                    <p className="input-error">{errors.time?.message}</p>

                    <div className="flex justify-between items-center mt-4"> 
                        <div className="font-bold text-2xl">Итого: {totalPrice} руб. <div className="text-sm text-maingreen italic">Оплата картой или наличными курьеру</div></div>
                        <button className="button pay-btn w-1/3">Создать заказ</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default PaymentPage