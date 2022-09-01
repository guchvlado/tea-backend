import { GetServerSideProps, NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { login, registration } from "../../http/userAPI";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setIsAuth, setUser } from "../../redux/reducers/userSlice";
import { useRouter } from "next/router";
import LogOutButton from "../../components/LogOutButton";
import $api from "../../http";
import { IOrder } from "../../types/IOrder";
import Image from "next/image";
import Link from "next/link";
import TeaOrder from "../../components/TeaOrder";
const Profile: NextPage = () => {

    const router = useRouter()

    const dispatch = useAppDispatch()
    const { user, isAuth } = useAppSelector(state => state.user)

    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect(() => {
        if (!isAuth) {
            router.replace('/auth')
        }
        $api.get<IOrder[]>('orders')
            .then(res => res.data)
            .then(data => setOrders(data))
    }, [])



    return (
        <div className="mycontainer min-h-[600px] pb-20">
            <div className="border-2 rounded-xl mt-10 p-10">
                <div className="flex justify-between">
                    <div>
                        <h2>Ваша почта - {user?.email}</h2>
                    </div>
                    <LogOutButton />
                </div>

                <h2 className="mt-10">{orders.length ? "Заказы" : "Заказов нет"}</h2>
                <div className="mt-10">
                    <div className="rounded-xl flex flex-col gap-4">
                        {orders.map((order) =>
                                <TeaOrder key={order.id} {...order} />
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile