import {ReactNode, useEffect} from 'react'
import Header from '../components/Header'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { setCartItems } from '../redux/reducers/cartSlice'
import { getCartFromLS } from '../utils/getCartFromLS'

interface MainLayOutProps {
    children: ReactNode
}

const MainLayOut = ({children}: MainLayOutProps) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(setCartItems(getCartFromLS()))
    }, [])

    return (
        <div className='bg-white rounded-lg h-full my-[50px] mx-auto max-w-[1400px] w-11/12'>
            <Header/>
            <main>
                {children}
            </main>
        </div>
    )
}

export default MainLayOut