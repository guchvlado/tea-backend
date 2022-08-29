import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TeaItemsModule } from './tea-items/tea-items.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { CategoriesModule } from './categories/categories.module';
import { Tea } from './tea-items/tea-items.model';
import { Categories } from './categories/categories.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrdersModule } from './orders/orders.module';
import * as path from 'path'
import { Order } from './orders/orders.model';
import { TeaOrder } from './orders/tea-order.model';
import { UserOrder } from './orders/user-orders.model';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Tea, Categories, Order, TeaOrder, UserOrder],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    TeaItemsModule,
    CategoriesModule,
    FilesModule,
    OrdersModule,
    AuthModule,
  ],
})
export class AppModule {}
