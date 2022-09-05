import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Tea } from "src/tea-items/tea-items.model";
import { User } from "src/users/users.model";
import { TeaOrder } from "./tea-order.model";
import { UserOrder } from "./user-orders.model";

@Table({tableName: 'orders'})
export class Order extends Model<Order> {

    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'done', description: 'Статус'})
    @Column({type: DataType.STRING, defaultValue: 'Оформлен'})
    status: string;

    @ApiProperty({example: '1', description: 'userID'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User

    @BelongsToMany(() => Tea, () => TeaOrder)
    tea: Tea[]
}