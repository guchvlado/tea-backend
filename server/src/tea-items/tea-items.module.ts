import { Module } from '@nestjs/common';
import { TeaItemsController } from './tea-items.controller';
import { TeaItemsService } from './tea-items.service';

@Module({
  controllers: [TeaItemsController],
  providers: [TeaItemsService]
})
export class TeaItemsModule {}
