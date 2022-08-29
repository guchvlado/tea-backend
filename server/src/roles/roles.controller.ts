import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: 'Создание новой роли (ADMIN)'})
    @ApiResponse({status: 200, type: Role})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: 'Получение роли по имени'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:name')
    getRoleByName(@Param('name') name: string) {
        return this.roleService.getRoleByName(name);
    }

}
