import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Categories } from 'src/categories/categories.model';
import { FilesModule } from 'src/files/files.module';
import { TeaItemsController } from './tea-items.controller';
import { Tea } from './tea-items.model';
import { TeaItemsService } from './tea-items.service';

@Module({
  controllers: [TeaItemsController],
  providers: [TeaItemsService],
  imports: [
    SequelizeModule.forFeature([Tea, Categories]),
    FilesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [TeaItemsService]
})
export class TeaItemsModule {}
