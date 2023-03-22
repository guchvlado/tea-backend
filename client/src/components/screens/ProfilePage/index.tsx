import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import $api from '../../../http';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

import LogOutButton from './LogOutButton';
import TeaOrder from './TeaOrder';
import { IOrder } from 'types/IOrder';

const ProfilePage = () => {
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
};

export default ProfilePage;