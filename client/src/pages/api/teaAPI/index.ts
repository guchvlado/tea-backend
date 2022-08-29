import type { NextApiRequest, NextApiResponse } from 'next'
import { ITeaItem } from '../../../types/ITeaItem';
import { teaData } from '../data/teaData';

interface queryParams {
    search?: string;
    sortBy?: string;
    order?: string;
    category?: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ITeaItem[]>
  ) {
    let filteredData = teaData
    const {category, order, search, sortBy} = req.query as queryParams
    if (search) {
        filteredData = filteredData.filter(item => item.title.match(new RegExp(search, 'i')))
    }
    if (category && typeof +category === 'number') {
        filteredData = filteredData.filter(item => item.category === +category)
    }
    if (sortBy) {
        switch(sortBy) {
            case 'title':
                filteredData.sort((a, b) => a.title > b.title ? 1 : -1)
                break;
            case 'rating':
                filteredData.sort((a, b) => b.rating - a.rating)
                break;
            case 'price':
                filteredData.sort((a, b) => b.price - a.price)
                break;
        }
    }
    if (order && order === 'inc') {
        filteredData.reverse()
    }
    res.status(200).json(filteredData)
  }
  