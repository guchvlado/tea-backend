import Link from "next/link";
import { useEffect, useState } from "react";
import $api from "http";
import AdminPanelLayout from "layouts/AdminPanelLayout";
import { IOrder } from "types/IOrder";


const AdminOrdersPage = () => {

    const [items, setItems] = useState<IOrder[]>([])

    useEffect(() => {
        $api.get<IOrder[]>('/orders/all')
            .then(res => res.data)
            .then(data => setItems(data))
    }, [])

    const handleReadyStatus = (id: number) => {
        if (window.confirm('Подтвердить готовность заказа?')) {
            setItems(items => items.map(item => item.id === id ? {...item, status: 'Готов'} : item))
            $api.post(`orders/status/${id}`, { status: 'Готов' })
                .then(res => console.log(res))
                .catch(e => console.log(e))
        }
    }

    return (
        <AdminPanelLayout>
            <div className="p-8">
                <div className="flex justify-between">
                    <h2>Заказы</h2>
                </div>
                <div className="py-2 mt-5 flex items-center border child:text-center font-bold child:flex-1">
                    <div>Id</div>
                    <div>UserId</div>
                    <div>Status</div>
                    <div>CreatedAt</div>
                    <div>Actions</div>
                </div>
                {items.map(item =>
                    <div key={item.id} className="py-4 mt-5 flex items-center border child:text-center child:flex-1">
                        <div>{item.id}</div>
                        <div>{item.userId}</div>
                        <div>{item.status}</div>
                        <div>{item.createdAt}</div>
                        <div className="flex gap-2 px-5">
                            <Link href={`/admin/orders/${item.id}`}>
                                <a className="button-admin yellow">Открыть</a>
                            </Link>
                            {item.status !== 'Готов' ? <div className="button-admin green" onClick={() => handleReadyStatus(item.id)}>
                                Готов
                            </div> : null}
                        </div>
                    </div>
                )}
            </div>
        </AdminPanelLayout>
    )
}


export default AdminOrdersPage