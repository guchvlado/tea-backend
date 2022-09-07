import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { IOrder } from "../types/IOrder"


const TeaOrder: React.FC<IOrder> = (order) => {
    const { createdAt, id, status, tea } = order

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(isOpen => !isOpen)
    }

    return (
        <div className="font-bold text-xl text-emerald-900 bg-lightgreen shadow-lg transition-all rounded-xl">
            <div className="flex justify-between items-center border-b-2 bg-maingreen text-white py-5 px-10 rounded-xl cursor-pointer" onClick={handleClick}>
                <div>
                    Номер заказа - {id} <br />
                    Заказ от {createdAt}
                </div>
                <div>
                    Статус заказа <br />
                    {status}
                </div>
                <div>
                    Сумма заказа <br />
                    {tea.reduce((sum, item) => sum + (item.price * item.TeaOrder.teaQuantity / 100), 0)} руб.
                </div>
            </div>
            <div 
                className={`flex flex-col gap-5 px-10 w-full transition-all duration-700 overflow-y-scroll ${!isOpen ? 
                'max-h-0 py-0'
                : `max-h-[600px]`}`}>
                {tea.map(teaItem =>
                    <Link key={teaItem.id} href={`/item/${teaItem.id}`}>
                        <a className="flex items-center">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_HOST}/${teaItem.image}`}
                                alt="Tea"
                                width={160}
                                height={160}
                            />
                            <div className="ml-10">
                                <h3 className='font-bold text-2xl leading-7'>{teaItem.title}</h3>
                                <span className='text-lg text-gray-500'>{teaItem.TeaOrder.teaQuantity} г.</span>
                            </div>
                            <div className="text-2xl flex-1 text-right">
                                {teaItem.price} ₽ за 100 г. <br />
                                {teaItem.price * teaItem.TeaOrder.teaQuantity / 100} ₽ за {teaItem.TeaOrder.teaQuantity} г.
                            </div>
                        </a>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default TeaOrder