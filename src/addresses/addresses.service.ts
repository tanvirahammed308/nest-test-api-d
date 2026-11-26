
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateAddressDto } from './dto/create-address.dto.js';
import { UpdateAddressDto } from './dto/update-address.dto.js';

@Injectable()
export class AddressesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Create address
  async createAddress(
    userId: number,
    dto: CreateAddressDto,
  ) {
    const isDefault = dto.isDefault ?? false;

    return this.prisma.$transaction(async (tx) => {
      // If new address is default, remove default from others
      if (isDefault) {
        await tx.address.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }

      return tx.address.create({
        data: {
          ...dto,
          country: dto.country ?? 'Bangladesh',
          isDefault,
          userId,
        },
      });
    });
  }

  // Get all addresses of logged-in user
  async findAllAddresses(userId: number) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  }

  // Get one address
  async findAddressById(
    userId: number,
    addressId: number,
  ) {
    const address = await this.prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!address) {
      throw new NotFoundException(
        'Address not found',
      );
    }

    return address;
  }

  // Update address
  async updateAddress(
    userId: number,
    addressId: number,
    dto: UpdateAddressDto,
  ) {
    const existingAddress =
      await this.findAddressById(userId, addressId);

    return this.prisma.$transaction(async (tx) => {
      if (dto.isDefault === true) {
        await tx.address.updateMany({
          where: { userId },
          data: { isDefault: false },
        });
      }

      return tx.address.update({
        where: {
          id: existingAddress.id,
        },
        data: dto,
      });
    });
  }

  // Delete address
  async deleteAddress(
    userId: number,
    addressId: number,
  ) {
    const address =
      await this.findAddressById(userId, addressId);

    await this.prisma.address.delete({
      where: {
        id: address.id,
      },
    });

    return {
      message: 'Address deleted successfully',
    };
  }
}
