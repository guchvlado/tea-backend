import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface TeaCreationAttr {
    email: string;
    password: string;
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
}