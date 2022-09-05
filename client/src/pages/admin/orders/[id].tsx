import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductItem from "../../../components/admin/ProductItem";
import BackButton from "../../../components/UI/BackButton";
import $api from "../../../http";
import AdminPanelLayout from "../../../layouts/AdminPanelLayout";
import { IOrder } from "../../../types/IOrder";


const AdminOrderItemPage: NextPage = () => {

    const router = useRouter()
    const { id } = router.query

    const [order, setOrder] = useState<IOrder>()

    useEffect(() => {
        console.log('id = ', id)
        if (id) {
            $api.get<IOrder>('/orders/' + id)
                .then(res => res.data)
                .then(data => setOrder(data))
        }
    }, [id])
    return (
        <AdminPanelLayout>
            <div className="font-bold text-xl text-emerald-900 bg-lightgreen shadow-lg transition-all rounded-xl m-8 p-4">
                <div className="flex justify-between items-center border-b-2 bg-maingreen text-white py-5 px-10 rounded-xl">
                    <div>
                        Номер заказа - {order?.id} <br />
                        Заказ от {order?.createdAt}
                    </div>
                    <div>
                        Статус заказа <br />
                        {order?.status}
                    </div>
                    <div>
                        Сумма заказа <br />
                        {order?.tea && order.tea.reduce((sum, item) => sum + (item.price * item.TeaOrder.teaQuantity / 100), 0)}
                    </div>
                </div>
                <div
                    className={`flex flex-col gap-5 px-10 w-full transition-all duration-700 overflow-y-scroll h-fit`}>
                    {order?.tea && order.tea.map(teaItem =>
                        <Link key={teaItem.id} href={`/item/${teaItem.id}`}>
                            <a className="flex items-center">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_HOST}/${teaItem.image}`}
                                    alt="Tea"
                                    width={160}
                                    height={160}
                                />
                                <div className="ml-10">
                                    <h3 className='font-bold text-2xl leading-7'>{teaItem.title}</h3>
                                    <span className='text-lg text-gray-500'>{teaItem.TeaOrder.teaQuantity} г.</span>
                                </div>
                                <div className="text-2xl flex-1 text-right">
                                    {teaItem.price} ₽ за 100 г. <br />
                                    {teaItem.price * teaItem.TeaOrder.teaQuantity / 100} ₽ за {teaItem.TeaOrder.teaQuantity} г.
                                </div>
                            </a>
                        </Link>
                    )}
                </div>
            </div>

            <div className="flex justify-center">
                <BackButton/>
            </div>
        </AdminPanelLayout>
    )
}


export default AdminOrderItemPage