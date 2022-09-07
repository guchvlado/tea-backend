import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrdersProfitWidget from "../../components/admin/OrdersProfitWidget";
import OrdersWidget from "../../components/admin/OrdersWidget";
import SideBar from "../../components/admin/SideBar";
import UsersWidget from "../../components/admin/UsersWidget";
import { useAppSelector } from "../../hooks/useAppSelector";
import AdminPanelLayout from "../../layouts/AdminPanelLayout";


const AdminHomePage: NextPage = () => {

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
}

export default AdminHomePage