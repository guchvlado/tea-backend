import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateTeaDto } from './dto/create-teaItem.dto';
import { Tea } from './tea-items.model';
import { TeaItemsService } from './tea-items.service';

@ApiTags('tea')
@Controller('tea')
export class TeaItemsController {

    constructor(private teaService: TeaItemsService) {}

    @ApiOperation({summary: 'Создание нового товара в БД(чая) (ADMIN)'})
    @ApiResponse({status: 200, type: Tea})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/new')
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateTeaDto, @UploadedFile() image) {
        return this.teaService.create(dto, image)
    }

    @ApiOperation({summary: 'Обновление товара в БД(чая) (ADMIN)'})
    @ApiResponse({status: 200, type: Tea})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put('/update/:id')
    @UseInterceptors(FileInterceptor('image'))
    update(@Param('id') id: string, @Body() dto: CreateTeaDto, @UploadedFile() image) {
        return this.teaService.update(+id, dto, image)
    }

    @ApiOperation({summary: 'Удаление товара в БД(чая) (ADMIN)'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/delete/:id')
    delete(@Param('id') id: string) {
        return this.teaService.delete(+id)
    }

    @ApiOperation({summary: 'Получение всех товаров'})
    @ApiResponse({status: 200, type: [Tea]})
    @Get('/all')
    getAll() {
        return this.teaService.getAll();
    }

    @ApiOperation({summary: 'Получение всех товаров с постраничным выводом(limit, page, categoryId)'})
    @ApiResponse({status: 200, type: [Tea]})
    @Get()
    getAllWithPages(@Query() query) {
        return this.teaService.getAllWithPages(query.limit, query.page, query.categoryId, query.order, query.sortBy, query.search)
    }

    @ApiOperation({summary: 'Получение товара по id'})
    @ApiResponse({status: 200, type: Tea})
    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.teaService.getByPk(+id)
    }
}
