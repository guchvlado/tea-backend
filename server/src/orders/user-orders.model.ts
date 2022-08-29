import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Order } from "./orders.model";


@Table({tableName: 'user_orders', createdAt: false, updatedAt: false})
export class UserOrder extends Model<UserOrder> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Order)
    @Column({type: DataType.INTEGER})
    orderId: number;
}