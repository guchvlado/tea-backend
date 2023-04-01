import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Categories } from './categories.model';
import { CategoriesService } from './categories.service';
import { CreateCategory } from './dto/create-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    
    constructor(private categoriesService: CategoriesService) {}


    @ApiOperation({summary: 'Создание новой категории (ADMIN)'})
    @ApiResponse({status: 200, type: Categories})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createCategory(@Body() dto: CreateCategory) {
        return this.categoriesService.createCategory(dto);
    } 

    @ApiOperation({summary: 'Получение категории по id'})
    @ApiResponse({status: 200, type: Categories})
    @Get('/:id')
    getCategoryByName(@Param('id') id: string) {
        return this.categoriesService.getCategoryById(+id)
    }

    @ApiOperation({summary: 'Получение всех категорий'})
    @ApiResponse({status: 200, type: [Categories]})
    @Get()
    getAll() {
        return this.categoriesService.getAll()
    }

    @Delete('/delete/:id')
    deleteCategoryById(@Param('id') id: string) {
        return this.categoriesService.deleteCategoryById(+id)
    }

}
