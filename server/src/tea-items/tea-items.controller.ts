import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateTeaDto } from './dto/create-teaItem.dto';
import { TeaItemsService } from './tea-items.service';

@Controller('tea')
export class TeaItemsController {

    constructor(private teaService: TeaItemsService) {}

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/new')
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateTeaDto, @UploadedFile() image) {
        return this.teaService.create(dto, image)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/update/:id')
    @UseInterceptors(FileInterceptor('image'))
    update(@Param('id') id: string, @Body() dto: CreateTeaDto, @UploadedFile() image) {
        return this.teaService.update(+id, dto, image)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/delete/:id')
    delete(@Param('id') id: string) {
        return this.teaService.delete(+id)
    }

    @Get('/all')
    getAll() {
        return this.teaService.getAll();
    }

    @Get()
    getAllWithPages(@Query() query) {
        return this.teaService.getAllWithPages(query.limit, query.page, query.categoryId)
    }
}
