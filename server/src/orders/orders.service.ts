import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TeaItemsService } from 'src/tea-items/tea-items.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';
import { TeaOrder } from './tea-order.model';
import { UserOrder } from './user-orders.model';

@Injectable()
export class OrdersService {

    constructor(@InjectModel(Order) private orderRepository: typeof Order,
                @InjectModel(TeaOrder) private teaOrderRepository: typeof TeaOrder,
                @InjectModel(UserOrder) private userOrderRepository: typeof UserOrder,
                private usersService: UsersService,
                private teaItemsService: TeaItemsService) {}

    async createOrder(userId, dto: CreateOrderDto) {
        const order = await this.orderRepository.create()
        const user = await this.usersService.getUserByPk(userId)

        if (!user || !order) {
            throw new HttpException('Заказ не удалось создать', HttpStatus.BAD_REQUEST)
        }

        // await order.$set('users', [user.id])
        // order.users = [user]

        await order.$set('user', user.id)
        order.user = user

        await order.$set('tea', [])
        order.tea = []

        dto.items.forEach(async (item) => {
            const teaItem = await this.teaItemsService.getByPk(item.teaId)
            await order.$add('tea', [teaItem.id])
            order.tea.push(teaItem)

            const teaOrder = await this.teaOrderRepository.findOne({where: {teaId: teaItem.id, orderId: order.id}})
            teaOrder.teaQuantity = item.teaQuantity
            await teaOrder.save()
        })

        return order
    }

    async changeStatusOrderById(id: number, status: string) {
        const order = await this.orderRepository.findByPk(id)
        if (!order) {
            throw new HttpException('Заказ не удалось найти', HttpStatus.BAD_REQUEST)
        }
        order.status = status
        await order.save()
        return order
    }

    async getOrdersByCurrentUser(userId: string) {
        const orders = await this.orderRepository.findAll({include: {all: true}, where: {userId}})
        return orders
    }

    async getAllOrders() {
        const orders = await this.orderRepository.findAll({include: {all: true}})
        return orders
    }

    async getOrderById(id: number) {
        const order = await this.orderRepository.findByPk(id, {include: {all: true}})
        if (!order) {
            throw new HttpException('Заказ не удалось найти', HttpStatus.BAD_REQUEST)
        }
        return order
    }

}
