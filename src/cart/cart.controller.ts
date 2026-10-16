import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Create or get a user's cart
  @Post(':userId')
  createCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.createCart(userId);
  }

  // Get cart
  @Get(':userId')
  getCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.getCart(userId);
  }

  // Add product to cart
  @Post(':userId/items')
  addItem(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: { productId: number; quantity?: number },
  ) {
    return this.cartService.addItem(
      userId,
      body.productId,
      body.quantity ?? 1,
    );
  }

  // Update product quantity
  @Patch(':userId/items/:productId')
  updateItem(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() body: { quantity: number },
  ) {
    return this.cartService.updateItem(
      userId,
      productId,
      body.quantity,
    );
  }

  // Remove a product from cart
  @Delete(':userId/items/:productId')
  removeItem(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.cartService.removeItem(userId, productId);
  }

  // Clear cart
  @Delete(':userId')
  clearCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.clearCart(userId);
  }
}