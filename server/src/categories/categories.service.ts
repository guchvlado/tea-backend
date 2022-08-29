import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from './categories.model';
import { CreateCategory } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel(Categories) private categoriesRepository: typeof Categories) {}

    async createCategory(dto: CreateCategory) {
        const newCategory = await this.categoriesRepository.create(dto);
        return newCategory;
    }

    async getCategoryByName(name: string) {
        const category = await this.categoriesRepository.findOne({where: {name}});
        if (!category) {
            throw new HttpException('Такой категории не существует', HttpStatus.BAD_REQUEST);
        }
        return category;
    }

    async getCategoryById(id: number) {
        const category = await this.categoriesRepository.findByPk(id);
        if (!category) {
            throw new HttpException('Такой категории не существует', HttpStatus.BAD_REQUEST);
        }
        return category;
    }

    async getAll() {
        const categories = await this.categoriesRepository.findAll()
        return categories
    }

}
