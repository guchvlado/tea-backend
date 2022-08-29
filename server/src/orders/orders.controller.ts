import { Body, Controller, Get, Headers, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(@Body() dto: CreateOrderDto) {
       return this.ordersService.createOrder(dto) 
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/status/:id')
    changeStatus(@Param('id') id: string, @Body() dto: ChangeStatusDto) {
        return this.ordersService.changeStatusOrderById(+id, dto.status)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getOrdersByCurrentUser(@Request() req) { //@Headers('authorization') auth: string
        return this.ordersService.getOrdersByCurrentUser(req.user.id)
    }
}
