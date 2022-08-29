import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { TeaItemsModule } from 'src/tea-items/tea-items.module';
import { UsersModule } from 'src/users/users.module';
import { OrdersController } from './orders.controller';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';
import { TeaOrder } from './tea-order.model';
import { UserOrder } from './user-orders.model';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([Order, TeaOrder, UserOrder]),
    UsersModule,
    TeaItemsModule,
    forwardRef(() => AuthModule)
  ],
  exports: [OrdersService]
})
export class OrdersModule {}
