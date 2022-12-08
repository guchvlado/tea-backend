import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import Logo from '../../assets/img/logo.svg'
import { useAppSelector } from "../../hooks/useAppSelector"
import CartButton from "../CartButton"
import Search from "./Search"

const Header = () => {

    const router = useRouter()

    const {user, isAuth} = useAppSelector(state => state.user)

    return (
        <header className="border-b">
            <div className="mycontainer flex justify-between items-center py-10">
                <Link href="/" >
                    <a>
                        <div className="flex space-x-3">
                            <Image
                                src={Logo}
                                alt="Logo"
                                width={50}
                                height={50}
                            />
                            <div>
                                <div className="font-bold text-2xl uppercase">Tea Store</div>
                                <div>Лучший чай в России</div>
                            </div>
                        </div>
                    </a>
                </Link>

                {router.pathname === '/' && <Search />}

                <div className="flex gap-2 items-center">

                    <Link href={isAuth ? '/profile' : '/auth'}>
                        <a className="button p-0 min-w-0 w-14 h-14 flex justify-center items-center">
                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.99964 2.86893e-07C8.69238 -0.000400083 7.41942 0.418256 6.36759 1.19452C5.31575 1.97079 4.54046 3.06378 4.15549 4.31307C3.77051 5.56236 3.79614 6.90216 4.22861 8.13582C4.66108 9.36947 5.47762 10.432 6.55837 11.1675C4.68267 11.8554 3.05576 13.089 1.88703 14.7094C0.718303 16.3297 0.0612294 18.2628 0.000375486 20.2597C-0.00625739 20.4808 0.0752115 20.6955 0.22686 20.8565C0.378508 21.0176 0.587913 21.1118 0.809009 21.1184C1.0301 21.125 1.24478 21.0436 1.40581 20.8919C1.56684 20.7403 1.66103 20.5309 1.66766 20.3098C1.73385 18.1439 2.64076 16.0889 4.19619 14.5803C5.75162 13.0717 7.83334 12.228 10.0002 12.228C12.1671 12.228 14.2488 13.0717 15.8042 14.5803C17.3596 16.0889 18.2665 18.1439 18.3327 20.3098C18.3336 20.4208 18.3566 20.5305 18.4004 20.6325C18.4442 20.7344 18.5079 20.8267 18.5879 20.9037C18.6678 20.9807 18.7623 21.041 18.8658 21.081C18.9694 21.121 19.0799 21.14 19.1908 21.1367C19.3018 21.1334 19.411 21.1081 19.512 21.062C19.613 21.016 19.7038 20.9503 19.7791 20.8687C19.8543 20.7871 19.9125 20.6913 19.9503 20.587C19.9881 20.4826 20.0046 20.3717 19.9989 20.2609C19.9383 18.2637 19.2813 16.3304 18.1126 14.7098C16.9438 13.0892 15.3168 11.8555 13.4409 11.1675C14.5217 10.432 15.3382 9.36947 15.7707 8.13582C16.2031 6.90216 16.2288 5.56236 15.8438 4.31307C15.4588 3.06378 14.6835 1.97079 13.6317 1.19452C12.5799 0.418256 11.3069 -0.000400083 9.99964 2.86893e-07ZM5.55355 6.11338C5.55355 4.9342 6.02198 3.80332 6.85578 2.96952C7.68958 2.13571 8.82047 1.66729 9.99964 1.66729C11.1788 1.66729 12.3097 2.13571 13.1435 2.96952C13.9773 3.80332 14.4457 4.9342 14.4457 6.11338C14.4457 7.29256 13.9773 8.42344 13.1435 9.25725C12.3097 10.091 11.1788 10.5595 9.99964 10.5595C8.82047 10.5595 7.68958 10.091 6.85578 9.25725C6.02198 8.42344 5.55355 7.29256 5.55355 6.11338Z" fill="white" />
                            </svg>
                        </a>
                    </Link>

                    {user.role.some(role => role.name === 'ADMIN') ? 
                        <Link href='/admin'>
                            <a className="button py-4 leading-6">ADMIN PANEL</a>
                        </Link>
                        : null
                    }

                    <CartButton />
                </div>
            </div>
        </header>
    )
}

export default Header