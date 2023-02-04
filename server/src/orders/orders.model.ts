import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Tea } from "src/tea-items/tea-items.model";
import { User } from "src/users/users.model";
import { TeaOrder } from "./tea-order.model";
import { UserOrder } from "./user-orders.model";


interface OrderCreatonAttr {
    name: string;
    phone: string;
    address: string;
    time: string;
    items: any[];
}

@Table({tableName: 'orders'})
export class Order extends Model<Order, OrderCreatonAttr> {

    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'done', description: 'Статус'})
    @Column({type: DataType.STRING, defaultValue: 'Оформлен', allowNull: false})
    status: string;

    @ApiProperty({example: 'Олег', description: 'Имя получателя заказа'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: '8 800 555 35 35', description: 'Телефон получателя заказа'})
    @Column({type: DataType.STRING, allowNull: false})
    phone: string;

    @ApiProperty({example: 'Москва, Кремлёвская набережная, д. 1, кв. 1', description: 'Адрес доставки заказа'})
    @Column({type: DataType.STRING, allowNull: false})
    address: string;

    @ApiProperty({example: 'morning', description: 'Промежуток времени для заказа'})
    @Column({type: DataType.STRING, allowNull: false})
    time: string;

    @ApiProperty({example: '1', description: 'userID'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User

    @BelongsToMany(() => Tea, () => TeaOrder)
    tea: Tea[]
}