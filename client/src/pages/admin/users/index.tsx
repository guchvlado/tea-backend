import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductItem from "../../../components/admin/ProductItem";
import $api from "../../../http";
import AdminPanelLayout from "../../../layouts/AdminPanelLayout";
import { ITeaItem } from "../../../types/ITeaItem";
import { IUser } from "../../../types/IUser";


const AdminUsersPage: NextPage = () => {

    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        $api.get<IUser[]>('/users')
            .then(res => res.data)
            .then(data => setUsers(data))
    }, [])

    return (
        <AdminPanelLayout>
            <div className="p-8">
                <div className="flex justify-between">
                    <h2>Пользователи</h2>
                </div>
                <div className="py-2 mt-5 flex items-center border child:text-center font-bold child:flex-1">
                    <div>Id</div>
                    <div>Email</div>
                    <div>Role</div>
                </div>
                {users.map(item => 
                    <div key={item.id} className="py-2 mt-5 flex items-center border child:text-center child:flex-1">
                        <div>{item.id}</div>
                        <div>{item.email}</div>
                        <div>{item.role.map(i => i.description)}</div>
                    </div>
                )}
            </div>
        </AdminPanelLayout>
    )
}


export default AdminUsersPage