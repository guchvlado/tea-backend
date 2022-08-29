import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Tea } from "src/tea-items/tea-items.model";


interface CategoriesCreationAttr {
    name: string;
}

@Table({tableName: 'Categories'})
export class Categories extends Model<Categories, CategoriesCreationAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @HasMany(() => Tea)
    tea: Tea[]
}