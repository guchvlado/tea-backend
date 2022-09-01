import axios from 'axios'
import {ReactNode, useEffect} from 'react'
import Header from '../components/Header'
import LogOutButton from '../components/LogOutButton'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { setCartItems } from '../redux/reducers/cartSlice'
import { setIsAuth, setUser } from '../redux/reducers/userSlice'
import { getCartFromLS } from '../utils/getCartFromLS'

interface MainLayOutProps {
    children: ReactNode
}

const MainLayOut = ({children}: MainLayOutProps) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(setCartItems(getCartFromLS()))

      const token = localStorage.getItem('token')
      if (token) {
        axios.get('http://localhost:7000/auth/validate/' + token)
          .then(res => res.data)
          .then(data => {
            dispatch(setIsAuth(true))
            dispatch(setUser(data))
          })
          .catch(e => console.log(e))
  
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