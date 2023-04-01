import React, { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { fetchTea } from 'redux/reducers/fetchTea';
import { ICategory } from 'types/ICategory';
import Categories from './Categories';
import Pagination from './Pagination';
import Sort from './Sort';
import TeaItem from './TeaItem';
import Skeleton from './Skeleton';

interface HomePageProps {
    categories: ICategory[]
  }

const HomePage: React.FC<HomePageProps> = ({categories}) => {
    const dispatch = useAppDispatch()
    const { items, status } = useAppSelector(state => state.tea)
    const { currentPage, activeCategory, activeSearch, activeSort: { order, sortBy } } = useAppSelector(state => state.filter)
  
    
  
    useEffect(() => {
      dispatch(fetchTea({
        category: activeCategory,
        search: activeSearch,
        order,
        sortBy,
        page: currentPage
      }))
    }, [activeCategory, activeSearch, order, sortBy, currentPage])

    // console.log(categories)
  
    const teaItems = items.map(item => <TeaItem key={item.id} {...item} />)
    const skeletons = [...new Array(3)].map((_, index) => <Skeleton key={index} />)
  
    return (
      <div className='mycontainer py-[43px] min-h-[850px]'>
        <div className='flex gap-4 md:gap-[100px] flex-col md:flex-row'>
          <Categories categories={categories} />
  
          <div className='flex-1'>
            <div className='flex justify-between'>
              <div className='hidden md:block font-bold text-2xl lg:text-4xl'>Каталог чая</div>
              <Sort />
            </div>
  
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4'>
              {status === 'error' && <h2>Error</h2>}
              {/* {status === 'loading' && skeletons} */}
              {status === 'success' && teaItems}
            </div>
            <Pagination/>
          </div>
        </div>
      </div>
    )
};

export default HomePage;