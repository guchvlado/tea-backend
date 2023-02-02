import OrdersProfitWidget from '@components/admin/OrdersProfitWidget';
import OrdersWidget from '@components/admin/OrdersWidget';
import UsersWidget from '@components/admin/UsersWidget';
import { useAppSelector } from 'hooks/useAppSelector';
import AdminPanelLayout from 'layouts/AdminPanelLayout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const AdminPage = () => {
    const router = useRouter()
    
    const {user} = useAppSelector(state => state.user)

    useEffect(() => {
        if (user.role.some(role => role.name !== 'ADMIN')) {
            router.replace('/')
        }
    }, [user])

    return (
        <AdminPanelLayout>
            <UsersWidget/>
            <OrdersWidget/>
            <OrdersProfitWidget/>
        </AdminPanelLayout>
    )
};

export default AdminPage;