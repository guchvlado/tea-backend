import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Tea } from 'src/tea-items/tea-items.model';
import { CategoriesController } from './categories.controller';
import { Categories } from './categories.model';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([Categories, Tea]),
    forwardRef(() => AuthModule)
  ]
})
export class CategoriesModule {}
