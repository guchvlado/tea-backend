import Image from 'next/image';
import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addCartItem, decreaseItemQuantity, deleteCartItem } from '../redux/reducers/cartSlice';
import { ICartItem } from '../types/ITeaItem';

const CartItem: React.FC<ICartItem> = (props) => {
    const {imageUrl, title, price, quantity, id, category, rating} = props
    const dispatch = useAppDispatch()

    const [weight, setWeight] = useState(100)

    const onRemoveOne = () => {
        dispatch(decreaseItemQuantity({...props, quantity: weight}))
    }

    const onAddWeight = () => {
        dispatch(addCartItem({...props, quantity: weight}))
    }

    const onRemoveFromCart = () => {
        dispatch(deleteCartItem(id))
    }

    return (
        <div className="w-full border-t pt-6 flex items-center justify-between">
            <div className='hidden md:block w-[10%]'>
                <Image
                    src={imageUrl}
                    alt="Pizza"
                    width={80}
                    height={80}
                />
            </div>
            <div className="flex flex-col justify-center w-[40%]">
                <h3 className='font-bold text-2xl leading-7'>{title}</h3>
                <span className='text-lg text-gray-500'>{quantity} г.</span>
            </div>
            <div className="hidden md:flex items-center gap-4 w-[33%]">
                <div onClick={onRemoveOne} className="button_cartItem">
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#2EAA76"></path>
                    </svg>
                </div>
                <select
                    name="cartWeight"
                    id="cartWeight"
                    className="h-[40px] border border-[#2EAA76] rounded-md cursor-pointer px-4"
                    value={weight}
                    onChange={(e) => setWeight(+e.target.value)}>
                        <option value="50">50 г.</option>
                        <option value="100">100 г.</option>
                        <option value="200">200 г.</option>
                        <option value="300">300 г.</option>
                </select>
                <div onClick={onAddWeight} className="button_cartItem">
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#2EAA76"></path>
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#2EAA76"></path>
                    </svg>
                </div>
            </div>
            <div className="w-[14%] flex justify-center items-center">
                <b>{price * quantity / 100} ₽</b>
            </div>
            <div onClick={onRemoveFromCart} className="cart__item-remove">
                <div className="button_cartItem rotate-45 p-2 border-[#D0D0D0] hover:bg-black hover:border-black">
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#D0D0D0"></path>
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#D0D0D0"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CartItem;