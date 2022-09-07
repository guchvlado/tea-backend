import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { changeCurrentPage, decreaseCurrentPage, increaseCurrentPage } from "../redux/reducers/filterSlice"

const Pagination: React.FC = () => {

    const dispatch = useAppDispatch()
    const count = useAppSelector(state => state.tea.count)
    const page = useAppSelector(state => state.filter.currentPage)

    const countOfPages = Math.ceil(count / 6)

    const increasePage = () => {
        if (page < countOfPages) {
            dispatch(increaseCurrentPage())
        }
    }

    const decreasePage = () => {
        if (page > 1) {
            dispatch(decreaseCurrentPage())
        }
    }

    const changePage = (pageToChange: number) => {
        if (pageToChange <= countOfPages && pageToChange > 0) {
            dispatch(changeCurrentPage(pageToChange))
        }
    }

    return (
        <ul className='flex gap-2 mt-8'>
            <li 
            onClick={decreasePage}
            className="flex justify-center items-center rounded-xl w-10 h-10 border border-maingreen cursor-pointer hover:bg-lightgreen transition-colors text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </li>

            {[...new Array(countOfPages)].map((_, index) =>
                <li
                    key={index}
                    onClick={() => changePage(index + 1)}
                    className={`flex justify-center items-center rounded-xl 
                    w-10 h-10 border border-maingreen cursor-pointer hover:bg-lightgreen transition-colors text-emerald-600
                    ${index+1 === page ? 'bg-lightgreen' : ''}
                    `}
                >{index + 1}</li>
            )}

            <li 
            onClick={increasePage}
            className="flex justify-center items-center rounded-xl w-10 h-10 border border-maingreen cursor-pointer hover:bg-lightgreen transition-colors text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </li>
        </ul>
    )
}

export default Pagination