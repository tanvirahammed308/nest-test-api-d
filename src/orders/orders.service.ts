
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new order
  async create(createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        ...createOrderDto,
      },
    });

    return {
      message: 'Order created successfully',
      order,
    };
  }

  // Get all orders
  async findAll() {
    return this.prisma.order.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  // Get one order by ID
  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  // Update an order
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderDto,
      },
    });

    return {
      message: 'Order updated successfully',
      order: updatedOrder,
    };
  }

  // Delete an order
  async remove(id: number) {
    await this.findOne(id);

    const deletedOrder = await this.prisma.order.delete({
      where: { id },
    });

    return {
      message: 'Order deleted successfully',
      order: deletedOrder,
    };
  }
}
