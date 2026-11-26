
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

import { AddressesService } from './addresses.service.js';
import { CreateAddressDto } from './dto/create-address.dto.js';
import { UpdateAddressDto } from './dto/update-address.dto.js';

interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    email: string;
  };
}

@Controller('addresses')
@UseGuards(JwtAuthGuard)
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
  ) {}

  // POST /api/addresses
  @Post()
  createAddress(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateAddressDto,
  ) {
    return this.addressesService.createAddress(
      req.user.sub,
      dto,
    );
  }

  // GET /api/addresses
  @Get()
  findAllAddresses(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.addressesService.findAllAddresses(
      req.user.sub,
    );
  }

  // GET /api/addresses/:id
  @Get(':id')
  findAddressById(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.addressesService.findAddressById(
      req.user.sub,
      id,
    );
  }

  // PATCH /api/addresses/:id
  @Patch(':id')
  updateAddress(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressesService.updateAddress(
      req.user.sub,
      id,
      dto,
    );
  }

  // DELETE /api/addresses/:id
  @Delete(':id')
  deleteAddress(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.addressesService.deleteAddress(
      req.user.sub,
      id,
    );
  }
}
