
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import $api from 'http';
import { IOrder } from 'types/IOrder';

const OrdersProfitWidget = () => {

    const [orders, setOrders] = useState<IOrder[]>()

    useEffect(() => {
        $api.get<IOrder[]>('/orders/all')
            .then(res => res.data)
            .then(data => setOrders(data))
    }, [])

    let totalProfit = 0

    if (orders) {
        totalProfit = orders.reduce((prevTotal, order) => {
            const teaProfit = order.tea.reduce((sum, item) => sum + (item.price * item.TeaOrder.teaQuantity / 100), 0)
            return prevTotal + teaProfit
        }, 0)
    }

    return (
        <Link href={'/admin/orders'}>
            <a className='shadow-lg w-96 h-40 border rounded-xl m-4 p-4 block hover:shadow-xl transition-all'>
                <div className='flex justify-between'>
                    <div className='font-bold text-lg text-gray-700 uppercase'>Прибыль</div>
                </div>
                <div className='text-3xl font-bold mt-3'>{totalProfit} руб.</div>
                <div className='mt-6 font-light underline-offset-2 underline'>Посмотреть список заказов</div>
            </a>
        </Link>
    );
};

export default OrdersProfitWidget;