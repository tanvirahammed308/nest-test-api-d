
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { AddWishlistDto } from './dto/add-wishlist.dto.js';

@Injectable()
export class WishlistService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Add product to wishlist
  async addToWishlist(
    userId: number,
    dto: AddWishlistDto,
  ) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: dto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException(
        'Product not found',
      );
    }

    const existingWishlist =
      await this.prisma.wishlist.findUnique({
        where: {
          userId_productId: {
            userId,
            productId: dto.productId,
          },
        },
      });

    if (existingWishlist) {
      throw new ConflictException(
        'Product is already in your wishlist',
      );
    }

    return this.prisma.wishlist.create({
      data: {
        userId,
        productId: dto.productId,
      },
      include: {
        product: true,
      },
    });
  }

  // Get logged-in user's wishlist
  async getWishlist(userId: number) {
    return this.prisma.wishlist.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Remove product from wishlist
  async removeFromWishlist(
    userId: number,
    productId: number,
  ) {
    const wishlistItem =
      await this.prisma.wishlist.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

    if (!wishlistItem) {
      throw new NotFoundException(
        'Wishlist item not found',
      );
    }

    await this.prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return {
      message: 'Product removed from wishlist',
    };
  }
}
