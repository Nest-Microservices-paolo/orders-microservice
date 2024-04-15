import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [DatabaseModule],
})
export class OrdersModule {}
