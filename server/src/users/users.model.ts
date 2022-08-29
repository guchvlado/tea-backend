import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Order } from "src/orders/orders.model";
import { UserOrder } from "src/orders/user-orders.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttr {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {

    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@gmail.com', description: 'Почта'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    role: Role[]

    @HasMany(() => Order)
    orders: Order[]

}