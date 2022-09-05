import {ReactNode} from 'react'
import SideBar from '../components/admin/SideBar'

interface AdminPanelLayoutProps {
    children: ReactNode
}

const AdminPanelLayout = ({children}: AdminPanelLayoutProps) => {

    return (
        <div className='h-fit flex'>
            <SideBar/>
            <main className='w-full min-h-[700px]'>
                {children}
            </main>
        </div>
    )
}

export default AdminPanelLayout