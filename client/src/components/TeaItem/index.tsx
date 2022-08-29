import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { addCartItem } from "../../redux/reducers/cartSlice"
import { ITeaItem } from "../../types/ITeaItem"

const TeaItem = ({ id, imageUrl, price, title, category, rating }: ITeaItem) => {

    const dispatch = useAppDispatch()

    const [weight, setWeight] = useState(100)

    const itemInCart = useAppSelector(state => state.cart.items.find(item => item.id === id))

    const onAddItem = () => {
        dispatch(addCartItem({
            id,
            title,
            category,
            imageUrl,
            price,
            rating,
            quantity: weight,
        }))
    }

    return (
        <div className="w-full hover:scale-105 transition-transform">
            <Link href={`/item/${id}`}>
                <a>
                    <Image
                        src={imageUrl}
                        alt="tea"
                        height={190}
                        width={260}
                    />
                </a>
            </Link>
            <h3 className="font-bold text-xl text-center mt-3.5">{title}</h3>
            <div className="flex items-center justify-between mt-2">
                <select
                    name="weight"
                    id="weight"
                    className="w-[160px] h-[40px] border border-[#2EAA76] rounded-md cursor-pointer px-4"
                    value={weight}
                    onChange={(e) => setWeight(+e.target.value)}>
                    <option value="50">50 г.</option>
                    <option value="100">100 г.</option>
                    <option value="200">200 г.</option>
                    <option value="300">300 г.</option>
                </select>
                <div className="flex flex-1 justify-center font-bold">{price * weight / 100} руб</div>
            </div>
            <div className="button_item duration-300 group justify-center gap-4" onClick={onAddItem}>

                Добавить
                {itemInCart ? 
                <div 
                className="bg-maingreen rounded-xl h-6 px-2 text-xs flex justify-center items-center text-white justify-self-end"
                >В корзине {itemInCart.quantity} г</div> 
                : ''}
                
            </div>
        </div>
    )
}

export default TeaItem