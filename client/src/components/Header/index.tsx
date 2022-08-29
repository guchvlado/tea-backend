import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import Logo from '../../assets/img/logo.svg'
import CartButton from "../CartButton"
import Search from "../Search"

const Header = () => {

    const router = useRouter()

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

                {router.pathname === '/' && <Search/>}
                
                <CartButton/>
            </div>
        </header>
    )
}

export default Header