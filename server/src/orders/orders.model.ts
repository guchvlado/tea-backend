import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Tea } from "src/tea-items/tea-items.model";
import { User } from "src/users/users.model";
import { TeaOrder } from "./tea-order.model";
import { UserOrder } from "./user-orders.model";

@Table({tableName: 'orders'})
export class Order extends Model<Order> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, defaultValue: 'toDo'})
    status: string;

    @BelongsToMany(() => User, () => UserOrder)
    users: User[];

    @BelongsToMany(() => Tea, () => TeaOrder)
    tea: Tea[]
}