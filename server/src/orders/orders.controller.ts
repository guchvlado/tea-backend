import { Body, Controller, Get, Headers, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @ApiOperation({summary: 'Создание нового заказа (AUTH)'})
    @ApiResponse({status: 200, type: Order})
    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(@Request() req, @Body() dto: CreateOrderDto) {
       return this.ordersService.createOrder(req.user.id, dto) 
    }

    @ApiOperation({summary: 'Изменение статус заказа по id (ADMIN)'})
    @ApiResponse({status: 200, type: Order})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/status/:id')
    changeStatus(@Param('id') id: string, @Body() dto: ChangeStatusDto) {
        return this.ordersService.changeStatusOrderById(+id, dto.status)
    }

    @ApiOperation({summary: 'Получение всех заказов для текущего пользователя (AUTH)'})
    @ApiResponse({status: 200, type: Order})
    @UseGuards(JwtAuthGuard)
    @Get()
    getOrdersByCurrentUser(@Request() req) { //@Headers('authorization') auth: string
        return this.ordersService.getOrdersByCurrentUser(req.user.id)
    }
}
