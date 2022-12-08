import $api from '../http'
import {ReactNode, useEffect} from 'react'
import Header from '../components/Header'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { setCartItems } from 'redux/reducers/cartSlice'
import { setIsAuth, setUser } from 'redux/reducers/userSlice'
import { getCartFromLS } from 'utils/getCartFromLS'
import { useAppSelector } from 'hooks/useAppSelector'

interface MainLayOutProps {
    children: ReactNode
}

const MainLayOut = ({children}: MainLayOutProps) => {

    const dispatch = useAppDispatch()
    const {isAuth} = useAppSelector(state => state.user)

    useEffect(() => {
      dispatch(setCartItems(getCartFromLS()));

      if (!isAuth) {
        (async function() {
          try {
            const response = await $api.get('/auth/validate/')
            const data = await response.data
            dispatch(setIsAuth(true))
            dispatch(setUser(data))
          } catch(e) {}
        })()
      }
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