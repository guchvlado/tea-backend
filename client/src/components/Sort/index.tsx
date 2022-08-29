import React, { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { setActiveSort } from "../../redux/reducers/filterSlice"
import { ISortItem } from "../../types/ISortItem"

const sortList: ISortItem[] = [
    {name: 'Сначала популярный', sortBy: 'rating', order: 'desc'},
    {name: 'Сначала дорогой', sortBy: 'price', order: 'desc'},
    {name: 'Сначала недорогой', sortBy: 'price', order: 'inc'},
    {name: 'По наименованию a-z', sortBy: 'title', order: 'desc'},
    {name: 'По наименованию z-a', sortBy: 'title', order: 'inc'}
]

const Sort = React.memo(() => {

    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const activeSort = useAppSelector(state => state.filter.activeSort)

    const sortRef = useRef<HTMLDivElement>(null)


    const onChangeSort = (item: ISortItem) => {
        dispatch(setActiveSort(item))
        setIsOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isOpen
                && sortRef.current
                && !sortRef.current.contains(e.target as Node)) {
                    setIsOpen(false)
            }
        }

        document.body.addEventListener('click', handleClickOutside)

        return () => document.body.removeEventListener('click', handleClickOutside)
    }, [isOpen])

    return (
        <div ref={sortRef} className="relative">
            <div className="flex flex-wrap justify-end items-center gap-1 lg:gap-2">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span className="text-maingreen border-dashed border-b border-maingreen cursor-pointer" onClick={() => setIsOpen(isOpen => !isOpen)}>{activeSort.name}</span>
            </div>
            {isOpen && <div className="absolute right-0 mt-4 bg-white shadow-md rounded-lg w-[160px] z-10">
                <ul>
                    {sortList.map((item, index) =>
                        <li
                            key={index}
                            onClick={() => onChangeSort(item)}
                            className={`cursor-pointer px-4 py-4 hover:bg-lightgreen ${activeSort.name === item.name ? 'text-maingreen bg-lightgreen font-bold' : ''}`}
                        >{sortList[index].name}</li>)}
                </ul>
            </div>}
        </div>
    )
})

Sort.displayName = 'Sort'

export default Sort