import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { addCartItem } from '../../redux/reducers/cartSlice';
import { ITeaItem } from '../../types/ITeaItem';

import { teaData } from '../api/data/teaData'

interface TeaPageProps {
    item: ITeaItem;
}

const TeaPage = ({ item }: TeaPageProps) => {

    const dispatch = useAppDispatch()

    const [weight, setWeight] = useState(100)

    const itemInCart = useAppSelector(state => state.cart.items.find(stateItem => stateItem.id === item.id))

    const onAddItem = () => {
        dispatch(addCartItem({
            ...item,
            quantity: weight,
        }))
    }
    
    return (
        <div className='mycontainer py-24 flex flex-col md:flex-row gap-5'>
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={600}
                    height={400}
                    objectFit='cover' />

            <div className='flex flex-col gap-5'>
                <h2>{item.title}</h2>
                <span className='text-gray-500'>{item.price} руб.</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus obcaecati mollitia illum illo sunt quisquam assumenda nobis labore, deleniti eum soluta excepturi, ut ipsa ab odio ex officia? Sunt, neque.</p>


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

                <div className="button_item w-64 duration-300 group justify-center gap-4" onClick={onAddItem}>

                    Добавить
                    {itemInCart ?
                        <div
                            className="bg-maingreen rounded-xl h-6 px-2 text-xs flex justify-center items-center text-white justify-self-end"
                        >В корзине {itemInCart.quantity} г</div>
                        : ''}

                </div>

                <Link href='/'>
                    <a className='flex justify-center items-center gap-4 w-64 py-3 border rounded-full duration-300 hover:bg-maingreen hover:text-white'>Вернуться назад</a>
                </Link>
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}`)
    // const data = await response.json() as ITeaItem[]
    const data = teaData
    const paths = data.map(({ id }) => ({
        params: { id: id.toString() }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { id } = context.params!
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}` + id)
    // const data = await response.json()

    const data = teaData.find(item => item.id === id)

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            item: data
        }
    }
}

export default TeaPage;