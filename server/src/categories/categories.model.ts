import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Tea } from "src/tea-items/tea-items.model";


interface CategoriesCreationAttr {
    name: string;
}

@Table({tableName: 'Categories'})
export class Categories extends Model<Categories, CategoriesCreationAttr> {

    @ApiProperty({example: '1', description: 'ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Зеленый чай', description: 'Категория чая'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @HasMany(() => Tea)
    tea: Tea[]
}