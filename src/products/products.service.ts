
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // GET /api/products
  async findAll() {
    return this.prisma.product.findMany();
  }

  // GET /api/products/:id
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  // POST /api/products
  async create(data: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        ...(data.image !== undefined && {
          image: data.image,
        }),
      },
    });

    return {
      message: 'Product created successfully',
      product,
    };
  }

  // PATCH /api/products/:id
  async update(id: number, data: UpdateProductDto) {
    const existingProduct =
      await this.prisma.product.findUnique({
        where: { id },
      });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct =
      await this.prisma.product.update({
        where: { id },
        data: {
          ...(data.name !== undefined && {
            name: data.name,
          }),
          ...(data.description !== undefined && {
            description: data.description,
          }),
          ...(data.price !== undefined && {
            price: data.price,
          }),
          ...(data.stock !== undefined && {
            stock: data.stock,
          }),
          ...(data.image !== undefined && {
            image: data.image,
          }),
        },
      });

    return {
      message: 'Product updated successfully',
      updatedProduct,
    };
  }

  // DELETE /api/products/:id
  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return {
      message: 'Product deleted successfully',
      deletedProduct: product,
    };
  }
}
