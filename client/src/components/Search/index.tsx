import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useDebounce } from "../../hooks/useDebounce";
import { setActiveSearch } from "../../redux/reducers/filterSlice";

const Search = () => {

    const dispatch = useAppDispatch()

    const [text, setText] = useState('')
    const debouncedText = useDebounce(text, 150)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        dispatch(setActiveSearch(debouncedText))
    }, [debouncedText])

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const onClear = () => {
        setText('')
        inputRef.current?.focus()
    }

    return (
        <div className='items-center w-[250px] lg:w-[350px] h-[50px] border border-[rgba(0,0,0,0.1)] rounded-xl gap-3 p-3 hidden md:flex'>
            <svg
                className='w-5 h-5 opacity-30'
                enableBackground="new 0 0 32 32"
                id="EditableLine"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="14"
                    cy="14"
                    fill="none"
                    id="XMLID_42_"
                    r="9"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                />
                <line
                    fill="none"
                    id="XMLID_44_"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    x1="27"
                    x2="20.366"
                    y1="27"
                    y2="20.366"
                />
            </svg>
            <input 
            ref={inputRef}
            type="text" 
            placeholder='Поиск чая...' 
            value={text} 
            onChange={onChangeSearch} 
            className='border-none flex-1'
            />
            {text.length > 0 ? <svg
                className='w-5 h-5 opacity-30 cursor-pointer hover:opacity-80'
                onClick={onClear}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg> : null}
        </div>
    );
}

export default Search