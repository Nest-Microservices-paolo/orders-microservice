import {
  Controller,
  NotImplementedException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChangeOrderStatusDto } from './dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrder')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
  async findAll(@Payload() orderPaginationDto: OrderPaginationDto) {
    return await this.ordersService.findAll(orderPaginationDto);
  }

  @MessagePattern('findOneOrder')
  async findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  changeStatusOrder() {
    throw new NotImplementedException();
  }

  @MessagePattern('changeOrderStatus')
  changeOrderStatus(@Payload() changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.ordersService.changeStatus(changeOrderStatusDto);
  }
}
