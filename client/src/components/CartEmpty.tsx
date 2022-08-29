import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import emptyCartImage from '../assets/img/empty-cart.png'

const CartEmpty = () => {
    return (
        <div className="max-w-4xl mx-auto py-20">
            <div className="text-center space-y-3">
                <h2 className='text-4xl'>Корзина пустая <span>😕</span></h2>
                <p className='text-lg leading-loose text-gray-500 '>
                    Вероятней всего, вы не выбрали ни одного товара.<br />
                    Для того, чтобы заказать чай, перейди на главную страницу.
                </p>
                <div className='relative w-full h-96'>
                    <Image layout='fill' objectFit='contain' src={emptyCartImage} alt="Empty cart" />
                </div>
                <Link href="/">
                    <a className='button w-1/3'>Вернуться назад</a>
                </Link>
            </div>
        </div>
    );
};

export default CartEmpty;