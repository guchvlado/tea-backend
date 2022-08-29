import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CategoriesService } from './categories.service';
import { CreateCategory } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
    
    constructor(private categoriesService: CategoriesService) {}


    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createCategory(@Body() dto: CreateCategory) {
        return this.categoriesService.createCategory(dto);
    } 

    @Get('/:id')
    getCategoryByName(@Param('id') id: string) {
        return this.categoriesService.getCategoryById(+id)
    }

}
