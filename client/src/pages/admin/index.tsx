import AdminPage from "@screens/Admin/AdminPage";
import { GetServerSideProps, NextPage } from "next";


const AdminHomeNextPage: NextPage = () => {
    return <AdminPage/>
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {

    const accessToken = req.cookies?.accessToken ?? ''

    // if (!accessToken) {
    //     return {
    //         notFound: true
    //     }
    // }

    return {
        props: {}
    }
}

export default AdminHomeNextPage