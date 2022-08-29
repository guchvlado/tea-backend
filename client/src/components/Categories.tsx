import React, { useState } from "react"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { setActiveCategory } from "../redux/reducers/filterSlice"

const categories = ['Все', 'Красный', 'Зеленый', 'Улун', 'Пуэр', 'Травяной']

const Categories = React.memo(() => {
    
    const dispatch = useAppDispatch()

    const activeCategory = useAppSelector(state => state.filter.activeCategory)

    const onChangeCategory = (i: number) => {
        dispatch(setActiveCategory(i))
    }

    return (
        <div>
            <ul className="flex justify-center flex-wrap md:flex-col gap-4">
                {categories.map((item, index) => 
                <li
                key={index}
                className={`duration-300 flex justify-center items-center font-bold rounded-full bg-[#F9F9F9] w-full sm:w-[160px] md:w-[196px] h-[46px] cursor-pointer  
                ${index === activeCategory ? 'text-white bg-[#282828]' : 'hover:bg-[#e7e7e7]'}`}
                onClick={() => onChangeCategory(index)}
                >{item}</li>)}
            </ul>
        </div>
    )
})

Categories.displayName = 'Categories'

export default Categories