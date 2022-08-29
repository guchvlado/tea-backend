import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {}

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @Get('/:name')
    getRoleByName(@Param('name') name: string) {
        return this.roleService.getRoleByName(name);
    }

}
