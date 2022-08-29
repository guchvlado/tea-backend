import { ApiProperty } from "@nestjs/swagger";
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

    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Те гуань инь', description: 'Название чая'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: '1000', description: 'Цена'})
    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @ApiProperty({example: '7', description: 'Рейтинг'})
    @Column({type: DataType.INTEGER, allowNull: false})
    rating: number;

    @ApiProperty({example: 'a6832e28-f7e3-4892-af2f-9b009387900f', description: 'Название файла'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @ApiProperty({example: '1', description: 'Id категории'})
    @ForeignKey(() => Categories)
    @Column({type: DataType.INTEGER})
    categoryId: number;

    @BelongsTo(() => Categories)
    category: Categories

    @BelongsToMany(() => Order, () => TeaOrder)
    orders: Order[]
}