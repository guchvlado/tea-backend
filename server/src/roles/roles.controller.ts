import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {}

    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @Get('/:name')
    getRoleByName(@Param('name') name: string) {
        return this.roleService.getRoleByName(name);
    }

}
