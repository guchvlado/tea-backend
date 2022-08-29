import { BelongsToMany, Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
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

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    role: Role[]

    @BelongsToMany(() => Order, () => UserOrder)
    orders: Order[];

}