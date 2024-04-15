import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DatabaseService } from 'src/database/database.service';
import { ChangeOrderStatusDto, CreateOrderDto } from './dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';

@Injectable()
export class OrdersService {
  constructor(private databaseService: DatabaseService) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.databaseService.order.create({ data: createOrderDto });
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const totalOrders = await this.databaseService.order.count({
      where: {
        status: orderPaginationDto.status,
      },
    });

    const currentPage = orderPaginationDto.page;
    const perPage = orderPaginationDto.limit;

    return {
      data: await this.databaseService.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          status: orderPaginationDto.status,
        },
      }),
      meta: {
        total: totalOrders,
        page: currentPage,
        lastPage: Math.ceil(totalOrders / perPage),
      },
    };
  }

  async findOne(id: string) {
    const orderFound = await this.databaseService.order.findUnique({
      where: { id },
    });
    if (!orderFound) {
      throw new RpcException({
        message: `Order with id ${id} not found.`,
        status: HttpStatus.NOT_FOUND,
      });
    }
    return orderFound;
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;

    await this.findOne(id);

    return this.databaseService.order.update({
      data: { status },
      where: { id },
    });
  }
}
