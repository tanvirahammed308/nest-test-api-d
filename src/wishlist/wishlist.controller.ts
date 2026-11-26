
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Req,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

import { WishlistService } from './wishlist.service.js';
import { AddWishlistDto } from './dto/add-wishlist.dto.js';

interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    email: string;
  };
}

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(
    private readonly wishlistService: WishlistService,
  ) {}

  // POST /api/wishlist
  @Post()
  addToWishlist(
    @Req() req: AuthenticatedRequest,
    @Body() dto: AddWishlistDto,
  ) {
    return this.wishlistService.addToWishlist(
      req.user.sub,
      dto,
    );
  }

  // GET /api/wishlist
  @Get()
  getWishlist(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.wishlistService.getWishlist(
      req.user.sub,
    );
  }

  // DELETE /api/wishlist/:productId
  @Delete(':productId')
  removeFromWishlist(
    @Req() req: AuthenticatedRequest,
    @Param('productId', ParseIntPipe)
    productId: number,
  ) {
    return this.wishlistService.removeFromWishlist(
      req.user.sub,
      productId,
    );
  }
}
