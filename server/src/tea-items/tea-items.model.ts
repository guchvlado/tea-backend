import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Categories } from "src/categories/categories.model";
import { Order } from "src/orders/orders.model";
import { TeaOrder } from "src/orders/tea-order.model";


interface TeaCreationAttr {
    title: string;
    price: number;
    rating: number;
    image: string;
    categoryId: number;
}

@Table({tableName: 'Tea'})
export class Tea extends Model<Tea, TeaCreationAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    rating: number;

    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @ForeignKey(() => Categories)
    @Column({type: DataType.INTEGER})
    categoryId: number;

    @BelongsTo(() => Categories)
    category: Categories

    @BelongsToMany(() => Order, () => TeaOrder)
    orders: Order[]
}