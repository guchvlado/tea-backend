
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import $api from '../../http';
import { IOrder } from '../../types/IOrder';

const OrdersWidget = () => {

    const [total, setTotal] = useState<number>()

    useEffect(() => {
        $api.get<IOrder[]>('/orders/all')
            .then(res => res.data)
            .then(data => setTotal(data.length))
    }, [])

    return (
        <Link href={'/admin/orders'}>
            <a className='shadow-lg w-96 h-40 border rounded-xl m-4 p-4 block hover:shadow-xl transition-all'>
                <div className='flex justify-between'>
                    <div className='font-bold text-lg text-gray-700 uppercase'>Заказы</div>
                </div>
                <div className='text-3xl font-bold mt-3'>{total}</div>
                <div className='mt-6 font-light underline-offset-2 underline'>Посмотреть список заказов</div>
            </a>
        </Link>
    );
};

export default OrdersWidget;