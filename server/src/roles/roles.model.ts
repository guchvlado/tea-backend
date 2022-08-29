import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttr {
    email: string;
    password: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttr> {

    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'USER', description: 'Название роли капсом'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @ApiProperty({example: 'user', description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    user: User[]

}