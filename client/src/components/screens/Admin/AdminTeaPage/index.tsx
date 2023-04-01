// import $api from 'http';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import $api from '../../../../http'
import { ITeaItem } from 'types/ITeaItem';
import AdminPanelLayout from 'layouts/AdminPanelLayout';
import ProductItem from '@components/admin/ProductItem';

const AdminTeaPage = () => {
    const [items, setItems] = useState<ITeaItem[]>([])

    useEffect(() => {
        $api.get<ITeaItem[]>('/tea/all')
            .then(res => res.data)
            .then(data => setItems(data))
    }, [])

    const handleDelete = (id: string) => {
        if (window.confirm('Удалить данный товар')) {
            setItems(items => items.filter(item => item.id !== id))
            $api.delete(`tea/delete/${id}`)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        }
    }

    return (
        <AdminPanelLayout>
            <div className="p-8">
                <div className="flex justify-between">
                    <h2>Товары</h2>
                    
                    <Link href={`/admin/tea/new`}>
                        <a className="button-admin green">Добавить новый товар</a>
                    </Link>
                </div>
                <div className="py-2 mt-5 flex items-center border child:text-center font-bold">
                    <div className="flex-1">Id</div>
                    <div className="flex-1">CategoryId</div>
                    <div className="flex-[2]">
                        Image
                    </div>
                    <div className="flex-[2]">
                        Title
                    </div>
                    <div className="flex-1">
                        Price
                    </div>
                    <div className="flex-[4] px-5">
                        Actions
                    </div>
                </div>
                {items.map(item => <ProductItem handleDelete={handleDelete} key={item.id} {...item} />)}
            </div>
        </AdminPanelLayout>
    )
};

export default AdminTeaPage;