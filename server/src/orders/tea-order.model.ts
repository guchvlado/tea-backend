import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Tea } from "src/tea-items/tea-items.model";
import { Order } from "./orders.model";


@Table({tableName: 'tea_orders', createdAt: false, updatedAt: false})
export class TeaOrder extends Model<TeaOrder> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, defaultValue: 100})
    teaQuantity: number;

    @ForeignKey(() => Tea)
    @Column({type: DataType.INTEGER})
    teaId: number;

    @ForeignKey(() => Order)
    @Column({type: DataType.INTEGER})
    orderId: number;
}