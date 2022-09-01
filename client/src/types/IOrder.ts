import {ITeaItem} from './ITeaItem'

interface ITeaOrder extends ITeaItem {
    TeaOrder: {
        id: number;
        orderId: number;
        teadId: number;
        teaQuantity: number;
    }
}

export interface IOrder {
    id: number;
    userId: number;
    status: string;
    tea: ITeaOrder[];
    createdAt: string;
}